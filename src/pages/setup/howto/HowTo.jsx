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
                <h1 className={"app-title"}>QUOMODO OPERATVR?</h1>
                <br/>
                <p>HAEC APPLICATIO TE SINIT VERBA ET LOCVTIONES LATINAS DISCERE ET LEGERE INCIPERE. DISSIMILIS DVOLINGO (QVI CVRSUM LATINVM VALDE LIMITATVM HABET) VEL SIMILIBVS APPLICATIONIBVS, FONTES EX LIBRIS VEL DOCVMENTIS TVIS ADDERE POTES. PRAETEREA, HAEC APPLICATIO OPENAI WHISPER VTITVR AD TEXTVM PRONVNTIANDVM ET CONTINET COLLOQVENDI AUTOMATON ARTIFICIALE CONFIGVRABILE QVO NVNTIOS MITTERE POTES.</p>
                <br/>
                <button className={"exercise-button exercise-button-neutral"} onClick={handleNext}>PERGERE</button>
            </div>
        </div>
    );
}

HowTo.propTypes = {
    onStepCompleted: PropTypes.func.isRequired
}

export default HowTo;
