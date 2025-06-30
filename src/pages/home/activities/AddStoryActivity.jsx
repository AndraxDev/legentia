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
                    }} className={"article-title"}>{hash === "" ? "Add new story" : "Edit story"}</h2>
                </div>
                <div className={"activity-content-container"}>
                    <div className={"field-container"}>
                        <input value={title} onChange={(e) => {
                            setTitle(e.target.value);
                        }} placeholder={"Title"} className={"input"}/>
                    </div>
                    <div style={{
                        flexGrow: 1,
                        height: "100%",
                    }} className={"field-container"}>
                        <textarea value={text} onChange={(e) => {
                            setText(e.target.value);
                        }} style={{
                            height: "calc(100% - 48px)"
                        }} placeholder={"Text"} className={"input"}></textarea>
                    </div>
                </div>
                <div className={"exercise-bottom-bar"}>
                    <button disabled={text.trim() === "" || title.trim() === ""} className={"exercise-button exercise-button-" + ((text.trim() === "" || title.trim() === "") ? "disabled" : "neutral")} onClick={save}>Save</button>
                </div>
            </div>
        </AppScreenFade>
    );
}

AddStoryActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default AddStoryActivity;