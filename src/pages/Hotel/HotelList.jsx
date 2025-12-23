import React, { useMemo, useState, useEffect } from "react";
import InnerHeader from "../../components/InnerHeader";
import { Pencil, ListFilterPlus, ArrowUpDown } from "lucide-react";
import { IoLocation } from "react-icons/io5";
import SingleDropdown from "../../components/SingleDropdown";
import Tooltip from "../../components/Tooltip";
import SidePopup from "../../components/SidePopup";
import SingleDropdownMultiSearch from "../../components/SingleDropdownMultiSearch";
import "./Hotel.css";

const hotelList = [
  {
    id: 10,
    featured_image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200&q=80",
    hotel_name: "Aurika, Udaipur - Luxury by Lemon Tree Hotels",
    hotel_city: "Udaipur",
    hotel_state: "Rajasthan",
    hotel_country: "India",
    hotel_pincode: "313301",
    category_name: "resort",
    created_date: "11 July 2025",
    status: "1",
    type: "resort",
  },
  {
    id: 9,
    featured_image: "",
    hotel_name: "Sunrise Plaza Hotel",
    hotel_city: "Jaipur",
    hotel_state: "Rajasthan",
    hotel_country: "India",
    hotel_pincode: "302001",
    category_name: "hotel",
    created_date: "10 July 2025",
    status: "1",
    type: "hotel",
  },
  {
    id: 8,
    featured_image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200&q=80",
    hotel_name: "Lakeview Retreat",
    hotel_city: "Noida",
    hotel_state: "Uttar Pradesh",
    hotel_country: "India",
    hotel_pincode: "201301",
    category_name: "hotel",
    created_date: "09 July 2025",
    status: "0",
    type: "hotel",
  },
  {
    id: 7,
    featured_image: "",
    hotel_name: "Himalayan Heights Resort",
    hotel_city: "Shimla",
    hotel_state: "Himachal Pradesh",
    hotel_country: "India",
    hotel_pincode: "171001",
    category_name: "resort",
    created_date: "08 July 2025",
    status: "1",
    type: "resort",
  },
  {
    id: 6,
    featured_image: "",
    hotel_name: "City Center Inn",
    hotel_city: "Gurugram",
    hotel_state: "Haryana",
    hotel_country: "India",
    hotel_pincode: "122001",
    category_name: "hotel",
    created_date: "07 July 2025",
    status: "1",
    type: "hotel",
  },
  {
    id: 5,
    featured_image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=200&q=80",
    hotel_name: "Palm Tree Resort",
    hotel_city: "Goa",
    hotel_state: "Goa",
    hotel_country: "India",
    hotel_pincode: "403001",
    category_name: "resort",
    created_date: "06 July 2025",
    status: "0",
    type: "resort",
  },
  {
    id: 4,
    featured_image: "",
    hotel_name: "Royal Orchid Suites",
    hotel_city: "Bengaluru",
    hotel_state: "Karnataka",
    hotel_country: "India",
    hotel_pincode: "560001",
    category_name: "hotel",
    created_date: "05 July 2025",
    status: "1",
    type: "hotel",
  },
  {
    id: 3,
    featured_image: "",
    hotel_name: "Desert Dunes Resort",
    hotel_city: "Jaisalmer",
    hotel_state: "Rajasthan",
    hotel_country: "India",
    hotel_pincode: "345001",
    category_name: "resort",
    created_date: "04 July 2025",
    status: "1",
    type: "resort",
  },
  {
    id: 2,
    featured_image:"",
    hotel_name: "Harbor View Hotel",
    hotel_city: "Mumbai",
    hotel_state: "Maharashtra",
    hotel_country: "India",
    hotel_pincode: "400001",
    category_name: "hotel",
    created_date: "03 July 2025",
    status: "0",
    type: "hotel",
  },
  {
    id: 1,
    featured_image: "",
    hotel_name: "Green Valley Resort",
    hotel_city: "Manali",
    hotel_state: "Himachal Pradesh",
    hotel_country: "India",
    hotel_pincode: "175131",
    category_name: "resort",
    created_date: "02 July 2025",
    status: "1",
    type: "resort",
  },
];

const HotelList = () => {
    const [selectedStatus, setSelectedStatus] = useState({});
    const [selectedType, setSelectedType] = useState({});
    const [hotelNameSearch, setHotelNameSearch] = useState("");
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [filterCount, setFilterCount] = useState(0);
    const [filterStatus, setFilterStatus] = useState(false);
    const [stateDropdownShow, setStateDropdownShow] = useState(false);
    const [cityDropdownShow, setCityDropdownShow] = useState(false);
    const [sortBy, setSortBy] = useState("id");
    const [sortDirection, setSortDirection] = useState("desc");
    const [activeSortColumn, setActiveSortColumn] = useState("id");

    const [filters, setFilters] = useState({
        hotel_name: "",
        type: "",
        status: "",
        country: {},
        state: {},
        city: {},
    });

    const [sortConfig, setSortConfig] = useState({
        key: "id",
        direction: "desc",
    });

    const statusOptions = [
        { label: "Select Status", value: "" },
        { label: "Active", value: "1" },
        { label: "Inactive", value: "0" },
    ];

    const typeOptions = [
        { label: "Select Type", value: "" },
        { label: "Hotel", value: "hotel" },
        { label: "Resort", value: "resort" },
    ];

    const countryOptions = [
        { label: "Select Country", value: "" },
        { label: "India", value: "india" },
        { label: "Japan", value: "japan" },
        { label: "America", value: "america" },
    ];

    const stateOptions = [
        { label: "Select Value", value: "" },
        { label: "Rajasthan", value: "rajasthan" },
        { label: "Haryana", value: "haryana" },
        { label: "Uttar Pradesh", value: "uttar_pradesh" },
    ];

    const cityOptions = [
        { label: "Jaipur", value: "jaipur" },
        { label: "Gurugram", value: "gurugram" },
        { label: "Noida", value: "noida" },
    ];

    // top filters
    const handleStatusChange = (option) => {
        setSelectedStatus(option);
        setFilters((prev) => ({
        ...prev,
        status: option?.value || "",
        }));
    };

    const handleTypeChange = (option) => {
        setSelectedType(option);
        setFilters((prev) => ({
        ...prev,
        type: option?.value || "",
        }));
    };

    const handleHotelNameChange = (e) => {
        const value = e.target.value;
        setHotelNameSearch(value);
        setFilters((prev) => ({
        ...prev,
        hotel_name: value,
        }));
    };

    const handleGo = () => {
        console.log("Apply filters:", filters);
    };

    const handleClear = () => {
        setHotelNameSearch("");
        setSelectedType({});
        setSelectedStatus({});
        setFilters({
        hotel_name: "",
        type: "",
        status: "",
        country: {},
        state: {},
        city: {},
        });
        setFilterCount(0);
        setFilterStatus(false);
    };

    // more filter popup
    const handleFilterClick = () => {
        setShowFilterPopup(true);
        document.body.style.overflow = "hidden";
    };

    const closeMoreFilter = () => {
        setShowFilterPopup(false);
        document.body.style.overflow = "auto";
    };

    const updateFilter = (key, value) => {
        if (key === "country") {
        if (value.value !== "") {
            setStateDropdownShow(true);
        } else {
            setStateDropdownShow(false);
            setCityDropdownShow(false);
        }
        } else if (key === "state") {
        setStateDropdownShow(true);
        if (value.value !== "") {
            setCityDropdownShow(true);
        } else {
            setCityDropdownShow(false);
        }
        }

        setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        // filterCount: country/state/city filled kitne
        const count =
            (newFilters.country.value ? 1 : 0) +
            (newFilters.state.value ? 1 : 0) +
            (newFilters.city.value ? 1 : 0);
        setFilterCount(count);
        setFilterStatus(count > 0);
        return newFilters;
        });
    };

    const clearFilter = () => {
        setFilters((prev) => ({
        ...prev,
        country: {},
        state: {},
        city: {},
        }));
        setFilterCount(0);
        setFilterStatus(false);
        setStateDropdownShow(false);
        setCityDropdownShow(false);
    };

    const applyFilter = () => {
        closeMoreFilter();
    };

  const processedHotels = useMemo(() => {
    let data = [...hotelList];
    if (filters.hotel_name) {
      const search = filters.hotel_name.toLowerCase();
      data = data.filter((h) =>
        h.hotel_name.toLowerCase().includes(search)
      );
    }

    if (filters.type) {
      data = data.filter((h) => h.type === filters.type);
    }

    if (filters.status) {
      data = data.filter((h) => h.status === filters.status);
    }

    if (filters.country.value) {
      data = data.filter(
        (h) =>
          h.hotel_country.toLowerCase() ===
          filters.country.label.toLowerCase()
      );
    }

    if (filters.state.value) {
      data = data.filter(
        (h) =>
          h.hotel_state.toLowerCase() ===
          filters.state.label.toLowerCase()
      );
    }

    if (filters.city.value) {
      data = data.filter(
        (h) =>
          h.hotel_city.toLowerCase() ===
          filters.city.label.toLowerCase()
      );
    }

    const { key, direction } = sortConfig;

    data.sort((a, b) => {
      const dir = direction === "asc" ? 1 : -1;
      const aVal = a[key];
      const bVal = b[key];

      if (key === "id") {
        return (aVal - bVal) * dir;
      }

      const aStr = String(aVal || "").toLowerCase();
      const bStr = String(bVal || "").toLowerCase();

      if (aStr < bStr) return -1 * dir;
      if (aStr > bStr) return 1 * dir;
      return 0;
    });

    return data;
  }, [filters, sortConfig]);

    const renderHotelImage = (hotel) => {
        if (hotel.featured_image) {
            return (
                <span className="hotel-avatar">
                    <img src={hotel.featured_image} alt={hotel.hotel_name} />
                </span>
            );
        }

        const initial = hotel.hotel_name?.charAt(0)?.toUpperCase() || "?";

        return (
            <span className="hotel-avatar avatar-fallback">
                {initial}
            </span>
        );
    };

    const handleSortByChange = (field) => {
        setSortConfig((prev) => {
            if (prev.key === field) {
                const nextDirection = prev.direction === "desc" ? "asc" : "desc";
                return { key: field, direction: nextDirection };
            }

            return {
                key: field,
                direction: field === "id" ? "desc" : "asc",
            };
        });

        setActiveSortColumn(field);
    };


  return (
    <>
      <InnerHeader
        heading="Hotels List"
        txtSubHeading="Manage indoor and outdoor activities available at your hotels."
        showButton={true}
        iconText="Add Hotel"
        onClick={() => (window.location.href = "/add-hotel")}
      />
      
      <div className="myteam-filters v-center jcsb pr16 brd-b1 pb8 pt8 fww fs12 ">
        <div className="left-side-filter v-center w100 fww">
          <div className="form-group-settings name mb0 flx14 mr8">
            <input
              type="text"
              name="hotel_name"
              placeholder="Enter Hotel Name"
              value={hotelNameSearch}
              onChange={handleHotelNameChange}
              autoComplete="off"
            />
          </div>

          <div className="form-group-settings flx16 mb0 mr8">
            <SingleDropdown
              label=""
              options={typeOptions}
              selectedOption={selectedType}
              onSelect={handleTypeChange}
              placeholder="Type"
            />
          </div>

          <div className="form-group-settings flx16 mb0 mr8">
            <SingleDropdown
              label=""
              options={statusOptions}
              selectedOption={selectedStatus}
              onSelect={handleStatusChange}
              placeholder="Status"
            />
          </div>

          <Tooltip title={"More Filter"}>
            <div className="pr">
              <ListFilterPlus
                className="cp fs16 ml12 fc5 mr8"
                onClick={handleFilterClick}
              />
              {filterCount > 0 && (
                <span className="notification-count pa br50 fc1 fw6">
                  {filterCount}
                </span>
              )}
            </div>
          </Tooltip>

          <button
            className="bg1 fs12 pl12 pr12 pt8 pb8 fc3 cp br16 ls1 mr8"
            onClick={handleGo}
          >
            GO
          </button>

          <button
            className="clear fs12 pl12 pr12 pt8 pb8 fc1 cp br16 ls1 fw6"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
      
      <div
        className="booked table-container df w100 fdc mt16"
        style={{ overflow: "auto" }}
      >
        <table>
          <thead>
            <tr>
              
                <th onClick={() => handleSortByChange("id")} className={activeSortColumn === "id" ? "fc1 cp" : "cp"}><p className="box-center">Id <ArrowUpDown className="ml4 icon-16" /></p></th>
                <th onClick={() => handleSortByChange("hotel_name")} className={activeSortColumn === "hotel_name" ? "fc1 cp" : "cp"}><p className="box-center">Name <ArrowUpDown className="ml4 icon-16" /></p></th>
                <th onClick={() => handleSortByChange("hotel_city")} className={activeSortColumn === "hotel_city" ? "fc1 cp" : "cp"}><p className="box-center">Location <ArrowUpDown className="ml4 icon-16" /></p></th>
                <th onClick={() => handleSortByChange("hotel_pincode")} className={activeSortColumn === "hotel_pincode" ? "fc1 cp" : "cp"}><p className="box-center">Pincode <ArrowUpDown className="ml4 icon-16" /></p></th>
                <th onClick={() => handleSortByChange("category_name")} className={activeSortColumn === "category_name" ? "fc1 cp" : "cp"}><p className="box-center">Category <ArrowUpDown className="ml4 icon-16" /></p></th>
                <th onClick={() => handleSortByChange("created_date")} className={activeSortColumn === "created_date" ? "fc1 cp" : "cp"}><p className="box-center">Created Date <ArrowUpDown className="ml4 icon-16" /></p></th>
                <th onClick={() => handleSortByChange("status")} className={activeSortColumn === "status" ? "fc1 cp" : "cp"}><p className="box-center">Status <ArrowUpDown className="ml4 icon-16" /></p></th>
                <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {processedHotels.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-cell">
                  No Hotel added yet
                </td>
              </tr>
            ) : (
              processedHotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td>{hotel.id}</td>
                  <td>
                    <div className="df v-center">
                      {renderHotelImage(hotel)}
                      <span className="hotel-name">{hotel.hotel_name}</span>
                    </div>
                  </td>
                  <td>
                    <span>
                      <IoLocation className="fc1 mr8" />
                      {hotel.hotel_city}
                    </span>
                    <br />
                    <span>
                      ({hotel.hotel_state}, {hotel.hotel_country})
                    </span>
                  </td>
                  <td>{hotel.hotel_pincode}</td>
                  <td>
                    <div
                      className="category-badge"
                      style={{ textTransform: "capitalize" }}
                    >
                      {hotel.category_name}
                    </div>
                  </td>
                  <td>{hotel.created_date}</td>
                  <td>
                    <span
                      className={
                        hotel.status === "1"
                          ? "status-badge active"
                          : "status-badge inactive"
                      }
                    >
                      {hotel.status === "1" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <Pencil className="icon-16 mr8 cp" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showFilterPopup && (
        <SidePopup show={showFilterPopup} onClose={closeMoreFilter}>
          <div className="df jcsb brd-b1 p12 box-center bg7 w100 fc1 ls2 lh22">
            <p className="fs18 fc1 ">Filters</p>
            <button className="lead-close-button" onClick={closeMoreFilter}>
              X
            </button>
          </div>

          <div className="filter-lists pl16 pt16 pr16">
            <div className="filter">
              <div className="role-filter mb16">
                <SingleDropdownMultiSearch
                  label="Select Country"
                  options={countryOptions}
                  selectedOption={filters.country}
                  onSelect={(opt) => updateFilter("country", opt)}
                  search={true}
                />
              </div>

              {stateDropdownShow && (
                <div className="role-filter mb16">
                  <SingleDropdownMultiSearch
                    label="Select State"
                    options={stateOptions}
                    selectedOption={filters.state}
                    onSelect={(opt) => updateFilter("state", opt)}
                    search={true}
                  />
                </div>
              )}

              {cityDropdownShow && (
                <div className="role-filter mr12 mb16">
                  <SingleDropdownMultiSearch
                    label="Select City"
                    options={cityOptions}
                    selectedOption={filters.city}
                    onSelect={(opt) => updateFilter("city", opt)}
                    search={true}
                  />
                </div>
              )}
            </div>

            <div className="filter-button-container mt16 pt16 box-center myteam-filters ">
              <button
                type="button"
                className="bg1 fc3 pt8 pb8 pl16 pr16 br24 mr12 fs12 ls1 cp"
                onClick={closeMoreFilter}
              >
                Close
              </button>
              <button
                type="button"
                className="bg1 fc3 pt8 pb8 pl16 pr16 br24 mr12 fs12 ls1 cp"
                onClick={applyFilter}
              >
                Apply
              </button>
              {filterStatus > 0 && (
                <button
                  className="clear fs12 pl12 pr12 pt8 pb8 fc1 cp br16 ls1 fw6"
                  onClick={clearFilter}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </SidePopup>
      )}
    </>
  );
};

export default HotelList;