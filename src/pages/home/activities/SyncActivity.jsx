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
import AppScreenFade from "../../AppScreenFade";

function SyncActivity({onNewIntent}) {
    const onBackPressed = () => {
        onNewIntent("/home/3")
    }

    return (
        <AppScreenFade>
            <div className={"activity-fullscreen"}>
                <div className={"exercise-header"}>
                    <button className={"exercise-back"} onClick={() => {
                        onBackPressed()
                    }}><span className={"material-symbols-outlined"}>arrow_back</span></button>
                    <h2 style={{
                        textAlign: "start"
                    }} className={"article-title"}>Sync settings</h2>
                </div>
                <div className={"list-container"}>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none",
                    }}>
                        // To be implemented...
                    </div>
                </div>
            </div>
        </AppScreenFade>
    );
}

SyncActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default SyncActivity;