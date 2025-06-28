import React from 'react';
import Intro from "./intro/Intro";
import HowTo from "./phrases/HowTo";
import * as Settings from "../../Settings";
import {useNavigate} from "react-router-dom";

function Setup() {
    const [currentStep, setCurrentStep] = React.useState(0);
    const navigate = useNavigate();
    return (currentStep === 0 ? <Intro onStepCompleted={() => setCurrentStep(1)} /> : <HowTo onStepCompleted={() => {
        Settings.setSetupCompleted(true);
        navigate("/home");
    }} />);
}

export default Setup;