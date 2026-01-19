/***************************************************************************
 * Copyright (c) 2025-2026 Dmytro Ostapenko. All rights reserved.
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
import ArrowBack from "@mui/icons-material/ArrowBack";
import {getLocalizedString} from "../../../strings/GetString.jsx";

function SetApiKeyActivity({onNewIntent}) {

    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [apiKey, setApiKey] = React.useState(localStorage.getItem("openai") || "");

    const saveApiKey = () => {
        const apiKey = document.getElementById("ai-api-key").value;

        if (apiKey) {
            localStorage.setItem("openai", apiKey);
            setSnackbarMessage(getLocalizedString("debugApiKeySet"));
        } else {
            localStorage.removeItem("openai");
            setSnackbarMessage(getLocalizedString("debugApiKeyUnset"));
        }
    }

    const onBackPressed = () => {
        onNewIntent("/home/3")
    }

    const setModel = (model) => {
        Settings.setModel(model);
        setSnackbarMessage(getLocalizedString("modelSetTo") + model);
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
                    }}><ArrowBack /></button>
                    <h2 style={{
                        textAlign: "start"
                    }} className={"article-title"}>{getLocalizedString("titleAISettings")}</h2>
                </div>
                <div style={{
                    paddingBottom: "24px",
                    paddingLeft: "24px",
                    paddingRight: "24px"
                }}>
                    <div className={"container-debug"}>
                        <p className={"debug-text"}>{getLocalizedString("debugZone")}</p>
                        <div className={"debug-space"}></div>
                        <p className={"debug-text"}>{getLocalizedString("debugZoneInstruction")}</p>
                        <div className={"debug-space"}></div>
                        <input className={"debug-field"} value={apiKey} onChange={(e) => setApiKey(e.target.value)} id={"ai-api-key"} placeholder={getLocalizedString("debugZoneAPIKey")}/>
                        <div className={"debug-space"}></div>
                        <button className={"debug-button"} onClick={saveApiKey}>{getLocalizedString("debugZoneSetKey")}</button>
                    </div>
                    <div className={"debug-space"}></div>
                    <div className={"container-debug"}>
                        <p className={"debug-text"}>{getLocalizedString("debugZoneTranslationModelSelectorTitle")}</p>
                        <div className={"debug-space"}></div>
                        <p className={"debug-text"}>{getLocalizedString("debugZoneTranslationModelSelectorRemark")}</p>
                        <div className={"debug-space"}></div>
                        <button className={"debug-button"} onClick={() => setModel("gpt-4o")}>gpt-4o</button>
                        <div className={"debug-space"}></div>
                        <button className={"debug-button"} onClick={() => setModel("o1-mini")}>o1-mini</button>
                        <div className={"debug-space"}></div>
                        <button className={"debug-button"} onClick={() => setModel("o3-mini")}>o3-mini</button>
                        <div className={"debug-space"}></div>
                        <button className={"debug-button"} onClick={() => setModel("o4-mini")}>o4-mini</button>
                        <div className={"debug-space"}></div>
                        <button className={"debug-button"} onClick={() => setModel("gpt-5.1")}>gpt-5.1</button>
                        <div className={"debug-space"}></div>
                        <button className={"debug-button"} onClick={() => setModel("gpt-5.2")}>gpt-5.2</button>
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
