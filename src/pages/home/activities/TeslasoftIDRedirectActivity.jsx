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
import SignInGate from "../fragments/SignInGate.jsx";

function TeslasoftIdRedirectActivity() {
    const queryParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        const token = queryParams.get("token");
        localStorage.setItem("userDataKey", token);
        window.location.replace("/home/3");
    }, [])
    return (
        <SignInGate />
    );
}

export default TeslasoftIdRedirectActivity;
