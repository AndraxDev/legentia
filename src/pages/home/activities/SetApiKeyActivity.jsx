import React from 'react';
import PropTypes from "prop-types";
import AppScreenFade from "../../AppScreenFade";

function SetApiKeyActivity({onNewIntent}) {
    const setApiKey = () => {
        const apiKey = document.getElementById("ai-api-key").value;

        if (apiKey) {
            localStorage.setItem("openai", apiKey);
            alert("API key set successfully!");
            document.getElementById("ai-api-key").value = "";
        } else {
            alert("Please enter a valid API key.");
        }
    }

    const onBackPressed = () => {
        onNewIntent("/home/3")
    }

    return (
        <AppScreenFade>
            <div className={"activity-fullscreen"}>
                <div className={"exercise-header"}>
                    <button className={"exercise-close"} onClick={() => {
                        onBackPressed()
                    }}><span className={"material-symbols-outlined"}>arrow_back</span></button>
                    <h2 style={{
                        textAlign: "start"
                    }} className={"article-title"}>Set AI API key</h2>
                </div>
                <div style={{
                    padding: "24px"
                }}>
                    <div className={"container-debug"}>
                        <p className={"debug-text"}>Debug zone</p>
                        <div className={"debug-space"}></div>
                        <p className={"debug-text"}>Set API key if you want to enable AI features.</p>
                        <div className={"debug-space"}></div>
                        <input className={"debug-field"} id={"ai-api-key"} placeholder={"OpenAI API key"}/>
                        <div className={"debug-space"}></div>
                        <button className={"debug-button"} onClick={setApiKey}>Set debug API key</button>
                    </div>
                </div>
            </div>
        </AppScreenFade>
    );
}

SetApiKeyActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default SetApiKeyActivity;