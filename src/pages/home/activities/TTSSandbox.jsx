import React from 'react';
import PropTypes from "prop-types";
import AppScreenFade from "../../AppScreenFade";
import OpenAI from "openai";

const allowedVoices = [
    "alloy", "ash", "coral", "echo", "fable", "nova", "onyx", "sage", "shimmer"
];

const allowedModels = [
    "tts-1-hd", "tts-1"
];

function TtsSandbox({onNewIntent}) {
    const [text, setText] = React.useState("");
    const [model, setModel] = React.useState("tts-1-hd");
    const [voice, setVoice] = React.useState("alloy");
    const [speed, setSpeed] = React.useState("1.0");

    const onBackPressed = () => {
        onNewIntent("/home/3")
    }

    const runAI = async (apiKey) => {
        const client = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true
        });

        let speedValue = parseFloat(speed);

        if (isNaN(speedValue) || speedValue < 0 || speedValue > 4) {
            speedValue = 1.0;
        }

        const mp3 = await client.audio.speech.create({
            model: allowedModels.includes(model) ? model : "tts-1-hd",
            voice: allowedVoices.includes(voice) ? voice : "alloy",
            input: text,
            speed: speedValue,
            instructions: "You are pronouncing the latin text. Please speak with average speed and clarity.",
        });

        const buffer = new Uint8Array(await mp3.arrayBuffer());
        const blob = new Blob([buffer], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);

        audio.play().then(() => {
            console.log("Audio is playing");
        }).catch((error) => {
            console.error("Error playing audio:", error);
        });
    }

    const readAloud = () => {
        const apiKey = localStorage.getItem("openai")

        if (!apiKey) {
            alert("No API key is found in the local storage. Please set it in the settings.");
        } else {
            runAI(apiKey);
        }
    }

    return (
        <AppScreenFade>
            <div className={"activity-fullscreen"}>
                <div className={"exercise-header"}>
                    <button className={"exercise-back"} onClick={() => {
                        onBackPressed()
                    }}><span className={"material-symbols-outlined"}>arrow_back</span></button>
                    <h2 style={{
                        textAlign: "start"
                    }} className={"article-title"}>TTS Sandbox (debugger)</h2>
                </div>
                <div className={"list-container"}>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none",
                        color: "#ff6767",
                    }}>
                        WARNING: This feature requires a valid OpenAI API key. If you have not set it, please back to the settings and select "Edit AI API key (debug)" option. This feature is intended for debugging purposes only and may not work as expected and may incur charges. Please use it with caution. This feature is an experiment and may not be implemented in the future versions.
                    </div>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none"
                    }}>
                        Voices available: alloy, ash, coral, echo, fable, nova, onyx, sage, shimmer.
                    </div>
                    <div className={"list-item translation-item"} style={{
                        userSelect: "none"
                    }}>
                        Voices available: tts-1-hd, tts-1.
                    </div>
                </div>
                <div style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    paddingBottom: "24px",
                }}>
                    <input placeholder={"AI model (default: tts-1-hd)"} onChange={(e) => setModel(e.currentTarget.value)} value={model} className={"input"}/>
                    <input placeholder={"Voice (default: alloy)"} onChange={(e) => setVoice(e.currentTarget.value)} value={voice} className={"input"}/>
                    <input placeholder={"Speed (default: 1.0)"} onChange={(e) => setSpeed(e.currentTarget.value)} value={speed} className={"input"}/>
                    <textarea placeholder={"Text"} onChange={(e) => setText(e.target.value)} value={text} rows={10} className={"input"}></textarea>
                    <button disabled={text.trim() === ""} className={"exercise-button exercise-button-" + ((text.trim() === "") ? "disabled" : "neutral")} onClick={() => readAloud()}>Read aloud (debug)</button>
                </div>
            </div>
        </AppScreenFade>
    );
}

TtsSandbox.propTypes = {
    onNewIntent: PropTypes.func.isRequired
};

export default TtsSandbox;