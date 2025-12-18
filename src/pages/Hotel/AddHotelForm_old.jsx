import React, { useRef, useState } from "react";
import "./Hotel.css";
import InnerHeader from "../../components/InnerHeader";
import SingleDropdownMultiSearch from "../../components/SingleDropdownMultiSearch";
import "../Distributors/Distributor.css";
import countries from '../../data/countries';
import statesList from '../../data/states';
import citiesList from '../../data/cities';
import { X } from "lucide-react";
import SingleDropdown from "../../components/SingleDropdown";

const AddHotelForm = () => {
    const basicInfoRef = useRef(null);
    const locationRef = useRef(null);
    const roomRef = useRef(null);

    const [activeTab, setActiveTab] = useState("basic");
    const dropdownRef = useRef(null);
    const [hotelname, setHotelName] = useState("");

    const [selectedHotelCategory, setSelectedHotelCategory] = useState(null);
    const [selectedHotelBrand, setSelectedHotelBrand] = useState(null);
    const [selectedHotelSubBrand, setSelectedHotelSubBrand] = useState(null);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [hotelWebsiteURL, setHotelWebsiteURL] = useState("");
    const [countryCodeDropdown, setCountryCodeDropdown] = useState(false);
    const [countryCode, setCountryCode] = useState("91");
    const [rating, setRating] = useState(0);
    const [channelManager, setChannelManager] = useState("");
    const [hotelDescription, setHotelDescription] = useState("");
    const [contactPersonName, setContactPersonName] = useState("");
    const [contactPersonEmail, setContactPersonEmail] = useState("");
    const [contactPhoneNumber, setContactPhoneNumber] = useState("");
    const [contactPersonCountryCode, setContactPersonCountryCode] = useState("91");
    const [completedAddress, setCompletedAddress] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [googleMapsLink, setGoogleMapsLink] = useState("");
    const [showRoomForm, setShowRoomForm] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [maxNumberOfAdults, setMaxNumberOfAdults] = useState("");
    const [maxNumberOfChildren, setMaxNumberOfChildren] = useState("");
    const [maxNumberOfOccupancy, setMaxNumberOfOccupancy] = useState("");
    const [ageLimitOfFreeChild, setAgeLimitOfFreeChild] = useState("");
    const [totalNumberOfRooms, setTotalNumberOfRooms] = useState("");
    const [selectedExtraBeds, setSelectedExtraBeds] = useState(null);
    const [selectedBedType, setSelectedBedType] = useState(null);
    const [selectedRoomView, setSelectedRoomView] = useState(null);
    const [otherRoomView, setOtherRoomView] = useState(false);
    const [roomOtherView, setRoomOtherView] = useState("");

    const [hotelSubBrandOptions, setHotelSubBrandOptions] = useState([]);
    const [isSubBrandDisabled, setIsSubBrandDisabled] = useState(true);

    const [hotelFormData, setHotelFormData] = useState({
        hotel_name: hotelname,
        hotel_category: selectedHotelCategory?.value || "",
        hotel_brand: selectedHotelBrand?.value || "",
        hotel_sub_brand: selectedHotelSubBrand?.value || "",
        email: email,
        phone: {
            country_code: countryCode,
            number: phoneNumber,
        },
        website_url: hotelWebsiteURL,
        rating: rating,
        channel_manager: channelManager,
        description: hotelDescription,
        contact_person: {
            name: contactPersonName,
            email: contactPersonEmail,
            phone: {
                country_code: contactPersonCountryCode,
                number: contactPhoneNumber,
            },
        },
        address: {
            full_address: completedAddress,
            country: selectedCountry?.value || "",
            state: selectedState?.value || "",
            city: selectedCity?.value || "",
            zip_code: zipCode,
            google_map_link: googleMapsLink,
        },
        room: {
            room_name: roomName,
            room_type: selectedRoomType?.value || "",
            max_adults: maxNumberOfAdults,
            max_children: maxNumberOfChildren,
            max_occupancy: maxNumberOfOccupancy,
            free_child_age_limit: ageLimitOfFreeChild,
            total_rooms: totalNumberOfRooms,
            extra_beds: selectedExtraBeds?.value || "",
            bed_type: selectedBedType?.value || "",
            room_view:
                selectedRoomView?.value === "other"
                    ? roomOtherView
                    : selectedRoomView?.value || "",
        },
    });

    const hotelCategoryOptions = [
        { label: "Luxury", value: "luxury" },
        { label: "Budget", value: "budget" },
        { label: "Boutique", value: "boutique" },
        { label: "Resort", value: "resort" },
        { label: "Business", value: "business" },
    ];

    const hotelBrandOptions = [
        { label: "Marriott", value: "marriott" },
        { label: "Hilton", value: "hilton" },
        { label: "Hyatt", value: "hyatt" },
        { label: "InterContinental", value: "intercontinental" },
        { label: "Accor", value: "accor" },
    ];

    const brandSubBrandMap = {
        marriott: [
            { label: "JW Marriott", value: "jw" },
            { label: "Courtyard", value: "courtyard" },
        ],
        hilton: [
            { label: "DoubleTree", value: "doubletree" },
            { label: "Hilton Garden Inn", value: "gardeninn" },
        ],
        hyatt: [
            { label: "Hyatt Regency", value: "regency" },
            { label: "Park Hyatt", value: "parkhyatt" },
        ],
        intercontinental: [
            { label: "Holiday Inn", value: "holidayinn" },
        ],
        accor: [
            { label: "Novotel", value: "novotel" },
            { label: "Ibis", value: "ibis" },
        ],
    };

    const roomTypeOptions = [
        { label: "Select Room Type", value: "" },
        { label: "Single", value: "single" },
        { label: "Double", value: "double" },
        { label: "Suite", value: "suite" },
        { label: "Deluxe", value: "deluxe" },
    ];

    const extraBedsOptions = [
        { label: "Not Available", value: "yes" },
        { label: "Available", value: "no" },
    ];

    const BedTypeOptions = [
        { label: "Single", value: "single" },
        { label: "Double", value: "double" },
        { label: "Queen", value: "queen" },
        { label: "King", value: "king" },
    ];

    const roomViewOptions = [
        { label: "Sea View", value: "sea_view" },
        { label: "Mountain View", value: "mountain_view" },
        { label: "City View", value: "city_view" },
        { label: "Garden View", value: "garden_view" },
        { label: "Other", value: "other" },
    ];


    const handleRoomTypeChange = (option) => {
        setSelectedRoomType(option);
    };

    const handleSelectHotelBrand = (option) => {
        setSelectedHotelBrand(option);
        setIsSubBrandDisabled(false);

        const subBrands = brandSubBrandMap[option?.value] || [];
        setHotelSubBrandOptions(subBrands);
        setSelectedHotelSubBrand(null);
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

    const setHotelWebsiteURLFun = (value) => {
        value = value.trim();
        if (value.length === 0) {
            console.log("Hotel Website URL is empty!");
            return false;
        } else {
            const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i;
            if (!urlRegex.test(value)) {
                console.log("Invalid URL: " + value);
                return false;
            } else {
                console.log("");
            }
        }
        setHotelWebsiteURL(value);
    };
    const setChannelManagerFun = (value) => {
        value = value.trim();
        if (value.length === 0) {
            console.log("Channel Manager field is empty!");
            return false;
        } else {
            console.log("");
        }
        setChannelManager(value);
    };

    const setContactPersonEmailFun = (value) => {
        value = value.trim();
        if (value.length === 0) {
            console.log("Contact Person Email field is empty!");
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
        setContactPersonEmail(value);
    };

    const setContactPhoneNumberFun = (value) => {
        value = value.trim();
        if (value.length === 0) {
            console.log("Contact Person Mobile no is empty!");
            return false;
        } else {
            setContactPhoneNumber((prevPhoneNumber) => {
                if (contactPersonCountryCode === "91") {
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

    const handleCountryChange = (option) => {
        setSelectedCountry(option);
        setSelectedState(null);
        setSelectedCity(null);
        setZipCode("");
        // filter states for that country
        if (!option) {
            setStateOptions([]);
            setCityOptions([]);
            return;
        }
        const states = statesList.filter(s => s.country === option.value);
        setStateOptions(states.map(s => ({ label: s.label, value: s.value })));
        setCityOptions([]);
    };
    
    const handleStateChange = (option) => {
        setSelectedState(option);
        setSelectedCity(null);
        setZipCode("");
        if (!option || !selectedCountry) {
            setCityOptions([]);
            return;
        }
        const cities = citiesList.filter(c => c.state === option.value && c.country === selectedCountry.value);
        setCityOptions(cities.map(c => ({ label: c.label, value: c.value })));
    };
    
    const handleCityChange = (option) => {
        setSelectedCity(option);
        setZipCode("");
        
        const zips = zipsList.filter(z => z.city === option.value && z.state === selectedState.value && z.country === selectedCountry.value).map(z => z.zip);
    };

    const handleAddRoomForm = () => {
        setShowRoomForm(true);
    };

    const handleCloseAddRoomForm = () => {
        setShowRoomForm(false);
    };

    const handleExtraBedsChange = (option) => {
        setSelectedExtraBeds(option);
    };

    const handleBedTypeChange = (option) => {
        setSelectedBedType(option);
    };

    const handleRoomViewChange = (option) => {
        if(option.value === "other"){
            setOtherRoomView(true);
        } else {
            setOtherRoomView(false);
        }
        setSelectedRoomView(option);
    };

    const scrollToSection = (ref, tab) => {
        setActiveTab(tab);
        ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };


    return (
        <>
            <InnerHeader
                heading="Add Hotel"
                txtSubHeading="Enter your hotel information to get started"
                showButton={true}
                iconText="Hotels List"
                onClick={() => (window.location.href = "/")}
            />

            <div className="account-details mt24 w100 settings">
                <div className="form-tabs df mb16">
                    <div
                        className={`form-tab ${activeTab === "basic" ? "active" : ""}`}
                        onClick={() => scrollToSection(basicInfoRef, "basic")}
                    >
                        Basic Information
                    </div>

                    <div
                        className={`form-tab ${activeTab === "location" ? "active" : ""}`}
                        onClick={() => scrollToSection(locationRef, "location")}
                    >
                        Location Details
                    </div>

                    <div
                        className={`form-tab ${activeTab === "room" ? "active" : ""}`}
                        onClick={() => scrollToSection(roomRef, "room")}
                    >
                        Room Details
                    </div>
                </div>

                <div className="batch-main-grp-inputs mb16 v-center jcsb fww bg8 pl20 pr20 pt20 pb20">
                    <div  ref={basicInfoRef} className="scroll-margin v-center pb24 fww w100">
                        <div className="address-head mb24 w100">
                            <p className="fs18 fc14 ls1 lh22">Basic Information</p>
                            <p className="fs14 fc5 ls1 lh18 mt4">
                                Provide basic hotel information for identification.
                            </p>
                        </div>
                        <div className="form-group-settings name flx31 mr8">
                            <p className="fc15 fw6 fs14 ls1">Hotel Name</p>
                            <input
                                type="text"
                                placeholder="Enter Hotel Name"
                                value={hotelname}
                                onChange={(e) => setHotelName(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings email flx31 mr8">
                            <SingleDropdownMultiSearch
                                label="Category"
                                options={hotelCategoryOptions}
                                selectedOption={selectedHotelCategory}
                                onSelect={setSelectedHotelCategory}
                                handleClickUpdate={setSelectedHotelCategory}
                                search={true}
                            />
                        </div>
                        <div className="form-group-settings mobile flx31 mr8">
                            <SingleDropdownMultiSearch
                                label="Brand"
                                options={hotelBrandOptions}
                                selectedOption={selectedHotelBrand}
                                onSelect={handleSelectHotelBrand}
                                handleClickUpdate={handleSelectHotelBrand}
                                search={true}
                            />
                        </div>
                        <div className="form-group-settings mobile flx31 mr8">
                            <SingleDropdownMultiSearch
                                label="Sub Brand"
                                options={hotelSubBrandOptions}
                                selectedOption={selectedHotelSubBrand}
                                onSelect={setSelectedHotelSubBrand}
                                handleClickUpdate={setSelectedHotelSubBrand}
                                search={true}
                                isReadOnly={isSubBrandDisabled}
                            />
                        </div>
                        <div className="form-group-settings email flx31 mr8">
                            <div className="df jcsb aic">
                                <p className="fc15 fw6 fs14 ls1">Email Address</p>
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
                                    <input
                                        type="text"
                                        className="form-control br4 country-code-input"
                                        placeholder="+91"
                                        maxLength={4}
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value.replace(/\D/g, ""))}
                                        style={{
                                            width: "70px",
                                            textAlign: "center",
                                            borderRight: "none",
                                            borderTopRightRadius: "0",
                                            borderBottomRightRadius: "0",
                                        }}
                                    />
                                </div>
                                <input
                                    type="text"
                                    className="form-control br4"
                                    maxLength={15}
                                    placeholder="Enter phone number"
                                    id="phone"
                                    name="phone"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumberFun(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group-settings flx31 mr8">
                            <p className="fc15 fw6 fs14 ls1">Hotel Rating</p>

                            <div className="df aic mt8">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => setRating(star)}
                                        style={{
                                            fontSize: "26px",
                                            marginRight: "6px",
                                            cursor: "pointer",
                                            transition: "color 0.2s",
                                            color: rating >= star ? "#ffb400" : "#ccc",
                                        }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="form-group-settings email flx31 mr8">
                            <div className="df jcsb aic">
                                <p className="fc15 fw6 fs14 ls1">Hotel Website URL</p>
                            </div>
                            <input
                                type="text"
                                id="hotel_website_url"
                                placeholder="Enter hotel website URL"
                                defaultValue={hotelWebsiteURL}
                                onBlur={(e) => setHotelWebsiteURLFun(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings name flx31 mr8">
                            <p className="fc15 fw6 fs14 ls1">Channel Manager</p>
                            <input
                                type="text"
                                placeholder="Enter Channel Manager Name"
                                value={channelManager}
                                onChange={(e) => setChannelManagerFun(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings name flx1 mr8  ">
                            <p className="fc15 fw6 fs14 ls1">Hotel Description</p>
                            <textarea
                                id="hotelDescription"
                                name="hotelDescription"
                                placeholder="Enter hotel description"
                                value={hotelDescription}
                                onChange={(e) => setHotelDescription(e.target.value)}
                                autoComplete="off"
                            ></textarea>
                        </div>
                        <div className="address-head mb16 w100">
                            <p className="fs14 fw6 fc14 ls1 lh22">Property Contact Details</p>
                        </div>
                        <div className="form-group-settings name flx31 mr8">
                            <p className="fc15 fw6 fs14 ls1">Contact Person Name</p>
                            <input
                                type="text"
                                placeholder="Enter contact person name"
                                value={contactPersonName}
                                onChange={(e) => setContactPersonName(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings name flx31 mr8">
                            <p className="fc15 fw6 fs14 ls1">Contact Email</p>
                            <input
                                type="text"
                                id="contactPersonEmail"
                                placeholder="Enter contact person email"
                                defaultValue={contactPersonEmail}
                                onBlur={(e) => setContactPersonEmailFun(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings mobile flx31 mr8">
                            <div className="df jcsb aic">
                                <p className="fc15 fw6 fs14 ls1">Contact Person Phone Number</p>
                            </div>
                            <div className="input-group df pr w100 fww aisc">
                                <div className="input-group-prepend df">
                                    <input
                                        type="text"
                                        className="form-control br4 country-code-input"
                                        placeholder="+91"
                                        maxLength={4}
                                        value={contactPersonCountryCode}
                                        onChange={(e) => setContactPersonCountryCode(e.target.value.replace(/\D/g, ""))}
                                        style={{
                                            width: "70px",
                                            textAlign: "center",
                                            borderRight: "none",
                                            borderTopRightRadius: "0",
                                            borderBottomRightRadius: "0",
                                        }}
                                    />
                                </div>
                                <input
                                    type="text"
                                    className="form-control br4"
                                    maxLength={15}
                                    placeholder="Enter contact person phone number"
                                    id="contactPhoneNumber"
                                    name="contactPhoneNumber"
                                    value={contactPhoneNumber}
                                    onChange={(e) => setContactPhoneNumberFun(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div ref={locationRef} className="scroll-margin v-center pb24 fww w100">
                        <div className="address-head mb24 w100">
                            <p className="fs18 fc14 ls1 lh22">Location Details</p>
                            <p className="fs14 fc5 ls1 lh18 mt4">
                                Provide basic hotel information for identification.
                            </p>
                        </div>
                        <div className="form-group-settings w100 name">
                            <p className="fc15 fw6 fs14 ls1">Complete Address</p>
                            <input
                                type="text"
                                placeholder="Enter complete address"
                                value={completedAddress}
                                onChange={(e) => setCompletedAddress(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings flx24 mr8">
                            <SingleDropdownMultiSearch
                                label="Country"
                                options={countries}
                                selectedOption={selectedCountry}
                                onSelect={handleCountryChange}
                                placeholder="Select Country"
                                compulsory={<span className="fc4">*</span>}
                                search={true}
                            />
                        </div>

                        <div className="form-group-settings flx24 mr8">
                            <SingleDropdownMultiSearch
                                label="State"
                                options={statesList}
                                selectedOption={selectedState}
                                onSelect={handleStateChange}
                                placeholder="Select State"
                                compulsory={<span className="fc4">*</span>}
                                search={true}
                            />
                        </div>

                        <div className="form-group-settings flx24 mr8">
                            <SingleDropdownMultiSearch
                                label="City"
                                options={citiesList}
                                selectedOption={selectedCity}
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
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                            />
                        </div>
                        <div className="form-group-settings w100 name">
                            <p className="fc15 fw6 fs14 ls1">Google Maps Link</p>
                            <input
                                type="text"
                                placeholder="Enter Google Maps URL"
                                value={googleMapsLink}
                                onChange={(e) => setGoogleMapsLink(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div ref={roomRef} className="scroll-margin v-center pb24 fww w100">
                        <div className="address-head mb24 w100">
                            <p className="fs18 fc14 ls1 lh22">Room Details</p>
                            <p className="fs14 fc5 ls1 lh18 mt4">Manage your hotel rooms and their details</p>
                        </div>
                        <div class="rooms-table-wrapper w100">
                            <div class="room-list-header">
                                <div class="room-header-left">
                                    <h3>Room List</h3>
                                    <span class="room-count">0 Rooms</span>
                                </div>
                                <button type="button" class="btn-blue update-button" onClick={handleAddRoomForm}>Add Room</button>
                            </div>
                            {showRoomForm && (<div className="mt16 mb16">
                                <div className="room-form-card">
                                    <div class="form-card-header">
                                        <h3>Add New Room</h3>
                                        <button type="button" class="btn-close"><X className="icon-16 cp" onClick={handleCloseAddRoomForm} /></button>
                                    </div>
                                    <div className="room-form v-center fww w100">
                                        <div className="form-group-settings name flx31 mr8">
                                            <p className="fc15 fw6 fs14 ls1">Room Name</p>
                                            <input
                                                type="text"
                                                placeholder="Enter Room Name"
                                                value={roomName}
                                                onChange={(e) => setRoomName(e.target.value)}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <SingleDropdown 
                                                label="Room Type"
                                                options={roomTypeOptions}
                                                selectedOption={selectedRoomType}
                                                onSelect={handleRoomTypeChange}
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <p className="fc15 fw6 fs14 ls1">Maximum adults</p>
                                            <input
                                                type="text"
                                                placeholder="Max number of adults"
                                                value={maxNumberOfAdults}
                                                onChange={(e) => setMaxNumberOfAdults(e.target.value)}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <p className="fc15 fw6 fs14 ls1">Maximum children</p>
                                            <input
                                                type="text"
                                                placeholder="Max number of children"
                                                value={maxNumberOfChildren}
                                                onChange={(e) => setMaxNumberOfChildren(e.target.value)}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <p className="fc15 fw6 fs14 ls1">Maximum Occupancy</p>
                                            <input
                                                type="text"
                                                placeholder="Max number of occupancy"
                                                value={maxNumberOfOccupancy}
                                                onChange={(e) => setMaxNumberOfOccupancy(e.target.value)}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <p className="fc15 fw6 fs14 ls1">Free Child Age (Years)</p>
                                            <input
                                                type="text"
                                                placeholder="Age limit of free child"
                                                value={ageLimitOfFreeChild}
                                                onChange={(e) => setAgeLimitOfFreeChild(e.target.value)}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <p className="fc15 fw6 fs14 ls1">Total Rooms</p>
                                            <input
                                                type="text"
                                                placeholder="Enter total number of rooms"
                                                value={totalNumberOfRooms}
                                                onChange={(e) => setTotalNumberOfRooms(e.target.value)}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <SingleDropdown 
                                                label="Extra Beds Available"
                                                options={extraBedsOptions}
                                                selectedOption={selectedExtraBeds}
                                                onSelect={handleExtraBedsChange}
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <SingleDropdown 
                                                label="Bed Type"
                                                options={BedTypeOptions}
                                                selectedOption={selectedBedType}
                                                onSelect={handleBedTypeChange}
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <SingleDropdown 
                                                label="Room View"
                                                options={roomViewOptions}
                                                selectedOption={selectedRoomView}
                                                onSelect={handleRoomViewChange}
                                            />
                                        </div>
                                        {otherRoomView && <div className="form-group-settings name flx31 mr8">
                                            <p className="fc15 fw6 fs14 ls1">Other Room View</p>
                                            <input
                                                type="text"
                                                placeholder="Enter room view"
                                                value={roomOtherView}
                                                onChange={(e) => setRoomOtherView(e.target.value)}
                                                autoComplete="off"
                                            />
                                        </div>}
                                    </div>
                                </div>
                            </div>)}
                            <div class="table-responsive">
                                <table class="rooms-table">
                                    <thead>
                                        <tr>
                                            <th>Room Name</th>
                                            <th>Room Type</th>
                                            <th>Capacity</th>
                                            <th>Extra Bed</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colspan="5" class="empty-cell">No rooms added yet</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddHotelForm;
