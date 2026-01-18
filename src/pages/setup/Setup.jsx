/***************************************************************************
 * Copyright (c) 2025-2026 Dmytro Ostapenko. All rights reserved.
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

import React from 'react';
import Intro from "./intro/Intro";
import HowTo from "./howto/HowTo";
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
