import React, {useEffect} from 'react';
import AppScreenFade from "../../AppScreenFade";
import PropTypes from "prop-types";
import * as Settings from "../../../Settings";
import {MaterialDialog} from "../../../components/MaterialDialog";
import {Alert, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar} from "@mui/material";
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";

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
                       sx={{ userSelect: "none", width: '100%', background: "#285c39", borderRadius: "16px", boxShadow: "none", border: "none" }}
                       variant="filled">
                    Operation completed successfully.
                </Alert>
            </Snackbar>
            <MaterialDialog
                open={clearWeakWordsConfirmationOpened}
                onClose={() => setClearWeakWordsConfirmationOpened(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Clear word practice list?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        This action is irreversible and will remove all words from your practice list. You will need to add words again to practice them.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setClearWeakWordsConfirmationOpened(false);
                    }} autoFocus>Cancel</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setClearWeakWordsConfirmationOpened(false);
                        clearWeakWords();
                    }}>
                        Clear
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
                    }} autoFocus>Cancel</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setClearVocabularyConfirmationOpened(false);
                        clearVocabulary();
                    }}>
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
                    }} autoFocus>Cancel</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setClearAppDataConfirmationOpened(false);
                        clearAppData();
                    }}>
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
                        setClearWeakWordsConfirmationOpened(true)
                    }} >Clear word practice list</button>
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