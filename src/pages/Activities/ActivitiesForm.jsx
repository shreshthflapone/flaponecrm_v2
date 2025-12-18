import React, { useState } from "react";
import InnerHeader from "../../components/InnerHeader";
import SingleDropdownMultiSearch from "../../components/SingleDropdownMultiSearch";
import TimePicker from "../../components/TimePicker";

const ActivitiesForm = () => {
    const [activityFormData, setActivityFormData] = useState({
        activity_name: "",
        activity_type: {},
        age_group: {},
        maximum_capacity: "",
        activity_description: "",
        start_time: "",
        end_time: "",
        activity_status: ""
    });

    const [activityTypeOptions, setActivityTypeOptions] = useState([
        { label: "Indoor", value: "indoor" },
        { label: "Outdoor", value: "outdoor" },
        { label: "Attraction", value: "attraction" },
    ]);

    const [ageGroupOptions, setAgeGroupOptions] = useState([
        { label: "All Ages", value: "all_ages" },
        { label: "Adults", value: "adults" },
        { label: "Children", value: "children" },
        { label: "Teens", value: "teens" },
    ]);

    const handleActivityTypeChange = (option) => {
        setActivityFormData((prevValues) => ({
            ...prevValues,
            activity_type: option,
        }));
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (!value || value.trim() === "") {
            console.error(`${name} is empty`);
            return;
        }
        setActivityFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleAgeGroupChange = (option) => {
        setActivityFormData((prevValues) => ({
            ...prevValues,
            age_group: option,
        }));
    }
    
    const handleChargingTimeChange = (timeData, period) => {
        setActivityFormData((prevData) => ({
            ...prevData,
            [period === "from" ? "start_time" : "end_time"]: timeData,
        }));
    };

    const handleStatusChange = (e) => {
        const { value } = e.target;
        setActivityFormData((prevValues) => ({
            ...prevValues,
            activity_status: value,
        }));
    }
    return (
        <>
            <InnerHeader 
                heading="Add New Activity"
                txtSubHeading="Manage indoor and outdoor activities available at your hotels."
                showButton={true}
                iconText="Hotel Activities List"
                onClick={() => (window.location.href = "/activities-list")}
            />
            <div className="account-details mt24 w100 settings">
                <div className="v-center fww">
                    <div className="form-group-settings name flx31 mr8">
                        <p className="fc15 fw6 fs14 ls1">Activity Name</p>
                        <input
                            type="text"
                            name="activity_name"
                            placeholder="Enter activity name"
                            value={activityFormData.activity_name}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group-settings name flx31 mr8">
                        <SingleDropdownMultiSearch
                            label="Activity Type"
                            options={activityTypeOptions}
                            selectedOption={activityFormData.activity_type}
                            onSelect={handleActivityTypeChange}
                            placeholder="Select Activity Type"
                            compulsory={<span className="fc4">*</span>}
                            search={true}
                        />
                    </div>
                    <div className="form-group-settings name flx31 mr8">
                        <SingleDropdownMultiSearch
                            label="Age Group"
                            options={ageGroupOptions}
                            selectedOption={activityFormData.age_group}
                            onSelect={handleAgeGroupChange}
                            placeholder="Select Age Group"
                            compulsory={<span className="fc4">*</span>}
                            search={true}
                        />
                    </div>
                    <div className="form-group-settings name flx31 mr8">
                        <p className="fc15 fw6 fs14 ls1">Capacity (people)</p>
                        <input
                            type="text"
                            name="maximum_capacity"
                            placeholder="Enter maximum capacity"
                            value={activityFormData.maximum_capacity}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group-settings address-proof flx48 mr24 w100">
                        <TimePicker
                            fromTime={activityFormData.start_time}
                            toTime={activityFormData.end_time}
                            onTimeChange={handleChargingTimeChange}
                            compulsory={<span className="fc4">*</span>}
                        />
                    </div>
                    <div className="form-group-settings name w100 mr8">
                        <p className="fc15 fw6 fs14 ls1">Description</p>
                        <textarea
                            id="activityDescription"
                            name="activity_description"
                            placeholder="Enter activity description"
                            value={activityFormData.activity_description}
                            onChange={handleInputChange}
                            autoComplete="off"
                        ></textarea>
                    </div>
                </div>
                <div className="radio-grp-status box-center fww mt12 mb12">
                    <label htmlFor="active" className="cp v-center fc13">
                        <input
                        type="radio"
                        className="mr8 cp"
                        id="active"
                        value="1"
                        checked={activityFormData.activity_status === "1"}
                        onChange={handleStatusChange}
                        />
                        Active
                    </label>
                    <label htmlFor="inactive" className="cp v-center mr16 fc9 ml24">
                        <input
                            type="radio"
                            className="mr8 cp"
                            id="inactive"
                            value="0"
                            checked={activityFormData.activity_status === "0"}
                            onChange={handleStatusChange}
                        />
                        Inactive
                    </label>
                </div>
                <div className="Hello add-more box-center mt24 mb24">
                    <button
                        type="button"
                        className="btn-blue bg1 br24 fs14 cp pl24 pr24 pt10 pb10 ml24 ls2"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}

export default ActivitiesForm;