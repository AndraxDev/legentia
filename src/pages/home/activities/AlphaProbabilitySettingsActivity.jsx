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
import formula from "../../../wordbrob.png";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as Settings from "../../../Settings";
import ArrowBack from "@mui/icons-material/ArrowBack";
import {getLocalizedString} from "../../../strings/GetString.jsx";

function AlphaProbabilitySettingsActivity({ onNewIntent }) {

    const [snackbarMessage, setSnackbarMessage] = React.useState("");

    const onBackPressed = () => {
        onNewIntent("/home/3")
    }

    const setAlphaToZero = () => {
        Settings.setAlpha(0.0);
        setSnackbarMessage(getLocalizedString("infoAlphaSetToZero"));
    }

    const setAlphaToLow = () => {
        Settings.setAlpha(0.1);
        setSnackbarMessage(getLocalizedString("infoAlphaSetToZeroDotOne"));
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
                    }} className={"article-title"}>{getLocalizedString("titleSetAlphaProbability")}</h2>
                </div>
                <div className={"list-container"} style={{
                    margin: "0 24px 24px 24px"
                }}>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none",
                    }}>
                        {getLocalizedString("textAlphaProbabilityInfo")}
                    </div>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}>
                        <span>{getLocalizedString("textCurrentAlphaProbability")}</span>
                        <img style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "500px",
                        }} src={formula} alt={"Word probability formula"} />
                        <span>Where <b>W<sub><i>i</i></sub></b> is the learning index of the word selected, <b>W<sub><i>max</i></sub></b> is the maximal learning index, <b>W<sub><i>min</i></sub></b> is the minimal learning index.</span>
                    </div>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none",
                    }}>
                        Current alpha value: {Settings.getAlpha()}
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                            color: "#ffc65c",
                            textAlign: "start"
                        }} className={"button-in-list-item"} onClick={() => setAlphaToLow()}>{getLocalizedString("btnSetAlphaToZero")}</button>
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                            color: "#ffc65c",
                            textAlign: "start"
                        }} className={"button-in-list-item"} onClick={() => setAlphaToZero()}>{getLocalizedString("btnSetAlphaToZeroDotOne")}</button>
                    </div>
                </div>
            </div>
        </AppScreenFade>
    );
}

AlphaProbabilitySettingsActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default AlphaProbabilitySettingsActivity;