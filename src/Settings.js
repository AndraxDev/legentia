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

export const removeWeakWord = (word) => {
    const weakWords = getWeakWords();
    if (weakWords[word]) {
        delete weakWords[word];
        setString('weakWords', JSON.stringify(weakWords));
    }
}

export const deleteWeakWord = (word) => {
    const weakWords = getWeakWords();
    delete weakWords[word];
    setString('weakWords', JSON.stringify(weakWords));
}

export const clearWeakWords = () => {
    deleteString('weakWords');
}

export const clearAppData = () => {
    localStorage.clear();
    window.location.replace('/');
}

export const getUserId = () => {
    let userDataKey = localStorage.getItem('userDataKey');

    if (!userDataKey) {
        return "";
    }

    let jwtParts = userDataKey ? userDataKey.split('.') : [];
    let payload = jwtParts.length > 1 ? JSON.parse(atob(jwtParts[1])) : null;
    return payload.uid || "";
}

export const hasUserDataKey = () => {
    return localStorage.getItem('userDataKey') !== null;
}

export const setModel = (model) => {
    setString('openaiModel', model);
}

export const getModel = () => {
    return getString('openaiModel', 'tts-1-hd');
}