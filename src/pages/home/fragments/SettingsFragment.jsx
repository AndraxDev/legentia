import React from 'react';
import PropTypes from "prop-types";
import packageJson from './../../../../package.json';

// onNewIntent is analog to android.content.Context.java in Android OS. It is passed hierarchically through all
// components that need to access base application to handle activity launching.
function SettingsFragment({onNewIntent}) {


    return (
        <div className={"fragment"}>
            <h2 className={"activity-title"}>Settings</h2>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px"
            }}>
                <button className={"exercise-button exercise-button-neutral"} onClick={() => onNewIntent("openai")} >Edit AI API Key (debug)</button>
                <button className={"exercise-button exercise-button-neutral"} onClick={() => onNewIntent("privacy")} >Data Controls</button>
            </div>
            <div style={{
                height: "24px",
            }} />
            <p className={"app-info"}>Legentia version {packageJson.version}</p>
            <p className={"app-info"}>Developer: <a className={"link"} href={"https://andrax.dev"}>AndraxDev</a></p>
        </div>
    );
}

SettingsFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default SettingsFragment;