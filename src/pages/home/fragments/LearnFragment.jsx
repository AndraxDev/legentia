import React from 'react';
import PropTypes from "prop-types";

function LearnFragment({onNewIntent}) {
    return (
        <div className={"fragment"}>
            <h2 className={"activity-title"}>Learn</h2>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px"
            }}>
                <button className={"exercise-button exercise-button-neutral"} onClick={() => {
                    onNewIntent("exercise");
                }}>
                    Start demo practice session
                </button>
                <button className={"exercise-button exercise-button-neutral"} onClick={() => {
                    onNewIntent("quiz");
                }}>
                    Start demo word quiz
                </button>
            </div>
        </div>
    );
}

LearnFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default LearnFragment;