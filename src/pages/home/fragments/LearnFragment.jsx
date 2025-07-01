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

function LearnFragment({onNewIntent}) {
    return (
        <div className={"fragment"}>
            <h2 className={"activity-title"}>Learn</h2>
            <div style={{
                width: "calc(100% - 6px - 48px - 32px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                border: "3px solid #424242",
                borderRadius: "24px",
                margin: "24px",
                padding: "16px",
            }}>
                <h3 style={{
                    margin: "0",
                    userSelect: "none",
                }}>Demo content (debug)</h3>
                <button style={{
                    width: "calc(100% - 8px)",
                }} className={"exercise-button exercise-button-neutral"} onClick={() => {
                    onNewIntent("exercise");
                }}>
                    Start demo practice session
                </button>
            </div>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px"
            }}>
                <button className={"exercise-button exercise-button-neutral"} onClick={() => {
                    onNewIntent("practicewords");
                }}>
                    Practice words
                </button>
            </div>
        </div>
    );
}

LearnFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default LearnFragment;
