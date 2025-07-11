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
import formula from "../../../wordbrob.png";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as Settings from "../../../Settings";

function AlphaProbabilitySettingsActivity({ onNewIntent }) {

    const [snackbarMessage, setSnackbarMessage] = React.useState("");

    const onBackPressed = () => {
        onNewIntent("/home/3")
    }

    const setAlphaToZero = () => {
        Settings.setAlpha(0.0);
        setSnackbarMessage("Alpha set to zero (0.0).");
    }

    const setAlphaToLow = () => {
        Settings.setAlpha(0.1);
        setSnackbarMessage("Alpha set to low (0.1).");
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
                    }} className={"article-title"}>SET ALPHA PROBABILITATIS</h2>
                </div>
                <div className={"list-container"} style={{
                    margin: "0 24px 24px 24px"
                }}>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none",
                    }}>
                        Alpha defines how exercise algorithm will select words for practising. By default words selection algorithm prioritizes words that have the less learning index (have been practised less times). Alpha parameter adds some chance to select words with the maximum learning index. If alpha is set to zero, then words with the maximum learning index will appear only when the whole words list has been practised.
                    </div>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}>
                        <span>The probability of selecting the word in the current exercise is:</span>
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
                        }} className={"button-in-list-item"} onClick={() => setAlphaToLow()}>Click to set alpha to low (0.1) (better for large word practice lists, words with max learning index will have small chance of appearing in the exercises to prevent user from forgetting it)</button>
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                            color: "#ffc65c",
                            textAlign: "start"
                        }} className={"button-in-list-item"} onClick={() => setAlphaToZero()}>Click to set alpha to zero (0.0) (better for small word practice lists, all words must be practised until it will repeat)</button>
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