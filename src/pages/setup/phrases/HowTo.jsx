import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {MaterialButton} from "../../../components/MaterialButton";

function HowTo({onStepCompleted}) {
    useEffect(() => {
        setTimeout(() => {
            document.getElementById("app-screen").style.opacity = "1";
            document.getElementById("app-screen").style.transform = "translateX(0%)";
        }, 50)
    }, []);

    const handleNext = () => {
        document.getElementById("app-screen").style.opacity = "0";
        document.getElementById("app-screen").style.transform = "translateX(-100%)";
        setTimeout(onStepCompleted, 300);
    }

    const setApiKey = () => {
        const apiKey = document.getElementById("ai-api-key").value;

        if (apiKey) {
            localStorage.setItem("openai", apiKey);
            alert("API key set successfully!");
            document.getElementById("ai-api-key").value = "";
        } else {
            alert("Please enter a valid API key.");
        }
    }

    return (
        <div style={{
            opacity: 0,
            transform: "translateX(100%)",
            transition: "opacity 0.3s ease-in-out, transform 0.5s ease-out"
        }} className="app-screen" id={"app-screen"}>
            <div className={"container-centered"}>
                <h1 className={"app-title"}>How it works?</h1>
                <br/>
                <p>This app allow you to learn latin words and phrases and start reading. Unlike Duolingo (which has very limited latin course) or similar apps, you can add sources from your books or documents. Additionally, this app uses OpenAI Whisper to pronounce text and contains customizable AI chatbot you can text with.</p>
                <br/>
                <div className={"container-debug"}>
                    <p className={"debug-text"}>Debug zone (regular user should not see this)</p>
                    <div className={"debug-space"}></div>
                    <p className={"debug-text"}>Set API key if you want to enable AI features.</p>
                    <div className={"debug-space"}></div>
                    <input className={"debug-field"} id={"ai-api-key"} placeholder={"OpenAI API key"}/>
                    <div className={"debug-space"}></div>
                    <button className={"debug-button"} onClick={setApiKey}>Set debug API key</button>
                </div>
                <br/>
                <br/>
                <MaterialButton onClick={handleNext}>Next</MaterialButton>
            </div>
        </div>
    );
}

HowTo.propTypes = {
    onStepCompleted: PropTypes.func.isRequired
}

export default HowTo;