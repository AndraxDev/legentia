import * as VocabularyCache from "./VocabularyCache";
import OpenAI from 'openai';

const prompt = `
Act a latin-to-english word translator. Use will input a single latin word, and you will output a single english word (all letters are lowercase) and nothing else. If user provides an unknown word, try to answer the nearest correct english word. If user enters absolutely random sequence of character, the answer "word_unknown" and nothing else. The first word is: 
`

const runAI = async (latinWord, apiKey) => {
    const aiPrompt = prompt + latinWord;
    const client = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
    });

    const completion = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'developer', content: aiPrompt },
        ],
    });

    return completion.choices[0].message.content.trim();
}

export const translate = (latinWord) => {
    return new Promise((resolve, reject) => {
        const translation = VocabularyCache.translateLocal(latinWord)

        if (translation) {
            resolve(translation);
        } else {
            const apiKey = localStorage.getItem("openai");

            if (!apiKey) {
                reject(new Error("AI features are disabled. Please set an API key."));
            } else {
                runAI(latinWord, apiKey).then(r => {
                    if (r === "word_unknown") {
                        reject(new Error(`Translation for "${latinWord}" not found`));
                    } else {
                        VocabularyCache.insertWord(latinWord, [r]);
                        resolve(r);
                    }
                });
            }
        }
    });
}