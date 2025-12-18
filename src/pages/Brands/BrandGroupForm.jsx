import React, {useState} from "react";
import InnerHeader from "../../components/InnerHeader";
import CommonImageUpload from "../../components/commonImageUpload";
import countries from '../../data/countries';
import statesList from '../../data/states';
import citiesList from '../../data/cities';
import SingleDropdownMultiSearch from "../../components/SingleDropdownMultiSearch";

const BrandGroupForm = () => {
    const [brandGroupLogo, setBrandGroupLogo] = useState("");
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [brandGroupFormData, setBrandGroupFormData] = useState({
        brand_group_name: "",
        brand_group_website:"",
        brand_group_properties: "",
        brand_group_logo: "",
        brand_group_description: "",
        brand_group_status: "",
        brand_group_headquarters: {
            full_address: "",
            country: {},
            state: {},
            city: {},
            zip_code: "",
        },
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (!value || value.trim() === "") {
            console.error(`${name} is empty`);
            return;
        }
        setBrandGroupFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const handleUploadBrandGroupLogo = (file) => {
        setBrandGroupLogo(file);
    };
    const handleStatusChange = (e) => {
        const { value } = e.target;
        setBrandGroupFormData((prevValues) => ({
            ...prevValues,
            brand_group_status: value,
        }));
    }

    const handleCompleteAddress = (e) => {
        const { name, value } = e.target;

        if (!value.trim()) {
            console.error(`${name} is required`);
            return;
        }

        updateAddressField(name, value.trim());
    };
    
    const handleCountryChange = (option) => {
        if (!option) {
            console.error("Country is required");
            return;
        }

        setBrandGroupFormData(prev => ({
            ...prev,
            brand_group_headquarters: {
                ...prev.brand_group_headquarters,
                country: option,
                state: {},
                city: {},
                zip_code: "",
            },
        }));

        const states = statesList.filter(
            s => s.country === option.value
        );

        setStateOptions(
            states.map(s => ({ label: s.label, value: s.value }))
        );
        setCityOptions([]);
    };

    const handleStateChange = (option) => {
        if (!option) {
            console.error("State is required");
            return;
        }

        const country = brandGroupFormData.brand_group_headquarters.country?.value;
        if (!country) {
            console.error("Select country first");
            return;
        }

        setBrandGroupFormData(prev => ({
            ...prev,
            brand_group_headquarters: {
                ...prev.brand_group_headquarters,
                state: option,
                city: {},
                zip_code: "",
            },
        }));

        const cities = citiesList.filter(
            c => c.state === option.value && c.country === country
        );

        setCityOptions(
            cities.map(c => ({ label: c.label, value: c.value }))
        );
    };
    
    const handleCityChange = (option) => {
        if (!option) {
            console.error("City is required");
            return;
        }

        setBrandGroupFormData(prev => ({
            ...prev,
            brand_group_headquarters: {
                ...prev.brand_group_headquarters,
                city: option,
            },
        }));
    };

    const updateAddressField = (key, value) => {
        setBrandGroupFormData(prev => {
            if (!value) {
                console.error(`${key} is required`);
                return prev;
            }

            return {
                ...prev,
                brand_group_headquarters: {
                    ...prev.brand_group_headquarters,
                    [key]: value,
                },
            };
        });
    };
    return (
        <>
            <InnerHeader
                heading="Hotel Brands"
                txtSubHeading="Manage your hotel brand portfolio and their details"
                showButton={true}
                iconText="Brand Group List"
                onClick={() => (window.location.href = "/hotel-brands/brand_groups")}
            />
            <div className="account-details mt24 w100 settings">
                <div className="v-center fww">
                    <div className="upload-image v-center flx100 mb16 df">
                        <p className="flx33 fc15 fw6 fs14 mb12 ls1">Brand Group Logo</p>
                        <div className="image-upload-compoenent distributor-profile-image">
                            <CommonImageUpload
                                setWorkImage={setBrandGroupLogo}
                                imgData={brandGroupLogo}
                                uploadImg={handleUploadBrandGroupLogo}
                                delstatus={false}
                            />
                        </div>
                    </div>
                    <div className="form-group-settings name flx31 mr8">
                        <p className="fc15 fw6 fs14 ls1">Brand Group Name</p>
                        <input
                            type="text"
                            name="brand_group_name"
                            placeholder="Enter brand group name"
                            value={brandGroupFormData.brand_group_name}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group-settings name flx31 mr8">
                        <p className="fc15 fw6 fs14 ls1">Website</p>
                        <input
                            type="text"
                            name="brand_group_website"
                            placeholder="https://www.exmaple.com"
                            value={brandGroupFormData.brand_group_website}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group-settings name flx31 mr8">
                        <p className="fc15 fw6 fs14 ls1">Number of Properties</p>
                        <input
                            type="text"
                            name="brand_group_properties"
                            placeholder="Enter number of properties"
                            value={brandGroupFormData.brand_group_properties}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group-settings w100 name">
                        <p className="fc15 fw6 fs14 ls1">Complete Address</p>
                        <input
                            type="text"
                            name="full_address"
                            placeholder="Enter complete address"
                            value={brandGroupFormData.brand_group_headquarters.full_address}
                            onChange={handleCompleteAddress}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group-settings flx24 mr8">
                        <SingleDropdownMultiSearch
                            label="Country"
                            options={countries}
                            selectedOption={brandGroupFormData.brand_group_headquarters.country}
                            onSelect={handleCountryChange}
                            placeholder="Select Country"
                            compulsory={<span className="fc4">*</span>}
                            search={true}
                        />
                    </div>
                    <div className="form-group-settings flx24 mr8">
                        <SingleDropdownMultiSearch
                            label="State"
                            options={stateOptions}
                            selectedOption={brandGroupFormData.brand_group_headquarters.state}
                            onSelect={handleStateChange}
                            placeholder="Select State"
                            compulsory={<span className="fc4">*</span>}
                            search={true}
                        />
                    </div>
                    <div className="form-group-settings flx24 mr8">
                        <SingleDropdownMultiSearch
                            label="City"
                            options={cityOptions}
                            selectedOption={brandGroupFormData.brand_group_headquarters.city}
                            onSelect={handleCityChange}
                            placeholder="Select City"
                            compulsory={<span className="fc4">*</span>}
                            search={true}
                        />
                    </div>

                    <div className="form-group-settings flx24 mr8">
                        <p className="fc15 fw6 fs14 ls1">Zip / Postal code</p>
                        <input
                            type="text"
                            placeholder="Enter zip / postal code"
                            name="zip_code"
                            value={brandGroupFormData.brand_group_headquarters.zip_code}
                            onChange={handleCompleteAddress}
                        />
                    </div>
                    <div className="form-group-settings name w100 mr8">
                        <p className="fc15 fw6 fs14 ls1">Brand Group Description</p>
                        <textarea
                            id="brandGroupDescription"
                            name="brand_group_description"
                            placeholder="Enter brand group description"
                            value={brandGroupFormData.brand_group_description}
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
                        checked={brandGroupFormData.brand_group_status === "1"}
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
                            checked={brandGroupFormData.brand_group_status === "0"}
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
export default BrandGroupForm;