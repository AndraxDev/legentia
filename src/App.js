import './App.css';
import * as Settings from "./Settings";
import Home from "./pages/home/Home";
import Setup from "./pages/setup/Setup";
import {useEffect, useState} from "react";
import ExerciseActivity from "./pages/home/activities/ExerciseActivity";
import SetApiKeyFragment from "./pages/home/activities/SetApiKeyFragment";
import {useLocation, useNavigate} from "react-router-dom";

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
    }, [location]);

    const addActivityToStack = (activity) => {
        navigate("/" + activity);
    }

    // All activities must be registered here like in AndroidManifest.xml in Android OS
    // This method manages current activity
    const getActivity = () => {
        switch (currentActivity) {
            case "home":
                return <Home onNewIntent={addActivityToStack} />;
            case "exercise":
                return <ExerciseActivity onNewIntent={addActivityToStack} />;
            case "openai":
                return <SetApiKeyFragment onNewIntent={addActivityToStack} />;
            default:
                return <Home onNewIntent={addActivityToStack} />;
        }
    }

    return (Settings.isSetupCompleted() ? getActivity() : <Setup />);
}

export default App;
