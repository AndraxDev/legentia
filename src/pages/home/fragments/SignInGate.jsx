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
import {getLocalizedString} from "../../../strings/GetString.jsx";
import logo from "../../../logo.png";
import {MaterialProgressBar} from "../../../components/MaterialProgressBar.jsx";
import AppScreenFade from "../../AppScreenFade.jsx";

function SignInGate() {
    return (
        <AppScreenFade>
            <div className={"activity-fullscreen"}>
                <div className={"exercise-header"}>
                    <button className={"exercise-back"}><img alt={getLocalizedString("appTitle")} style={{
                        width: "24px",
                        height: "24px",
                    }} src={logo} /></button>
                    <h2 style={{
                        textAlign: "start"
                    }} className={"article-title"}>{getLocalizedString("pleaseWait")}</h2>
                </div>
                <div className={"list-container"}>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "start",
                        gap: "16px",
                    }}>
                        <MaterialProgressBar />
                        <p style={{
                            padding: "0",
                            margin: "0",
                        }}>{getLocalizedString("pleaseWaitSignIn")}</p>
                    </div>
                </div>
            </div>
        </AppScreenFade>
    );
}

export default SignInGate;
