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
import {MaterialDialog} from "../../../components/MaterialDialog.jsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton.jsx";
import PracticeCompleted from "../fragments/PracticeCompleted.jsx";
import AppScreenFade from "../../AppScreenFade.jsx";
import HardTranslationChallengeFragment from "../fragments/HardTranslationChallengeFragment.jsx";
import * as Settings from "../../../Settings.jsx";
import {MaterialProgressBar} from "../../../components/MaterialProgressBar.jsx";
import Close from "@mui/icons-material/Close";

let fragmentIndex = 0;
let mistakeIndex = 0;
let streak = 0;
let maxStreak = 0;
let time = 0;
let practiceIsCompleteExternal = false;
const mistakeIndices = [];

let sessionSize = 10; // Number of words in the session

const initializeExercises = () => {
    let weakWords = Settings.getWeakWords();
    let pool = {};

    // Reset exercise
    streak = 0;
    time = 0;
    practiceIsCompleteExternal = false;

    console.log("Streak reset to: " + streak);

    let weakWordsIndexes = Settings.getWeakWordsLearningIndexes()
    let indexesArray = Object.values(weakWordsIndexes);
    let maxIndex = Math.max(...indexesArray);
    let minIndex = Object.keys(weakWords).length > indexesArray.length ? 0 : Math.min(...indexesArray);
    let wordsWidthNotMaxIndex = Object.keys(weakWords).filter(word => Settings.getWordIndex(word) < maxIndex);
    let countNonMaxIndex = wordsWidthNotMaxIndex.length;
    let diff = maxIndex - minIndex;
    let nonUniformSelectionIsEnabled = diff > 0;
    let diffNormalized = nonUniformSelectionIsEnabled ? (1 - Settings.getAlpha()) / diff : 0;
    let needToSelect = sessionSize - countNonMaxIndex;

    console.log("Probability alpha: " + Settings.getAlpha());
    console.log("Need to select: " + needToSelect);
    console.log("Count max index: " + countNonMaxIndex);

    // Unstuck algorithm in case if successful word selection is impossible
    if (needToSelect > 0 && nonUniformSelectionIsEnabled && Settings.getAlpha() === 0) {
        console.log("Enabling uniform selection for words with minimal indexes and non-uniform selection for the remaining words.")

        // console.log(pool);
        // console.log(wordsWidthNotMaxIndex);

        // Prioritizing words with lower indexes
        for (let i = 0; i < countNonMaxIndex; i++) {
            if (wordsWidthNotMaxIndex[i] !== undefined && wordsWidthNotMaxIndex[i] !== "undefined") {
                pool[wordsWidthNotMaxIndex[i]] = weakWords[wordsWidthNotMaxIndex[i]];
            }
        }

        // console.log(pool);

        // Then fill the exercise pool with remaining words
        if (needToSelect > 0) {
            for (let i = 0; i < needToSelect; i++) {
                const randomIndex = Math.floor(Math.random() * Object.keys(weakWords).length);
                let word = Object.keys(weakWords)[randomIndex];

                while (word === undefined || word === "undefined" || pool[word]) {
                    // Ensure unique words in the pool
                    const newIndex = Math.floor(Math.random() * Object.keys(weakWords).length);
                    word = Object.keys(weakWords)[newIndex];
                }

                if (word !== undefined && word !== "undefined") pool[word] = weakWords[word];
            }
        }

        console.log(pool)
    } else if (Object.keys(weakWords).length < sessionSize) {
        pool = weakWords;
    } else {
        for (let i = 0; i < sessionSize; i++) {
            const randomIndex = Math.floor(Math.random() * Object.keys(weakWords).length);
            let word = Object.keys(weakWords)[randomIndex];

            // Never access indexes directly, as them may not be set or can contain NaN value.
            // Settings handles these cases safely and returns 0 in case of missing or invalid index.
            let wordIndex = Settings.getWordIndex(word);
            let wordIndexNormalized = (wordIndex - minIndex) * diffNormalized;
            let probabilityOfOccurrence = ((1 - Settings.getAlpha()) - wordIndexNormalized) + Settings.getAlpha();

            // console.log("Probability of occurrence for word '" + word + "': " + probabilityOfOccurrence, " Index: " + wordIndex + ", Normalized index: " + wordIndexNormalized);

            let randomValue = Math.random();

            let unsuccessfulIterations = 0;

            while (pool[word] || (randomValue > probabilityOfOccurrence && nonUniformSelectionIsEnabled)) {
                if (unsuccessfulIterations >= Object.keys(weakWords).length) {
                    // Unstuck algorithm in case if successful word selection is impossible
                    nonUniformSelectionIsEnabled = true;
                }

                // Ensure unique words in the pool
                const newIndex = Math.floor(Math.random() * Object.keys(weakWords).length);
                word = Object.keys(weakWords)[newIndex];

                wordIndex = Settings.getWordIndex(word);
                wordIndexNormalized = (wordIndex - minIndex) * diffNormalized;
                probabilityOfOccurrence = ((1 - Settings.getAlpha()) - wordIndexNormalized) + Settings.getAlpha();
                randomValue = Math.random();
                unsuccessfulIterations++;
            }

            pool[word] = weakWords[word];
        }
    }

    let session = [];

    Object.keys(pool).forEach(key => {
        session.push({
            english: pool[key],
            latin: key,
        });
    })

    console.log("EXERCISE SESSION:")
    console.log(session);

    return session;
}

let exerciseSession = [];

function WordTranslationChallengeHardActivity({onNewIntent}) {
    const [successfulCompletions, setSuccessfulCompletions] = React.useState(0);
    const [progress, setProgress] = React.useState(10);
    const [fallbackEvent, setFallbackEvent] = React.useState(0);
    const [exitDialogOpened, setExitDialogOpened] = React.useState(false);
    const [practiceIsComplete, setPracticeIsComplete] = React.useState(false);
    const [isInitialized, setIsInitialized] = React.useState(false);
    const [currentExercise, setCurrentExercise] = React.useState(isInitialized ? exerciseSession[0] : {});

    useEffect(() => {
        exerciseSession = initializeExercises();
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            setCurrentExercise(exerciseSession[0]);
        }
    }, [isInitialized]);

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
        onNewIntent("/practicewords")
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
                    {"Sessionem Excercitationes relinquere vis?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        Omnis progressus in hac sessione peribit.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setExitDialogOpened(false);
                    }} autoFocus>Oblitera</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setExitDialogOpened(false);
                        quitExercise();
                    }}>
                        Exique
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
                            }}><Close /></button>
                            <div className={"progress-background"}>
                                <div style={{
                                    width: `calc(${progress}% - 12px)`
                                }} className={"progress-foreground"}>
                                    <div className={"progress-foreground2"} />
                                </div>
                            </div>
                        </div>
                        {
                            isInitialized ? <HardTranslationChallengeFragment
                                isPreviousMistake={fragmentIndex > exerciseSession.length - 1}
                                fallbackEvent={fallbackEvent}
                                exercise={currentExercise}
                                fragmentIndex={fragmentIndex}
                                onExerciseComplete={onExerciseComplete}
                                resultPreCallback={onAnswerPreCallback} /> : <MaterialProgressBar />
                        }
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

WordTranslationChallengeHardActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default WordTranslationChallengeHardActivity;
