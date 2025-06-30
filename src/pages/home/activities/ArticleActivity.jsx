import React from 'react';
import AppScreenFade from "../../AppScreenFade";
import PropTypes from "prop-types";
import ReadingText from "../../../components/interactive-phrase/ReadingText";
import * as Settings from "../../../Settings";

function ArticleActivity({onNewIntent}) {

    const story = Settings.getStory(window.location.hash.replace("#", ""));

    const quitReading = () => {
        onNewIntent("/home/2");
    }

    return (
        <AppScreenFade>
            <div className={"activity-fullscreen"}>
                <div className={"exercise-header"}>
                    <button className={"exercise-back"} onClick={() => {
                        quitReading()
                    }}><span className={"material-symbols-outlined"}>arrow_back</span></button>
                </div>
                <h2 className={"article-title"}>{story.title}</h2>
                <div style={{
                    padding: "24px"
                }}>
                    <ReadingText article={story.text} />
                </div>
            </div>
        </AppScreenFade>
    );
}

ArticleActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default ArticleActivity;