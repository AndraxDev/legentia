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
import AppScreenFade from "../../AppScreenFade";
import PracticeCompleted from "../fragments/PracticeCompleted";
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";
import {MaterialDialog} from "../../../components/MaterialDialog";
import TranslationQuizFragment from "../fragments/TranslationQuizFragment";
import * as Settings from "../../../Settings";

let fragmentIndex = 0;
let mistakeIndex = 0;
let streak = 0;
let time = 0;
let practiceIsCompleteExternal = false;
let maxCombo = 0;
const mistakeIndices = [];

function TranslationQuiz({onNewIntent}) {

    const initializeExercises = () => {
        let weakWords = Settings.getWeakWords();
        let pool = {};

        if (Object.keys(weakWords).length < 15) {
            pool = weakWords;
        } else {
            for (let i = 0; i < 15; i++) {
                const randomIndex = Math.floor(Math.random() * Object.keys(weakWords).length);
                let word = Object.keys(weakWords)[randomIndex];

                while (pool[word]) {
                    // Ensure unique words in the pool
                    const newIndex = Math.floor(Math.random() * Object.keys(weakWords).length);
                    word = Object.keys(weakWords)[newIndex];
                }

                pool[word] = weakWords[word];
            }
        }

        const entries = Object.entries(pool);
        const exercises = [];

        for (let i = 0; i < entries.length; i += 5) {
            const chunk = entries.slice(i, i + 5);
            exercises.push(Object.fromEntries(chunk));
        }

        return exercises;
    }

    const [exercises, ] = useState(initializeExercises());
    const [successfulCompletions, setSuccessfulCompletions] = React.useState(0);
    const [progress, setProgress] = React.useState(10);
    const [currentExercise, setCurrentExercise] = React.useState(exercises[0]);
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

    const onExerciseComplete = (fi, isSuccessful, thisExercise, mistakes, localStreak) => {
        setMistakesCount(mistakesCount + mistakes);
        if (isSuccessful) {
            setSuccessfulCompletions(successfulCompletions + 1);
            setProgress(90 / exercises.length * (successfulCompletions + 1));
        } else if (fragmentIndex < exercises.length) {
            mistakeIndices.push(fragmentIndex);
        }

        if (mistakes > 0) {
            streak = localStreak;
        } else {
            streak += localStreak;
        }

        if (streak > maxCombo) {
            maxCombo = streak;
        }

        if (isSuccessful && successfulCompletions >= exercises.length - 1) {
            setProgress(100);
            console.log("Practice completed!");
            showSuccessScreen()
        } else if (fragmentIndex >= exercises.length - 1) {
            if (fragmentIndex > exercises.length - 1) {
                if (isSuccessful) {
                    mistakeIndex++;
                }
                if (mistakeIndex <= mistakeIndices.length - 1) {
                    setCurrentExercise(exercises[mistakeIndices[mistakeIndex]]);
                } else {
                    setCurrentExercise(thisExercise);
                }
            } else {
                if (mistakeIndex <= mistakeIndices.length - 1) {
                    setCurrentExercise(exercises[mistakeIndices[mistakeIndex]]);
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
            setCurrentExercise(exercises[fragmentIndex]);
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
                    }} autoFocus>Cancel</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setExitDialogOpened(false);
                        quitExercise();
                    }}>
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
                        <TranslationQuizFragment isPreviousMistake={fragmentIndex > exercises.length - 1} fallbackEvent={fallbackEvent} exercise={currentExercise} mistakeIndex={mistakeIndex} fragmentIndex={fragmentIndex} onExerciseComplete={onExerciseComplete} phraseId={"00000000-0000-0000-0000-000000000000"} />
                    </> : <PracticeCompleted onNewIntent={onNewIntent} flawless={mistakesCount === 0} time={time} mistakesCount={mistakesCount} streak={maxCombo} />
                }
            </div>
        </AppScreenFade>
    );
}

TranslationQuiz.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default TranslationQuiz;
