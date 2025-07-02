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

// onNewIntent is analog to android.content.Context.java in Android OS. It is passed hierarchically through all
// components that need to access base application to handle activity launching.
function SettingsFragment({onNewIntent}) {

    const [userData, setUserData] = React.useState(null);
    const [errorAccount, setErrorAccount] = React.useState(false);

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

    return (
        <div className={"fragment"}>
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
                        <button disabled={!userData} className={"button-in-list-item"} onClick={() => onNewIntent("sync")}>Sync settings between devices</button>
                    </div>
                    <div className={"list-item"}>
                        <button className={"button-in-list-item"} onClick={() => onNewIntent("privacy")}>Data controls</button>
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
                            width: "calc(100% - 8px)",
                        }} className={"button-in-list-item"} onClick={() => onNewIntent("openai")}>AI Settings (debug)</button>
                    </div>
                    <div className={"list-item"}>
                        <button style={{
                            width: "calc(100% - 8px)",
                        }} className={"button-in-list-item"} onClick={() => onNewIntent("ttsdebug")}>TTS Debug (debug)</button>
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
