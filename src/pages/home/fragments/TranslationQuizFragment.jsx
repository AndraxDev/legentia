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

import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import * as StringUtil from "../../util/StringUtils";
import * as Settings from "../../../Settings";

const answerStatusAnimationDuration = 500;
const answerCssTransitionDuration = 300;
const cssSafeDelay = 50;

function TranslationQuizFragment({exercise, fragmentIndex, onExerciseComplete, phraseId, fallbackEvent, isPreviousMistake}) {

    const [selectedWord, setSelectedWord] = React.useState(null);
    const [selectedTranslation, setSelectedTranslation] = React.useState(null);
    const [exerciseWords, setExerciseWords] = useState(Object.keys(exercise).sort(() => Math.random() - 0.5))
    const [exerciseTranslations, setExerciseTranslations] = useState(Object.values(exercise).sort(() => Math.random() - 0.5))
    const [correctWords, setCorrectWords] = useState([]);
    const [mistakes, setMistakes] = useState(0);
    const [localStreak, setLocalStreak] = useState(0);
    const [selectedWordIndex, setSelectedWordIndex] = useState(null);
    const [selectedTranslationIndex, setSelectedTranslationIndex] = useState(null);

    const checkAsCorrect = () => {
        document.getElementById("correct").style.transform = "translateY(100%)";
        document.getElementById("correct").style.transform = "translateY(0)";
    }

    useEffect(() => {
        if (correctWords.length >= exerciseWords.length + exerciseTranslations.length) {
            setTimeout(() => {
                checkAsCorrect()
            }, 300)
        }

        if (selectedWord && selectedTranslation && selectedWordIndex != null && selectedTranslationIndex != null) {

            let selectedWordButton = getWordElementId(selectedWord, selectedWordIndex);
            let selectedTranslationButton = getTranslationElementId(selectedTranslation, selectedTranslationIndex);

            if (isAnswerCorrect(selectedWord, selectedTranslation)) {
                let newCorrectWords = [...correctWords];
                newCorrectWords.push(selectedTranslation);
                newCorrectWords.push(selectedWord);
                setCorrectWords(newCorrectWords);
                setLocalStreak(localStreak + 1);
                Settings.incrementWeakWordIndex(selectedWord);

                markCurrentWordPairAsCorrect(selectedWordButton, selectedTranslationButton);
            } else {
                setMistakes(mistakes + 1);
                setLocalStreak(0);

                markCurrentWordPairAsIncorrect(selectedWordButton, selectedTranslationButton);
            }

            setSelectedWord(null);
            setSelectedTranslation(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedWord, selectedTranslation, selectedWordIndex, selectedTranslationIndex]);

    useEffect(() => {
        resetAnswerResult();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fallbackEvent]);

    // f1 - function to mark as correct or incorrect
    // f2 - function to reset or disable
    // b1 - first button to change state (usually word button)
    // b2 - second button to change state (usually translation button)
    const changeButtonState = (f1, f2, b1, b2) => {
        if (b1 && b2) {
            f1(b1);
            f1(b2);

            setTimeout(() => {
                if (b1 && b2) {
                    f2(b1);
                    f2(b2);
                }
            }, answerStatusAnimationDuration)
        }
    }

    const markCurrentWordPairAsCorrect = (wordButton, translationButton) => {
        changeButtonState(markButtonAsCorrect, disableButton, wordButton, translationButton);
    }

    const markCurrentWordPairAsIncorrect = (wordButton, translationButton) => {
        changeButtonState(markButtonAsIncorrect, resetButton, wordButton, translationButton);
    }

    const resetButton = (button) => {
        if (button) {
            button.style.removeProperty("border-color");
            button.style.removeProperty("color");
            button.style.cursor = "pointer";
            button.className = "quiz-button";
        }
    }

    const disableButton = (button) => {
        if (button) {
            button.style.borderColor = "#444444";
            button.style.color = "#555555";
            button.style.cursor = "default";
            button.style.height = "69px";
            button.style.borderBottomWidth = "2px";
            button.style.marginTop = "3px";
            button.setAttribute("disabled", "true");
        }
    }

    const markButtonAsCorrect = (button) => {
        if (button) {
            button.style.borderColor = "#a6ff5d";
            button.style.color = "#a6ff5d";
            button.style.cursor = "pointer";
        }
    }

    const markButtonAsIncorrect = (button) => {
        if (button) {
            button.style.borderColor = "#ff5d5d";
            button.style.color = "#ff5d5d";
            button.style.cursor = "pointer";
        }
    }

    const resetAnswerResult = () => {
        setExerciseWords(Object.keys(exercise).sort(() => Math.random() - 0.5))
        setExerciseTranslations(Object.values(exercise).sort(() => Math.random() - 0.5))
        setCorrectWords([]);
        setSelectedWord(null);
        setSelectedTranslation(null);
        setMistakes(0);
        setLocalStreak(0);

        document.getElementById("correct").style.transform = "translateY(100%)";
        document.getElementById("exercise-fragment-root").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("exercise-fragment-root").style.transition = "opacity 0.5s";
            setTimeout(() => {
                document.getElementById("exercise-fragment-root").style.opacity = "1";
                setTimeout(() => {
                    document.getElementById("exercise-fragment-root").style.transition = "none";
                }, answerCssTransitionDuration)
            }, cssSafeDelay);
        }, cssSafeDelay)
    }

    const getWordElementId = (word, index) => {
        return document.getElementById("word-" + word.toString()?.replaceAll(" ", "-") + "-" + index.toString());
    }

    const getTranslationElementId = (translation, index) => {
        return document.getElementById("translation-" + translation.toString()?.replaceAll(" ", "-") + "-" + index.toString());
    }

    const isAnswerCorrect = (word, translation) => {
        return exercise[word] === translation
    }

    const goNext = () => {
        onExerciseComplete(fragmentIndex, true, exercise, mistakes, localStreak);
    }

    const clearAllSelectionsWords = () => {
        for (let i = 0; i < exerciseWords.length; i++) {
            document.getElementById("word-" + exerciseWords[i]?.replaceAll(" ", "-") + "-" + i.toString()).className = "quiz-button";
        }
    }

    const clearAllSelectionsTranslations = () => {
        for (let i = 0; i < exerciseTranslations.length; i++) {
            document.getElementById("translation-" + exerciseTranslations[i].toString()?.replaceAll(" ", "-") + "-" + i.toString()).className = "quiz-button";
        }
    }

    return (
        <div id={"exercise-fragment-root"} style={{
            opacity: "0"
        }}>
            <h2 className={"exercise-title"}>Match the word with its correct translation</h2>
            <div className={"quiz-gap"}></div>
            <div className={"quiz-content"}>
                <div className={"quiz-column"}>
                    {
                        exerciseWords.map((word, index) => (
                            <div className={"quiz-button-wrapper"} key={"translation-" + word.toString()?.replaceAll(" ", "-") + "-" + index.toString()}>
                                <button
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    disabled={correctWords.filter(v => v === word) >= exerciseWords.filter(v => v === word).length}
                                    id={"word-" + word.toString()?.replaceAll(" ", "-") + "-" + index.toString()}
                                    onClick={() => {
                                        if (selectedWord === word && selectedWordIndex === index) {
                                            setSelectedWord(null)
                                            setSelectedWordIndex(null)

                                            clearAllSelectionsWords()
                                            if (correctWords.filter(v => v === word) >= exerciseWords.filter(v => v === word).length) {
                                                document.getElementById("word-" + word.toString()?.replaceAll(" ", "-") + "-" + index.toString()).className = "quiz-button-disabled";
                                            } else {
                                                document.getElementById("word-" + word.toString()?.replaceAll(" ", "-") + "-" + index.toString()).className = "quiz-button";
                                            }
                                        } else {
                                            setSelectedWord(word)
                                            setSelectedWordIndex(index);

                                            clearAllSelectionsWords()
                                            if (correctWords.filter(v => v === word) >= exerciseWords.filter(v => v === word).length) {
                                                document.getElementById("word-" + word.toString()?.replaceAll(" ", "-") + "-" + index.toString()).className = "quiz-button-disabled";
                                            } else {
                                                document.getElementById("word-" + word.toString()?.replaceAll(" ", "-") + "-" + index.toString()).className = "quiz-button-selected";
                                            }
                                        }
                                    }} className={"quiz-button"} key={word}>
                                        {StringUtil.clearWord(word)}
                                </button>
                            </div>)
                        )
                    }
                </div>
                <div className={"quiz-column"}>
                    {
                        exerciseTranslations.map((word, index) => (
                            <div className={"quiz-button-wrapper"} key={"translation-" + word.toString()?.replaceAll(" ", "-") + "-" + index.toString()}>
                                <button
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    disabled={correctWords.filter(v => v === word) >= exerciseTranslations.filter(v => v === word).length}
                                    id={"translation-" + word.toString()?.replaceAll(" ", "-") + "-" + index.toString()} onClick={() => {
                                        if (selectedTranslation === word && selectedTranslationIndex === index) {
                                            setSelectedTranslation(null);
                                            setSelectedTranslationIndex(null);

                                            clearAllSelectionsTranslations()
                                            if (correctWords.filter(v => v === word) >= exerciseTranslations.filter(v => v === word).length) {
                                                document.getElementById("translation-" + word.toString()?.replaceAll(" ", "-") + "-" + index.toString()).className = "quiz-button-disabled";
                                            } else {
                                                document.getElementById("translation-" + word.toString()?.replaceAll(" ", "-") + "-" + index.toString()).className = "quiz-button";
                                            }
                                        } else {
                                            setSelectedTranslation(word);
                                            setSelectedTranslationIndex(index);

                                            clearAllSelectionsTranslations()
                                            if (correctWords.filter(v => v === word) >= exerciseTranslations.filter(v => v === word).length) {
                                                document.getElementById("translation-" + word.toString()?.replaceAll(" ", "-") + "-" + index.toString()).className = "quiz-button-disabled";
                                            } else {
                                                document.getElementById("translation-" + word.toString()?.replaceAll(" ", "-") + "-" + index.toString()).className = "quiz-button-selected";
                                            }
                                        }
                                    }}
                                    className={"quiz-button"}
                                    key={word.toString()}>
                                        {StringUtil.clearWord(word || "")}
                                </button>
                            </div>)
                        )
                    }
                </div>
            </div>
            <div style={{
                transform: "translateY(100%)",
            }} id={"correct"} className={"exercise-result-box"}>
                <h3 className={"exercise-status text-answer-correct"}>Correct!</h3>
                <br/>
                <button className={"exercise-button exercise-button-correct"} onClick={goNext}>Continue</button>
            </div>
            <div className={"exercise-bottom-bar"}>
                <button disabled={true} className={"exercise-button exercise-button-disabled"}>Continue</button>
            </div>
        </div>
    );
}

TranslationQuizFragment.propTypes = {
    exercise: PropTypes.object.isRequired,
    fragmentIndex: PropTypes.number.isRequired,
    onExerciseComplete: PropTypes.func.isRequired,
    phraseId: PropTypes.string.isRequired,
    fallbackEvent: PropTypes.object,
    isPreviousMistake: PropTypes.bool
}

export default TranslationQuizFragment;
