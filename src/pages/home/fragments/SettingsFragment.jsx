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

import React from 'react';
import PropTypes from "prop-types";
import packageJson from './../../../../package.json';

// onNewIntent is analog to android.content.Context.java in Android OS. It is passed hierarchically through all
// components that need to access base application to handle activity launching.
function SettingsFragment({onNewIntent}) {


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
                <button className={"exercise-button exercise-button-neutral"} onClick={() => onNewIntent("openai")} >Edit AI API Key (debug)</button>
                <button className={"exercise-button exercise-button-neutral"} onClick={() => onNewIntent("privacy")} >Data Controls</button>
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
