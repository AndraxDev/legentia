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

export const enUS = {
    errorAIFeaturesDisabled: "AI features are disabled. Please set an API key first.",
    errorTranslationNotAvailable: "Translation is not available right now.",
    voiceModelName: "", // "Latin Male" for latin language
    infoWordAddedToPracticeList: "Word added to practice list.",
    infoWordRemovedFromPracticeList: "Word removed from practice list.",
    textWeakWord: "Weak word",
    btnDeleteFromPracticeList: "Delete from practice list",
    btnAddToPracticeList: "Add to practice list",
    btnAddToVocabularyList: "Add to personal vocabulary",
    bottomMenuHome: "Home",
    bottomMenuStudy: "Study",
    bottomMenuRead: "Read",
    bottomMenuSettings: "Settings",
    btnAddStory: "Add Story",
    btnEditStory: "Edit Story",
    textTitle: "Title",
    textStoryContent: "Story Content",
    btnSaveAndExit: "Save and Exit",
    overrideWordWarning: "Existing word entry will be overridden.",
    textOriginalWord: "Original Word",
    textEnglishWord: "English Word",
    infoAlphaSetToZero: "Alpha set to zero (0.0).",
    infoAlphaSetToZeroDotOne: "Alpha set to low (0.1).",
    titleSetAlphaProbability: "Set Alpha Probability",
    textAlphaProbabilityInfo: "Alpha defines how exercise algorithm will select words for practising. By default words selection algorithm prioritizes words that have the less learning index (have been practised less times). Alpha parameter adds some chance to select words with the maximum learning index. If alpha is set to zero, then words with the maximum learning index will appear only when the whole words list has been practised.",
    textCurrentAlphaProbability: "The probability of selecting the word in the current exercise is:",
    btnSetAlphaToZero: "Click to set alpha to low (0.1) (better for large word practice lists, words with max learning index will have small chance of appearing in the exercises to prevent user from forgetting it).",
    btnSetAlphaToZeroDotOne: "Click to set alpha to zero (0.0) (better for small word practice lists, all words must be practised until it will repeat).",
    noteOperationCompleted: "Operation completed successfully.",
    btnClearWordPracticeList: "Clear Word Practice List?",
    noteClearWordPracticeListWarning: "This action is irreversible and will remove all words from your practice list. You will need to add words again to practice them.",
    btnCancel: "Cancel",
    btnClear: "Clear",
    btnClearVocabulary: "Clear local vocabulary?",
    noteClearVocabularyWarning: "Clearing local vocabulary will removed all cached translations and will require Internet connection next time you tap the word to translate it. Additionally, uncached words will use AI models which may incur additional charges. Clear local vocabulary if you see incorrect or unusual translations.",
    btnClearAppData: "Clear all app data?",
    noteClearAppDataWarning: "Clearing app data will remove all local data, including lesson progresses, streak, local vocabulary, learned words, saved articles, etc.",
    titleDataControls: "Data Controls",
    clearVocabulary: "Clear Vocabulary",
    clearAppData: "Clear App Data",
    clearWordPracticeList: "Clear Word Practice List",

}
