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