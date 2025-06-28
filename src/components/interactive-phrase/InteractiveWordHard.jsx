import React from 'react';
import PropTypes from "prop-types";

function InteractiveWordHard({word}) {
    return (
        <button className={"word-hard"}>{word}</button>
    );
}

InteractiveWordHard.propTypes = {
    word: PropTypes.string.isRequired
}

export default InteractiveWordHard;