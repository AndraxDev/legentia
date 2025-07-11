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
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as Settings from "../../../Settings";

function SetApiKeyActivity({onNewIntent}) {

    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [apiKey, setApiKey] = React.useState(localStorage.getItem("openai") || "");

    const saveApiKey = () => {
        const apiKey = document.getElementById("ai-api-key").value;

        if (apiKey) {
            localStorage.setItem("openai", apiKey);
            setSnackbarMessage("API key set successfully!");
        } else {
            localStorage.removeItem("openai");
            setSnackbarMessage("API key unset successfully!");
        }
    }

    const onBackPressed = () => {
        onNewIntent("/home/3")
    }

    const setModel = (model) => {
        Settings.setModel(model);
        setSnackbarMessage(`Model set to ${model} successfully!`);
    }

    return (
        <AppScreenFade>
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={snackbarMessage.trim() !== ""} autoHideDuration={3000} onClick={() => setSnackbarMessage("")}>
                <Alert onClose={() => setSnackbarMessage("")}
                       severity="success"
                       sx={{ userSelect: "none", width: '100%', background: "#285c4e", borderRadius: "16px", boxShadow: "none", border: "none" }}
                       variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <div className={"activity-fullscreen"}>
                <div className={"exercise-header"}>
                    <button className={"exercise-back"} onClick={() => {
                        onBackPressed()
                    }}><span className={"material-symbols-outlined"}>arrow_back</span></button>
                    <h2 style={{
                        textAlign: "start"
                    }} className={"article-title"}>OPTIONES NAM AI</h2>
                </div>
                <div style={{
                    paddingBottom: "24px",
                    paddingLeft: "24px",
                    paddingRight: "24px"
                }}>
                    <div className={"container-debug"}>
                        <p className={"debug-text"}>Debug zone</p>
                        <div className={"debug-space"}></div>
                        <p className={"debug-text"}>Set API key if you want to enable AI features. Leave blank to unset an API key.</p>
                        <div className={"debug-space"}></div>
                        <input className={"debug-field"} value={apiKey} onChange={(e) => setApiKey(e.target.value)} id={"ai-api-key"} placeholder={"OpenAI API key"}/>
                        <div className={"debug-space"}></div>
                        <button className={"debug-button"} onClick={saveApiKey}>Set debug API key</button>
                    </div>
                    <div className={"debug-space"}></div>
                    <div className={"container-debug"}>
                        <p className={"debug-text"}>Select translation model</p>
                        <div className={"debug-space"}></div>
                        <p className={"debug-text"}>Default model is o4-mini. Comparing to the models o1-mini and o3-mini it has the same price, translation process takes appropriately the same amount of time, but the accuracy id much better. gpt-4o is more expensive, less accurate, but is the faster than other models.</p>
                        <div className={"debug-space"}></div>
                        <button className={"debug-button"} onClick={() => setModel("gpt-4o")}>gpt-4o</button>
                        <div className={"debug-space"}></div>
                        <button className={"debug-button"} onClick={() => setModel("o1-mini")}>o1-mini</button>
                        <div className={"debug-space"}></div>
                        <button className={"debug-button"} onClick={() => setModel("o3-mini")}>o3-mini</button>
                        <div className={"debug-space"}></div>
                        <button className={"debug-button"} onClick={() => setModel("o4-mini")}>o4-mini</button>
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
