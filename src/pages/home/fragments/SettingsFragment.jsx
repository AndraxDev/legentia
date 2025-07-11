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
                        setError("Failed to send telemetry data: " + json.message);
                        setErrorDialogOpen(true);
                    }
                })
                .catch(err => {
                    console.error("Error sending telemetry data: ", err);
                    setError("Failed to send telemetry data: " + err.message);
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
                    OMNES OPTIONES SERVATAE!
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={telemetrySnackBarIsOpen} autoHideDuration={3000} onClick={() => setTelemetrySnackBarIsOpen(false)}>
                <Alert onClose={() => setTelemetrySnackBarIsOpen(false)}
                       severity="success"
                       sx={{ userSelect: "none", width: '100%', background: "#285c4e", borderRadius: "16px", boxShadow: "none", border: "none" }}
                       variant="filled">
                    Telemetry sent successfully!
                </Alert>
            </Snackbar>
            <MaterialDialog
                open={errorDialogOpen}
                onClose={() => setErrorDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Error"}
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
                        Ok
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
            <h2 className={"activity-title"}>OPTIONES</h2>
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
                                    <p className={"teslasoft-id-title"}>TESLASOFT ID</p>
                                    <p className={"profile-name"}>INITIVM FECISTI VT <b>{userData.first_name}</b></p>
                                </div>
                            </div> : <>
                            {
                                errorAccount ? <div className={"profile-info-container"}>
                                    <div className={"profile-photo"}></div>
                                    <div className={"profile-text"}>
                                        <p className={"teslasoft-id-title"}>Teslasoft ID</p>
                                        <p className={"sync-error-text"}>SYNC ERROR</p>
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
                                <p className={"teslasoft-id-title"}>TESLASOFT ID</p>
                                <p className={"profile-name"}>TANGE AD INTRANDVM</p>
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
                        }} disabled={!userData} className={"button-in-list-item"} onClick={() => onNewIntent("sync")}>OPTIONES INTER APPARATVS SYNC</button>
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => onNewIntent("privacy")}>DATA POTESTATE</button>
                    </div>
                    <div className={"list-item"}>
                        <FormControlLabel style={{
                            userSelect: "none",
                            paddingRight: "16px",
                            paddingTop: "12px",
                            paddingBottom: "12px",
                            width: "calc(100% - 32px)",
                        }} labelPlacement={"start"} control={
                            <MaterialSwitch checked={pronounceInReaderEnabled} onChange={() => {
                                Settings.setPronounceInReaderEnabled(!pronounceInReaderEnabled);
                                setPronounceInReaderEnabled(!pronounceInReaderEnabled);
                                setSettingsSavedSnackBarOpened(true);
                            }} />
                        } label={"VERBA IN LECTORE PRONVNTIA SEMEL CLICCATA"}/>
                    </div>
                    <div className={"list-item"}>
                        <FormControlLabel style={{
                            userSelect: "none",
                            paddingRight: "16px",
                            paddingTop: "12px",
                            paddingBottom: "12px",
                            width: "calc(100% - 32px)",
                        }} labelPlacement={"start"} control={
                            <MaterialSwitch checked={pronounceInWordQuizEnabled} onChange={() => {
                                Settings.setPronounceInWordQuizEnabled(!pronounceInWordQuizEnabled);
                                setPronounceInWordQuizEnabled(!pronounceInWordQuizEnabled);
                                setSettingsSavedSnackBarOpened(true);
                            }} />
                        } label={"VERBA IN PENSVM VERBORVM PRONVNTIA SEMEL CLICCATA"}/>
                    </div>
                    <div className={"list-item"}>
                        {/* Comply with free license for TS used. An attribution must be given. */}
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => {
                            window.open("https://responsivevoice.org/", "_blank");
                        }}><span>
                            TTS EX&nbsp;<b style={{
                                color: "#ffb81e",
                        }}>ResponsiveVoice</b>&nbsp;LICENTIATVS SVB&nbsp;<b style={{
                            color: "#ffb81e",
                        }}>CC BY-NC-ND 4.0</b>&nbsp;(VSVS NON COMMERCIALIS PERMITITVR EST)
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
                        }}>DEBUG ET EXPERIMENTI</h3>
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => onNewIntent("openai")}>OPTIONES NAM AI</button>
                    </div>
                    {/*<div className={"list-item"}>*/}
                    {/*    <button style={{*/}
                    {/*        width: "100%",*/}
                    {/*    }} className={"button-in-list-item"} onClick={() => onNewIntent("ttsdebug")}>TTS DEBUGER</button>*/}
                    {/*</div>*/}
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => setConfirmTelemetry(true)}>MITTE TELEMETRIAM</button>
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "100%",
                        }} className={"button-in-list-item"} onClick={() => onNewIntent("setalpha")}>SET ALPHA PROBABILITATIS</button>
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
            <p className={"app-info"}>LEGENTIA VERSIONIS: {packageJson.version}</p>
            <p className={"app-info"}>EXCVLTOR: <a className={"link"} href={"https://andrax.dev"}>AndraxDev</a></p>
            <p className={"app-info"}>&nbsp;</p>
        </div>
    );
}

SettingsFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default SettingsFragment;
