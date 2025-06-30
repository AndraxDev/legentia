import React from 'react';
import PropTypes from 'prop-types';

WordsActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
};

function WordsActivity({onNewIntent}) {
    const onBackPressed = () => {
        onNewIntent("/home/1")
    }

    return (
        <div>
            <div className={"exercise-header"}>
                <button className={"exercise-close"} onClick={() => {
                    onBackPressed()
                }}><span className={"material-symbols-outlined"}>arrow_back</span></button>
                <h2 style={{
                    textAlign: "start"
                }} className={"article-title"}>Practice words</h2>
            </div>
        </div>
    );
}

export default WordsActivity;