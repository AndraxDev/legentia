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

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import AppScreenFade from "../../AppScreenFade";
import * as Settings from "../../../Settings";
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";
import {MaterialDialog} from "../../../components/MaterialDialog";
import * as StringUtil from "../../util/StringUtils";

WordsActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
};

function WordsActivity({onNewIntent}) {
    const onBackPressed = () => {
        onNewIntent("/home/1")
    }

    const [weakWords, setWeakWords] = React.useState(Object.keys(Settings.getWeakWords()));
    const [weakWordMap, setWeakWordMap] = React.useState(Settings.getWeakWords());
    const [markedWordForDeletion, setMarkedWordForDeletion] = React.useState("");
    const [deleteConfirmationDialogOpened, setDeleteConfirmationDialogOpened] = React.useState(false);

    useEffect(() => {
        setWeakWordMap(Settings.getWeakWords());
    }, [weakWords]);

    const deleteWord = () => {
        if (markedWordForDeletion) {
            Settings.deleteWeakWord(markedWordForDeletion);
            setMarkedWordForDeletion("");
            setWeakWords(Object.keys(Settings.getWeakWords()))
        }
    }

    return (
        <AppScreenFade>
            <MaterialDialog
                open={deleteConfirmationDialogOpened}
                onClose={() => setDeleteConfirmationDialogOpened(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"VISNE HOC VERMVM DELERE EX PRACTICA INDEX?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        SEMEL DELETA, RESTITVI NON POTEST!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setDeleteConfirmationDialogOpened(false);
                    }} autoFocus>CASSARE</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setDeleteConfirmationDialogOpened(false);
                        deleteWord();
                    }}>
                        DELERE
                    </MaterialButtonDialogFilled>
                </DialogActions>
            </MaterialDialog>
            <div className={"activity-fullscreen"}>
                <div className={"exercise-header"}>
                    <button className={"exercise-back"} onClick={() => {
                        onBackPressed()
                    }}><span className={"material-symbols-outlined"}>arrow_back</span></button>
                    <h2 style={{
                        textAlign: "start"
                    }} className={"article-title"}>PRACTICE VERBA</h2>
                </div>
                <div style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                }}>
                    <button className={"exercise-button exercise-button-neutral"} onClick={() => {
                        onNewIntent("addword");
                    }}>
                        ADDERE VERBUM NOVVM
                    </button>
                    <button disabled={weakWords.length === 0} className={"exercise-button " + ((weakWords.length === 0) ? "exercise-button-disabled" : "exercise-button-neutral")} onClick={() => {
                        onNewIntent("quiz");
                    }}>
                        SATUS PENSVM VERBVM
                    </button>
                    {
                        weakWords.length > 0 ? <p style={{
                            width: "calc(100% - 48px)",
                            margin: "0",
                            fontSize: "20px",
                            userSelect: "none",
                            paddingTop: "6px"
                        }}>{weakWords.length} VERBI IN INDEX PRAXI</p> : null
                    }
                </div>
                {
                    weakWords.length > 0 ? <div>
                        <div className={"list-container"}>
                            <div className={"list-item word-grid"} style={{
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                borderTopLeftRadius: "21px",
                                borderTopRightRadius: "21px",
                            }} key={-1}>
                                <span className={"translation-word"}>VERBVM LATINVM</span>
                                <span className={"translation-meaning"}>VERBVM INGLASVM</span>
                                <span className={"translation-learning-index"}>INDEX DISCENDI</span>
                                <button style={{
                                    cursor: "pointer"
                                }} className={"delete-word-btn"}>
                                    <span className={"material-symbols-outlined"}></span>
                                </button>
                            </div>
                            {
                                weakWords.map(word => (
                                    <div className={"list-item word-grid"} key={word}>
                                        <span className={"translation-word"}>{StringUtil.clearWord(word)}</span>
                                        <span className={"translation-meaning"}>{StringUtil.clearWord(weakWordMap[word])}</span>
                                        <span className={"translation-learning-index"}>{Settings.getWordIndex(StringUtil.clearWord(word))}</span>
                                        <button style={{
                                            cursor: "pointer"
                                        }} onClick={() => {
                                            setMarkedWordForDeletion(word);
                                            setDeleteConfirmationDialogOpened(true);
                                        }} className={"delete-word-btn"}>
                                            <span className={"material-symbols-outlined"}>delete</span>
                                        </button>
                                    </div>))
                            }
                        </div>
                    </div> : <div className={"list-container"}>
                        <div className={"list-item translation-item"} style={{
                            userSelect: "none",
                        }}>
                            NVLLA VERBA INDICI EXERCITATIONVM ADHVC ADDIDISTI. VERBA HVIC INDICI ADDERE POTES EA TANGENDO DVM ARTICVLOS VEL FABVLAS LEGIS.
                        </div>
                    </div>
                }
            </div>
        </AppScreenFade>
    );
}

export default WordsActivity;
