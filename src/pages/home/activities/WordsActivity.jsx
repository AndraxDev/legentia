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
import PropTypes from 'prop-types';
import AppScreenFade from "../../AppScreenFade";
import * as Settings from "../../../Settings";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";
import {MaterialDialog} from "../../../components/MaterialDialog";
import * as StringUtil from "../../util/StringUtils";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Delete from "@mui/icons-material/Delete";
import {getLocalizedString} from "../../../strings/GetString.jsx";

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
    const [searchTerm, setSearchTerm] = React.useState("");

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
                    {getLocalizedString("practiceDeleteWordTitle")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        {getLocalizedString("actionIrreversible")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setDeleteConfirmationDialogOpened(false);
                    }} autoFocus>{getLocalizedString("btnCancel")}</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setDeleteConfirmationDialogOpened(false);
                        deleteWord();
                    }}>
                        {getLocalizedString("btnDelete")}
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
                    }} className={"article-title"}>{getLocalizedString("practiceWordsTitle")}</h2>
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
                        {getLocalizedString("btnAddWord")}
                    </button>
                    <button disabled={weakWords.length < 3} className={"exercise-button " + ((weakWords.length === 0) ? "exercise-button-disabled" : "exercise-button-neutral")} onClick={() => {
                        onNewIntent("quiz");
                    }}>
                        {getLocalizedString("startWordPractice")}
                    </button>
                    <button disabled={weakWords.length === 0} className={"exercise-button " + ((weakWords.length === 0) ? "exercise-button-disabled" : "exercise-button-neutral")} onClick={() => {
                        onNewIntent("hardquiz");
                    }}>
                        {getLocalizedString("startWordHardPractice")}
                    </button>
                    <input className={"input"} placeholder={getLocalizedString("hintSearchWords")} onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
                    {
                        weakWords.length > 0 ? <p style={{
                            width: "calc(100% - 48px)",
                            margin: "0",
                            fontSize: "20px",
                            userSelect: "none",
                            paddingTop: "6px"
                        }}>{weakWords.length} {getLocalizedString("wordsInPracticeListCount")}</p> : null
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
                                <span className={"translation-word"}>{getLocalizedString("textOriginalWord")}</span>
                                <span className={"translation-meaning"}>{getLocalizedString("textEnglishWord")}</span>
                                <span className={"translation-learning-index"}>{getLocalizedString("learningIndex")}</span>
                                <button disabled={true} className={"delete-word-btn"}>
                                    <span className={"material-symbols-outlined"}></span>
                                </button>
                            </div>
                            {
                                weakWords.filter(word => searchTerm.includes(word) || word.includes(searchTerm) || Settings.getWordIndex(StringUtil.clearWord(word)).toString() === searchTerm ||
                                    searchTerm.includes(weakWordMap[word]) || weakWordMap[word].includes(searchTerm) || Settings.getWordIndex(StringUtil.clearWord(weakWordMap[word])).toString() === searchTerm).map(word => (
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
                                            <Delete />
                                        </button>
                                    </div>))
                            }
                        </div>
                    </div> : <div className={"list-container"}>
                        <div className={"list-item translation-item"} style={{
                            userSelect: "none",
                        }}>
                            {getLocalizedString("emptyPracticeList")}
                        </div>
                    </div>
                }
            </div>
        </AppScreenFade>
    );
}

export default WordsActivity;
