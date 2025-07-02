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

import * as VocabularyCache from "./VocabularyCache";
import OpenAI from 'openai';
import * as StringUtils from "./util/StringUtils";
import * as Settings from "../Settings";

const prompt = `
Act a latin-to-english word translator. Use will input a single latin word, and you will output a single english word in a correct form according to the context sentence provided and considering the writing style used in the sentence provided (artistic, scientific, etc.) (all letters are lowercase) and nothing else. If user provides an unknown word, try to answer the nearest correct english word. If user enters absolutely random sequence of character, the answer "word_unknown" and nothing else. Try to use most appropriate word. If user input is empty or it contains only punctuation marks or quotes, answer "word_unknown" and nothing else. Context sentence is: 
`

const runAI = async (latinWord, apiKey, context) => {
    const aiPrompt = prompt + context + "\n\nWord to translate is: " + StringUtils.clearWord(latinWord);

    const client = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
    });

    const completion = await client.chat.completions.create({
        model: Settings.getModel() || 'o4-mini',
        messages: [
            { role: 'user', content: aiPrompt },
        ],
    });

    return completion.choices[0].message.content.trim();
}

export const translate = (latinWord, context) => {
    return new Promise((resolve, reject) => {
        const translation = VocabularyCache.translateLocal(latinWord)

        if (translation) {
            resolve(translation);
        } else {
            const apiKey = localStorage.getItem("openai");

            if (!apiKey) {
                reject(new Error("ai_unavailable"));
            } else {
                runAI(latinWord, apiKey, context).then(r => {
                    if (r.includes("word_unknown")) {
                        reject(new Error(`word_unknown`));
                    } else {
                        let parsed = latinWord.toLowerCase().replaceAll("the word to translate is:", "").trim();
                        VocabularyCache.insertWord(StringUtils.clearWord(parsed), [StringUtils.clearWord(r)]);
                        resolve(StringUtils.clearWord(r));
                    }
                }).catch(() => {
                    reject(new Error("ai_unavailable"));
                });
            }
        }
    });
}
