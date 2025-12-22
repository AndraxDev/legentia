import React, {useEffect} from 'react';

function TeslasoftIdRedirectActivity(props) {
    const queryParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        const token = queryParams.get("token");
        localStorage.setItem("userDataKey", token);
        window.location.replace("/home/3");
    }, [])
    return (
        <div>Please, wait...</div>
    );
}

export default TeslasoftIdRedirectActivity;