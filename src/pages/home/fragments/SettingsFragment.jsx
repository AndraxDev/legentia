import React from 'react';
import PropTypes from "prop-types";

// onNewIntent is analog to android.content.Context.java in Android OS. It is passed hierarchically through all
// components that need to access base application to handle activity launching.
function SettingsFragment({onNewIntent}) {
    return (
        <div className={"fragment"}>
            <h2 className={"activity-title"}>Settings</h2>
            <button onClick={() => onNewIntent("openai")} >Edit AI API Key</button>
            <button onClick={() => {
                localStorage.removeItem("vocabulary");
                window.location.reload();
            }} >Clear vocabulary</button>

        </div>
    );
}

SettingsFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default SettingsFragment;