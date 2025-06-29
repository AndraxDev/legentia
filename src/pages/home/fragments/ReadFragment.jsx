import React from 'react';
import PropTypes from "prop-types";

function ReadFragment({onNewIntent}) {
    return (
        <div className={"fragment"}>
            <h2 className={"activity-title"}>Read</h2>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <button className={"exercise-button exercise-button-neutral"} onClick={() => {
                    onNewIntent("read");
                }}>
                    Open demo article
                </button>
            </div>
        </div>
    );
}

ReadFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default ReadFragment;