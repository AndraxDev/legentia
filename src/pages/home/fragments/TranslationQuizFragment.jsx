import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

function TranslationQuizFragment({exercise, mistakeIndex, fragmentIndex, onExerciseComplete, phraseId, fallbackEvent, isPreviousMistake}) {

    const [selectedWord, setSelectedWord] = React.useState(null);
    const [selectedTranslation, setSelectedTranslation] = React.useState(null);
    const [exerciseWords, setExerciseWords] = useState(Object.keys(exercise).sort(() => Math.random() - 0.5))
    const [exerciseTranslations, setExerciseTranslations] = useState(Object.values(exercise).sort(() => Math.random() - 0.5))
    const [correctWords, setCorrectWords] = useState([]);
    const [mistakes, setMistakes] = useState(0);

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

        if (selectedWord && selectedTranslation) {
            if (isAnswerCorrect(selectedWord, selectedTranslation)) {
                if (document.getElementById("word-" + selectedWord)) {
                    document.getElementById("word-" + selectedWord).style.borderColor = "#a6ff5d";
                    document.getElementById("translation-" + selectedTranslation).style.borderColor = "#a6ff5d";
                    document.getElementById("word-" + selectedWord).style.color = "#a6ff5d";
                    document.getElementById("translation-" + selectedTranslation).style.color = "#a6ff5d";
                    let newCorrectWords = [...correctWords];
                    newCorrectWords.push(selectedTranslation);
                    newCorrectWords.push(selectedWord);
                    setCorrectWords(newCorrectWords);
                }

                setTimeout(() => {
                    if (document.getElementById("word-" + selectedWord)) {
                        document.getElementById("word-" + selectedWord).style.borderColor = "#444444";
                        document.getElementById("translation-" + selectedTranslation).style.borderColor = "#444444";
                        document.getElementById("word-" + selectedWord).style.color = "#555555";
                        document.getElementById("translation-" + selectedTranslation).style.color = "#555555";
                    }
                }, 1000)
            } else {
                if (document.getElementById("word-" + selectedWord)) {
                    document.getElementById("word-" + selectedWord).style.borderColor = "#ff5d5d";
                    document.getElementById("translation-" + selectedTranslation).style.borderColor = "#ff5d5d";
                    document.getElementById("word-" + selectedWord).style.color = "#ff5d5d";
                    document.getElementById("translation-" + selectedTranslation).style.color = "#ff5d5d";
                    setMistakes(mistakes + 1);
                }

                setTimeout(() => {
                    if (document.getElementById("word-" + selectedWord)) {
                        document.getElementById("word-" + selectedWord).style.removeProperty("border-color");
                        document.getElementById("translation-" + selectedTranslation).style.removeProperty("border-color");
                        document.getElementById("word-" + selectedWord).style.removeProperty("color");
                        document.getElementById("translation-" + selectedTranslation).style.removeProperty("color");
                    }
                }, 1000)
            }

            setSelectedWord(null);
            setSelectedTranslation(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedWord, selectedTranslation]);

    useEffect(() => {
        resetAnswerResult();
    }, [fallbackEvent]);

    const resetAnswerResult = () => {
        setExerciseWords(Object.keys(exercise).sort(() => Math.random() - 0.5))
        setExerciseTranslations(Object.values(exercise).sort(() => Math.random() - 0.5))
        setCorrectWords([]);
        setSelectedWord(null);
        setSelectedTranslation(null);
        setMistakes(0);
        document.getElementById("correct").style.transform = "translateY(100%)";
        document.getElementById("exercise-fragment-root").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("exercise-fragment-root").style.transition = "opacity 0.5s";
            setTimeout(() => {
                document.getElementById("exercise-fragment-root").style.opacity = "1";
                setTimeout(() => {
                    document.getElementById("exercise-fragment-root").style.transition = "none";
                }, 300)
            }, 50)
        }, 50)
    }

    const isAnswerCorrect = (word, translation) => {
        return exercise[word] === translation
    }

    const goNext = () => {
        onExerciseComplete(fragmentIndex, true, exercise, mistakes);
    }

    const getClassName = (word) => {
        if (correctWords.includes(word)) {
            return "quiz-button-disabled"
        } else if (word === selectedWord || word === selectedTranslation) {
            return "quiz-button-selected"
        } else {
            return "quiz-button"
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
                        exerciseWords.map(word => (<button disabled={correctWords.includes(word)} id={"word-" + word} onClick={() => {
                            if (selectedWord === word || correctWords.includes(word)) {
                                setSelectedWord(null)
                            } else {
                                setSelectedWord(word)
                            }
                        }} className={getClassName(word)} key={word}>
                            {word}
                        </button>))
                    }
                </div>
                <div className={"quiz-column"}>
                    {
                        exerciseTranslations.map(word => (<button disabled={correctWords.includes(word)} id={"translation-" + word} onClick={() => {
                            if (selectedTranslation === word || correctWords.includes(word)) {
                                setSelectedTranslation(null)
                            } else {
                                setSelectedTranslation(word)
                            }
                        }} className={getClassName(word)} key={word.toString()}>
                            {word}
                        </button>))
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
                <button disabled={true} className={"exercise-button exercise-button-neutral"}>Continue</button>
            </div>
        </div>
    );
}

TranslationQuizFragment.propTypes = {
    exercise: PropTypes.object.isRequired,
    mistakeIndex: PropTypes.number.isRequired,
    fragmentIndex: PropTypes.number.isRequired,
    onExerciseComplete: PropTypes.func.isRequired,
    phraseId: PropTypes.string.isRequired,
    fallbackEvent: PropTypes.object,
    isPreviousMistake: PropTypes.bool
}

export default TranslationQuizFragment;