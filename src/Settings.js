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

export const clearAppData = () => {
    localStorage.clear();
    window.location.replace('/');
}