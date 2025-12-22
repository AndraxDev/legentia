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
import BottomNavigationBar from "./bottom-navigation/BottomNavigationBar";
import PropTypes from "prop-types";
import Home from "@mui/icons-material/Home"
import School from "@mui/icons-material/School";
import Book from "@mui/icons-material/Book";
import Settings from "@mui/icons-material/Settings";

const items = [{
    label: "Domus",
    icon: <Home />,
}, {
    label: "Studere",
    icon: <School />,
}, {
    label: "Legere",
    icon: <Book />,
}, {
    label: "Optiones",
    icon: <Settings />,
}];

function HomeBottomNavigationBar({onClickListenersArray, activeIndex}) {
    return (
        <BottomNavigationBar activeIndex={activeIndex} items={items} onClickListenersArray={onClickListenersArray} />
    );
}

HomeBottomNavigationBar.propTypes = {
    onClickListenersArray: PropTypes.arrayOf(PropTypes.func).isRequired,
    activeIndex: PropTypes.number.isRequired,
}

export default HomeBottomNavigationBar;
