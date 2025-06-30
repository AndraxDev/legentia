import React from 'react';
import PropTypes from "prop-types";
import {MaterialTooltip} from "../MaterialTooltip";
import {MaterialProgressBar} from "../MaterialProgressBar";
import * as Vocabulary from "../../pages/Vocabulary";

/*
* Learning index defines how well the user knows the word. More times user repeat the word, the highest index will be.
* Index is used to mark the words user know and show user part of the text he probably doesn't know.
* Index equal to -1 disables the colored underline.
* */

const untranslatableWords = ["\"", "'", ".", ",", "!", "?", ":", ";", "-", "(", ")", "[", "]", "{", "}", "-", "+", "_", "*", "/", "\\", "|", "=", "<", ">", "@", "#", "$", "%", "^", "&", "*", "`", "~", "–"];

function InteractiveWord({word, learningIndex, contextSentence}) {
    const [translationIsOpened, setTranslationIsOpened] = React.useState(false);

    const [translation, setTranslation] = React.useState(null);

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

        console.log(weakWord, weakTranslation);
    }

    return (
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
                    untranslatableWords.includes(translation) ? null : <button onClick={() => {
                        addToWeakWords(word, translation);
                    }} className={"translation-item add-weak-word-button"}>
                        Add to weak words
                    </button>
                }
                </> : <div className={"translation-item"}><MaterialProgressBar thickness={4} size={24}/></div> }
            </div>}>
            <button onClick={onWordClick} className={"word-regular"}>{word}</button>
        </MaterialTooltip>
    );
}

InteractiveWord.propTypes = {
    word: PropTypes.string.isRequired,
    learningIndex: PropTypes.number,
    contextSentence: PropTypes.string
}

export default InteractiveWord;