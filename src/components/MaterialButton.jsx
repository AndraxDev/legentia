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

import {Button, styled} from "@mui/material";

export const MaterialButton = styled(Button)(() => ({
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
    },
    padding: '8px 24px',
    borderRadius: '24px',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: '500',
}));

export const MaterialButtonDialogFilled = styled(Button)(() => ({
    backgroundColor: '#cecece',
    color: '#121212',
    '&:hover': {
        backgroundColor: '#fff',
    },
    padding: '8px 20px 6px 20px',
    borderRadius: '24px',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: '500',
}));

export const MaterialButtonDialogOutlined = styled(Button)(() => ({
    backgroundColor: '#212121',
    border: '1px solid #cecece',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#212121',
    },
    padding: '7px 18px 5px 18px',
    borderRadius: '24px',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: '500',
}));
