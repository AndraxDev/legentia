/***************************************************************************
 * Copyright (c) 2025 Dmytro Ostapenko. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * *************************************************************************/

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
                    <button className={"exercise-back"} onClick={() => {
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
