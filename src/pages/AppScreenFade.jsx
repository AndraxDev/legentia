import React, {useEffect} from 'react';
import PropTypes from "prop-types";

function AppScreenFade({children}) {
    useEffect(() => {
        setTimeout(() => {
            document.querySelector(".app-screen").style.opacity = "1";
        }, 50);
    }, []);

    return (
        <div className={"app-screen"} style={{
            opacity: "0",
            transition: "opacity 0.5s",
        }}>
            {children}
        </div>
    );
}

AppScreenFade.propTypes = {
    children: PropTypes.node.isRequired
}

export default AppScreenFade;