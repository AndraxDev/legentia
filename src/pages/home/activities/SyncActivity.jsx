import React from 'react';
import PropTypes from "prop-types";
import AppScreenFade from "../../AppScreenFade";

function SyncActivity({onNewIntent}) {
    const onBackPressed = () => {
        onNewIntent("/home/3")
    }

    return (
        <AppScreenFade>
            <div className={"activity-fullscreen"}>
                <div className={"exercise-header"}>
                    <button className={"exercise-back"} onClick={() => {
                        onBackPressed()
                    }}><span className={"material-symbols-outlined"}>arrow_back</span></button>
                    <h2 style={{
                        textAlign: "start"
                    }} className={"article-title"}>Sync settings</h2>
                </div>
                <div className={"list-container"}>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none",
                    }}>
                        // To be implemented...
                    </div>
                </div>
            </div>
        </AppScreenFade>
    );
}

SyncActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default SyncActivity;