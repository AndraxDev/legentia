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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";
import {MaterialDialog} from "../../../components/MaterialDialog";
import TranslationQuizFragment from "../fragments/TranslationQuizFragment";
import * as Settings from "../../../Settings";
import Close from "@mui/icons-material/Close";

let streak = 0;
let time = 0;
let practiceIsCompleteExternal = false;
let maxCombo = 0;
let sessionSize = 25; // Number of words in the session

const initializeExercises = () => {
    let weakWords = Settings.getWeakWords();
    let pool = {};

    // Reset exercise
    streak = 0;
    time = 0;
    maxCombo = 0;
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

    const entries = Object.entries(pool);
    const exercises = [];

    for (let i = 0; i < entries.length; i += 5) {
        const chunk = entries.slice(i, i + 5);
        exercises.push(Object.fromEntries(chunk));
    }

    return exercises;
}

function TranslationQuiz({onNewIntent}) {

    const [exercises, setExercises] = useState([]);
    const [successfulCompletions, setSuccessfulCompletions] = React.useState(0);
    const [progress, setProgress] = React.useState(10);
    const [fallbackEvent, setFallbackEvent] = React.useState(0);
    const [exitDialogOpened, setExitDialogOpened] = React.useState(false);
    const [practiceIsComplete, setPracticeIsComplete] = React.useState(false);
    const [mistakesCount, setMistakesCount] = React.useState(0);
    const [fragmentIndex, setFragmentIndex] = React.useState(0);

    useEffect(() => {
        setExercises(initializeExercises())
    }, []);

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

    const onPreCallback = (isAnswerCorrect) => {
        if (isAnswerCorrect) {
            setSuccessfulCompletions(successfulCompletions + 1);
            console.log("Progress: " + ((90 / exercises.length) * (successfulCompletions + 1) + 10));
            setProgress((90 / exercises.length) * (successfulCompletions + 1) + 10);
        }
    }

    const onExerciseComplete = (fi, isSuccessful, thisExercise, mistakes, localStreak) => {
        if (mistakes > 0) {
            streak = localStreak;
        } else {
            streak += localStreak;
        }

        if (streak > maxCombo) {
            maxCombo = streak;
        }

        if (isSuccessful && successfulCompletions >= exercises.length) {
            setProgress(100);
            console.log("Practice completed!");
            showSuccessScreen()
            return;
        }

        setMistakesCount(mistakesCount + mistakes);
        setFragmentIndex(fragmentIndex >= exercises.length - 1 ? exercises.length - 1 : fragmentIndex + 1);

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
                    {"Sessionem exercitationes relinquere vis?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        Omnis progressus in hac sessione peribit!
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
                        {exercises.length > 0 ? <TranslationQuizFragment
                            fallbackEvent={fallbackEvent}
                            exercise={exercises[fragmentIndex]}
                            fragmentIndex={fragmentIndex}
                            onExerciseComplete={onExerciseComplete}
                            resultPreCallback={onPreCallback} /> : null}
                    </> : <PracticeCompleted
                        onNewIntent={onNewIntent}
                        flawless={mistakesCount === 0}
                        time={time}
                        mistakesCount={mistakesCount}
                        streak={maxCombo} />
                }
            </div>
        </AppScreenFade>
    );
}

TranslationQuiz.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default TranslationQuiz;
