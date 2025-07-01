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
import {MaterialTooltip} from "../MaterialTooltip";

/*
* Learning index defines how well the user knows the word. More times user repeat the word, the highest index will be.
* Index is used to mark the words user know and show user part of the text he probably doesn't know.
* Index equal to -1 disables the colored underline.
* */
function InteractiveWord({word, translations, learningIndex}) {
    const [translationIsOpened, setTranslationIsOpened] = React.useState(false);
    return (
        <MaterialTooltip
            arrow
            leaveTouchDelay={2147483647}
            open={translationIsOpened}
            onClose={() => setTranslationIsOpened(false)}
            title={<div>{
            translations?.map((translation, index) => {
                return (
                    <div key={index} className={"translation-item"}>
                        {translation}
                    </div>
                );
            })
        }</div>}>
            <button onClick={() => setTranslationIsOpened(true)} className={"word-regular"}>{word}</button>
        </MaterialTooltip>
    );
}

InteractiveWord.propTypes = {
    word: PropTypes.string.isRequired,
    translations: PropTypes.arrayOf(PropTypes.string).isRequired,
    learningIndex: PropTypes.number
}

export default InteractiveWord;
