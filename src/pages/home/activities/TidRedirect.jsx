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
import AppScreenFade from "../../AppScreenFade";
import ArrowBack from "@mui/icons-material/ArrowBack";

function TidRedirect({onNewIntent}) {
    const [userDataKey, setUserDataKey] = React.useState(localStorage.getItem("userDataKey") || "");

    useEffect(() => {
        if (localStorage.getItem("userDataKey")) {
            localStorage.removeItem("userDataKey");
            window.location.replace("/home/3");
        } else {
            const baseUrl = "https://account.teslasoft.org/AccountPicker?ftpn=token&next="
            const currentHost = window.location.origin;
            const url = `${baseUrl}${currentHost}/id5`;
            window.location.replace(url);
        }
    }, [])

    const onBackPressed = () => {
        onNewIntent("/home/3")
    }

    const setToken = () => {
        localStorage.setItem("userDataKey", userDataKey);
        alert("User data key set successfully! Page will be reloaded.");
        window.location.reload();
    }

    const unsetToken = () => {
        localStorage.removeItem("userDataKey");
        alert("User data key unset successfully! Page will be reloaded.");
        window.location.reload();
    }

    return (
        <AppScreenFade>
            <div className={"activity-fullscreen"}>
                <div className={"exercise-header"}>
                    <button className={"exercise-back"} onClick={() => {
                        onBackPressed()
                    }}><ArrowBack /></button>
                    <h2 style={{
                        textAlign: "start"
                    }} className={"article-title"}>Intrandere cum Teslasoft ID</h2>
                </div>
                <div className={"list-container"} style={{
                    marginTop: "0",
                }}>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none",
                    }}>
                        Teslasoft ID is not currently supported in the web version for security reasons. Please use mobile app to sign in. If you see this message in the mobile app, please update it.
                    </div>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none",
                    }}>
                        You can still sync data from/to your Teslasoft account by inserting the Teslasoft ID user data key. You can find it in the mobile app debug screen. Please be advised, that user data key will grant this app access only to the remote account storage for this app. No other account data or other app storage will be shared. User data key is valid for 30 days if no activity is performed in the app. Otherwise, the key is extended and valid until the session is terminated from the other device, user is signed out, or account security action is triggered.
                    </div>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none",
                        color: "#ff6767",
                    }}>
                        WARNING: Set the key only if you know what are you doing (ex. you are developer). Inserting invalid credential may corrupt locally saved application data. Once you set the user data key, page will be updated and your state will be changed to signed in.
                    </div>
                </div>

                <div style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    paddingBottom: "24px",
                }}><textarea placeholder={"User data key"} onChange={(e) => setUserDataKey(e.target.value)} value={userDataKey} rows={6} className={"input"}></textarea>
                    <button className={"exercise-button exercise-button-neutral"} onClick={() => setToken()}>Set user data key</button>
                    <button className={"exercise-button exercise-button-incorrect"} onClick={() => unsetToken()}>Unset user data key</button>
                </div>
            </div>
        </AppScreenFade>
    );
}

TidRedirect.propTypes = {
    onNewIntent: PropTypes.func.isRequired
};

export default TidRedirect;