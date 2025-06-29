import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import InteractivePhrase from "../../../components/interactive-phrase/InteractivePhrase";

const getExerciseTitle = (exerciseType) => {
    switch (exerciseType) {
        case "en-lat-translation":
            return "Translate the following sentence to Latin";
        case "lat-en-translation":
            return "Translate the following sentence to English";
        default:
            return "Unknown exercise type";
    }
}

function ExerciseFragment({exercise, mistakeIndex, fragmentIndex, onExerciseComplete, phraseId, fallbackEvent, isPreviousMistake}) {

    const [currentAnswer, setCurrentAnswer] = React.useState([]);
    const [answerStatus, setAnswerStatus] = React.useState("neutral");
    const [debugOverlayIsVisible, setDebugOverlayIsVisible] = React.useState(false);

    const createExercise = () => {
        // CreateExercise is the unified interface for seamless transition between testing and real data.
        // Adapt this function to create exercises based on the fragmentIndex or phraseId.
        return exercise;
    }

    useEffect(() => {
        resetAnswerResult()
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
    }

    const checkAsIncorrect = () => {
        document.getElementById("correct").style.transform = "translateY(100%)";
        document.getElementById("incorrect").style.transform = "translateY(100%)";
        document.getElementById("incorrect").style.transform = "translateY(0)";
        setAnswerStatus("incorrect");
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
            }}><div className={"previous-mistake"}><span className={"material-symbols-outlined"}>close</span><span className={"previous-mistake-label"}>Previous mistake</span></div></div> : null}
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
                    createExercise().variants.filter(v => !currentAnswer.includes(v)).map((variant) => (<button className={"answer-word-neutral"} key={variant} onClick={() => {
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
                <h3 className={"exercise-status text-answer-correct"}>Correct!</h3>
                <br/>
                <button className={"exercise-button exercise-button-correct"} onClick={onContinueClicked}>Continue</button>
            </div>
            <div style={{
                transform: "translateY(100%)",
            }} id={"incorrect"} className={"exercise-result-box"}>
                <h3 className={"exercise-status text-answer-incorrect"}>Incorrect!</h3>
                <br/>
                <p className={"exercise-hint text-answer-incorrect"}>Correct answer:</p>
                <b className={"exercise-hint text-answer-incorrect"}>{createExercise().translations[0]}</b>
                <br/>
                <button className={"exercise-button exercise-button-incorrect"} onClick={onContinueClicked}>Continue</button>
            </div>
            <div className={"exercise-bottom-bar"}>
                <button disabled={currentAnswer.length === 0} className={"exercise-button exercise-button-neutral"} onClick={checkAnswer}>Check</button>
            </div>

            {
                debugOverlayIsVisible ? <div className={"debug-panel"}>
                    <button className={"debug-button-overlay"} onClick={checkAsIncorrect}>Debug mark as incorrect</button>
                    <button className={"debug-button-overlay"} onClick={checkAsCorrect}>Debug mark as correct</button>
                    <button className={"debug-button-overlay"} onClick={resetAnswerResult}>Reset result</button>
                </div> : null
            }
        </div>
    );
}

ExerciseFragment.propTypes = {
    exercise: PropTypes.object.isRequired,
    fragmentIndex: PropTypes.number.isRequired,
    mistakeIndex: PropTypes.number.isRequired,
    onExerciseComplete: PropTypes.func.isRequired,
    phraseId: PropTypes.string.isRequired,
    fallbackEvent: PropTypes.number.isRequired,
    isPreviousMistake: PropTypes.bool
}

export default ExerciseFragment;