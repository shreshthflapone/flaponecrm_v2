import React, { useState } from "react";
import InnerHeader from "../../components/InnerHeader";
import SingleDropdownMultiSearch from "../../components/SingleDropdownMultiSearch";
import CommonImageUpload from "../../components/commonImageUpload";
import HtmlEditor from "../../components/HtmlEditor";

const LocationForm = () => {
    const [locationImage, setLocationImage] = useState("");
    const [locationFormData, setLocationFormData] = useState({
        location_type: { label: "State", value: "state" },
        country: "",
        state: "",
        city: "",
        location_status: "",
        location_description: "",
    });

    const imageLabel =
    locationFormData.location_type?.value === "country"
        ? "Country Image"
        : locationFormData.location_type?.value === "state"
        ? "State Image"
        : locationFormData.location_type?.value === "city"
        ? "City Image"
        : "Location Image";


    const locationTypeList = [
        { label: "Country", value: "country" },
        { label: "State", value: "state" },
        { label: "City", value: "city" },
    ];

    const countryOptions = [
        { label: "India", value: "India" },
        { label: "Japan", value: "Japan" },
    ];

    const stateOptions = [
        { label: "Rajasthan", value: "Rajasthan", country: "India" },
        { label: "Haryana", value: "Haryana", country: "India" },
        { label: "Tokyo", value: "Tokyo", country: "Japan" },
        { label: "Osaka", value: "Osaka", country: "Japan" },
    ];


    const handleSelectLocationType = (option) => {
        setLocationFormData({
            location_type: option,
            country: "",
            state: "",
            city: "",
            location_status: "",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocationFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectCountry = (option) => {
        setLocationFormData((prev) => ({
            ...prev,
            country: option,
            state: "",
            city: "",
        }));
    };

    const handleSelectState = (option) => {
        setLocationFormData((prev) => ({
            ...prev,
            state: option,
            city: "",
        }));
    };

    const filteredStates = stateOptions.filter(
        (state) =>
            state.country === locationFormData.country?.value
    );
    const handleUploadLocationImage = (file) => {
        setBrandGroupLogo(file);
    };

    const handleStatusChange = (e) => {
        const { value } = e.target;
        setLocationFormData((prevValues) => ({
            ...prevValues,
            location_status: value,
        }));
    }


    
    const handleLocationDescriptionChange = (value) => {
        setLocationFormData((prev) => ({
            ...prev,
            location_description: value,
        }));
    };

    const handleSubmit = () => {
        console.log("Form Data =>", locationFormData);
    };

    return (
        <>
            <InnerHeader
                heading="Add New Location"
                txtSubHeading="Manage your hotel locations"
                showButton={true}
                iconText="Locations List"
                onClick={() => (window.location.href = "/locations-list")}
            />

            <div className="account-details mt24 w100 settings">
                <div className="v-center fww">
                    <div className="form-group-settings flx31 mr8">
                        <SingleDropdownMultiSearch
                            label="Location Type"
                            options={locationTypeList}
                            selectedOption={locationFormData.location_type}
                            onSelect={handleSelectLocationType}
                            search={true}
                        />
                    </div>
                    {locationFormData.location_type?.value === "country" && (
                        <div className="form-group-settings flx31 mr8">
                            <p className="fc15 fw6 fs14 ls1">Country</p>
                            <input
                                type="text"
                                name="country"
                                placeholder="Enter country name"
                                value={locationFormData.country}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}
                    {locationFormData.location_type?.value === "state" && (
                        <>
                            <div className="form-group-settings flx31 mr8">
                                <SingleDropdownMultiSearch
                                    label="Country"
                                    options={countryOptions}
                                    selectedOption={locationFormData.country}
                                    onSelect={handleSelectCountry}
                                    search={true}
                                />
                            </div>

                            <div className="form-group-settings flx31 mr8">
                                <p className="fc15 fw6 fs14 ls1">State</p>
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="Enter state name"
                                    value={locationFormData.state}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}
                    {locationFormData.location_type?.value === "city" && (
                        <>
                            <div className="form-group-settings flx31 mr8">
                                <SingleDropdownMultiSearch
                                    label="Country"
                                    options={countryOptions}
                                    selectedOption={locationFormData.country}
                                    onSelect={handleSelectCountry}
                                    search={true}
                                />
                            </div>

                            <div className="form-group-settings flx31 mr8">
                                <SingleDropdownMultiSearch
                                    label="State"
                                    options={filteredStates}
                                    selectedOption={locationFormData.state}
                                    onSelect={handleSelectState}
                                    search={true}
                                />
                            </div>

                            <div className="form-group-settings flx31 mr8">
                                <p className="fc15 fw6 fs14 ls1">Base Markup Value</p>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Enter city name"
                                    value={locationFormData.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}
                    <div className="upload-image v-center flx100 mb16 df">
                        <p className="flx33 fc15 fw6 fs14 mb12 ls1">{imageLabel}</p>
                        <div className="image-upload-compoenent distributor-profile-image">
                            <CommonImageUpload
                                setWorkImage={setLocationImage}
                                imgData={locationImage}
                                uploadImg={handleUploadLocationImage}
                                delstatus={false}
                            />
                        </div>
                    </div>
                    <div className="form-group-settings chapter-name flx100">
                        <p className="fc15 fw6 fs14 ls1 mb8">Description</p>
                        <div className="jodit-editor">
                            <HtmlEditor
                                descValue={locationFormData.location_description}
                                onChange={(value) => handleLocationDescriptionChange(value)}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="radio-grp-status box-center fww mt12 mb12">
                    <label htmlFor="active" className="cp v-center fc13">
                        <input
                        type="radio"
                        className="mr8 cp"
                        id="active"
                        value="1"
                        checked={locationFormData.location_status === "1"}
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
                            checked={locationFormData.location_status === "0"}
                            onChange={handleStatusChange}
                        />
                        Inactive
                    </label>
                </div>
                <div className="box-center mt24 mb24">
                    <button
                        type="button"
                        className="btn-blue bg1 br24 fs14 cp pl24 pr24 pt10 pb10 ls2"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};

export default LocationForm;
