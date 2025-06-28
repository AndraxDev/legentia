import React from 'react';
import PropTypes from "prop-types";
import InteractiveWordReading from "./InteractiveWordReading";

function ReadingText({article}) {
    const punctuationMarks = article.match(/[.!?]/g) || [];
    const sentences = article.replace("!", ".").replace("?", ".").replace("\n", " ").split(".");

    return (
        <div className={"phrase-interactive"}>
            {
                sentences?.map((sentence, ix) => {
                    const sentencePurified = sentence.split(" ").filter(w => w.toString().trim() !== "");
                    return (
                        sentencePurified.map((word, index) => {
                            const pu = punctuationMarks[ix] === undefined ? "" : punctuationMarks[ix];
                            return (
                                <InteractiveWordReading word={index === sentencePurified.length - 1 ? word + pu : word} key={word + index} contextSentence={sentence} />
                            );
                        })
                    )
                })
            }
        </div>
    );
}

ReadingText.propTypes = {
    article: PropTypes.object.isRequired
};

export default ReadingText;