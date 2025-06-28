import React from 'react';
import PropTypes from "prop-types";

function BottomNavigationBarItem({label, icon, onClick, isActive}) {
    return (
        <div className={"bottom-navigation-item"}>
            <button className={"bottom-navigation-item-clickable"} onClick={onClick}>
                <div>
                    <div className={"bottom-navigation-item-icon-container-" + (isActive ? "active" : "inactive")}>
                        <span className={"material-symbols-outlined bottom-navigation-icon-" + (isActive ? "active" : "inactive")}>{icon}</span>
                    </div>
                    <p className={"bottom-navigation-label"}>{label}</p>
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