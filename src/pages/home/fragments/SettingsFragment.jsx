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
import PropTypes from "prop-types";
import packageJson from './../../../../package.json';
import * as Settings from "../../../Settings";
import {MaterialProgressBar} from "../../../components/MaterialProgressBar";
import {Alert, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar} from "@mui/material";
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";
import {MaterialDialog} from "../../../components/MaterialDialog";

// onNewIntent is analog to android.content.Context.java in Android OS. It is passed hierarchically through all
// components that need to access base application to handle activity launching.
function SettingsFragment({onNewIntent}) {

    const [userData, setUserData] = React.useState(null);
    const [errorAccount, setErrorAccount] = React.useState(false);
    const [telemetrySnackBarIsOpen, setTelemetrySnackBarIsOpen] = React.useState(false);
    const [confirmTelemetry, setConfirmTelemetry] = React.useState(false);

    useEffect(() => {
        if (telemetrySnackBarIsOpen) {
            setTimeout(() => {
                setTelemetrySnackBarIsOpen(false);
            }, 3000)
        }
    }, [telemetrySnackBarIsOpen]);

    useEffect(() => {
        fetch("https://id.teslasoft.org/xauth/users/GetPublicAccountInfo?uid=" + Settings.getUserId())
            .then(res => res.json())
            .then(json => {
                if (json.code) {
                    console.log("Failed to fetch user data: " + json.message);
                    setErrorAccount(true);
                } else {
                    setErrorAccount(false);
                    setUserData(json);
                }
            })
            .catch(err => {
                setErrorAccount(true);
                console.log(err)
            });
    }, []);

    const sendTelemetry = () => {
        let vocabulary = localStorage.getItem("vocabulary");
        let vbase64 = btoa(vocabulary || "");
        console.log("Sending telemetry data: " + vbase64);

        fetch("https://legentia.teslasoft.org/api/WordCache.php?payload=" + vbase64, {
            method: "GET"
        }).then(res => res.json())
            .then(json => {
                if (json.code === 200) {
                    console.log("Telemetry data sent successfully");
                    setTelemetrySnackBarIsOpen(true);
                } else {
                    console.error("Failed to send telemetry data: " + json.message);
                }
            })
            .catch(err => {
                console.error("Error sending telemetry data: ", err);
            });
    }

    return (
        <div className={"fragment"}>
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={telemetrySnackBarIsOpen} autoHideDuration={3000} onClick={() => setTelemetrySnackBarIsOpen(false)}>
                <Alert onClose={() => setTelemetrySnackBarIsOpen(false)}
                       severity="success"
                       sx={{ userSelect: "none", width: '100%', background: "#285c39", borderRadius: "16px", boxShadow: "none", border: "none" }}
                       variant="filled">
                    Telemetry sent successfully!
                </Alert>
            </Snackbar>
            <MaterialDialog
                open={confirmTelemetry}
                onClose={() => setConfirmTelemetry(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Would you like to send telemetry data?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        Telemetry data includes your vocabulary cache, application version, and other non-personal information. By sending telemetry data, you will help to build global cache to increase translation speed and accuracy and reduce costs related to the usage of AI.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setConfirmTelemetry(false);
                    }} autoFocus>Cancel</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setConfirmTelemetry(false);
                        sendTelemetry();
                    }}>
                        Send
                    </MaterialButtonDialogFilled>
                </DialogActions>
            </MaterialDialog>
            <h2 className={"activity-title"}>Settings</h2>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px"
            }}>
                {
                    Settings.hasUserDataKey() ? <button onClick={() => {
                        window.location.assign("/tid");
                    }} className={"teslasoft-id-container"}>
                        {
                            userData ? <div className={"profile-info-container"}>
                                <div className={"profile-photo"}>
                                    <img style={{
                                        width: "48px",
                                        height: "48px",
                                        borderRadius: "50%",
                                    }} alt={userData.user_name} src={userData.profile_photo}/>
                                </div>
                                <div className={"profile-text"}>
                                    <p className={"teslasoft-id-title"}>Teslasoft ID</p>
                                    <p className={"profile-name"}>Signed in as {userData.first_name} {userData.last_name}</p>
                                </div>
                            </div> : <>
                            {
                                errorAccount ? <div className={"profile-info-container"}>
                                    <div className={"profile-photo"}></div>
                                    <div className={"profile-text"}>
                                        <p className={"teslasoft-id-title"}>Teslasoft ID</p>
                                        <p className={"sync-error-text"}>Sync error</p>
                                    </div>
                                </div> : <div style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "22px 0"
                                }}>
                                    <MaterialProgressBar thickness={6} />
                                </div>
                            }
                            </>
                        }
                    </button> : <button onClick={() => {
                        window.location.assign("/tid");
                    }} className={"teslasoft-id-container"}>
                        <div className={"profile-info-container"}>
                            <div className={"profile-photo"}></div>
                            <div className={"profile-text"}>
                                <p className={"teslasoft-id-title"}>Teslasoft ID</p>
                                <p className={"profile-name"}>Tap to Sign In</p>
                            </div>
                        </div>
                    </button>
                }
                <div className={"list-container"} style={{
                    width: "calc(100% - 52px)",
                    marginTop: "0",
                    marginBottom: "0"
                }}>
                    <div style={userData ? {} : {
                        cursor: "not-allowed",
                        opacity: "0.5",
                    }} className={"list-item"}>
                        <button style={{
                            width: "100%",
                        }} disabled={!userData} className={"button-in-list-item"} onClick={() => onNewIntent("sync")}>Sync settings between devices</button>
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => onNewIntent("privacy")}>Data controls</button>
                    </div>
                </div>
                <div className={"list-container"} style={{
                    width: "calc(100% - 52px)",
                    marginTop: "0",
                    marginBottom: "0"
                }}>
                    <div className={"list-item"}>
                        <h3 style={{
                            margin: "0",
                            userSelect: "none",
                            padding: "16px",
                        }}>Debug & Experiments</h3>
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => onNewIntent("openai")}>AI Settings</button>
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => onNewIntent("ttsdebug")}>TTS Debug</button>
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => setConfirmTelemetry(true)}>Send Telemetry</button>
                    </div>
                </div>
            </div>
            <div style={{
                height: "24px",
            }} />
            <p className={"app-info"}>Legentia version {packageJson.version}</p>
            <p className={"app-info"}>Developer: <a className={"link"} href={"https://andrax.dev"}>AndraxDev</a></p>
        </div>
    );
}

SettingsFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default SettingsFragment;
