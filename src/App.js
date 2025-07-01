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

import './App.css';
import * as Settings from "./Settings";
import Home from "./pages/home/Home";
import Setup from "./pages/setup/Setup";
import {useEffect, useState} from "react";
import ExerciseActivity from "./pages/home/activities/ExerciseActivity";
import SetApiKeyActivity from "./pages/home/activities/SetApiKeyActivity";
import {useLocation, useNavigate} from "react-router-dom";
import ArticleActivity from "./pages/home/activities/ArticleActivity";
import AddStoryActivity from "./pages/home/activities/AddStoryActivity";
import TranslationQuiz from "./pages/home/activities/TranslationQuiz";
import WordsActivity from "./pages/home/activities/WordsActivity";
import DataControls from "./pages/home/activities/DataControls";
import AddWordActivity from "./pages/home/activities/AddWordActivity";
import TidRedirect from "./pages/home/activities/TidRedirect";
import SyncActivity from "./pages/home/activities/SyncActivity";

let contextInitialized = false;

// This function is analog to android.app.Application.java in Android OS
function App() {
    const location = useLocation();
    const [currentActivity, setCurrentActivity] = useState(location.pathname.split("/")[1] || "home");
    const navigate = useNavigate();

    useEffect(() => {
        const locationActivity = location.pathname.split("/")[1];
        if (locationActivity === "setup") {
            navigate("/")
        } else if (contextInitialized) {
            setCurrentActivity(locationActivity);
        } else {
            contextInitialized = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const addActivityToStack = (activity) => {
        if (activity.startsWith("/")) {
            navigate(activity);
        } else {
            navigate("/" + activity);
        }
    }

    // All activities must be registered here like in AndroidManifest.xml in Android OS
    // This method manages current activity
    const getActivity = () => {
        switch (currentActivity) {
            case "home":
                return <Home onNewIntent={addActivityToStack} />;
            case "read":
                return <ArticleActivity onNewIntent={addActivityToStack} />;
            case "addstory":
                return <AddStoryActivity onNewIntent={addActivityToStack} />;
            case "addword":
                return <AddWordActivity onNewIntent={addActivityToStack} />;
            case "exercise":
                return <ExerciseActivity onNewIntent={addActivityToStack} />;
            case "quiz":
                return <TranslationQuiz onNewIntent={addActivityToStack} />;
            case "practicewords":
                return <WordsActivity onNewIntent={addActivityToStack} />;
            case "privacy":
                return <DataControls onNewIntent={addActivityToStack} />;
            case "openai":
                return <SetApiKeyActivity onNewIntent={addActivityToStack} />;
            case "tid":
                return <TidRedirect onNewIntent={addActivityToStack} />;
            case "sync":
                return <SyncActivity onNewIntent={addActivityToStack} />;
            default:
                return <Home onNewIntent={addActivityToStack} />;
        }
    }

    return (Settings.isSetupCompleted() ? getActivity() : <Setup />);
}

export default App;
