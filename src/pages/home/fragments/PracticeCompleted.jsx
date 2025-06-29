import React, {useEffect} from 'react';
import PropTypes from "prop-types";

function PracticeCompleted({onNewIntent, flawless, time, mistakesCount}) {

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
    mistakesCount: PropTypes.number.isRequired
}

export default PracticeCompleted;