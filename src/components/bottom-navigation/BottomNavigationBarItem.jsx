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

import React from 'react';
import PropTypes from "prop-types";

function BottomNavigationBarItem({label, icon, onClick, isActive}) {
    return (
        <div className={"bottom-navigation-item"}>
            <button className={"bottom-navigation-item-clickable"} onClick={onClick}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <div className={"bottom-navigation-item-icon-container-" + (isActive ? "active" : "inactive")}>
                        <span className={"material-symbols-outlined bottom-navigation-icon-" + (isActive ? "active" : "inactive")}>{icon}</span>
                    </div>
                    <p className={isActive ? "bottom-navigation-label-active" : "bottom-navigation-label"}>{label}</p>
                </div>
            </button>
        </div>
    );
}

BottomNavigationBarItem.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired
}

export default BottomNavigationBarItem;
