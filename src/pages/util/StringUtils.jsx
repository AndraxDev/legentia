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

export const clearWord = (word) => {
    if (word === undefined) return ""
    return trimChars((word || "").toString().toLowerCase()
        .replaceAll(",", "")
        .replaceAll(".", "")
        .replaceAll("?", "")
        .replaceAll("!", "")
        .replaceAll(":", "")
        .replaceAll("\"", "")
        .replaceAll("/", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll("_", "")
        .replaceAll("–", "")
        .replaceAll("”", "")
        .replaceAll("“", "")
        .replaceAll(";", "")
        .replaceAll("*", "")
        .replaceAll("%", "")
        .replaceAll("@", "")
        .replaceAll("#", "")
        .replaceAll("^", "")
        .trim(), "-")

    // Apostrophes and dashes can be part of the word so they are permitted.
}

function trimChars(str, chars) {
    const escaped = chars.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'); // escape special regex chars
    const regex = new RegExp(`^[${escaped}]+|[${escaped}]+$`, 'g');
    return str.replace(regex, '');
}


export const reduceNewLinesToOne = (text) => {
    // return text.replaceAll(/\n+/g, "\n").trim();
    return text.trim();
}