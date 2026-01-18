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

import React, {useEffect} from 'react';
import AppScreenFade from "../../AppScreenFade";
import PropTypes from "prop-types";
import * as Settings from "../../../Settings";
import {MaterialDialog} from "../../../components/MaterialDialog";
import Alert from '@mui/material/Alert';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import {getLocalizedString} from "../../../strings/GetString.jsx";

function DataControls({onNewIntent}) {
    const onBackPressed = () => {
        onNewIntent("/home/3");
    }

    const [clearVocabularyConfirmationOpened, setClearVocabularyConfirmationOpened] = React.useState(false);
    const [clearAppDataConfirmationOpened, setClearAppDataConfirmationOpened] = React.useState(false);
    const [clearWeakWordsConfirmationOpened, setClearWeakWordsConfirmationOpened] = React.useState(false);
    const [snackbarOpened, setSnackbarOpened] = React.useState(false);

    useEffect(() => {
        if (snackbarOpened) {
            setTimeout(() => {
                setSnackbarOpened(false);
            }, 3000);
        }
    }, [snackbarOpened]);

    const clearVocabulary = () => {
        localStorage.removeItem("vocabulary");
        window.location.reload();
    }

    const clearAppData = () => {
        Settings.clearAppData();
        setSnackbarOpened(true);
    }

    const clearWeakWords = () => {
        Settings.clearWeakWords();
        setSnackbarOpened(true);
    }

    return (
        <AppScreenFade>
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={snackbarOpened} autoHideDuration={3000} onClick={() => setSnackbarOpened(false)}>
                <Alert onClose={() => setSnackbarOpened(false)}
                       severity="success"
                       sx={{ userSelect: "none", width: '100%', background: "#285c4e", borderRadius: "16px", boxShadow: "none", border: "none" }}
                       variant="filled">
                    {getLocalizedString("noteOperationCompleted")}
                </Alert>
            </Snackbar>
            <MaterialDialog
                open={clearWeakWordsConfirmationOpened}
                onClose={() => setClearWeakWordsConfirmationOpened(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {getLocalizedString("btnClearWordPracticeList")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        {getLocalizedString("noteClearWordPracticeListWarning")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setClearWeakWordsConfirmationOpened(false);
                    }} autoFocus>{getLocalizedString("btnCancel")}</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setClearWeakWordsConfirmationOpened(false);
                        clearWeakWords();
                    }}>
                        {getLocalizedString("btnClear")}
                    </MaterialButtonDialogFilled>
                </DialogActions>
            </MaterialDialog>
            <MaterialDialog
                open={clearVocabularyConfirmationOpened}
                onClose={() => setClearVocabularyConfirmationOpened(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {getLocalizedString("btnClearVocabulary")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        {getLocalizedString("noteClearVocabularyWarning")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setClearVocabularyConfirmationOpened(false);
                    }} autoFocus>{getLocalizedString("btnCancel")}</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setClearVocabularyConfirmationOpened(false);
                        clearVocabulary();
                    }}>
                        {getLocalizedString("btnClear")}
                    </MaterialButtonDialogFilled>
                </DialogActions>
            </MaterialDialog>
            <MaterialDialog
                open={clearAppDataConfirmationOpened}
                onClose={() => setClearAppDataConfirmationOpened(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {getLocalizedString("btnClearAppData")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        {getLocalizedString("noteClearAppDataWarning")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setClearAppDataConfirmationOpened(false);
                    }} autoFocus>{getLocalizedString("btnCancel")}</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setClearAppDataConfirmationOpened(false);
                        clearAppData();
                    }}>
                        getLocalizedString("btnClear")
                    </MaterialButtonDialogFilled>
                </DialogActions>
            </MaterialDialog>
            <div className={"activity-fullscreen"}>
                <div className={"exercise-header"}>
                    <button className={"exercise-back"} onClick={() => {
                        onBackPressed()
                    }}><ArrowBack /></button>
                    <h2 style={{
                        textAlign: "start"
                    }} className={"article-title"}>{getLocalizedString("titleDataControls")}</h2>
                </div>
                <div style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px"
                }}>
                    <button className={"exercise-button exercise-button-incorrect"} onClick={() => {
                        setClearVocabularyConfirmationOpened(true)
                    }}>{getLocalizedString("clearVocabulary")}</button>
                    <button className={"exercise-button exercise-button-incorrect"} onClick={() => {
                        setClearWeakWordsConfirmationOpened(true)
                    }}>{getLocalizedString("clearWordPracticeList")}</button>
                    <button className={"exercise-button exercise-button-incorrect"} onClick={() => {
                        setClearAppDataConfirmationOpened(true)
                    }}>{getLocalizedString("clearAppData")}</button>
                </div>
            </div>
        </AppScreenFade>
    );
}

DataControls.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default DataControls;
