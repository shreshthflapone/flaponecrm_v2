import React, {useState} from "react";
import InnerHeader from "../../components/InnerHeader";
import CommonImageUpload from "../../components/commonImageUpload";
import countries from '../../data/countries';
import statesList from '../../data/states';
import citiesList from '../../data/cities';
import SingleDropdownMultiSearch from "../../components/SingleDropdownMultiSearch";

const SubBrandForm = () => {
    const [subBrandLogo, setSubBrandLogo] = useState("");
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [subBrandFormData, setSubBrandFormData] = useState({
        brand_group_name: {},
        sub_brand_name:"",
        sub_brand_website:"",
        sub_brand_properties: "",
        sub_brand_logo: "",
        sub_brand_description: "",
        sub_brand_status: "",
        sub_brand_headquarters: {
            full_address: "",
            country: {},
            state: {},
            city: {},
            zip_code: "",
        },
    });

    const [brandGroupOptions, setBrandGroupOptions] = useState([
        { label: "Taj Group", value: "taj" },
        { label: "Oberoi Group", value: "oberoi" },
        { label: "ITC Hotels", value: "itc" },
        { label: "Marriott International", value: "marriott" },
        { label: "Hyatt Hotels", value: "hyatt" },
        { label: "Accor Group", value: "accor" },
        { label: "Radisson Hotel Group", value: "radisson" },
        { label: "IHG Hotels & Resorts", value: "ihg" },
    ]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (!value || value.trim() === "") {
            console.error(`${name} is empty`);
            return;
        }
        setSubBrandFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const handleUploadSubBrandLogo = (file) => {
        setSubBrandLogo(file);
    };
    const handleStatusChange = (e) => {
        const { value } = e.target;
        setSubBrandFormData((prevValues) => ({
            ...prevValues,
            sub_brand_status: value,
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

        setSubBrandFormData(prev => ({
            ...prev,
            sub_brand_headquarters: {
                ...prev.sub_brand_headquarters,
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

        const country = subBrandFormData.sub_brand_headquarters.country?.value;
        if (!country) {
            console.error("Select country first");
            return;
        }

        setSubBrandFormData(prev => ({
            ...prev,
            sub_brand_headquarters: {
                ...prev.sub_brand_headquarters,
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

        setSubBrandFormData(prev => ({
            ...prev,
            sub_brand_headquarters: {
                ...prev.sub_brand_headquarters,
                city: option,
            },
        }));
    };

    const updateAddressField = (key, value) => {
        setSubBrandFormData(prev => {
            if (!value) {
                console.error(`${key} is required`);
                return prev;
            }

            return {
                ...prev,
                sub_brand_headquarters: {
                    ...prev.sub_brand_headquarters,
                    [key]: value,
                },
            };
        });
    };

    const handleBrandGroupChange = (option) => {
        setSubBrandFormData((prevValues) => ({
            ...prevValues,
            brand_group_name: option,
        }));
    }
    return (
        <>
            <InnerHeader
                heading="Hotel Sub Brands"
                txtSubHeading="Manage your hotel brand portfolio and their details"
                showButton={true}
                iconText="Sub Brand List"
                onClick={() => (window.location.href = "/hotel-brands/sub_brands")}
            />
            <div className="account-details mt24 w100 settings">
                <div className="v-center fww">
                    <div className="upload-image v-center flx100 mb16 df">
                        <p className="flx33 fc15 fw6 fs14 mb12 ls1">Sub Brand Logo</p>
                        <div className="image-upload-compoenent distributor-profile-image">
                            <CommonImageUpload
                                setWorkImage={setSubBrandLogo}
                                imgData={subBrandLogo}
                                uploadImg={handleUploadSubBrandLogo}
                                delstatus={false}
                            />
                        </div>
                    </div>
                    <div className="form-group-settings flx24 mr8">
                        <SingleDropdownMultiSearch
                            label="Brand Group"
                            options={brandGroupOptions}
                            selectedOption={subBrandFormData.brand_group_name}
                            onSelect={handleBrandGroupChange}
                            placeholder="Select Brand Group"
                            compulsory={<span className="fc4">*</span>}
                            search={true}
                        />
                    </div>
                    <div className="form-group-settings name flx31 mr8">
                        <p className="fc15 fw6 fs14 ls1">Sub Brand Name</p>
                        <input
                            type="text"
                            name="sub_brand_name"
                            placeholder="Enter sub brand name"
                            value={subBrandFormData.sub_brand_name}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group-settings name flx31 mr8">
                        <p className="fc15 fw6 fs14 ls1">Website</p>
                        <input
                            type="text"
                            name="sub_brand_website"
                            placeholder="https://www.exmaple.com"
                            value={subBrandFormData.sub_brand_website}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group-settings name flx31 mr8">
                        <p className="fc15 fw6 fs14 ls1">Number of Properties</p>
                        <input
                            type="text"
                            name="sub_brand_properties"
                            placeholder="Enter number of properties"
                            value={subBrandFormData.sub_brand_properties}
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
                            value={subBrandFormData.sub_brand_headquarters.full_address}
                            onChange={handleCompleteAddress}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group-settings flx24 mr8">
                        <SingleDropdownMultiSearch
                            label="Country"
                            options={countries}
                            selectedOption={subBrandFormData.sub_brand_headquarters.country}
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
                            selectedOption={subBrandFormData.sub_brand_headquarters.state}
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
                            selectedOption={subBrandFormData.sub_brand_headquarters.city}
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
                            value={subBrandFormData.sub_brand_headquarters.zip_code}
                            onChange={handleCompleteAddress}
                        />
                    </div>
                    <div className="form-group-settings name w100 mr8">
                        <p className="fc15 fw6 fs14 ls1">Sub Brand Description</p>
                        <textarea
                            id="brandGroupDescription"
                            name="sub_brand_description"
                            placeholder="Enter sub brand description"
                            value={subBrandFormData.sub_brand_description}
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
                        checked={subBrandFormData.sub_brand_status === "1"}
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
                            checked={subBrandFormData.sub_brand_status === "0"}
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
export default SubBrandForm;