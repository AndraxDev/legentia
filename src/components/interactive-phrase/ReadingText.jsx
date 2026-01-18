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
import PropTypes from "prop-types";
import InteractiveWordReading from "./InteractiveWordReading";
import * as Settings from "../../Settings";

function ReadingText({article}) {
    const punctuationMarks = article.match(/[.!?]/g) || [];
    const sentences = article.replace("!", ".").replace("?", ".").replace("\n", " ").split(".");
    const [weakWords, setWeakWords] = React.useState(Object.keys(Settings.getWeakWords()));

    const onWordAddedToWeak = () => {
        setWeakWords(Object.keys(Settings.getWeakWords()))
    }

    return (
        <div className={"phrase-interactive"}>
            {
                sentences?.map((sentence, ix) => {
                    const sentencePurified = sentence.split(" ").filter(w => w.toString().trim() !== "");
                    return (
                        sentencePurified.map((word, index) => {
                            const pu = punctuationMarks[ix] === undefined ? "" : punctuationMarks[ix];
                            return (
                                <InteractiveWordReading
                                    propagateWordUpdate={onWordAddedToWeak}
                                    weakWords={weakWords}
                                    word={index === sentencePurified.length - 1 ? word + pu : word} key={word + index.toString()}
                                    contextSentence={sentence + pu}
                                    previousWord={index > 0 ? sentencePurified[index - 1] : ""}/>
                            );
                        })
                    )
                })
            }
        </div>
    );
}

ReadingText.propTypes = {
    article: PropTypes.object.isRequired
};

export default ReadingText;
