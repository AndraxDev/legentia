import React from 'react';
import PropTypes from "prop-types";
import ExerciseFragment from "../fragments/ExerciseFragment";
import AppScreenFade from "../../AppScreenFade";

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
const mistakeIndices = [];

const exerciseSession = [exerciseDemo1, exerciseDemo2, exerciseDemo3];

function ExerciseActivity({onNewIntent}) {

    const [successfulCompletions, setSuccessfulCompletions] = React.useState(0);
    const [progress, setProgress] = React.useState(10);
    const [currentExercise, setCurrentExercise] = React.useState(exerciseSession[0]);
    const [fallbackEvent, setFallbackEvent] = React.useState(0);

    const onExerciseComplete = (fi, isSuccessful, thisExercise) => {
        if (isSuccessful) {
            setSuccessfulCompletions(successfulCompletions + 1);
            setProgress(90 / exerciseSession.length * (successfulCompletions + 1));
        } else if (fragmentIndex < exerciseSession.length) {
            mistakeIndices.push(fragmentIndex);
        }

        if (isSuccessful && successfulCompletions >= exerciseSession.length - 1) {
            setProgress(100);
            console.log("Practice completed!");
            showSuccessScreen()
        } else if (fragmentIndex >= exerciseSession.length - 1) {
            if (fragmentIndex > exerciseSession.length - 1) {
                if (isSuccessful) {
                    mistakeIndex++;
                    console.log("Mistake index incremented to: " + mistakeIndex);
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
                    console.log("Mistake index incremented to: " + mistakeIndex);
                }
            }

            // Change index to reset exercise state
            fragmentIndex = fragmentIndex + 1;
        } else {
            fragmentIndex = fragmentIndex + 1;
            setCurrentExercise(exerciseSession[fragmentIndex]);
        }

        setFallbackEvent(fallbackEvent + 1);
        console.log(mistakeIndices);
        console.log(fragmentIndex, mistakeIndex, successfulCompletions, exerciseSession.length);
    }

    const showSuccessScreen = () => {

    }

    return (
        <AppScreenFade>
            <div className="exercise-background">
                {/* TODO: Remove hardcoded ids */}
                <div className={"exercise-header"}>
                    <button className={"exercise-close"}><span className={"material-symbols-outlined"}>close</span></button>
                    <div className={"progress-background"}>
                        <div style={{
                            width: `calc(${progress}% - 12px)`
                        }} className={"progress-foreground"}>
                            <div className={"progress-foreground2"} />
                        </div>
                    </div>
                </div>
                <ExerciseFragment fallbackEvent={fallbackEvent} exercise={currentExercise} mistakeIndex={mistakeIndex} fragmentIndex={fragmentIndex} onExerciseComplete={onExerciseComplete} phraseId={"00000000-0000-0000-0000-000000000000"} />
            </div>
        </AppScreenFade>
    );
}

ExerciseActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default ExerciseActivity;