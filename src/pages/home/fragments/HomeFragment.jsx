import React from 'react';
import PropTypes from "prop-types";

function HomeFragment({onNewIntent}) {
    return (
        <div className={"fragment"}>
            <h2 className={"activity-title"}>Legentia</h2>
        </div>
    );
}

HomeFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default HomeFragment;