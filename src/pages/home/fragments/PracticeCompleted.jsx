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
            <div className={"motivational-message"}>
                {flawless ? "You completed the practice flawlessly! Keep going!" : "You made some mistakes, but that's okay. Keep practicing!"}
            </div>
            <div className={"analytics-box"}>
                <div className={"stats-box stats-box-streak"}>
                    <div className={"stats-title-container"}>
                        <p className={"stat-title"}>Max combo</p>
                    </div>
                    <div className={"stats-box-content"}>
                        <p className={"stat-metrics"}>{streak ?? 0}</p>
                    </div>
                </div>
                <div className={"stats-box stats-box-mistakes"}>
                    <div className={"stats-title-container"}>
                        <p className={"stat-title"}>Mistakes</p>
                    </div>
                    <div className={"stats-box-content"}>
                        <p className={"stat-metrics"}>{mistakesCount}</p>
                    </div>
                </div>
                <div className={"stats-box stats-box-time"}>
                    <div className={"stats-title-container"}>
                        <p className={"stat-title"}>Time</p>
                    </div>
                    <div className={"stats-box-content"}>
                        <p className={"stat-metrics"}>{timeSecondsToString(time)}</p>
                    </div>
                </div>
            </div>
            <button className={"exercise-button exercise-button-neutral"} onClick={() => {
                onNewIntent("/home/1");
            }}>Continue</button>
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
