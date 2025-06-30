import React, {useEffect} from 'react';
import AppScreenFade from "../AppScreenFade";
import HomeBottomNavigationBar from "../../components/HomeBottomNavigationBar";
import HomeFragment from "./fragments/HomeFragment";
import LearnFragment from "./fragments/LearnFragment";
import ReadFragment from "./fragments/ReadFragment";
import SettingsFragment from "./fragments/SettingsFragment";
import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";

let activityInitialized = false;

function Home({onNewIntent}) {
    const location = useLocation();
    const [tabIndex, setTabIndex] = React.useState(location.pathname.startsWith("/home/") ? parseInt(location.pathname.split("/")[2]) : 0);
    const navigate = useNavigate();

    useEffect(() => {
        if (activityInitialized) {
            if (location.pathname.startsWith("/home/")) {
                let fragmentIndex = parseInt(location.pathname.split("/")[2]);
                if (isNaN(fragmentIndex)) {
                    fragmentIndex = 0;
                }
                setTabIndex(fragmentIndex);
            } else if (location.pathname === "/home" || location.pathname === "/") {
                setTabIndex(0);
            }
        } else {
            activityInitialized = true;
        }
    }, [location]);

    const bottomNavigationOnHomeClickedListener = () => {
        if (tabIndex !== 0) changeFragment(0);
    }

    const bottomNavigationOnLearnClickedListener = () => {
        if (tabIndex !== 1) changeFragment(1);
    }

    const bottomNavigationOnReadClickedListener = () => {
        if (tabIndex !== 2) changeFragment(2);
    }

    const bottomNavigationOnSettingsClickedListener = () => {
        if (tabIndex !== 3) changeFragment(3);
    }

    const changeFragment = (index) => {
        document.getElementById("fragment").style.opacity = "0";
        setTimeout(() => {
            navigate("/home/" + (index === 0 ? "" : index));
            setTimeout(() => {
                document.getElementById("fragment").style.opacity = "1";
            }, 50);
        }, 150);
    }

    const getCurrentFragment = () => {
        switch (tabIndex) {
            case 0:
                return <HomeFragment onNewIntent={onNewIntent}/>;
            case 1:
                return <LearnFragment onNewIntent={onNewIntent}/>;
            case 2:
                return <ReadFragment onNewIntent={onNewIntent}/>;
            case 3:
                return <SettingsFragment onNewIntent={onNewIntent}/>;
            default:
                return <HomeFragment onNewIntent={onNewIntent}/>;
        }
    }

    return (
        <AppScreenFade>
            <div id={"fragment"} className={"home-fragments"}>
                { getCurrentFragment() }
            </div>
            <HomeBottomNavigationBar onClickListenersArray={[bottomNavigationOnHomeClickedListener, bottomNavigationOnLearnClickedListener, bottomNavigationOnReadClickedListener, bottomNavigationOnSettingsClickedListener]} activeIndex={tabIndex} />
        </AppScreenFade>
    );
}

Home.propTypes = {
    onNewIntent: PropTypes.func,
};

export default Home;