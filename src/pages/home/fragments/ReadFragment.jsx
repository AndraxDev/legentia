import React from 'react';
import PropTypes from "prop-types";
import ReadingText from "../../../components/interactive-phrase/ReadingText";

const text = `
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
`;

function ReadFragment({onNewIntent}) {
    return (
        <div className={"fragment"}>
            <h2 className={"activity-title"}>Read</h2>
            <div style={{
                padding: "24px"
            }}>
                <ReadingText article={text} />
            </div>
            {/* Need to detect if app is opened in browser, and adjust the height depending on the search bar. It's a popular bug of Google Chrome. */}
            <div style={{
                height: "100px"
            }}></div>
        </div>
    );
}

ReadFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default ReadFragment;