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
import * as Settings from "../../../Settings";
import {useNavigate} from "react-router-dom";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";
import {MaterialDialog} from "../../../components/MaterialDialog";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";

function ReadFragment({onNewIntent}) {
    const navigate = useNavigate();
    const savedStories = Settings.getSavedStories();
    const [markedForDeletion, setMarkedForDeletion] = React.useState("");
    const [deletionConfirmationOpened, setDeletionConfirmationOpened] = React.useState(false);

    const deleteStory = () => {
        if (markedForDeletion) {
            Settings.deleteStory(markedForDeletion);
            setMarkedForDeletion("");
        }
    }

    return (
        <div className={"fragment"}>
            <MaterialDialog
                open={deletionConfirmationOpened}
                onClose={() => setDeletionConfirmationOpened(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Visne hoc fabulum delere?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        Semel deleta, restitui non potest!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setDeletionConfirmationOpened(false);
                    }} autoFocus>Oblitera</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setDeletionConfirmationOpened(false);
                        deleteStory();
                    }}>
                        Dele
                    </MaterialButtonDialogFilled>
                </DialogActions>
            </MaterialDialog>
            <h2 className={"activity-title"}>Legere</h2>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "16px"
            }}>
                <button className={"exercise-button exercise-button-neutral"} onClick={() => {
                    onNewIntent("addstory");
                }}>
                    Fabulam novam adde
                </button>
            </div>
            {
                Object.keys(savedStories).length > 0 ? <div className={"list-container"}>
                    {
                        Object.keys(savedStories).map((storyId) => (<div className={"list-item"} key={storyId}>
                            <button style={{
                                flexGrow: 1,
                                cursor: "pointer",
                                textAlign: "start",
                                fontSize: "16px",
                            }} className={"button-in-list-item"} onClick={() => {
                                navigate("/read#" + storyId);
                            }} >{savedStories[storyId].title}</button>
                            <button style={{
                                cursor: "pointer",
                                padding: "16px 8px",
                            }} className={"button-in-list-item"}onClick={() => {
                                navigate("/addstory#" + storyId);
                            }}><Edit /></button>
                            <button onClick={() => {
                                setMarkedForDeletion(storyId);
                                setDeletionConfirmationOpened(true);
                            }} style={{
                                cursor: "pointer",
                                paddingLeft: "8px",
                                paddingRight: "16px",
                            }} className={"button-in-list-item"}><Delete /></button>
                        </div>))
                    }
                </div> : null
            }
        </div>
    );
}

ReadFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default ReadFragment;
