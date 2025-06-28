import React from 'react';
import PropTypes from "prop-types";
import InteractiveWord from "./InteractiveWord";
import InteractiveWordHard from "./InteractiveWordHard";

function InteractivePhrase({phrase, translation, isHardMode}) {
    return (
        <div className={"phrase-interactive"}>
            {
                phrase.split(" ").map((word, index) => {
                    return (
                        !isHardMode ?
                            <InteractiveWord word={word} translations={translation[index]} />
                        :
                            <InteractiveWordHard word={word} />

                    );
                })
            }
        </div>
    );
}

InteractivePhrase.propTypes = {
    phrase: PropTypes.string.isRequired,
    translation: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    isHardMode: PropTypes.bool.isRequired
}

export default InteractivePhrase;