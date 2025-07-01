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

export const getVocabulary = () => {
    const localVocabulary = localStorage.getItem('vocabulary');
    return JSON.parse(localVocabulary) || [];
}

export const translateLocal = (latinWord) => {
    const vocabulary = getVocabulary();
    const translation = vocabulary.find(item => item[latinWord]);
    if (translation) {
        if (translation[latinWord][0].includes("word_unknown")) {
            return [latinWord.toLowerCase().replace("the word to translate is:", "").trim()];
        } else {
            return [translation[latinWord][0].toLowerCase().replace("the word to translate is:", "").trim()];
        }
    } else {
        return null
    }
}

export const insertWord = (latinWord, englishWords) => {
    const vocabulary = getVocabulary();

    vocabulary.filter((item) => {
        const existingWords = Object.keys(item)[0];
        return existingWords !== latinWord;
    })

    vocabulary.push({
        [latinWord]: englishWords
    });

    localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
}
