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
import PropTypes from 'prop-types';
import logo from './../../../logo.png'
import {getLocalizedString} from "../../../strings/GetString.jsx";

function Intro({onStepCompleted}) {

    const handleNext = () => {
        document.getElementById("app-screen").style.opacity = "0";
        document.getElementById("app-screen").style.transform = "translateX(-100%)";
        setTimeout(onStepCompleted, 200);
    }

    return (
        <div className="app-screen-v2" id={"app-screen"}>
            <div className={"container-centered"}>
                <img alt={"."} src={logo} className={"app-icon-intro"}/>
                <br/>
                <br/>
                <br/>
                <h1 className={"app-title"}>{getLocalizedString("appTitle")}</h1>
                <br/>
                <p className={"app-intro"}>{getLocalizedString("textIntro")}</p>
                <br/>
                <br/>
                <button className={"exercise-button exercise-button-neutral"} onClick={handleNext}>{getLocalizedString("btnContinue")}</button>
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
