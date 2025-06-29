import React from 'react';
import PropTypes from "prop-types";
import {MaterialDialog} from "../../../components/MaterialDialog";
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {
    MaterialButtonDialogFilled,
    MaterialButtonDialogOutlined
} from "../../../components/MaterialButton";

// onNewIntent is analog to android.content.Context.java in Android OS. It is passed hierarchically through all
// components that need to access base application to handle activity launching.
function SettingsFragment({onNewIntent}) {
    const [clearVocabularyConfirmationOpened, setClearVocabularyConfirmationOpened] = React.useState(false);

    const clearVocabulary = () => {
        localStorage.removeItem("vocabulary");
        window.location.reload();
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
                    <DialogContentText id="alert-dialog-description">
                        <div style={{ color: "#fff" }}>
                            Clearing local vocabulary will removed all cached translations and will require Internet connection next time you tap the word to translate it. Additionally, uncached words will use AI models which may incur additional charges. Clear local vocabulary if you see incorrect or unusual translations.
                        </div>
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
            <h2 className={"activity-title"}>Settings</h2>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px"
            }}>
                <button className={"exercise-button exercise-button-neutral"} onClick={() => onNewIntent("openai")} >Edit AI API Key</button>
                <button className={"exercise-button exercise-button-incorrect"} onClick={() => {
                    setClearVocabularyConfirmationOpened(true)
                }} >Clear local vocabulary</button>
            </div>
        </div>
    );
}

SettingsFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default SettingsFragment;