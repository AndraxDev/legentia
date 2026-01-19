/***************************************************************************
 * Copyright (c) 2025-2026 Dmytro Ostapenko. All rights reserved.
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
import ExerciseFragment from "../fragments/ExerciseFragment";
import AppScreenFade from "../../AppScreenFade";
import PracticeCompleted from "../fragments/PracticeCompleted";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";
import {MaterialDialog} from "../../../components/MaterialDialog";
import Cancel from "@mui/icons-material/Cancel";
import {getLocalizedString} from "../../../strings/GetString.jsx";

// Exercise structure:
// Translation exercise consists of a phrase and a set of translations.
// variants are the answer words variants that phrase can contain.
// Usually, variants contain more words that the phrase, or the similar, but not correct form of the word to train
// words recognition. In this demo, no extra words are used, but in real exercises, they can be used.
// Translations variants are tha all possible correct translations of the phrase. Sometimes, word order can be different,
// so the translations can contain different word order, but the same words.
// For technical reasons, the correct translation answers contains no delimiter or punctuation marks to make it easier to parse.
// On the other hand, original phrase contains punctuation marks and delimiters, so the user can see the correct form of the phrase.
const exerciseDemo1 = {
    exerciseType: "en-lat-translation",
    phrase: "I want to read quietly in the nearest library.",
    isHard: false,
    translationsMap: [
        ["Ego"],
        ["volo"],
        ["to ... read", "legere"],
        ["to ... read", "legere"],
        ["tacite"],
        ["in"],
        ["the ... library", "bibliotheca"],
        ["proxima"],
        ["the ... library", "bibliotheca"]
    ],
    variants: [
        "In", "bibliotheca", "proxima", "legere", "tacite", "volo",
    ],
    translations: [
        "in bibliotheca proxima legere tacite volo",
        "in proxima bibliotheca legere tacite volo",
        "in bibliotheca proxima tacite legere volo",
        "in proxima bibliotheca tacite legere volo",
    ]
}

const exerciseDemo2 = {
    exerciseType: "en-lat-translation",
    phrase: "I am half-asleep",
    isHard: false,
    translationsMap: [
        ["Ego"],
        ["sum"],
        ["semisomna"]
    ],
    variants: [
        "Ego", "semisomna", "vir", "sum", "tacite", "candidam",
    ],
    translations: [
        "ego sum semisomna",
        "sum semisomna",
    ]
}

const exerciseDemo3 = {
    exerciseType: "en-lat-translation",
    phrase: "Old men hits the young men violently",
    isHard: false,
    translationsMap: [
        ["Senex"],
        ["senex", "vir"],
        ["pulsat"],
        ["iuvenem"],
        ["iuvenem"],
        ["iuvenem", "vir"],
        ["vehementer"],
    ],
    variants: [
        "senex", "iuvenem", "pulsat", "vehementer", "lectus", "sedere",
    ],
    translations: [
        "senex iuvenem vehementer pulsat",
        "senex iuvenem pulsat vehementer"
    ]
}

let fragmentIndex = 0;
let mistakeIndex = 0;
let streak = 0;
let maxStreak = 0;
let time = 0;
let practiceIsCompleteExternal = false;
const mistakeIndices = [];

const exerciseSession = [exerciseDemo1, exerciseDemo2, exerciseDemo3];

function ExerciseActivity({onNewIntent}) {

    const [successfulCompletions, setSuccessfulCompletions] = React.useState(0);
    const [progress, setProgress] = React.useState(10);
    const [currentExercise, setCurrentExercise] = React.useState(exerciseSession[0]);
    const [fallbackEvent, setFallbackEvent] = React.useState(0);
    const [exitDialogOpened, setExitDialogOpened] = React.useState(false);
    const [practiceIsComplete, setPracticeIsComplete] = React.useState(false);

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

    const onAnswerPreCallback = (isAnswerCorrect) => {
        if (isAnswerCorrect) {
            setProgress((90 / exerciseSession.length * (successfulCompletions + 1)) + 10);
        }
    }

    const onExerciseComplete = (fi, isSuccessful, thisExercise) => {
        if (isSuccessful) {
            setSuccessfulCompletions(successfulCompletions + 1);
        } else if (fragmentIndex < exerciseSession.length) {
            mistakeIndices.push(fragmentIndex);
        }

        streak = isSuccessful ? streak + 1 : 0;

        if (streak > maxStreak) {
            maxStreak = streak;
        }

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
                    {getLocalizedString("exitPracticeSessionAlertTitle")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        {getLocalizedString("exitPracticeSessionAlertContents")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setExitDialogOpened(false);
                    }} autoFocus>{getLocalizedString("btnCancel")}</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setExitDialogOpened(false);
                        quitExercise();
                    }}>
                        {getLocalizedString("btnExit")}
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
                            }}><Cancel /></button>
                            <div className={"progress-background"}>
                                <div style={{
                                    width: `calc(${progress}% - 12px)`
                                }} className={"progress-foreground"}>
                                    <div className={"progress-foreground2"} />
                                </div>
                            </div>
                        </div>
                        <ExerciseFragment
                            isPreviousMistake={fragmentIndex > exerciseSession.length - 1}
                            fallbackEvent={fallbackEvent}
                            exercise={currentExercise}
                            fragmentIndex={fragmentIndex}
                            onExerciseComplete={onExerciseComplete}
                            resultPreCallback={onAnswerPreCallback} />
                    </> : <PracticeCompleted
                        onNewIntent={onNewIntent}
                        flawless={mistakeIndices.length === 0}
                        time={time}
                        mistakesCount={mistakeIndices.length}
                        streak={maxStreak} />
                }
            </div>
        </AppScreenFade>
    );
}

ExerciseActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default ExerciseActivity;
