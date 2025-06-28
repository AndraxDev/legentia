import React from 'react';
import BottomNavigationBar from "./bottom-navigation/BottomNavigationBar";
import PropTypes from "prop-types";

const items = [{
    label: "Home",
    icon: "home",
}, {
    label: "Learn",
    icon: "dictionary",
}, {
    label: "Read",
    icon: "book_2",
}, {
    label: "Settings",
    icon: "settings",
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