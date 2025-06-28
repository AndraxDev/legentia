import React from 'react';
import PropTypes from "prop-types";
import ExerciseFragment from "../fragments/ExerciseFragment";

function ExerciseActivity({onNewIntent}) {
    const [fragmentIndex, setFragmentIndex] = React.useState(0);

    const onExerciseComplete = (fragmentIndex, isSuccessful) => {
        console.log('Exercise completed:', fragmentIndex, 'Is successful:', isSuccessful);
    }

    return (
        <div>
            {/* TODO: Remove hardcoded ids */}
            <div className={"exercise-header"}>
                <button className={"exercise-close"}><span className={"material-symbols-outlined"}>close</span></button>
                <div className={"progress-background"}>
                    <div className={"progress-foreground"}></div>
                </div>
            </div>
            <ExerciseFragment fragmentIndex={fragmentIndex} onExerciseComplete={onExerciseComplete} phraseId={"00000000-0000-0000-0000-000000000000"} />
        </div>
    );
}

ExerciseActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default ExerciseActivity;