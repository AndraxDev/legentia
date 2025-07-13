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

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}

let generatedUuid = uuidv4();

function AddStoryActivity({onNewIntent}) {
    const hash = window.location.hash.replace("#", "");

    const storyId = hash === "" ? generatedUuid : hash;

    const [title, setTitle] = React.useState(Settings.getStory(storyId).title || "");
    const [text, setText] = React.useState(Settings.getStory(storyId).text || "");

    const onBackPressed = () => {
        onNewIntent("/home/2")
    }

    const save = () => {
        Settings.addStory(title, text, storyId);
        generatedUuid = uuidv4();
        onNewIntent("/home/2");
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
                    }} className={"article-title"}>{hash === "" ? "FABVLAM NOVAM ADDE" : "FABVLAM RECENSE"}</h2>
                </div>
                <div className={"activity-content-container"}>
                    <div className={"field-container"}>
                        <input value={title} onChange={(e) => {
                            setTitle(e.target.value);
                        }} placeholder={"TITVLVM"} className={"input"}/>
                    </div>
                    <div style={{
                        flexGrow: 1,
                        height: "100%",
                    }} className={"field-container"}>
                        <textarea value={text} onChange={(e) => {
                            setText(e.target.value);
                        }} style={{
                            height: "calc(100% - 48px)"
                        }} placeholder={"TEXTVS"} className={"input"}></textarea>
                    </div>
                </div>
                <div className={"exercise-bottom-bar"}>
                    <button disabled={text.trim() === "" || title.trim() === ""} className={"exercise-button exercise-button-" + ((text.trim() === "" || title.trim() === "") ? "disabled" : "neutral")} onClick={save}>SERVA EXIQVE</button>
                </div>
            </div>
        </AppScreenFade>
    );
}

AddStoryActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default AddStoryActivity;
