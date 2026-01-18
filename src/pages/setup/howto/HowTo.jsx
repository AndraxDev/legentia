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
                <h1 className={"app-title"}>Quomodo operatur?</h1>
                <br/>
                <p>Haec applicatio te sinit verba et locutiones latinas discere et legere incipere. Dissimilis Duolingo (qui cursum latinum valde limitatum habet) vel similibus applicationibus, fontes ex libris vel documentis tuis addere potes. Praeterea, haec application OpenAI Whisper utitur ad textum pronuntiandum et continet colloquendi automaton artificiale configurabile quo nuntios mittere potes.</p>
                <br/>
                <button className={"exercise-button exercise-button-neutral"} onClick={handleNext}>Pergere</button>
            </div>
        </div>
    );
}

HowTo.propTypes = {
    onStepCompleted: PropTypes.func.isRequired
}

export default HowTo;
