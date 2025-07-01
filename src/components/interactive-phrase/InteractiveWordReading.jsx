/***************************************************************************
 * Copyright (c) 2025 Dmytro Ostapenko. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * *************************************************************************/

import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {MaterialTooltip} from "../MaterialTooltip";
import {MaterialProgressBar} from "../MaterialProgressBar";
import * as Vocabulary from "../../pages/Vocabulary";
import * as Settings from "../../Settings";
import {Alert, Snackbar} from "@mui/material";

/*
* Learning index defines how well the user knows the word. More times user repeat the word, the highest index will be.
* Index is used to mark the words user know and show user part of the text he probably doesn't know.
* Index equal to -1 disables the colored underline.
* */

const untranslatableWords = ["\"", "'", ".", ",", "!", "?", ":", ";", "-", "(", ")", "[", "]", "{", "}", "-", "+", "_", "*", "/", "\\", "|", "=", "<", ">", "@", "#", "$", "%", "^", "&", "*", "`", "~", "–", "”"];

function InteractiveWord({word, learningIndex, contextSentence}) {
    const [translationIsOpened, setTranslationIsOpened] = React.useState(false);

    const [translation, setTranslation] = React.useState(null);
    const [weakWords, setWeakWords] = React.useState(Object.keys(Settings.getWeakWords()));
    const [snackbarIsOpened, setSnackbarIsOpened] = React.useState(false);

    useEffect(() => {
        if (snackbarIsOpened) {
            setWeakWords(Object.keys(Settings.getWeakWords()))

            setTimeout(() => setSnackbarIsOpened(false), 3000);
        }
    }, [snackbarIsOpened]);

    const onWordClick = () => {
        Vocabulary.translate(word, contextSentence)
            .then((result) => {
                setTranslation(result);
            })
            .catch((error) => {
                console.error("Error fetching translation:", error);
                if (error.message.toLowerCase().includes("ai_unavailable")) {
                    setTranslation("AI features are disabled. Please set an API key first.");
                } if (error.message.toLowerCase().includes("word_unknown")) {
                    setTranslation(word);
                } else {
                    setTranslation("Translation not available right now.");
                }
            });

        setTranslationIsOpened(true);
    }

    // User can then repeat the word by doing an interactive personalized translation quiz.
    // After a few repetitions, the word will be removed from the weak words list.
    const addToWeakWords = (word, translation) => {
        let weakWord = word;
        let weakTranslation = translation;

        if (Array.isArray(translation)) {
            weakTranslation = translation[0];
        }

        Settings.addWeakWord(weakWord.toLowerCase().replace(",", "").replace(".", "").trim(), weakTranslation.toLowerCase().replace(",", "").replace(".", "").trim());
    }

    // Planned upcoming feature:
    // const addToPhrasesList = () => {
    //
    // }

    return (
        <>
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={snackbarIsOpened} autoHideDuration={3000} onClick={() => setSnackbarIsOpened(false)}>
                <Alert onClose={() => setSnackbarIsOpened(false)}
                        severity="success"
                        sx={{ userSelect: "none", width: '100%', background: "#285c39", borderRadius: "16px", boxShadow: "none", border: "none" }}
                        variant="filled">
                            Word saved for further practice.
                </Alert>
            </Snackbar>
            <MaterialTooltip
                arrow
                leaveTouchDelay={2147483647}
                open={translationIsOpened}
                onClose={() => setTranslationIsOpened(false)}
                title={<div>
                    {translation ? <><div className={"translation-item"}>
                        {translation}
                    </div>
                        {
                            untranslatableWords.includes(translation) ? null : <>
                                {
                                    weakWords.includes(word) ? <div className={"translation-item-weak-word"}>
                                        Weak word
                                    </div> : <button onClick={() => {
                                        addToWeakWords(word, translation);
                                        setSnackbarIsOpened(true);
                                    }} className={"translation-item add-weak-sentence-button"}>
                                        Add to weak words
                                    </button>
                                }
                            </>
                        }
                        {/* Upcoming planned feature */}
                        {/*<button onClick={() => {*/}
                        {/*    addToPhrasesList(contextSentence);*/}
                        {/*}} className={"translation-item add-weak-sentence-button"}>*/}
                        {/*    Add sentence to learning phrases list*/}
                        {/*</button>*/}
                    </> : <div className={"translation-item"}><MaterialProgressBar thickness={4} size={24}/></div> }
                </div>}>
                <button onClick={onWordClick} className={weakWords.includes(word) ? "word-weak" : "word-regular"}>{word}</button>
            </MaterialTooltip>
        </>
    );
}

InteractiveWord.propTypes = {
    word: PropTypes.string.isRequired,
    learningIndex: PropTypes.number,
    contextSentence: PropTypes.string
}

export default InteractiveWord;
