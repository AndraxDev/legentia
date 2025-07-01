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

import {Dialog, styled, dialogClasses} from "@mui/material";

export const MaterialDialog = styled(Dialog) (() => ({
    [`& .${dialogClasses.paper}`]: {
        backgroundColor: "#212121",
        color: "#fff",
        borderRadius: "24px",
        padding: "8px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    },
    [`& .${dialogClasses.container}`]: {
        fontSize: "16px",
        lineHeight: "1.5",
        userSelect: "none",
    },
}));
