import React from 'react';
import PropTypes from 'prop-types';
import {MaterialButton} from "../../../components/MaterialButton";

function Intro({onStepCompleted}) {

    const handleNext = () => {
        document.getElementById("app-screen").style.opacity = "0";
        document.getElementById("app-screen").style.transform = "translateX(-100%)";
        setTimeout(onStepCompleted, 300);
    }

    return (
        <div className="app-screen" id={"app-screen"}>
            <div className={"container-centered"}>
                <img alt={"."} className={"app-icon-intro"}/>
                <br/>
                <br/>
                <br/>
                <h1 className={"app-title"}>Legentia</h1>
                <br/>
                <p className={"app-intro"}>Welcome to Legentia - AI powered Latin language learning app.</p>
                <br/>
                <br/>
                <MaterialButton onClick={handleNext}>Next</MaterialButton>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </div>
    );
}

Intro.propTypes = {
    onStepCompleted: PropTypes.func.isRequired
}

export default Intro;