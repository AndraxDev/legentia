import React from 'react';
import AppScreenFade from "../../AppScreenFade";
import PropTypes from "prop-types";
import * as Settings from "../../../Settings";

function AddStoryActivity({onNewIntent}) {
    const [word, setWord] = React.useState("");
    const [translation, setTranslation] = React.useState("");

    const onBackPressed = () => {
        onNewIntent("/practicewords")
    }

    const save = () => {
        Settings.addWeakWord(word, translation)
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
                    <button disabled={word.trim() === "" || translation.trim() === ""} className={"exercise-button exercise-button-neutral"} onClick={save}>Save</button>
                </div>
            </div>
        </AppScreenFade>
    );
}

AddStoryActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default AddStoryActivity;