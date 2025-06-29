const getString = (key, defaultValue) => {
    const value = localStorage.getItem(key);
    return value !== null ? value : defaultValue;
}

const setString = (key, value) => {
    localStorage.setItem(key, value);
}

const deleteString = (key) => {
    localStorage.removeItem(key);
}

export const isSetupCompleted = () => {
    return getString('setupCompleted', 'false') === 'true';
}

export const setSetupCompleted = () => {
    setString('setupCompleted', 'true');
}

export const getSavedStories = () => {
    const stories = localStorage.getItem('stories');
    return stories ? JSON.parse(stories) : {};
}

export const getStory = (id) => {
    const stories = getSavedStories();
    return stories[id] || {
        title: "",
        text: ""
    };
}

export const deleteStory = (id) => {
    const stories = getSavedStories();
    delete stories[id];
    setString('stories', JSON.stringify(stories));
}

export const addStory = (title, text, id) => {
    const stories = getSavedStories();
    stories[id] = { title: title, text: text };
    setString('stories', JSON.stringify(stories));
}

export const getWeakWords = () => {
    const weakWords = localStorage.getItem('weakWords');
    return weakWords ? JSON.parse(weakWords) : {};
}

export const addWeakWord = (word, translation) => {
    const weakWords = getWeakWords();
    weakWords[word] = translation;
    setString('weakWords', JSON.stringify(weakWords));
}

export const deleteWeakWord = (word) => {
    const weakWords = getWeakWords();
    delete weakWords[word];
    setString('weakWords', JSON.stringify(weakWords));
}

export const clearAppData = () => {
    localStorage.clear();
    window.location.replace('/');
}