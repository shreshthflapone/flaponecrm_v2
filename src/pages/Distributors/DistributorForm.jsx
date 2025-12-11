import React from "react";
import { useEffect, useState } from "react";
import InnerHeader from "../../components/InnerHeader";
import CommonImageUpload from "../../components/commonImageUpload";
import countryCodeOptions from "../../data/CountryCodes";
import { FaAngleDown, FaFacebook, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useRef } from "react";
import SingleDropdown from "../../components/SingleDropdown";
import Select from "react-select";

const DistributorForm = () => {
    const dropdownRef = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
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
    //
    const [errorMsgName, setErrorMsgName] = useState("");
    const [errorMsgEmail, setErrorMsgEmail] = useState("");
    const [errorMsgMobile, setErrorMsgMobile] = useState("");
    const [errorMsgAddress, setErrorMsgAddress] = useState("");
    const [errorMsgState, setErrorMsgState] = useState("");
    const [errorMsgCity, setErrorMsgCity] = useState("");
    const [errorMsgPincode, setErrorMsgPincode] = useState("");
    const [errorMsgPanNumber, setErrorMsgPanNumber] = useState("");
    const [errorMsgGSTNumber, setErrorMsgGSTNumber] = useState("");
    const [errorMsgCompanyName, setErrorMsgCompanyName] = useState("");

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

    const setGSTNumberFun = (value) => {
        value = value.trim();

        if (value.length === 0) {
            setErrorMsgGSTNumber("GST Number field is empty!");
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

    return (
        <>
            <InnerHeader
                heading="Add New Distributor"
                txtSubHeading="Enter distributor details to create a new account"
                showButton={true}
                iconText="Distributor List"
                onClick={handleDistributorList}
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
                <div className="form-group-settings address flx31 mr8">
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
                        <p className="fs14 fc4 fw4 ls1 mt10">{errorMsgGSTNumber}</p>
                    </div>
                </div>
                <div className="form-group-settings address flx31 mr8">
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
                        <p className="fs14 fc4 fw4 ls1 mt10">{errorMsgPanNumber}</p>
                    </div>
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
                        <p className="fs14 fc4 fw4 ls1 mt10">{errorMsgCompanyName}</p>
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