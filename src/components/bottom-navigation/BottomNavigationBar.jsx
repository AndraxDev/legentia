import React from 'react';
import PropTypes from "prop-types";
import BottomNavigationBarItem from "./BottomNavigationBarItem";

function BottomNavigationBar({items, onClickListenersArray, activeIndex}) {
    return (
        <div className={"bottom-navigation"}>
            {
                items.map((item, index) => (
                    <BottomNavigationBarItem key={item.label} icon={item.icon} onClick={onClickListenersArray[index]} label={item.label} isActive={index === activeIndex} />
                ))
            }
        </div>
    );
}

BottomNavigationBar.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })).isRequired,
    onClickListenersArray: PropTypes.arrayOf(PropTypes.func).isRequired,
    activeIndex: PropTypes.number.isRequired,
}

export default BottomNavigationBar;