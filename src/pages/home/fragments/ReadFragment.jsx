import React from 'react';
import PropTypes from "prop-types";
import * as Settings from "../../../Settings";
import {useNavigate} from "react-router-dom";
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";
import {MaterialDialog} from "../../../components/MaterialDialog";

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
                    {"Delete this story?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div style={{ color: "#fff" }}>
                            Once deleted, it cannot be recovered.
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setDeletionConfirmationOpened(false);
                    }}>Cancel</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setDeletionConfirmationOpened(false);
                        deleteStory();
                    }} autoFocus>
                        Delete
                    </MaterialButtonDialogFilled>
                </DialogActions>
            </MaterialDialog>
            <h2 className={"activity-title"}>Reading list</h2>
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
                    Add new story
                </button>
            </div>
            {
                Object.keys(savedStories).length > 0 ? <div className={"list-container"}>
                    {
                        Object.keys(savedStories).map((storyId) => (<div className={"list-item"} key={storyId}>
                            <button style={{
                                flexGrow: 1,
                                textAlign: "start",
                                fontSize: "16px",
                            }} className={"button-in-lit-item"} onClick={() => {
                                navigate("/read#" + storyId);
                            }} >{savedStories[storyId].title}</button>
                            <button style={{
                                padding: "16px 8px",
                            }} className={"button-in-lit-item"}><span className={"material-symbols-outlined"} onClick={() => {
                                navigate("/addstory#" + storyId);
                            }}>edit</span></button>
                            <button onClick={() => {
                                setMarkedForDeletion(storyId);
                                setDeletionConfirmationOpened(true);
                            }} style={{
                                paddingLeft: "8px",
                                paddingRight: "16px",
                            }} className={"button-in-lit-item"}><span className={"material-symbols-outlined"}>delete</span></button>
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