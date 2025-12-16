import React, { useRef, useState } from "react";
import "./Hotel.css";
import InnerHeader from "../../components/InnerHeader";
import SingleDropdownMultiSearch from "../../components/SingleDropdownMultiSearch";
import "../Distributors/Distributor.css";
import countries from '../../data/countries';
import statesList from '../../data/states';
import citiesList from '../../data/cities';
import { X, Trash2 } from "lucide-react";
import SingleDropdown from "../../components/SingleDropdown";
import CommonImageUpload from "../../components/commonImageUpload";
import MultiImageUpload from "../../components/MultiImageUpload";
import HtmlEditor from "../../components/HtmlEditor";
import MultiDropdown from "../../components/MultiDropdown";

const AddHotelForm = () => {
    const basicInfoRef = useRef(null);
    const locationRef = useRef(null);
    const roomRef = useRef(null);
    const mediaRef = useRef(null);
    const policiesRef = useRef(null);

    const [activeTab, setActiveTab] = useState("basic");

    const tabs = [
        { id: "basic", label: "Basic Info" },
        { id: "location", label: "Location" },
        { id: "rooms", label: "Rooms" },
        { id: "media", label: "Photos And Videos" },
        { id: "policies", label: "Policies" },
    ];
    const [showRoomForm, setShowRoomForm] = useState(false);
    const [otherRoomView, setOtherRoomView] = useState(false);

    const [hotelSubBrandOptions, setHotelSubBrandOptions] = useState([]);
    const [isSubBrandDisabled, setIsSubBrandDisabled] = useState(true);

    const [featuredImg, setFeaturedImg] = useState("");
    const [hotelFeaturedImg, setHotelFeaturedImg] = useState("");
    const [roomPhotosData, setRoomPhotosData] = useState({
        images: [],
    });
    const [imageList, setImageList] = useState([]);
    const [hotelPhotosData, setHotelPhotosData] = useState({
        images: [],
    });
    const [hotelImageList, setHotelImageList] = useState([]);
    const [videoUrl, setVideoUrl] = useState("");
    const [videoList, setVideoList] = useState([]);
    const [additionalGuidelines, setAdditionalGuidelines] = useState("");
    const [selectedIndoorActivities, setSelectedIndoorActivities] = useState([]);
    const [selectedOutdoorActivities, setSelectedOutdoorActivities] = useState([]);

    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [hotelFormData, setHotelFormData] = useState({
        hotel_name: "",
        hotel_category: "",
        hotel_brand: "",
        hotel_sub_brand: "",
        email: "",
        phone: {
            country_code: "",
            number: "",
        },
        website_url: "",
        rating: "",
        channel_manager: "",
        description: "",
        contact_person: {
            name: "",
            email: "",
            phone: {
                country_code: "",
                number: "",
            },
        },
        address: {
            full_address: "",
            country: {},
            state: {},
            city: {},
            zip_code: "",
            google_map_link: "",
        },
        room_count: 0,
        room: {
            room_name: "",
            room_type: {},
            max_adults: "",
            max_children: "",
            max_occupancy: "",
            free_child_age_limit: "",
            total_rooms: "",
            extra_beds: {},
            bed_type: {},
            room_view: {},
            other_view: "",
            room_status: {},
            room_description: "",
        },
        video_link: [],
        checkInTime: "",
        checkOutTime: "",
        indoorActivities: [],
        outdoorActivities: [],
        additional_activities: "",
        hotel_status : "0"
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

    const roomStatusOptions = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
    ];

    const checkInTimeOptions = Array.from({ length: 48 }, (_, i) => {
        const hours = String(Math.floor(i / 2)).padStart(2, "0");
        const minutes = i % 2 === 0 ? "00" : "30";
        const time = `${hours}:${minutes}`;

        return {
            label: time,
            value: time,
        };
    });



    const checkOutTimeOptions = Array.from({ length: 48 }, (_, i) => {
        const hours = String(Math.floor(i / 2)).padStart(2, "0");
        const minutes = i % 2 === 0 ? "00" : "30";
        const time = `${hours}:${minutes}`;

        return {
            label: time,
            value: time,
        };
    });

    const indoorActivitiesOptions = [
        { label: "Gym / Fitness Center", value: "gym" },
        { label: "Spa & Wellness", value: "spa" },
        { label: "Indoor Swimming Pool", value: "indoor_swimming_pool" },
        { label: "Yoga & Meditation", value: "yoga_meditation" },
        { label: "Sauna / Steam Room", value: "sauna_steam" },
        { label: "Indoor Games Room", value: "indoor_games" },
        { label: "Table Tennis", value: "table_tennis" },
        { label: "Badminton (Indoor)", value: "badminton_indoor" },
        { label: "Squash Court", value: "squash" },
        { label: "Billiards / Pool Table", value: "billiards" },
        { label: "Kids Play Area (Indoor)", value: "kids_play_indoor" },
        { label: "Conference / Banquet Hall", value: "conference_hall" },
        { label: "Library / Reading Lounge", value: "library" },
        { label: "Indoor Cinema / Entertainment Room", value: "cinema_room" },
    ];

    const outdoorActivitiesOptions = [
        { label: "Outdoor Swimming Pool", value: "outdoor_swimming_pool" },
        { label: "Garden / Lawn Area", value: "garden" },
        { label: "Kids Play Area (Outdoor)", value: "kids_play_outdoor" },
        { label: "Outdoor Sports Court", value: "outdoor_sports" },
        { label: "Tennis Court", value: "tennis" },
        { label: "Cricket Ground / Practice Nets", value: "cricket" },
        { label: "Football Ground", value: "football" },
        { label: "Volleyball Court", value: "volleyball" },
        { label: "Basketball Court", value: "basketball" },
        { label: "Cycling", value: "cycling" },
        { label: "Jogging / Walking Track", value: "jogging_track" },
        { label: "Bonfire Area", value: "bonfire" },
        { label: "Barbecue (BBQ)", value: "bbq" },
        { label: "Adventure Activities", value: "adventure_activities" },
        { label: "Nature Walk", value: "nature_walk" },
    ];

    const setPhoneNumberFun = (value, countryCode) => {
        value = value.trim();

        if (!value) return null;

        const regex =
            countryCode === "91"
                ? /^[6789]\d{9}$/
                : /^\d{5,20}$/;

        if (!regex.test(value)) {
            console.error("Invalid Mobile No:", value);
            return null;
        }

        return value;
    };

    const handleCountryChange = (option) => {
        if (!option) {
            console.error("Country is required");
            return;
        }

        setHotelFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
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

        const country = hotelFormData.address.country?.value;
        if (!country) {
            console.error("Select country first");
            return;
        }

        setHotelFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
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

        setHotelFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                city: option,
            },
        }));
    };

    const updateAddressField = (key, value) => {
        setHotelFormData(prev => {
            if (!value) {
                console.error(`${key} is required`);
                return prev;
            }

            return {
                ...prev,
                address: {
                    ...prev.address,
                    [key]: value,
                },
            };
        });
    };

    const handleAddRoomForm = () => {
        setShowRoomForm(true);
    };

    const handleCloseAddRoomForm = () => {
        setShowRoomForm(false);
    };

    const handleRoomViewChange = (option) => {
        handleRoomDropdownChange("room_view", option);
        setOtherRoomView(option?.value === "other");
    };

    const scrollToSection = (ref, tab) => {
        setActiveTab(tab);
        ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const validators = {
        email: (value) => {
            value = value.trim();
            if (!value) {
                console.error("Email is empty");
                return false;
            }
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!emailRegex.test(value)) {
                console.error("Invalid email:", value);
                return false;
            }
            return value;
        },

        website_url: (value) => {
            value = value.trim();
            if (!value) {
                console.error("Website URL is empty");
                return false;
            }
            const urlRegex =
                /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i;
            if (!urlRegex.test(value)) {
                console.error("Invalid Website URL:", value);
                return false;
            }
            return value;
        },
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (!value || value.trim() === "") {
            console.error(`${name} is empty`);
            return;
        }

        if (validators[name]) {
            const validatedValue = validators[name](value);
            if (!validatedValue) return;

            setHotelFormData((prev) => ({
                ...prev,
                [name]: validatedValue,
            }));
            return;
        }

        setHotelFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectHotelCategory = (option) => {
        setHotelFormData((prevValues) => ({
            ...prevValues,
            hotel_category: option,
        }));
    };

    const handleSelectHotelBrand = (option) => {
        setHotelFormData((prevValues) => ({
            ...prevValues,
            hotel_brand: option,
        }));
        setIsSubBrandDisabled(false);
        const subBrands = brandSubBrandMap[option?.value] || [];
        setHotelSubBrandOptions(subBrands);
    };

    const handleSelectedHotelSubBrand = (option) => {
        setHotelFormData((prevValues) => ({
            ...prevValues,
            hotel_sub_brand: option,
        }));
        setIsSubBrandDisabled(false);
    };

    const handleCountryCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        setHotelFormData(prev => ({
            ...prev,
            phone: {
                ...prev.phone,
                country_code: value,
            },
        }));
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        setHotelFormData((prev) => ({
            ...prev,
            phone: {
                ...prev.phone,
                number: value,
            },
        }));
    };

    const handlePhoneNumberBlur = () => {
        const { number, country_code } = hotelFormData.phone;

        const validNumber = setPhoneNumberFun(number, country_code);

        if (validNumber === null) return;

        setHotelFormData((prev) => ({
            ...prev,
            phone: {
                ...prev.phone,
                number: validNumber,
            },
        }));
    };

    const handleRatingChange = (star) => {
        setHotelFormData(prev => ({
            ...prev,
            rating: star,
        }));
    };

    const handleContactPersonDetails = (e) => {
        const { name, value, type } = e.target;

        setHotelFormData((prev) => {
            const updated = {
                ...prev,
                contact_person: {
                    ...prev.contact_person,
                    phone: {
                        ...prev.contact_person.phone,
                    },
                },
            };
            
            if (name === "contact_person_name") {
                updated.contact_person.name = value;

                if (type === "blur" && !value.trim()) {
                    console.error("Contact person name is empty");
                }
            }
            
            if (name === "contact_person_email") {
                updated.contact_person.email = value;

                if (type === "blur") {
                    const email = value.trim();
                    const emailRegex =
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

                    if (!email) {
                        console.error("Contact person email is empty");
                    } else if (!emailRegex.test(email)) {
                        console.error("Invalid contact person email:", email);
                    }
                }
            }

            if (name === "contact_person_country_code") {
                updated.contact_person.phone.country_code =
                    value.replace(/\D/g, "");
            }
            if (name === "contact_person_phone") {
                updated.contact_person.phone.number =
                    value.replace(/\D/g, "");

                if (type === "blur") {
                    const phone = value.trim();
                    const countryCode =
                        updated.contact_person.phone.country_code || "91";

                    if (!phone) {
                        console.error("Contact person phone number is empty");
                    } else {
                        const regex =
                            countryCode === "91"
                                ? /^[6789]\d{9}$/
                                : /^\d{5,20}$/;

                        if (!regex.test(phone)) {
                            console.error(
                                "Invalid contact person phone:",
                                phone
                            );
                        }
                    }
                }
            }

            return updated;
        });
    };

    const handleCompleteAddress = (e) => {
        const { name, value } = e.target;

        if (!value.trim()) {
            console.error(`${name} is required`);
            return;
        }

        updateAddressField(name, value.trim());
    };

    const handleRoomInputChange = (e) => {
        const { name, value } = e.target;
        const trimmed = value.trim();

        if (!trimmed) {
            console.error(`${name} is required`);
            return;
        }

        // numeric validation
        const numericFields = [
            "max_adults",
            "max_children",
            "max_occupancy",
            "free_child_age_limit",
            "total_rooms",
        ];

        if (numericFields.includes(name) && !/^\d+$/.test(trimmed)) {
            console.error(`${name} must be a number`);
            return;
        }

        setHotelFormData(prev => ({
            ...prev,
            room: {
                ...prev.room,
                [name]: trimmed,
            },
        }));
    };

    const handleRoomDropdownChange = (field, option) => {
        if (!option || Object.keys(option).length === 0) {
            console.error(`${field} is required`);
            return;
        }

        setHotelFormData(prev => ({
            ...prev,
            room: {
                ...prev.room,
                [field]: option,
                ...(field === "room_view" && option.value !== "other"
                    ? { other_view: "" }
                    : {}),
            },
        }));
    };

    const handleSelectCheckInTime = (option) => {
        setHotelFormData((prev) => ({
            ...prev,
            checkInTime: option,
        }));
    }

    const handleSelectCheckOutTime = (option) => {
        setHotelFormData((prev) => ({
            ...prev,
            checkOutTime: option,
        }));
    }

    const handleUploadFeaturedImg = (file) => {
        console.log("Uploaded featured image:", file);
    }

    const handleUploadHotelFeaturedImg = (file) => {
        console.log("Uploaded featured image:", file);
    }

    const handleSetWorkImages = (id, images) => {
        setRoomPhotosData(images);
    };
    
    const handleAddVideo = () => {
        const url = videoUrl?.trim();

        if (!url) {
            console.error("Video URL is empty");
            return;
        }
        
        const isDuplicate = hotelFormData.video_link.some(
            (video) => video.url === url
        );

        if (isDuplicate) {
            console.warn("Video with this URL already exists");
            return;
        }

        const newVideo = {
            id: Date.now() + "_new",
            url,
            status: "1",
        };
        setVideoList([...videoList, newVideo]);
        setHotelFormData((prev) => ({
            ...prev,
            video_link: [...prev.video_link, newVideo],
        }));

        setVideoUrl("");
    };

    const handleRemoveVideo = (id) => {
        setHotelFormData((prev) => ({
            ...prev,
            video_link: prev.video_link.map((v) =>
            v.id === id ? { ...v, status: "0" } : v
            ),
        }));
    };

    const isValidVideoUrl = (url) => {
        const regex =
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/i;
        return regex.test(url);
    };
    
    const handleQuillChange = (value) => {
        setAdditionalGuidelines(value);
    };

    const handleSelectIndoorActivitiessdas = (option) => {
        console.log("option = ", option);
        if (!option) return;

        setHotelFormData((prev) => {
            const alreadyExists = prev.indoorActivities.some(
                (item) => item.value === option.value
            );

            let updatedActivities;

            if (alreadyExists) {
                // remove if already selected (toggle)
                updatedActivities = prev.indoorActivities.filter(
                    (item) => item.value !== option.value
                );
            } else {
                // add new
                updatedActivities = [...prev.indoorActivities, option];
            }

            console.log("Indoor Activities =", updatedActivities);

            return {
                ...prev,
                indoorActivities: updatedActivities,
            };
        });
    };

    const handleSelectIndoorActivities = (value) => {
        setSelectedIndoorActivities((prevSelected) => {
            const index = prevSelected.indexOf(value);
            const updatedValues = [...prevSelected];

            if (index === -1) {
                updatedValues.push(value);
            } else {
                updatedValues.splice(index, 1);
            }
            setHotelFormData((prevData) => ({
                ...prevData,
                indoorActivities: updatedValues,
            }));
            return updatedValues;
        });
    };

    const handleSelectOutdoorActivities = (value) => {
        setSelectedOutdoorActivities((prevSelected) => {
            const index = prevSelected.indexOf(value);
            const updatedValues = [...prevSelected];

            if (index === -1) {
                updatedValues.push(value);
            } else {
                updatedValues.splice(index, 1);
            }
            setHotelFormData((prevData) => ({
                ...prevData,
                outdoorActivities: updatedValues,
            }));
            return updatedValues;
        });
    };

    
    const handleStatusChange = (e) => {
        const { value } = e.target;
        setHotelFormData((prevValues) => ({
            ...prevValues,
            hotel_status: value,
        }));
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

            <div className="account-details mt24 pl20 pr20 w100 settings">
                <div className="form-tabs df mb16">
                    {tabs.map((tab, index) => (
                        <div
                            key={tab.id}
                            className={`form-tab ${activeTab === tab.id ? "active" : ""}`}
                            onClick={() => scrollToSection(
                                tab.id === "basic"
                                    ? basicInfoRef
                                    : tab.id === "location"
                                    ? locationRef
                                    : tab.id === "rooms"
                                    ? roomRef
                                    : tab.id === "media"
                                    ? mediaRef
                                    : tab.id === "policies"
                                    ? policiesRef
                                    : null,
                                tab.id
                            )}
                        >
                            <span className="tab-number">{index + 1}</span>
                            {tab.label}
                        </div>
                    ))}
                </div>

                <div className="batch-main-grp-inputs mb16 v-center jcsb fww bg8 pl20 pr20 pt20 pb20">
                    <div  ref={basicInfoRef} className="scroll-margin v-center fww w100">
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
                                name="hotelName"
                                placeholder="Enter Hotel Name"
                                value={hotelFormData.hotelName}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings email flx31 mr8">
                            <SingleDropdownMultiSearch
                                label="Category"
                                options={hotelCategoryOptions}
                                selectedOption={hotelFormData.hotel_category}
                                onSelect={handleSelectHotelCategory}
                                search={true}
                            />
                        </div>
                        <div className="form-group-settings mobile flx31 mr8">
                            <SingleDropdownMultiSearch
                                label="Brand"
                                options={hotelBrandOptions}
                                selectedOption={hotelFormData.hotel_brand}
                                onSelect={handleSelectHotelBrand}
                                search={true}
                            />
                        </div>
                        <div className="form-group-settings mobile flx31 mr8">
                            <SingleDropdownMultiSearch
                                label="Sub Brand"
                                options={hotelSubBrandOptions}
                                selectedOption={hotelFormData.hotel_sub_brand}
                                onSelect={handleSelectedHotelSubBrand}
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
                                name="email"
                                placeholder="Enter email address"
                                value={hotelFormData.email}
                                autoComplete="off"
                                onChange={handleInputChange}
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
                                        name="country_code"
                                        className="form-control br4 country-code-input"
                                        placeholder="+91"
                                        maxLength={4}
                                        value={hotelFormData.phone.country_code}
                                        onChange={handleCountryCodeChange}
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
                                    value={hotelFormData.phone.number}
                                    onChange={handlePhoneNumberChange}
                                    onBlur={handlePhoneNumberBlur}
                                />
                            </div>
                        </div>
                        <div className="form-group-settings flx31 mr8">
                            <p className="fc15 fw6 fs14 ls1">Hotel Rating</p>

                            <div className="df aic mt8">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => handleRatingChange(star)}
                                        style={{
                                            fontSize: "26px",
                                            marginRight: "6px",
                                            cursor: "pointer",
                                            transition: "color 0.2s",
                                            color: hotelFormData.rating >= star ? "#ffb400" : "#ccc",
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
                                name="website_url"
                                placeholder="Enter hotel website URL"
                                value={hotelFormData.website_url}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings name flx31 mr8">
                            <p className="fc15 fw6 fs14 ls1">Channel Manager</p>
                            <input
                                type="text"
                                name="channel_manager"
                                placeholder="Enter Channel Manager Name"
                                value={hotelFormData.channel_manager}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings name flx1 mr8  ">
                            <p className="fc15 fw6 fs14 ls1">Hotel Description</p>
                            <textarea
                                id="hotelDescription"
                                name="description"
                                placeholder="Enter hotel description"
                                value={hotelFormData.description}
                                onChange={handleInputChange}
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
                                name="contact_person_name"
                                placeholder="Enter contact person name"
                                value={hotelFormData.contact_person.name}
                                onChange={handleContactPersonDetails}
                                onBlur={handleContactPersonDetails}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings name flx31 mr8">
                            <p className="fc15 fw6 fs14 ls1">Contact Email</p>
                            <input
                                type="text"
                                id="contactPersonEmail"
                                name="contact_person_email"
                                placeholder="Enter contact person email"
                                defaultValue={hotelFormData.contact_person.email}
                                onChange={handleContactPersonDetails}
                                onBlur={handleContactPersonDetails}
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
                                        name="contact_person_country_code"
                                        value={hotelFormData.contact_person.phone.country_code}
                                        onChange={handleContactPersonDetails}
                                        onBlur={handleContactPersonDetails}
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
                                    name="contact_person_phone"
                                    value={hotelFormData.contact_person.phone.number}
                                    onChange={handleContactPersonDetails}
                                    onBlur={handleContactPersonDetails}
                                />
                            </div>
                        </div>
                    </div>
                    <div ref={locationRef} className="scroll-margin v-center brd-t2 pt24 fww w100">
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
                                name="full_address"
                                placeholder="Enter complete address"
                                value={hotelFormData.address.full_address}
                                onChange={handleCompleteAddress}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group-settings flx24 mr8">
                            <SingleDropdownMultiSearch
                                label="Country"
                                options={countries}
                                selectedOption={hotelFormData.address.country}
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
                                selectedOption={hotelFormData.address.state}
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
                                selectedOption={hotelFormData.address.city}
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
                                value={hotelFormData.address.zip_code}
                                onChange={handleCompleteAddress}
                            />
                        </div>
                        <div className="form-group-settings w100 name">
                            <p className="fc15 fw6 fs14 ls1">Google Maps Link</p>
                            <input
                                type="text"
                                placeholder="Enter Google Maps URL"
                                name="google_map_link"
                                value={hotelFormData.address.google_map_link}
                                onChange={handleCompleteAddress}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div ref={roomRef} className="scroll-margin v-center pt24 fww w100 brd-t2">
                        <div className="address-head mb24 w100">
                            <p className="fs18 fc14 ls1 lh22">Room Details</p>
                            <p className="fs14 fc5 ls1 lh18 mt4">Manage your hotel rooms and their details</p>
                        </div>
                        <div class="rooms-table-wrapper w100">
                            <div class="room-list-header">
                                <div class="room-header-left">
                                    <h3>Room List</h3>
                                    <span class="room-count">{hotelFormData.room_count} Rooms</span>
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
                                                name="room_name"
                                                value={hotelFormData.room.room_name}
                                                onChange={handleRoomInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <SingleDropdown 
                                                label="Room Type"
                                                options={roomTypeOptions}
                                                selectedOption={hotelFormData.room.room_type}
                                                onSelect={(opt) => handleRoomDropdownChange("room_type", opt)}
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <p className="fc15 fw6 fs14 ls1">Maximum adults</p>
                                            <input
                                                type="text"
                                                placeholder="Max number of adults"
                                                name="max_adults"
                                                value={hotelFormData.room.max_adults}
                                                onChange={handleRoomInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <p className="fc15 fw6 fs14 ls1">Maximum children</p>
                                            <input
                                                type="text"
                                                placeholder="Max number of children"
                                                name="max_children"
                                                value={hotelFormData.room.max_children}
                                                onChange={handleRoomInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <p className="fc15 fw6 fs14 ls1">Maximum Occupancy</p>
                                            <input
                                                type="text"
                                                placeholder="Max number of occupancy"
                                                name="max_occupancy"
                                                value={hotelFormData.room.max_occupancy}
                                                onChange={handleRoomInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <p className="fc15 fw6 fs14 ls1">Free Child Age (Years)</p>
                                            <input
                                                type="text"
                                                placeholder="Age limit of free child"
                                                name="free_child_age_limit"
                                                value={hotelFormData.room.free_child_age_limit}
                                                onChange={handleRoomInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <p className="fc15 fw6 fs14 ls1">Total Rooms</p>
                                            <input
                                                type="text"
                                                placeholder="Enter total number of rooms"
                                                name="total_rooms"
                                                value={hotelFormData.room.total_rooms}
                                                onChange={handleRoomInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <SingleDropdown 
                                                label="Extra Beds Available"
                                                options={extraBedsOptions}
                                                selectedOption={hotelFormData.room.extra_beds}
                                                onSelect={(opt) => handleRoomDropdownChange("extra_beds", opt)}
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <SingleDropdown 
                                                label="Bed Type"
                                                options={BedTypeOptions}
                                                selectedOption={hotelFormData.room.bed_type}
                                                onSelect={(opt) => handleRoomDropdownChange("bed_type", opt)}
                                            />
                                        </div>
                                        <div className="form-group-settings name flx31 mr8">
                                            <SingleDropdown 
                                                label="Room View"
                                                options={roomViewOptions}
                                                selectedOption={hotelFormData.room.room_view}
                                                onSelect={handleRoomViewChange}
                                            />
                                        </div>
                                        {otherRoomView && <div className="form-group-settings name flx31 mr8">
                                            <p className="fc15 fw6 fs14 ls1">Other Room View</p>
                                            <input
                                                type="text"
                                                name="other_view"
                                                placeholder="Enter room view"
                                                value={hotelFormData.room.other_view}
                                                onChange={handleRoomInputChange}
                                                autoComplete="off"
                                            />
                                        </div>}
                                        <div className="form-group-settings name flx31 mr8">
                                            <SingleDropdown 
                                                label="Room Status"
                                                options={roomStatusOptions}
                                                selectedOption={hotelFormData.room.room_status}
                                                onSelect={(opt) => handleRoomDropdownChange("room_status", opt)}
                                            />
                                        </div>
                                        <div className="form-group-settings name w100 mr8  ">
                                            <p className="fc15 fw6 fs14 ls1">Room Description</p>
                                            <textarea
                                                id="roomDescription"
                                                name="room_description"
                                                placeholder="Enter Room description"
                                                value={hotelFormData.room.room_description}
                                                onChange={handleRoomInputChange}
                                                autoComplete="off"
                                            ></textarea>
                                        </div>
                                        <div className="upload-image v-center flx100 mb16 df">
                                            <p className="flx33 fc15 fw6 fs14 mb12 ls1">Featured Photo</p>
                                            <div className="image-upload-compoenent distributor-profile-image">
                                                <CommonImageUpload
                                                    setWorkImage={setFeaturedImg}
                                                    imgData={featuredImg}
                                                    uploadImg={handleUploadFeaturedImg}
                                                    delstatus={false}
                                                />
                                            </div>
                                        </div>
                                        <div className="upload-image v-center flx100 mb16 df">
                                            <p className="flx33 fc15 fw6 fs14 mb12 ls1">Room Photo</p>
                                            <div className="image-upload-compoenent distributor-profile-image">
                                                <MultiImageUpload
                                                    id="upload1"
                                                    setBlogDetailData={setRoomPhotosData}
                                                    blogDetailData={roomPhotosData.images}
                                                    setWorkImages={handleSetWorkImages}
                                                    setImageList={setImageList}
                                                />
                                            </div>
                                        </div>
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
                    <div ref={mediaRef} className="scroll-margin v-center pt24 fww w100 brd-t2">
                        <div className="address-head mb24 w100">
                            <p className="fs18 fc14 ls1 lh22">Photos & Videos</p>
                            <p className="fs14 fc5 ls1 lh18 mt4">Upload hotel images and videos</p>
                        </div>
                        <div className="upload-image v-center flx100 mb16 df">
                            <p className="flx33 fc15 fw6 fs14 mb12 ls1">Featured Photo</p>
                            <div className="image-upload-compoenent distributor-profile-image">
                                <CommonImageUpload
                                    setWorkImage={setHotelFeaturedImg}
                                    imgData={hotelFeaturedImg}
                                    uploadImg={handleUploadHotelFeaturedImg}
                                    delstatus={false}
                                />
                            </div>
                        </div>
                        <div className="upload-image v-center flx100 mb16 df">
                            <p className="flx33 fc15 fw6 fs14 mb12 ls1">Hotel Photos</p>
                            <div className="image-upload-compoenent distributor-profile-image">
                                <MultiImageUpload
                                    id="upload1"
                                    setBlogDetailData={setHotelPhotosData}
                                    blogDetailData={hotelPhotosData.images}
                                    setWorkImages={handleSetWorkImages}
                                    setImageList={setHotelImageList}
                                />
                            </div>
                        </div>
                        <div className="form-group-settings name w100 mr8">
                            <p className="fc15 fw6 fs14 ls1">Video URL</p>
                            <input
                                type="text"
                                name="video_link"
                                placeholder="Enter Video URL"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                autoComplete="off"
                            />
                            <div className="df jce">
                                <button className="h36 pt8 pb8 pl16 pr16 mt8 cp bg1 fc3 br4" onClick={handleAddVideo} >Add</button>
                            </div>
                            <div className="image-list mt16 mb24">
                               {hotelFormData.video_link
                                    .filter((video) => video.status === "1")
                                    .map((video) => (
                                        <div
                                            className="v-center jcsb listing-img-url"
                                            key={video.id}
                                        >
                                            <div className="img-urls mr16">
                                                <input
                                                    type="text"
                                                    id={`url_${video.id}`}
                                                    name={`url_${video.id}`}
                                                    placeholder="Enter Image URL"
                                                    value={video.url}
                                                    autoComplete="off"
                                                    onChange={(e) =>
                                                        handleEditVideoUrl(
                                                            video.id,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div
                                                className="fc4 cp flx1 box-center fs24 mt8"
                                                onClick={() =>
                                                    handleRemoveVideo(video.id)
                                                }
                                            >
                                                <Trash2 className="icon-16" />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div ref={policiesRef} className="scroll-margin v-center pt24 fww w100 brd-t2">
                        <div className="address-head mb24 w100">
                            <p className="fs18 fc14 ls1 lh22">Hotel Policies</p>
                            <p className="fs14 fc5 ls1 lh18 mt4">Set your hotel's operational policies and rules</p>
                        </div>
                        <div className="form-group-settings mobile flx48 mr8">
                            <SingleDropdownMultiSearch
                                label="Check In Time"
                                options={checkInTimeOptions}
                                selectedOption={hotelFormData.checkInTime}
                                onSelect={handleSelectCheckInTime}
                                search={true}
                            />
                        </div>
                        <div className="form-group-settings mobile flx48 mr8">
                            <SingleDropdownMultiSearch
                                label="Check Out Time"
                                options={checkOutTimeOptions}
                                selectedOption={hotelFormData.checkOutTime}
                                onSelect={handleSelectCheckOutTime}
                                search={true}
                            />
                        </div>
                        <div className="form-group-settings chapter-name flx100">
                            <p className="fc15 fw6 fs14 ls1 mb8">Additional Guidelines</p>
                            <div className="jodit-editor">
                                <HtmlEditor
                                    descValue={additionalGuidelines}
                                    onChange={(value) => handleQuillChange(value)}
                                />
                            </div>
                        </div>
                        <div className="form-group-settings mobile flx48 mr8">
                            <p className="fc15 fw6 fs14 ls1 mb8">Indoor Activities</p>
                            <MultiDropdown
                                label="Indoor Activities"
                                options={indoorActivitiesOptions}
                                selectedValues={hotelFormData.indoorActivities || []}
                                onSelect={handleSelectIndoorActivities}
                                chips={2}
                            />
                        </div>
                        <div className="form-group-settings mobile flx48 mr8">
                            <p className="fc15 fw6 fs14 ls1 mb8">Outdoor Activities</p>
                            <MultiDropdown
                                label="Outdoor Activities"
                                options={outdoorActivitiesOptions}
                                selectedValues={hotelFormData.outdoorActivities || []}
                                onSelect={handleSelectOutdoorActivities}
                                chips={2}
                            />
                        </div>

                        <div className="form-group-settings name w100 mr8  ">
                            <p className="fc15 fw6 fs14 ls1">Additional Activities or Notes</p>
                            <textarea
                                id="additional_activities"
                                name="additional_activities"
                                placeholder="Add any additional activities or special notes..."
                                value={hotelFormData.additional_activities}
                                onChange={handleInputChange}
                                autoComplete="off"
                            ></textarea>
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
                        checked={hotelFormData.hotel_status === "1"}
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
                            checked={hotelFormData.hotel_status === "0"}
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
};

export default AddHotelForm;