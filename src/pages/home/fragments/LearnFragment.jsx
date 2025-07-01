import React from 'react';
import PropTypes from "prop-types";

function LearnFragment({onNewIntent}) {
    return (
        <div className={"fragment"}>
            <h2 className={"activity-title"}>Learn</h2>
            <div style={{
                width: "calc(100% - 6px - 48px - 32px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                border: "3px solid #424242",
                borderRadius: "24px",
                margin: "24px",
                padding: "16px",
            }}>
                <h3 style={{
                    margin: "0",
                    userSelect: "none",
                }}>Demo content (debug)</h3>
                <button style={{
                    width: "calc(100% - 8px)",
                }} className={"exercise-button exercise-button-neutral"} onClick={() => {
                    onNewIntent("exercise");
                }}>
                    Start demo practice session
                </button>
            </div>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px"
            }}>
                <button className={"exercise-button exercise-button-neutral"} onClick={() => {
                    onNewIntent("practicewords");
                }}>
                    Practice words
                </button>
            </div>
        </div>
    );
}

LearnFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default LearnFragment;