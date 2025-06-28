import * as VocabularyCache from "./VocabularyCache";
import OpenAI from 'openai';

const prompt = `
Act a latin-to-english word translator. Use will input a single latin word, and you will output a single english word in a correct form according to the context sentence provided and considering the writing style used in the sentence provided (artistic, scientific, etc.) (all letters are lowercase) and nothing else. If user provides an unknown word, try to answer the nearest correct english word. If user enters absolutely random sequence of character, the answer "word_unknown" and nothing else. Try to use most appropriate word. Context sentence is: 
`

const runAI = async (latinWord, apiKey, context) => {
    const aiPrompt = prompt + context + "\n\nWord to translate is: " + latinWord;

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

export const translate = (latinWord, context) => {
    return new Promise((resolve, reject) => {
        const translation = VocabularyCache.translateLocal(latinWord)

        if (translation) {
            resolve(translation);
        } else {
            const apiKey = localStorage.getItem("openai");

            if (!apiKey) {
                reject(new Error("AI features are disabled. Please set an API key."));
            } else {
                runAI(latinWord, apiKey, context).then(r => {
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