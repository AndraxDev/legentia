import React from 'react';
import PropTypes from "prop-types";
import InteractiveWordReading from "./InteractiveWordReading";

function ReadingText({article}) {
    return (
        <div className={"phrase-interactive"}>
            {
                article.split(" ").map((word, index) => {
                    return (
                        <InteractiveWordReading word={word} key={word + index} />
                    );
                })
            }
        </div>
    );
}

ReadingText.propTypes = {
    article: PropTypes.object.isRequired
};

export default ReadingText;