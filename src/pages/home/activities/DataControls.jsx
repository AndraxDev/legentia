import React from 'react';
import AppScreenFade from "../../AppScreenFade";
import PropTypes from "prop-types";
import * as Settings from "../../../Settings";
import {MaterialDialog} from "../../../components/MaterialDialog";
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";

function DataControls({onNewIntent}) {

    const onBackPressed = () => {
        onNewIntent("/home/3");
    }

    const [clearVocabularyConfirmationOpened, setClearVocabularyConfirmationOpened] = React.useState(false);
    const [clearAppDataConfirmationOpened, setClearAppDataConfirmationOpened] = React.useState(false);

    const clearVocabulary = () => {
        localStorage.removeItem("vocabulary");
        window.location.reload();
    }

    const clearAppData = () => {
        Settings.clearAppData();
    }

    return (
        <AppScreenFade>
            <MaterialDialog
                open={clearVocabularyConfirmationOpened}
                onClose={() => setClearVocabularyConfirmationOpened(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Clear local vocabulary?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        Clearing local vocabulary will removed all cached translations and will require Internet connection next time you tap the word to translate it. Additionally, uncached words will use AI models which may incur additional charges. Clear local vocabulary if you see incorrect or unusual translations.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setClearVocabularyConfirmationOpened(false);
                    }}>Cancel</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setClearVocabularyConfirmationOpened(false);
                        clearVocabulary();
                    }} autoFocus>
                        Clear
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
                    {"Clear app data?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        Clearing app data will remove all local data, including lesson progresses, streak, local vocabulary, learned words, saved articles, etc.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setClearAppDataConfirmationOpened(false);
                    }}>Cancel</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setClearAppDataConfirmationOpened(false);
                        clearAppData();
                    }} autoFocus>
                        Clear
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
                    }} className={"article-title"}>Data Controls</h2>
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
                    }} >Clear local vocabulary</button>
                    <button className={"exercise-button exercise-button-incorrect"} onClick={() => {
                        setClearAppDataConfirmationOpened(true)
                    }} >Clear application data</button>
                </div>
            </div>
        </AppScreenFade>
    );
}

DataControls.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default DataControls;