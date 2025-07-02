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
import AppScreenFade from "../../AppScreenFade";
import PropTypes from "prop-types";
import * as Settings from "../../../Settings";
import * as StringUtil from "../../util/StringUtils";

function AddStoryActivity({onNewIntent}) {
    const [word, setWord] = React.useState("");
    const [translation, setTranslation] = React.useState("");

    const onBackPressed = () => {
        onNewIntent("/practicewords")
    }

    const save = () => {
        Settings.addWeakWord(StringUtil.clearWord(word), StringUtil.clearWord(translation))
        onNewIntent("/practicewords");
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
                    }} className={"article-title"}>Add new word to practice</h2>
                </div>
                <div className={"list-container"} style={{
                    width: "calc(100% - 54px)",
                    marginTop: "0",
                    marginBottom: "0"
                }}>
                    <div style={{
                        userSelect: "none"
                    }} className={"list-item translation-item"}>
                        Existing words will be overridden with new values.
                    </div>
                </div>
                <br/>
                <div className={"activity-content-container"}>
                    <div className={"field-container"}>
                        <input value={word} onChange={(e) => {
                            setWord(e.target.value);
                        }} placeholder={"Word"} className={"input"}/>
                    </div>
                    <div style={{
                        flexGrow: 1,
                        height: "100%",
                    }} className={"field-container"}>
                        <input value={translation} onChange={(e) => {
                            setTranslation(e.target.value);
                        }} placeholder={"Translation"} className={"input"}/>
                    </div>
                </div>
                <div className={"exercise-bottom-bar"}>
                    <button disabled={StringUtil.clearWord(word) === "" || StringUtil.clearWord(translation) === ""} className={"exercise-button exercise-button-" + ((StringUtil.clearWord(word) === "" || StringUtil.clearWord(translation) === "") ? "disabled" : "neutral")} onClick={save}>Save</button>
                </div>
            </div>
        </AppScreenFade>
    );
}

AddStoryActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default AddStoryActivity;
