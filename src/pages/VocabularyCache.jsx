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

export const getVocabulary = () => {
    const localVocabulary = localStorage.getItem('vocabulary');
    return JSON.parse(localVocabulary) || {};
}

export const translateLocal = (latinWord) => {
    const vocabulary = getVocabulary();
    const translation = vocabulary[latinWord];
    if (translation && translation.length > 0) {
        if (translation[0].includes("word_unknown")) {
            return [latinWord.toLowerCase().replace("the word to translate is:", "").trim()];
        } else {
            return [translation[0].toLowerCase().replace("the word to translate is:", "").trim()];
        }
    } else {
        return null
    }
}

export const convertVocabulary = (verbose) => {
    const vocabulary = getVocabulary();

    // Check if vocabulary is an array or an object
    // New format is an object
    if (Array.isArray(vocabulary)) {
        let newVocabulary = {};

        vocabulary.forEach((item) => {
            let word = Object.keys(item)[0];
            let translation;

            if (word) {
                translation = item[word];
            }

            if (translation && translation.length > 0) {
                newVocabulary[word] = translation;
            }
        })

        localStorage.setItem("vocabulary", JSON.stringify(newVocabulary));

        if (verbose) {
            console.log(newVocabulary);
            console.log("Vocabulary has been converted to the new format.");
        }
    } else {
        if (verbose) {
            console.log("You have already new vocabulary format. No conversion is needed.")
        }
    }
}

export const insertWord = (latinWord, englishWords) => {
    const vocabulary = getVocabulary();

    vocabulary[latinWord] = englishWords

    localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
}

export const deleteWord = (latinWord) => {
    const vocabulary = getVocabulary();
    delete vocabulary[latinWord];
    localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
}
