import React from 'react';
import PropTypes from "prop-types";
import {MaterialDialog} from "../../../components/MaterialDialog";
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {
    MaterialButtonDialogFilled,
    MaterialButtonDialogOutlined
} from "../../../components/MaterialButton";
import * as Settings from "../../../Settings";
import packageJson from './../../../../package.json';

// onNewIntent is analog to android.content.Context.java in Android OS. It is passed hierarchically through all
// components that need to access base application to handle activity launching.
function SettingsFragment({onNewIntent}) {
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
        <div className={"fragment"}>
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
            <h2 className={"activity-title"}>Settings</h2>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px"
            }}>
                <button className={"exercise-button exercise-button-neutral"} onClick={() => onNewIntent("openai")} >Edit AI API Key (debug)</button>
                <button className={"exercise-button exercise-button-incorrect"} onClick={() => {
                    setClearVocabularyConfirmationOpened(true)
                }} >Clear local vocabulary</button>
                <button className={"exercise-button exercise-button-incorrect"} onClick={() => {
                    setClearAppDataConfirmationOpened(true)
                }} >Clear application data</button>
            </div>
            <br/>
            <p className={"app-info"}>Legentia version {packageJson.version}</p>
            <p className={"app-info"}>Developer: <a className={"link"} href={"https://andrax.dev"}>AndraxDev</a></p>
        </div>
    );
}

SettingsFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default SettingsFragment;