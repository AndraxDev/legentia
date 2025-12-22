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
import InteractiveWordHard from "../../../components/interactive-phrase/InteractiveWordHard.jsx";
import PropTypes from "prop-types";
import * as StringUtils from "../../util/StringUtils.jsx";
import Close from "@mui/icons-material/Close";
import Info from "@mui/icons-material/Info";

function HardTranslationChallengeFragment({exercise, fragmentIndex, onExerciseComplete, fallbackEvent, isPreviousMistake, resultPreCallback}) {
    const [currentAnswer, setCurrentAnswer] = React.useState("");
    const [answerStatus, setAnswerStatus] = React.useState("neutral");

    useEffect(() => {
        resetAnswerResult()
        // setAnswerVariants(createExercise().variants.sort(() => Math.random() - 0.5))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fallbackEvent]);

    const checkAnswer = () => {
        console.log("-".repeat(30))
        console.log(StringUtils.clearWord(currentAnswer.toString().toLowerCase().trim()))
        let isCorrect = currentAnswer.toString().toLowerCase().trim() === exercise.latin.toString().toLowerCase().trim() ||
            StringUtils.clearWord(currentAnswer.toString().toLowerCase().trim()) === StringUtils.clearWord(exercise.latin.toString().toLowerCase().trim());

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
            <h2 className={"exercise-title"}>Interpreto hoc verbum</h2>
            {isPreviousMistake ? <div style={{
                display: "flex",
            }}><div className={"previous-mistake"}><Close /><span className={"previous-mistake-label"}>Prior error</span></div></div> : <div style={{
                display: "flex",
            }}><div className={"previous-mistake"}><Info /><span className={"previous-mistake-label"}>Pensum durum</span></div></div>}
            <div className={"exercise-phrase-box"}>
                <InteractiveWordHard word={exercise.english}/>
            </div>
            <div style={{
                padding: "0 24px",
                height: "300px"
            }}>
                <textarea value={currentAnswer} onChange={(e) => {
                    setCurrentAnswer(e.target.value);
                }} className={"input"} style={{
                    height: "calc(100% - 38px)",
                }}></textarea>
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
                <b className={"exercise-hint text-answer-incorrect"}>{exercise.latin}</b>
                <br/>
                <button className={"exercise-button exercise-button-incorrect"} onClick={onContinueClicked}>Pergere</button>
            </div>
            <div className={"exercise-bottom-bar"}>
                <button disabled={currentAnswer.length === 0} className={"exercise-button " + ((currentAnswer.length === 0) ? "exercise-button-disabled" : "exercise-button-neutral")} onClick={checkAnswer}>Reperi</button>
            </div>
        </div>
    );
}

HardTranslationChallengeFragment.propTypes = {
    exercise: PropTypes.object.isRequired,
    fragmentIndex: PropTypes.number.isRequired,
    onExerciseComplete: PropTypes.func.isRequired,
    fallbackEvent: PropTypes.string,
    isPreviousMistake: PropTypes.bool,
    resultPreCallback: PropTypes.func
}

export default HardTranslationChallengeFragment;
