import React from 'react';
import PropTypes from "prop-types";
import InteractivePhrase from "../../../components/interactive-phrase/InteractivePhrase";

function HomeFragment({onNewIntent}) {
    return (
        <div className={"fragment"}>
            <h2 className={"activity-title"}>Legentia</h2>

            <InteractivePhrase phrase={"In bibliotheca proxima legere tacite volo"} translation={[["In"], ["library", "the library"], ["nearest"], ["to read", "read"], ["quietly", "quiet"], ["I want"]]} isHardMode={false} />
        </div>
    );
}

HomeFragment.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default HomeFragment;