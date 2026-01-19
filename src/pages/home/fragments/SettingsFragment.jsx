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
import PropTypes from "prop-types";
import packageJson from './../../../../package.json';
import * as Settings from "../../../Settings";
import {MaterialProgressBar} from "../../../components/MaterialProgressBar";
import Alert from "@mui/material/Alert";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";
import {MaterialButtonDialogFilled, MaterialButtonDialogOutlined} from "../../../components/MaterialButton";
import {MaterialDialog} from "../../../components/MaterialDialog";
import {MaterialSwitch} from "../../../components/MaterialSwitch.jsx";
import {getLocalizedString} from "../../../strings/GetString.jsx";

// onNewIntent is analog to android.content.Context.java in Android OS. It is passed hierarchically through all
// components that need to access base application to handle activity launching.
function SettingsFragment({onNewIntent}) {

    const [userData, setUserData] = React.useState(null);
    const [errorAccount, setErrorAccount] = React.useState(false);
    const [telemetrySnackBarIsOpen, setTelemetrySnackBarIsOpen] = React.useState(false);
    const [confirmTelemetry, setConfirmTelemetry] = React.useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = React.useState(false);
    const [error, setError] = React.useState("");
    const [settingsSavedSnackBarOpened, setSettingsSavedSnackBarOpened] = React.useState(false);
    const [pronounceInReaderEnabled, setPronounceInReaderEnabled] = React.useState(Settings.isPronounceInReaderEnabled());
    const [pronounceInWordQuizEnabled, setPronounceInWordQuizEnabled] = React.useState(Settings.isPronounceInWordQuizEnabled());

    useEffect(() => {
        if (settingsSavedSnackBarOpened) {
            setTimeout(() => {
                setSettingsSavedSnackBarOpened(false);
            }, 3000);
        }
    }, [settingsSavedSnackBarOpened])

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
        try {
            let vbase64 = btoa(unescape(encodeURIComponent(vocabulary || "")));
            console.log("Sending telemetry data: " + vbase64);

            let formData = new FormData();
            formData.append("payload", vbase64);

            fetch("https://legentia.teslasoft.org/api/WordCache.php", {
                method: "POST",
                body: formData
            }).then(res => res.json())
                .then(json => {
                    if (json.code === 200) {
                        console.log("Telemetry data sent successfully");
                        setTelemetrySnackBarIsOpen(true);
                    } else {
                        console.error("Failed to send telemetry data: " + json.message);
                        setError(getLocalizedString("telemetrySendError") + json.message);
                        setErrorDialogOpen(true);
                    }
                })
                .catch(err => {
                    console.error("Error sending telemetry data: ", err);
                    setError(getLocalizedString("telemetrySendError") + err.message);
                    setErrorDialogOpen(true);
                });
        } catch (error) {
            setError(error);
            setErrorDialogOpen(true);
        }
    }

    // const speakSample = () => {
    //     responsiveVoice.speak("Olim, in terra longinqua et serena, erat regnum nomine Lucidorum, quod fulgebat non solum divitiis sed etiam sapientia.", "Latin Male");
    // }
    //
    // const stopSample = () => {
    //     responsiveVoice.cancel();
    // }

    return (
        <div className={"fragment"}>
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={settingsSavedSnackBarOpened} autoHideDuration={3000} onClick={() => setSettingsSavedSnackBarOpened(false)}>
                <Alert onClose={() => setSettingsSavedSnackBarOpened(false)}
                       severity="success"
                       sx={{ userSelect: "none", width: '100%', background: "#285c4e", borderRadius: "16px", boxShadow: "none", border: "none" }}
                       variant="filled">
                    {getLocalizedString("allSettingsSaved")}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={telemetrySnackBarIsOpen} autoHideDuration={3000} onClick={() => setTelemetrySnackBarIsOpen(false)}>
                <Alert onClose={() => setTelemetrySnackBarIsOpen(false)}
                       severity="success"
                       sx={{ userSelect: "none", width: '100%', background: "#285c4e", borderRadius: "16px", boxShadow: "none", border: "none" }}
                       variant="filled">
                    {getLocalizedString("telemetrySent")}
                </Alert>
            </Snackbar>
            <MaterialDialog
                open={errorDialogOpen}
                onClose={() => setErrorDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {getLocalizedString("titleError")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{
                        userSelect: "text"
                    }} id="alert-dialog-description" style={{ color: "#fff" }}>
                        {error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogFilled onClick={() => {
                        setErrorDialogOpen(false);
                    }} autoFocus>
                        {getLocalizedString("btnOk")}
                    </MaterialButtonDialogFilled>
                </DialogActions>
            </MaterialDialog>
            <MaterialDialog
                open={confirmTelemetry}
                onClose={() => setConfirmTelemetry(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {getLocalizedString("telemetrySendPrompt")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: "#fff" }}>
                        {getLocalizedString("telemetrySendDescription")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MaterialButtonDialogOutlined onClick={() => {
                        setConfirmTelemetry(false);
                    }} autoFocus>{getLocalizedString("btnCancel")}</MaterialButtonDialogOutlined>
                    <div/>
                    <MaterialButtonDialogFilled onClick={() => {
                        setConfirmTelemetry(false);
                        sendTelemetry();
                    }}>
                        {getLocalizedString("btnSend")}
                    </MaterialButtonDialogFilled>
                </DialogActions>
            </MaterialDialog>
            <h2 className={"activity-title"}>{getLocalizedString("bottomMenuSettings")}</h2>
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
                                    <p className={"teslasoft-id-title"}>{getLocalizedString("teslasoftIDSignedInAs")} <b>{userData.first_name}</b></p>
                                    <p className={"profile-name"}>{getLocalizedString("teslasoftIDTapToSignOut")}</p>
                                </div>
                            </div> : <>
                            {
                                errorAccount ? <div className={"profile-info-container"}>
                                    <div className={"profile-photo"}></div>
                                    <div className={"profile-text"}>
                                        <p className={"teslasoft-id-title"}>{getLocalizedString("teslasoftID")}</p>
                                        <p className={"sync-error-text"}>{getLocalizedString("teslasoftIDSyncError")}</p>
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
                                <p className={"teslasoft-id-title"}>{getLocalizedString("teslasoftID")}</p>
                                <p className={"profile-name"}>{getLocalizedString("teslasoftIDTapToSignIn")}</p>
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
                        }} disabled={!userData} className={"button-in-list-item"} onClick={() => onNewIntent("sync")}>{getLocalizedString("syncOptionsTitle")}</button>
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => onNewIntent("privacy")}>{getLocalizedString("titleDataControls")}</button>
                    </div>
                    <div className={"list-item"}>
                        <FormControlLabel style={{
                            userSelect: "none",
                            paddingRight: "16px",
                            paddingTop: "12px",
                            fontSize: "14px",
                            justifyContent: "space-between",
                            paddingBottom: "12px",
                            width: "calc(100% - 32px)",
                        }} labelPlacement={"start"} control={
                            <MaterialSwitch checked={pronounceInReaderEnabled} onChange={() => {
                                Settings.setPronounceInReaderEnabled(!pronounceInReaderEnabled);
                                setPronounceInReaderEnabled(!pronounceInReaderEnabled);
                                setSettingsSavedSnackBarOpened(true);
                            }} />
                        } label={getLocalizedString("pronounceWordsInReaderWhenClicked")}/>
                    </div>
                    <div className={"list-item"}>
                        <FormControlLabel style={{
                            userSelect: "none",
                            paddingRight: "16px",
                            paddingTop: "12px",
                            justifyContent: "space-between",
                            fontSize: "14px",
                            paddingBottom: "12px",
                            width: "calc(100% - 32px)",
                        }} labelPlacement={"start"} control={
                            <MaterialSwitch checked={pronounceInWordQuizEnabled} onChange={() => {
                                Settings.setPronounceInWordQuizEnabled(!pronounceInWordQuizEnabled);
                                setPronounceInWordQuizEnabled(!pronounceInWordQuizEnabled);
                                setSettingsSavedSnackBarOpened(true);
                            }} />
                        } label={getLocalizedString("pronounceWordsInExerciseWhenClicked")}/>
                    </div>
                    <div className={"list-item"}>
                        {/* Comply with free license for TS used. An attribution must be given. */}
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => {
                            window.open("https://responsivevoice.org/", "_blank");
                        }}><span>
                            {getLocalizedString("usedTTSEngine")}&nbsp;<b style={{
                                color: "#ffb81e",
                        }}>ResponsiveVoice</b>&nbsp;{getLocalizedString("licensedUnder")}&nbsp;<b style={{
                            color: "#ffb81e",
                        }}>CC BY-NC-ND 4.0</b>. {getLocalizedString("nonCommercialUsageIsPermitted")}
                        </span></button>
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
                        }}>{getLocalizedString("sectionDebugAndExperimental")}</h3>
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => onNewIntent("openai")}>{getLocalizedString("titleAISettings")}</button>
                    </div>
                    {/*<div className={"list-item"}>*/}
                    {/*    <button style={{*/}
                    {/*        width: "100%",*/}
                    {/*    }} className={"button-in-list-item"} onClick={() => onNewIntent("ttsdebug")}>TTS DEBUGER</button>*/}
                    {/*</div>*/}
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => setConfirmTelemetry(true)}>{getLocalizedString("btnSendTelemetry")}</button>
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => onNewIntent("setalpha")}>{getLocalizedString("titleSetAlphaProbability")}</button>
                    </div>
                </div>
            </div>
            <div style={{
                height: "24px",
            }} />
            {/*<div>*/}
            {/*    <button onClick={() => {*/}
            {/*        speakSample();*/}
            {/*    }}>Speak sample</button>*/}
            {/*    <button onClick={() => {*/}
            {/*        stopSample();*/}
            {/*    }}>Stop speaking sample</button>*/}
            {/*</div>*/}
            <p className={"app-info"}>{getLocalizedString("appVersion")} {packageJson.version}</p>
            <p className={"app-info"}>{getLocalizedString("appDeveloper")} <a className={"link"} href={"https://andrax.dev"}>AndraxDev</a></p>
            <p className={"app-info"}>&nbsp;</p>
        </div>
    );
}

SettingsFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default SettingsFragment;
