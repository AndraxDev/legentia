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

import React, {useEffect} from 'react';
import PropTypes from "prop-types";

function PracticeCompleted({onNewIntent, flawless, time, mistakesCount, streak}) {

    const [currentCombo, setCurrentCombo] = React.useState(0);
    const [comboTimerFinished, setComboTimerFinished] = React.useState(false);
    const [currentMistakes, setCurrentMistakes] = React.useState(0);
    const [mistakesTimerFinished, setMistakesTimerFinished] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [timeTimerFinished, setTimeTimerFinished] = React.useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (document.getElementById("box-combo")) document.getElementById("box-combo").style.transform = "scale(1)";
        }, 50);
    }, [])

    useEffect(() => {
        if (comboTimerFinished) {
            setTimeout(() => {
                if (document.getElementById("box-mistakes")) document.getElementById("box-mistakes").style.transform = "scale(1)";
            }, 50);
        }
    }, [comboTimerFinished])

    useEffect(() => {
        if (mistakesTimerFinished) {
            setTimeout(() => {
                if (document.getElementById("box-time")) document.getElementById("box-time").style.transform = "scale(1)";
            }, 50);
        }
    }, [mistakesTimerFinished])

    useEffect(() => {
        let interval;
        if (streak > currentCombo) {
            interval = setInterval(() => {
                setCurrentCombo(currentCombo + 1);
            }, 50);
        } else {
            setComboTimerFinished(true);
        }

        return () => clearInterval(interval);
    }, [currentCombo]);

    useEffect(() => {
        if (comboTimerFinished) {
            let interval;
            if (mistakesCount > currentMistakes) {
                interval = setInterval(() => {
                    setCurrentMistakes(currentMistakes + 1);
                }, 80);
            } else {
                setMistakesTimerFinished(true);
            }

            return () => clearInterval(interval);
        }
    }, [currentMistakes, comboTimerFinished]);

    useEffect(() => {
        if (mistakesTimerFinished) {
            let interval;
            if (time > currentTime) {
                interval = setInterval(() => {
                    setCurrentTime(currentTime + 1);
                }, 20);
            } else {
                setTimeTimerFinished(true);
            }

            return () => clearInterval(interval);
        }
    }, [currentTime, mistakesTimerFinished]);

    useEffect(() => {
        if (timeTimerFinished) {
            setTimeout(() => {
                if (document.getElementById("box-motivational")) {
                    document.getElementById("box-motivational").style.opacity = "1";
                }
            }, 1000)
        }
    }, [timeTimerFinished])

    const timeSecondsToString = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        setTimeout(() => {
            document.getElementById("complete-screen-root").style.opacity = "1";
        }, 50)
    }, []);

    return (
        <div id={"complete-screen-root"} className="practice-completed" style={{
            opacity: "0",
            transition: "opacity 0.5s"
        }}>
            <h3 className={"practice-completed-title"}>Practice completed!</h3>
            <div className={"analytics-box"}>
                <div style={{
                    transform: "scale(0)",
                    transition: "0.3s ease-in-out",
                }} id={"box-combo"} className={"stats-box stats-box-streak"}>
                    <div className={"stats-title-container"}>
                        <p className={"stat-title"}>Max combo</p>
                    </div>
                    <div className={"stats-box-content stats-box-content-streak"}>
                        <p className={"stat-metrics"}>{currentCombo}</p>
                    </div>
                </div>
                <div style={{
                    transform: "scale(0)",
                    transition: "0.3s ease-in-out",
                }} id={"box-mistakes"} className={"stats-box stats-box-mistakes"}>
                    <div className={"stats-title-container"}>
                        <p className={"stat-title"}>Mistakes</p>
                    </div>
                    <div className={"stats-box-content stats-box-content-mistakes"}>
                        <p className={"stat-metrics"}>{currentMistakes}</p>
                    </div>
                </div>
                <div style={{
                    transform: "scale(0)",
                    transition: "0.3s ease-in-out",
                }} id={"box-time"} className={"stats-box stats-box-time"}>
                    <div className={"stats-title-container"}>
                        <p className={"stat-title"}>Time</p>
                    </div>
                    <div className={"stats-box-content stats-box-content-time"}>
                        <p className={"stat-metrics"}>{timeSecondsToString(currentTime)}</p>
                    </div>
                </div>
            </div>
            <button className={"exercise-button exercise-button-neutral"} onClick={() => {
                onNewIntent("/home/1");
            }}>Continue</button>
            <div style={{
                opacity: "0",
                transition: "opacity 0.5s",
            }} id={"box-motivational"} className={"motivational-message"}>
                {flawless ? "You completed the practice flawlessly! Keep going!" : "You made some mistakes, but that's okay. Keep practicing!"}
            </div>
        </div>
    );
}

PracticeCompleted.propTypes = {
    onNewIntent: PropTypes.func.isRequired,
    flawless: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    mistakesCount: PropTypes.number.isRequired,
    streak: PropTypes.number
}

export default PracticeCompleted;
