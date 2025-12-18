import React from "react";
import InnerHeader from "../../components/InnerHeader";

const ActivitiesList = () => {
    return (
        <>
            <InnerHeader 
                heading="Hotel Activities"
                txtSubHeading="Manage indoor and outdoor activities available at your hotels."
                showButton={true}
                iconText="Add Hotel Activity"
                onClick={() => (window.location.href = "/add-activity")}
            />
        </>
    );
}

export default ActivitiesList;