import React from 'react';
import PropTypes from "prop-types";
import WordsActivity from "./WordsActivity";
import * as Vocabulary from "../../VocabularyCache";
import {MaterialDialog} from "../../../components/MaterialDialog";
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";
import AppScreenFade from "../../AppScreenFade";
import * as StringUtil from "../../util/StringUtils";
import * as Settings from "../../../Settings";

WordsActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
};

function VocabularyActivity({onNewIntent}) {
    const onBackPressed = () => {
        onNewIntent("/home/1")
    }

    const [vocabularyWords, setVocabularyWords] = React.useState(Object.keys(Vocabulary.getVocabulary()));
    const [vocabularyWordMap, setVocabularyWordMap] = React.useState(Vocabulary.getVocabulary());
    const [markedWordForDeletion, setMarkedWordForDeletion] = React.useState("");
    const [deleteConfirmationDialogOpened, setDeleteConfirmationDialogOpened] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");

    React.useEffect(() => {
        setVocabularyWordMap(Vocabulary.getVocabulary());
    }, [vocabularyWords]);

    const deleteWord = () => {
        if (markedWordForDeletion) {
            Vocabulary.deleteWord(markedWordForDeletion);
            setMarkedWordForDeletion("");
            setVocabularyWords(Object.keys(Vocabulary.getVocabulary()));
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
                    {"Delete word from the vocabulary?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        Once deleted, it cannot be recovered.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setDeleteConfirmationDialogOpened(false);
                    }} autoFocus>Cancel</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setDeleteConfirmationDialogOpened(false);
                        deleteWord();
                    }}>
                        Delete
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
                    }} className={"article-title"}>My vocabulary</h2>
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
                        onNewIntent("vocabularyadd");
                    }}>
                        Add new word
                    </button>
                    <input className={"input"} placeholder={"Search"} onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
                    {
                        vocabularyWords.length > 0 ? <p style={{
                            width: "calc(100% - 48px)",
                            margin: "0",
                            fontSize: "20px",
                            userSelect: "none",
                            paddingTop: "6px"
                        }}>{vocabularyWords.length} word{vocabularyWords.length > 1 ? "s" : ""}</p> : null
                    }
                </div>
                {
                    vocabularyWords.length > 0 ? <div>
                        <div className={"list-container"}>
                            <div className={"list-item word-grid"} style={{
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                borderTopLeftRadius: "21px",
                                borderTopRightRadius: "21px",
                            }} key={-1}>
                                <span className={"translation-word"}>Latin word</span>
                                <span className={"translation-meaning"}>Translation</span>
                                <span className={"translation-learning-index"}>Learning index</span>
                                <button style={{
                                    cursor: "pointer"
                                }} className={"delete-word-btn"}>
                                    <span className={"material-symbols-outlined"}></span>
                                </button>
                            </div>
                            {
                                vocabularyWords.filter(word => searchTerm.includes(word) || word.includes(searchTerm)).map(word => (
                                    <div className={"list-item word-grid"} key={word}>
                                        <span className={"translation-word"}>{StringUtil.clearWord(word || "")}</span>
                                        <span className={"translation-meaning"}>{StringUtil.clearWord(vocabularyWordMap[word] || "")}</span>
                                        <span className={"translation-learning-index"}>{Settings.getWordIndex(StringUtil.clearWord(word || ""))}</span>
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
                            Your vocabulary is empty or no words match the search term.
                        </div>
                    </div>
                }
            </div>
        </AppScreenFade>
    );
}

export default VocabularyActivity;