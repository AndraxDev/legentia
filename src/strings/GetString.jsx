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

import {enUS} from "./String-EN-US.jsx";

export const getString = (lang, id) => {
    if (lang === 'en-US') {
        return enUS[id];
    } else {
        return enUS[id];
    }
}

export const getLocalizedString = (id) => {
    const lang = getLanguage();
    return getString(lang, id);
}

// The current language of the app UI (ISO format)
export const getLanguage = () => {
    return 'en-US';
}

// the language user learns (semantic format)
export const getLearningLanguage = () => {
    return "latin";
}

// the language user speaks natively (semantic format)
export const getNativeLanguage = () => {
    return "english";
}

export const supportedLearningLanguages = {
    latin: "Latin (Lingua Latina)",
}

export const supportedNativeLanguages = {
    english: "English",
}

export const supportedLanguages = {
    'en-US': 'English (US)',
}
