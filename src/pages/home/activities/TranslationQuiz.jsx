import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import ExerciseFragment from "../fragments/ExerciseFragment";
import AppScreenFade from "../../AppScreenFade";
import PracticeCompleted from "../fragments/PracticeCompleted";
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";
import {MaterialDialog} from "../../../components/MaterialDialog";
import TranslationQuizFragment from "../fragments/TranslationQuizFragment";

// Exercise structure:
// Translation exercise consists of a phrase and a set of translations.
// variants are the answer words variants that phrase can contain.
// Usually, variants contain more words that the phrase, or the similar, but not correct form of the word to train
// words recognition. In this demo, no extra words are used, but in real exercises, they can be used.
// Translations variants are tha all possible correct translations of the phrase. Sometimes, word order can be different,
// so the translations can contain different word order, but the same words.
// For technical reasons, the correct translation answers contains no delimiter or punctuation marks to make it easier to parse.
// On the other hand, original phrase contains punctuation marks and delimiters, so the user can see the correct form of the phrase.
const quizDemo1 = {
    "uno": "one",
    "duo": "two",
    "tres": "three",
    "bibliotheca": "library",
    "proxima": "near",
}


const quizDemo2 = {
    "salve": "hello",
    "quis": "who",
    "quid": "what",
    "hoc": "this",
    "vir": "man",
}

const quizDemo3 = {
    "puer": "boy",
    "puella": "girl",
    "iuvenes": "young man",
    "patella": "plate",
    "ventus": "wind",
}

const quizDemo4 = {
    "umbra": "shadow",
    "imber": "rain",
    "arbor": "tree",
    "paena": "punishemnt",
    "ius": "right",
}

let fragmentIndex = 0;
let mistakeIndex = 0;
let streak = 0;
let time = 0;
let practiceIsCompleteExternal = false;
const mistakeIndices = [];

const exerciseSession = [quizDemo1, quizDemo2, quizDemo3, quizDemo4];

function TranslationQuiz({onNewIntent}) {

    const [successfulCompletions, setSuccessfulCompletions] = React.useState(0);
    const [progress, setProgress] = React.useState(10);
    const [currentExercise, setCurrentExercise] = React.useState(exerciseSession[0]);
    const [fallbackEvent, setFallbackEvent] = React.useState(0);
    const [exitDialogOpened, setExitDialogOpened] = React.useState(false);
    const [practiceIsComplete, setPracticeIsComplete] = React.useState(false);
    const [mistakesCount, setMistakesCount] = React.useState(0);

    const timer = () => {
        if (!practiceIsCompleteExternal) {
            setTimeout(() => {
                time++;
                timer()
            }, 1000)
        }
    }

    useEffect(() => {
        timer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onExerciseComplete = (fi, isSuccessful, thisExercise, mistakes) => {
        setMistakesCount(mistakesCount + mistakes);
        if (isSuccessful) {
            setSuccessfulCompletions(successfulCompletions + 1);
            setProgress(90 / exerciseSession.length * (successfulCompletions + 1));
        } else if (fragmentIndex < exerciseSession.length) {
            mistakeIndices.push(fragmentIndex);
        }

        streak = isSuccessful ? streak + 1 : 0;

        if (isSuccessful && successfulCompletions >= exerciseSession.length - 1) {
            setProgress(100);
            console.log("Practice completed!");
            showSuccessScreen()
        } else if (fragmentIndex >= exerciseSession.length - 1) {
            if (fragmentIndex > exerciseSession.length - 1) {
                if (isSuccessful) {
                    mistakeIndex++;
                }
                if (mistakeIndex <= mistakeIndices.length - 1) {
                    setCurrentExercise(exerciseSession[mistakeIndices[mistakeIndex]]);
                } else {
                    setCurrentExercise(thisExercise);
                }
            } else {
                if (mistakeIndex <= mistakeIndices.length - 1) {
                    setCurrentExercise(exerciseSession[mistakeIndices[mistakeIndex]]);
                } else {
                    setCurrentExercise(thisExercise);
                }

                if (isSuccessful) {
                    mistakeIndex++;
                }
            }

            // Change index to reset exercise state
            fragmentIndex = fragmentIndex + 1;
        } else {
            fragmentIndex = fragmentIndex + 1;
            setCurrentExercise(exerciseSession[fragmentIndex]);
        }

        setFallbackEvent(fallbackEvent + 1);
        console.log("Current streak: " + streak);
    }

    const showSuccessScreen = () => {
        practiceIsCompleteExternal = true;
        setPracticeIsComplete(true);
    }

    const quitExercise = () => {
        onNewIntent("/home/1")
    }

    return (
        <AppScreenFade>
            <MaterialDialog
                open={exitDialogOpened}
                onClose={() => setExitDialogOpened(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Quit practice session?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        All progress in this session will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setExitDialogOpened(false);
                    }}>Cancel</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setExitDialogOpened(false);
                        quitExercise();
                    }} autoFocus>
                        Quit
                    </MaterialButtonDialogFilled>
                </DialogActions>
            </MaterialDialog>
            <div className="exercise-background">
                {/* TODO: Remove hardcoded ids */}
                {
                    !practiceIsComplete ? <>
                        <div className={"exercise-header"}>
                            <button className={"exercise-close"} onClick={() => {
                                setExitDialogOpened(true);
                            }}><span className={"material-symbols-outlined"}>close</span></button>
                            <div className={"progress-background"}>
                                <div style={{
                                    width: `calc(${progress}% - 12px)`
                                }} className={"progress-foreground"}>
                                    <div className={"progress-foreground2"} />
                                </div>
                            </div>
                        </div>
                        <TranslationQuizFragment isPreviousMistake={fragmentIndex > exerciseSession.length - 1} fallbackEvent={fallbackEvent} exercise={currentExercise} mistakeIndex={mistakeIndex} fragmentIndex={fragmentIndex} onExerciseComplete={onExerciseComplete} phraseId={"00000000-0000-0000-0000-000000000000"} />
                    </> : <PracticeCompleted onNewIntent={onNewIntent} flawless={mistakeIndices.length === 0} time={time} mistakesCount={mistakesCount} />
                }
            </div>
        </AppScreenFade>
    );
}

TranslationQuiz.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default TranslationQuiz;