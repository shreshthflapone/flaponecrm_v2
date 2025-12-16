import React from "react";
import { useEffect, useState } from "react";
import InnerHeader from "../../components/InnerHeader";
import CommonImageUpload from "../../components/commonImageUpload";
import countryCodeOptions from "../../data/CountryCodes";
import { FaAngleDown } from "react-icons/fa";
import { useRef } from "react";
import SingleDropdown from "../../components/SingleDropdown";
import DocUpload from "../../components/DocUpload";

const DistributorForm = () => {
    const dropdownRef = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState("");
    const [gstNumber, setGSTNumber] = useState("");
    const [panNumber, setPanNumber] = useState("");
    const [countryCode, setCountryCode] = useState("91");
    const [gender, setGender] = useState("");
    const [countryCodeDropdown, setCountryCodeDropdown] = useState(false);
    const [profileImg, setProfileImg] = useState("");
    const [status, setStatus] = useState("1");
    const [newPassword, setNewPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyLogoImg, setCompanyLogoImg] = useState("");
    const [companyBannerImg, setCompanyBannerImg] = useState("");
    const [gstNumberImg, setGstNumberImg] = useState("");
    const [panNumberImg, setPanNumberImg] = useState("");
    //

    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];

    const preferredLanguages = [
        { value: "English", label: "English" },
        { value: "Spanish", label: "Spanish" },
        { value: "French", label: "French" },
        { value: "German", label: "German" },
        { value: "Chinese", label: "Chinese" },
        { value: "Japanese", label: "Japanese" },
        { value: "Hindi", label: "Hindi" },
        { value: "Arabic", label: "Arabic" },
    ];

    const [prefLang, setPrefLang] = useState([]);

    const handlePrefChange = (selectedOptions) => {
        const languages = selectedOptions ? selectedOptions.map((option) => option.value) : [];
        setPrefLang(languages);
    };

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
    };
    
    const handleUploadProfileImg = (file) => {
        console.log("Uploaded profile image:", file);
    }

    const setNameFun = (value) => {
        value = value.trim();
        if (value.length === 0) {
            console.log("Name field is empty!");
            return false;
        } else {
            console.log("");
        }

        setName(value);
        if (displayNameStatus === "0") {
            setDisplayName(value);
            setDisplayNameStatus("1");
        }
    };

    const setEmailFun = (value) => {
        value = value.trim();
        if (value.length === 0) {
            console.log("Email field is empty!");
            return false;
        } else {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!emailRegex.test(value)) {
                console.log("Invalid email: " + value);
                return false;
            } else {
                console.log("");
            }
        }
        setEmail(value);
    };

    const handleCountryCodeSelect = (selectedCountry) => {
        setCountryCode(selectedCountry);

        if (selectedCountry.length === 0) {
            console.log("Please select country code!");
            return false;
        } else {
            console.log("");
        }
        setCountryCodeDropdown(false);
    };

    const setPhoneNumberFun = (value) => {
        value = value.trim();
        if (value.length === 0) {
            console.log("Mobile no is empty!");
            return false;
        } else {
            setPhoneNumber((prevPhoneNumber) => {
                if (countryCode === "91") {
                    const mobileRegex = /^[6789]\d{9}$/i;

                    if (!mobileRegex.test(value)) {
                        console.log("Invalid Mobile No: " + value);
                        return prevPhoneNumber;
                    } else {
                        console.log("");
                    }
                } else {
                    const mobileRegex = /^\d{5,20}$/i;

                    if (!mobileRegex.test(value)) {
                        console.log("Invalid Mobile No: " + value);
                        return prevPhoneNumber;
                    } else {
                        console.log("");
                    }
                }
                return value;
            });
        }
    };

    const setAddressFun = (value) => {
        value = value.trim();
        if (value.length === 0) {
            console.log("Address field is empty!");
            return false;
        } else {
            const addressRegex = /^[0-9a-zA-Z,.-\s#\/()&]+$/;
            const isValid = addressRegex.test(value);

            if (!isValid) {
                console.log(
                "Allow some char like , . # / () & in address including 0-9,a-z"
                );
                return false;
            } else {
                console.log("");
            }
        }
        setAddress(value);
    };

    const setStateFun = (value) => {
        value = value.trim();

        if (value.length === 0) {
            console.log("State field is empty!");
            return false;
        } else {
            console.log("");
        }
        setState(value);
    };

    const setCountryFun = (value) => {
        value = value.trim();

        if (value.length === 0) {
            console.log("Country field is empty!");
            return false;
        } else {
            console.log("");
        }
        setCountry(value);
    }

    const setPincodeFun = (value) => {
        value = value.trim();

        if (value.length === 0) {
            console.log("Pincode field is empty!");
            return false;
        } else {
            if (value.length < 4 || value.length > 12) {
                console.log("Invalid Pincode: " + value);
                return false;
            } else {
                console.log("");
            }
        }
        setPincode(value);
    };

    const setGSTNumberFun = (value) => {
        value = value.trim();

        if (value.length === 0) {
            console.log("GST Number field is empty!");
            return false;
        } else {
            const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
            if (!gstRegex.test(value)) {
                setErrorMsgGSTNumber("Invalid GST Number: " + value);
                return false;
            } else {
                setErrorMsgGSTNumber("");
            }
        }
        setGSTNumber(value);
    };

    const setPanNumberFun = (value) => {
        value = value.trim();

        if (value.length === 0) {
            setErrorMsgPanNumber("Pan Number field is empty!");
            return false;
        } else {
            const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
            if (!panRegex.test(value)) {
                setErrorMsgPanNumber("Invalid Pan Number: " + value);
                return false;
            } else {
                setErrorMsgPanNumber("");
            }
        }
        setPanNumber(value);
    };

    const setCityFun = (value) => {
        value = value.trim();

        if (value.length === 0) {
            setErrorMsgCity("City field is empty!");
            return false;
        } else {
            setErrorMsgCity("");
        }
        setCity(value);
    };

    const handleDistributorList = () => {
        window.location.href = "/distributor-list";
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const setCompanyNameFun = (value) => {
        value = value.trim();
        if (value.length === 0) {
            setErrorMsgCompanyName("Company Name field is empty!");
            return false;
        } else {
            setErrorMsgCompanyName("");
        }

        setCompanyName(value);
    };

    const handleUploadCompanyLogo = (file) => {
        setCompanyLogoImg(file);
    };

    const handleUploadCompanyBanner = (file) => {
        setCompanyBannerImg(file);
    }

    const handleUploadGSTDoc = (file) => {
        setGstNumberImg(file);
    };

    const handleUploadPanDoc = (file) => {
        setPanNumberImg(file);
    };

    return (
        <>
            <InnerHeader
                heading="Add New Distributor"
                txtSubHeading="Enter distributor details to create a new account"
                showButton={true}
                iconText="Distributor List"
                onClick={handleDistributorList}
            />
            <div className="account-details mt24 pl20 pr20 df w100 fww settings">
                 <div className="batch-main-grp-inputs mb16 v-center jcsb fww  bg8 pl20 pr20 pt20 pb20">
                    <div className="v-center pb24 fww w100">
                        <div className="address-head mb24 w100">
                            <p className="fs18 fc14 ls1 lh22">Profile Information</p>
                            <p class="fs14 fc5 ls1 lh18 mt4">Provide basic personal information for affiliate identification.</p>
                        </div>
                        <div className="upload-image v-center flx100 mb16 df">
                            <p className="flx33 fc15 fw6 fs14 mb12 ls1">Upload Photo</p>
                            <div className="image-upload-compoenent distributor-profile-image">
                                <CommonImageUpload
                                    setWorkImage={setProfileImg}
                                    imgData={profileImg}
                                    uploadImg={handleUploadProfileImg}
                                    delstatus={false}
                                />
                            </div>
                        </div>
                        <div className="form-group-settings name flx31 mr8">
                            <p className="fc15 fw6 fs14 ls1">Name</p>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter Name"
                                defaultValue={name}
                                onChange={(e) => setNameFun(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings email flx31 mr8">
                            <div className="df jcsb aic">
                                <p className="fc15 fw6 fs14 ls1">Email Address</p>
                                <span
                                    className={` fc1 fs14 ls1`}
                                >
                                </span>
                            </div>
                            <input
                                type="text"
                                id="email"
                                placeholder="Enter email address"
                                defaultValue={email}
                                onBlur={(e) => setEmailFun(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings mobile flx31 mr8">
                            <div className="df jcsb aic">
                                <p className="fc15 fw6 fs14 ls1">
                                    Phone Number ( With country code )
                                </p>
                            </div>            
                            <div className="input-group df pr w100 fww aisc">
                                <div className="input-group-prepend df">
                                    <div className="role-dropdown" ref={dropdownRef}>
                                    <div
                                        className="selected-role fs14 h40 country-code"
                                        onClick={() => setCountryCodeDropdown(!countryCodeDropdown)}
                                    >
                                        {countryCode || "Country Code"}
                                        <FaAngleDown className="fc16 fs14" />
                                    </div>
                                    {countryCodeDropdown && (
                                        <ul className="role-options fs14">
                                        {countryCodeOptions.map((option) => (
                                            <li key={option} onClick={() => handleCountryCodeSelect(option)}>{option}</li>
                                        ))}
                                        </ul>
                                    )}
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control br4"
                                    maxLength={15}
                                    placeholder="Enter phone number"
                                    id="phone"
                                    name="phone"
                                    defaultValue={phoneNumber}
                                    onChange={(e) => setPhoneNumberFun(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group-settings gender flx31 mr8">
                            <SingleDropdown
                                label="Gender"
                                options={genderOptions}
                                selectedOption={gender}
                                onSelect={setGender}
                                handleClickUpdate={handleGenderSelect}
                                extraProps={true}
                            />
                        </div>
                        <div className="form-group-settings flx31 mr8">
                            <p className="fc15 fw6 fs14 ls1">Password</p>
                            <div className="password-input pr">
                                <input
                                    type={"password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    defaultValue={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="v-center brd-t2 pt24 pb24 fww w100">
                        <div className="address-head mb24 w100">
                            <p className="fs18 fc14 ls1 lh22">Company Details</p>
                            <p class="fs14 fc5 ls1 lh18 mt4">Enter the affiliate’s residential or business address details.</p>
                        </div>
                        <div className="form-group-settings address flx31 mr8">
                            <div className="pincode flx1">
                                <p className="fc15 fw6 fs14 ls1">Company Name</p>
                                <input
                                    type="text"
                                    id="company_name"
                                    placeholder="Enter Company Name"
                                    defaultValue={companyName}
                                    onBlur={(e) => setCompanyNameFun(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="form-group-settings address flx31 mr8">
                            <p className="fc15 fw6 fs14 ls1">Address</p>
                            <input
                                type="text"
                                id="address"
                                placeholder="Enter Address"
                                defaultValue={address}
                                onBlur={(e) => setAddressFun(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings address flx31 mr8">
                            <div className="city flx1">
                                <p className="fc15 fw6 fs14 ls1">City</p>
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="Enter City"
                                    defaultValue={city}
                                    onBlur={(e) => setCityFun(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="form-group-settings address flx31 mr8">
                            <div className="state flx1">
                                <p className="fc15 fw6 fs14 ls1">State</p>
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="Enter state"
                                    defaultValue={state}
                                    onBlur={(e) => setStateFun(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="form-group-settings address flx31 mr8">
                            <div className="state flx1">
                                <p className="fc15 fw6 fs14 ls1">Country</p>
                                <input
                                    type="text"
                                    id="country"
                                    placeholder="Enter Country"
                                    defaultValue={country}
                                    onBlur={(e) => setCountryFun(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="form-group-settings address flx31 mr8">
                            <div className="pincode flx1">
                                <p className="fc15 fw6 fs14 ls1">Pincode</p>
                                <input
                                    type="number"
                                    id="pincode"
                                    placeholder="Enter Pincode"
                                    defaultValue={pincode}
                                    onBlur={(e) => setPincodeFun(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="flx48 upload-image mb24 mr40">
                            <p className="w100 fc15 fw6 fs14 mb12 ls1">Upload Company Logo</p>
                            <div className="w100 image-upload-compoenent affiliate-image">
                                <DocUpload 
                                    onImageUpload={handleUploadCompanyLogo}
                                    imgData={companyLogoImg}
                                    imagedoctrel={true}
                                />
                            </div>
                        </div>
                        <div className="flx48 upload-image mb24">
                            <p className="w100 fc15 fw6 fs14 mb12 ls1">Upload Company Banner</p>
                            <div className="w100 image-upload-compoenent affiliate-image">
                                <DocUpload 
                                    onImageUpload={handleUploadCompanyBanner}
                                    imgData={companyBannerImg}
                                    imagedoctrel={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="v-center brd-t2 pt24 pb24 fww w100">
                        <div className="address-head mb24 w100">
                            <p className="fs18 fc14 ls1 lh22">Legal Details</p>
                            <p class="fs14 fc5 ls1 lh18 mt4">Enter the affiliate’s residential or business address details.</p>
                        </div>
                        <div className="w100 df jcsb">
                            <div className="form-group-settings address flx48">
                                <div className="pincode flx1">
                                    <p className="fc15 fw6 fs14 ls1">GST Number</p>
                                    <input
                                        type="text"
                                        id="gstNumber"
                                        placeholder="Enter GST Number"
                                        defaultValue={gstNumber}
                                        onBlur={(e) => setGSTNumberFun(e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="flx48 upload-image mb24 ml40">
                                <p className="w100 fc15 fw6 fs14 mb12 ls1">Upload GST</p>
                                <div className="w100 image-upload-compoenent affiliate-image">
                                    <DocUpload 
                                        onImageUpload={handleUploadGSTDoc}
                                        imgData={gstNumberImg}
                                        imagedoctrel={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w100 df jcsb">
                            <div className="form-group-settings address flx48 mr8">
                                <div className="pincode flx1">
                                    <p className="fc15 fw6 fs14 ls1">Pan Number</p>
                                    <input
                                        type="text"
                                        id="panNumber"
                                        placeholder="Enter Pan Number"
                                        defaultValue={panNumber}
                                        onBlur={(e) => setPanNumberFun(e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="flx48 upload-image mb24 ml40">
                                <p className="w100 fc15 fw6 fs14 mb12 ls1">Upload Pancard</p>
                                <div className="w100 image-upload-compoenent affiliate-image">
                                    <DocUpload 
                                        onImageUpload={handleUploadPanDoc}
                                        imgData={panNumberImg}
                                        imagedoctrel={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="radio-grp-status box-center fww mt12 mb12">
                <label htmlFor="active" className="cp v-center mr16 fc13">
                    <input
                        type="radio"
                        className="mr8 cp"
                        id="active"
                        value="1"
                        checked={status === "1"}
                        onChange={handleStatusChange}
                    />
                    Active
                </label>
                <label htmlFor="draft" className="cp v-center mr16 fc6 ml24">
                    <input
                    type="radio"
                    className="mr8 cp"
                    id="draft"
                    value="2"
                    checked={status === "2"}
                    onChange={handleStatusChange}
                    />
                    Draft
                </label>
                <label htmlFor="inactive" className="cp v-center mr16 fc9 ml24">
                    <input
                    type="radio"
                    className="mr8 cp"
                    id="inactive"
                    value="0"
                    checked={status === "0"}
                    onChange={handleStatusChange}
                    />
                    Inactive
                </label>
            </div>
            <div className="button-container jcc born">
                <button className="btn-blue update-button">Submit</button>
            </div>
        </>
    );
}
export default DistributorForm;