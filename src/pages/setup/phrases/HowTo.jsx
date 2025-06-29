import React, {useEffect} from 'react';
import PropTypes from "prop-types";

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
        setTimeout(onStepCompleted, 200);
    }

    return (
        <div style={{
            opacity: 0,
            transform: "translateX(100%)",
            transition: "opacity 0.2s ease-in-out, transform 0.4s ease-out"
        }} className="app-screen-v2" id={"app-screen"}>
            <div className={"container-centered"}>
                <h1 className={"app-title"}>How it works?</h1>
                <br/>
                <p>This app allow you to learn latin words and phrases and start reading. Unlike Duolingo (which has very limited latin course) or similar apps, you can add sources from your books or documents. Additionally, this app uses OpenAI Whisper to pronounce text and contains customizable AI chatbot you can text with.</p>
                <br/>
                <button className={"exercise-button exercise-button-neutral"} onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

HowTo.propTypes = {
    onStepCompleted: PropTypes.func.isRequired
}

export default HowTo;