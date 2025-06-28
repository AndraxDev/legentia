/*
* Vocabulary has the following format:
*
* [
*    {
*       "latin word": ["english word1", "english word2", ...],
*    },
*   ...
* ]
*
* Thus, the vocabulary cannot contain multiple translations for the same word.
* */

export const getVocabulary = () => {
    const localVocabulary = localStorage.getItem('vocabulary');
    return JSON.parse(localVocabulary) || [];
}

export const translateLocal = (latinWord) => {
    const vocabulary = getVocabulary();
    const translation = vocabulary.find(item => item[latinWord]);
    if (translation)
        return translation[latinWord];
    else
        return null
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