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
import InteractivePhrase from "../../../components/interactive-phrase/InteractivePhrase";
import Cancel from "@mui/icons-material/Cancel";

const getExerciseTitle = (exerciseType) => {
    return "Interpreto hoc sententiam";
    // switch (exerciseType) {
    //     case "en-lat-translation":
    //         return "Translate the following sentence to Latin";
    //     case "lat-en-translation":
    //         return "Translate the following sentence to English";
    //     default:
    //         return "Unknown exercise type";
    // }
}

function ExerciseFragment({exercise, fragmentIndex, onExerciseComplete, fallbackEvent, isPreviousMistake, resultPreCallback}) {

    const [currentAnswer, setCurrentAnswer] = React.useState([]);
    const [answerStatus, setAnswerStatus] = React.useState("neutral");

    const createExercise = () => {
        // CreateExercise is the unified interface for seamless transition between testing and real data.
        // Adapt this function to create exercises based on the fragmentIndex or phraseId.
        return exercise;
    }

    const [answerVariants, setAnswerVariants] = useState(createExercise().variants);

    useEffect(() => {
        setAnswerVariants(createExercise().variants.sort(() => Math.random() - 0.5));
    }, [exercise]);

    useEffect(() => {
        resetAnswerResult()
        // setAnswerVariants(createExercise().variants.sort(() => Math.random() - 0.5))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fallbackEvent]);

    const checkAnswer = () => {
        let userAnswer = currentAnswer.join(" ").toString().toLowerCase().trim();
        let correctAnswers = createExercise().translations;
        let isCorrect = correctAnswers.some(answer => answer.toLowerCase() === userAnswer);

        if (isCorrect) {
            checkAsCorrect();
        } else {
            checkAsIncorrect();
        }
    }

    const checkAsCorrect = () => {
        document.getElementById("correct").style.transform = "translateY(100%)";
        document.getElementById("incorrect").style.transform = "translateY(100%)";
        document.getElementById("correct").style.transform = "translateY(0)";
        setAnswerStatus("correct");
        resultPreCallback?.(true);
    }

    const checkAsIncorrect = () => {
        document.getElementById("correct").style.transform = "translateY(100%)";
        document.getElementById("incorrect").style.transform = "translateY(100%)";
        document.getElementById("incorrect").style.transform = "translateY(0)";
        setAnswerStatus("incorrect");
        resultPreCallback?.(false);
    }

    const resetAnswerResult = () => {
        document.getElementById("correct").style.transform = "translateY(100%)";
        document.getElementById("incorrect").style.transform = "translateY(100%)";
        setAnswerStatus("neutral");
        setCurrentAnswer([]);

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

    const onContinueClicked = () => {
        onExerciseComplete(fragmentIndex, answerStatus === "correct", exercise);
    }

    return (
        <div id={"exercise-fragment-root"} style={{
            opacity: "0"
        }}>
            <h2 className={"exercise-title"}>{getExerciseTitle(createExercise().exerciseType)}</h2>
            {isPreviousMistake ? <div style={{
                display: "flex",
            }}><div className={"previous-mistake"}><Cancel /><span className={"previous-mistake-label"}>Prior error</span></div></div> : null}
            <div className={"exercise-phrase-box"}>
                <InteractivePhrase phrase={createExercise().phrase} translation={createExercise().translationsMap} isHardMode={createExercise().isHard} />
            </div>
            <div className={"exercise-input-box"}>
                {
                    currentAnswer.map((variant) => (<button className={"answer-word-" + answerStatus} key={variant} onClick={() => {
                        if (answerStatus !== "neutral") return;
                        let newAnswer = [...currentAnswer];
                        newAnswer = newAnswer.filter((v) => v !== variant);
                        setCurrentAnswer(newAnswer);
                    }}>
                        {variant}
                    </button>))
                }
            </div>
            <div className={"exercise-answers-box"}>
                {
                    answerVariants.map((variant) => (<button className={currentAnswer.includes(variant) ? "answer-word-neutral-used" : "answer-word-neutral"} key={variant} onClick={() => {
                        if (answerStatus !== "neutral") return;
                        let newAnswer = [...currentAnswer];

                        if (!newAnswer.includes(variant)) {
                            newAnswer.push(variant);
                        }

                        setCurrentAnswer(newAnswer);
                    }}>
                        {variant}
                    </button>))
                }
            </div>
            <div style={{
                transform: "translateY(100%)",
            }} id={"correct"} className={"exercise-result-box"}>
                <h3 className={"exercise-status text-answer-correct"}>Recte!</h3>
                <br/>
                <button className={"exercise-button exercise-button-correct"} onClick={onContinueClicked}>Pergere</button>
            </div>
            <div style={{
                transform: "translateY(100%)",
            }} id={"incorrect"} className={"exercise-result-box"}>
                <h3 className={"exercise-status text-answer-incorrect"}>Falsum est!</h3>
                <br/>
                <p className={"exercise-hint text-answer-incorrect"}>Responsum correctum est:</p>
                <b className={"exercise-hint text-answer-incorrect"}>{createExercise().translations[0]}</b>
                <br/>
                <button className={"exercise-button exercise-button-incorrect"} onClick={onContinueClicked}>Pergere</button>
            </div>
            <div className={"exercise-bottom-bar"}>
                <button disabled={currentAnswer.length === 0} className={"exercise-button " + ((currentAnswer.length === 0) ? "exercise-button-disabled" : "exercise-button-neutral")} onClick={checkAnswer}>Reperi</button>
            </div>
        </div>
    );
}

ExerciseFragment.propTypes = {
    exercise: PropTypes.object.isRequired,
    fragmentIndex: PropTypes.number.isRequired,
    onExerciseComplete: PropTypes.func.isRequired,
    fallbackEvent: PropTypes.number.isRequired,
    isPreviousMistake: PropTypes.bool,
    resultPreCallback: PropTypes.func.isRequired
}

export default ExerciseFragment;
