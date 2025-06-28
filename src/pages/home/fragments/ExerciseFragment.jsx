import React from 'react';
import PropTypes from "prop-types";
import InteractivePhrase from "../../../components/interactive-phrase/InteractivePhrase";

// Exercise structure:
// Translation exercise consists of a phrase and a set of translations.
// variants are the answer words variants that phrase can contain.
// Usually, variants contain more words that the phrase, or the similar, but not correct form of the word to train
// words recognition. In this demo, no extra words are used, but in real exercises, they can be used.
// Translations variants are tha all possible correct translations of the phrase. Sometimes, word order can be different,
// so the translations can contain different word order, but the same words.
// For technical reasons, the correct translation answers contains no delimiter or punctuation marks to make it easier to parse.
// On the other hand, original phrase contains punctuation marks and delimiters, so the user can see the correct form of the phrase.
const exerciseDemo = {
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
        "In bibliotheca proxima legere tacite volo",
        "In proxima bibliotheca legere tacite volo",
        "In bibliotheca proxima tacite legere volo",
        "In proxima bibliotheca tacite legere volo",
    ]
}

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

function ExerciseFragment({fragmentIndex, onExerciseComplete, phraseId}) {

    const [currentAnswer, setCurrentAnswer] = React.useState([]);

    const createExercise = () => {
        // CreateExercise is the unified interface for seamless transition between testing and real data.
        // Adapt this function to create exercises based on the fragmentIndex or phraseId.
        return exerciseDemo;
    }

    const checkAnswer = () => {

    }

    return (
        <div>
            <h2 className={"exercise-title"}>{getExerciseTitle(createExercise().exerciseType)}</h2>
            <div className={"exercise-phrase-box"}>
                <InteractivePhrase phrase={createExercise().phrase} translation={createExercise().translationsMap} isHardMode={createExercise().isHard} />
            </div>
            <div className={"exercise-input-box"}>
                {
                    currentAnswer.map((variant, index) => (<button className={"answer-word"} key={variant} onClick={() => {
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
                    createExercise().variants.filter(v => !currentAnswer.includes(v)).map((variant, index) => (<button className={"answer-word"} key={variant} onClick={() => {
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
            <div>

            </div>
            <div>

            </div>
            <div className={"exercise-bottom-bar"}>
                <button className={"exercise-button exercise-button-neutral"} onClick={checkAnswer}>Check</button>
            </div>
        </div>
    );
}

ExerciseFragment.propTypes = {
    fragmentIndex: PropTypes.number.isRequired,
    onExerciseComplete: PropTypes.func.isRequired,
    phraseId: PropTypes.string.isRequired
}

export default ExerciseFragment;