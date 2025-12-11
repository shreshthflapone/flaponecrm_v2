import React from "react";
import { useEffect, useState } from "react";
import InnerHeader from "../../components/InnerHeader";
import CommonImageUpload from "../../components/commonImageUpload";
import countryCodeOptions from "../../data/CountryCodes";
import { FaAngleDown, FaFacebook, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useRef } from "react";
import SingleDropdown from "../../components/SingleDropdown";
import Select from "react-select";

const MyAccount = () => {
    const dropdownRef = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [countryCode, setCountryCode] = useState("91");
    const [gender, setGender] = useState("");
    const [countryCodeDropdown, setCountryCodeDropdown] = useState(false);
    const [profileImg, setProfileImg] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [sections, setSections] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    
    const [errorMsgName, setErrorMsgName] = useState("");
    const [errorMsgEmail, setErrorMsgEmail] = useState("");
    const [errorMsgMobile, setErrorMsgMobile] = useState("");
    const [errorMsgAddress, setErrorMsgAddress] = useState("");
    const [errorMsgState, setErrorMsgState] = useState("");
    const [errorMsgCity, setErrorMsgCity] = useState("");
    const [errorMsgPincode, setErrorMsgPincode] = useState("");
    const [errorMsgInstagram, setErrorMsgInstagram] = useState("");
    const [errorMsgFacebook, setErrorMsgFacebook] = useState("");
    const [errorMsgLinkedIn, setErrorMsgLinkedIn] = useState("");

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
            setErrorMsgName("Name field is empty!");
            return false;
        } else {
            setErrorMsgName("");
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
            setErrorMsgEmail("Email field is empty!");
            return false;
        } else {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!emailRegex.test(value)) {
                setErrorMsgEmail("Invalid email: " + value);
                return false;
            } else {
                setErrorMsgEmail("");
            }
        }
        setEmail(value);
    };

    const handleCountryCodeSelect = (selectedCountry) => {
        setCountryCode(selectedCountry);

        if (selectedCountry.length === 0) {
            setErrorMsgMobile("Please select country code!");
            return false;
        } else {
            setErrorMsgMobile("");
        }
        setCountryCodeDropdown(false);
    };

    const setPhoneNumberFun = (value) => {
        value = value.trim();
        if (value.length === 0) {
            setErrorMsgMobile("Mobile no is empty!");
            return false;
        } else {
            setPhoneNumber((prevPhoneNumber) => {
                if (countryCode === "91") {
                    const mobileRegex = /^[6789]\d{9}$/i;

                    if (!mobileRegex.test(value)) {
                        setErrorMsgMobile("Invalid Mobile No: " + value);
                        return prevPhoneNumber;
                    } else {
                        setErrorMsgMobile("");
                    }
                } else {
                    const mobileRegex = /^\d{5,20}$/i;

                    if (!mobileRegex.test(value)) {
                        setErrorMsgMobile("Invalid Mobile No: " + value);
                        return prevPhoneNumber;
                    } else {
                        setErrorMsgMobile("");
                    }
                }
                return value;
            });
        }
    };

    const setAddressFun = (value) => {
        value = value.trim();
        if (value.length === 0) {
            setErrorMsgAddress("Address field is empty!");
            return false;
        } else {
            const addressRegex = /^[0-9a-zA-Z,.-\s#\/()&]+$/;
            const isValid = addressRegex.test(value);

            if (!isValid) {
                setErrorMsgAddress(
                "Allow some char like , . # / () & in address including 0-9,a-z"
                );
                return false;
            } else {
                setErrorMsgAddress("");
            }
        }
        setAddress(value);
    };

    const setStateFun = (value) => {
        value = value.trim();

        if (value.length === 0) {
            setErrorMsgState("State field is empty!");
            return false;
        } else {
            setErrorMsgState("");
        }
        setState(value);
    };

    const setPincodeFun = (value) => {
        value = value.trim();

        if (value.length === 0) {
            setErrorMsgPincode("Pincode field is empty!");
            return false;
        } else {
            if (value.length < 4 || value.length > 12) {
                setErrorMsgPincode("Invalid Pincode: " + value);
                return false;
            } else {
                setErrorMsgPincode("");
            }
        }
        setPincode(value);
    };

    const setInstagramFun = (value) => {
        value = value.trim();
        const instagramRegex = /^(https?:\/\/)?(www\.)?(instagram\.com)\/[A-Za-z0-9._%+-]+$/;
        if (value) {
            if (!instagramRegex.test(value)) {
                toast.warn("Enter valid insta url");
                return false;
            }
            value = value.trim();
            setInstagram(value);
        }
    };

    const setFacebookFun = (value) => {
        value = value.trim();
        const facebookRegex = /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.me)\/[A-Za-z0-9._%+-]+$/;
        if (value) {
            if (!facebookRegex.test(value)) {
                toast.warn("Enter valid facebook url");
                return false;
            }
            value = value.trim();
            setFacebook(value);
        }
    };

    const setLinkedinFun = (value) => {
        value = value.trim();
        const linkedinRegex = /^(https?:\/\/)?(www\.)?(linkedin\.com)\/in\/[A-Za-z0-9-]+$/;
        if (value) {
            if (!linkedinRegex.test(value)) {
                toast.warn("Enter valid linkedin url");
                return false;
            }
            value = value.trim();
            setLinkedin(value);
        }
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

    return (
        <>
            <InnerHeader
                heading="My Account"
                txtSubHeading="Effortlessly take control of your account and customize your preferences and settings to your liking."
                showButton={false}
                iconText=""
                onClick={""}
            />
            <div className="account-details  pl20 pr20 df w100 fww settings">
                <div className="upload-image v-center flx100 mb16 df">
                    <p className="flx33 fc15 fw6 fs14 mb12 ls1">Upload Photo</p>
                    <div className="image-upload-compoenent">
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
                    <p className="fs14 fc4 fw4 ls1 mt10">{errorMsgName}</p>
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
                    <p className="fs14 fc4 fw4 ls1 mt10">{errorMsgEmail}</p>
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
                    <p className="fs14 fc4 fw4 ls1 mt10">{errorMsgMobile}</p>
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
                    <p className="fs14 fc4 fw4 ls1 mt10">{errorMsgAddress}</p>
                </div>
                <div className="mb30 h40 pref-lang flx31 mr8">
                    <p className="fc15 fw6 fs14 ls1 mb8">Languages Spoken</p>

                    <Select
                        isMulti
                        name="languages"
                        options={preferredLanguages}
                        value={preferredLanguages.filter((option) =>
                            prefLang.includes(option.value)
                        )}
                        onChange={handlePrefChange}
                        placeholder="Select Languages"
                        maxMenuHeight={200}
                        closeMenuOnSelect={false}
                        maxDisplayedValues={2}
                    />
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
                        <p className="fs14 fc4 fw4 ls1 mt10">{errorMsgState}</p>
                    </div>
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
                        <p className="fs14 fc4 fw4 ls1 mt10">{errorMsgCity}</p>
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
                        <p className="fs14 fc4 fw4 ls1 mt10">{errorMsgPincode}</p>
                    </div>
                </div>
                <div className="form-group-settings social w100">
                    <p className="fc15 fw6 fs14 ls1 w100 df">Social Links</p>
                    <div className="social-links df aic df w100">
                        <div className="facebook-container flx31 mr8">
                            <input
                                type="text"
                                id="facebook"
                                placeholder="Facebook url"
                                defaultValue={facebook}
                                onBlur={(e) => setFacebookFun(e.target.value)}
                                autoComplete="off"
                                className="facebook-input"
                                readOnly={facebook && profileApproved == 1}
                            />
                            <FaFacebook className="facebook-icon" />
                        </div>
                        <p className="fs14 fc4 fw4 ls1 mt10">{errorMsgFacebook}</p>
                        <div className="facebook-container flx31 mr8">
                            <input
                                type="text"
                                id="linkedin"
                                placeholder="Linkedin url"
                                defaultValue={linkedin}
                                onBlur={(e) => setLinkedinFun(e.target.value)}
                                autoComplete="off"
                                readOnly={linkedin && profileApproved == 1}
                            />
                            <FaLinkedinIn className="facebook-icon" />
                        </div>
                        <p className="fs14 fc4 fw4 ls1 mt10">{errorMsgLinkedIn}</p>
                        <div className="facebook-container flx31 mr8">
                            <input
                                type="text"
                                id="instagram"
                                placeholder="Instagram url"
                                defaultValue={instagram}
                                onBlur={(e) => setInstagramFun(e.target.value)}
                                autoComplete="off"
                                readOnly={instagram && profileApproved == 1}
                            />
                            <FaInstagram className="instagram-icon" />
                        </div>
                        <p className="fs14 fc4 fw4 ls1 mt10">{errorMsgInstagram}</p>
                    </div>
                </div>
            </div>
            <div className="button-container jcc born">
                <button className="btn-blue update-button">Submit</button>
            </div>
        </>
    );
}
export default MyAccount;