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
import AppScreenFade from "../../AppScreenFade";
import PropTypes from "prop-types";
import ReadingText from "../../../components/interactive-phrase/ReadingText";
import * as Settings from "../../../Settings";
import * as StringUtiles from "../../util/StringUtils";

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
                    <ReadingText article={StringUtiles.reduceNewLinesToOne(story.text).replaceAll("\n", " {{}} ")} />
                </div>
            </div>
        </AppScreenFade>
    );
}

ArticleActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default ArticleActivity;
