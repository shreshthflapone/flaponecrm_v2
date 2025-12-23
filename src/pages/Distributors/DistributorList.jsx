import "./Distributor.css";
import React, { useMemo, useState } from "react";
import InnerHeader from "../../components/InnerHeader";
import { Pencil, ListFilterPlus, ArrowUpDown } from "lucide-react";
import { IoLocation } from "react-icons/io5";
import SingleDropdown from "../../components/SingleDropdown";
import Tooltip from "../../components/Tooltip";
import SidePopup from "../../components/SidePopup";
import SingleDropdownMultiSearch from "../../components/SingleDropdownMultiSearch";

// 1) 10 dummy distributors
const distributorsList = [
  {
    id: 10,
    featured_image:
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=200&q=80",
    distributor_name: "Sanjay Gupta",
    distributor_company: "Taj Hotels",
    distributor_city: "Udaipur",
    distributor_state: "Rajasthan",
    distributor_country: "India",
    distributor_phoneNumber: "9080706050",
    distributor_email: "sanjay@hotels.com",
    status: "1",
  },
  {
    id: 9,
    featured_image: "",
    distributor_name: "Rohit Sharma",
    distributor_company: "Sunrise Travels",
    distributor_city: "Jaipur",
    distributor_state: "Rajasthan",
    distributor_country: "India",
    distributor_phoneNumber: "9876543210",
    distributor_email: "rohit@sunrise.com",
    status: "1",
  },
  {
    id: 8,
    featured_image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&q=80",
    distributor_name: "Anita Verma",
    distributor_company: "Skyline Resorts",
    distributor_city: "Gurugram",
    distributor_state: "Haryana",
    distributor_country: "India",
    distributor_phoneNumber: "9988776655",
    distributor_email: "anita@skyline.com",
    status: "0",
  },
  {
    id: 7,
    featured_image: "",
    distributor_name: "Vikas Singh",
    distributor_company: "Green Valley Holidays",
    distributor_city: "Noida",
    distributor_state: "Uttar Pradesh",
    distributor_country: "India",
    distributor_phoneNumber: "9090909090",
    distributor_email: "vikas@greenvalley.com",
    status: "1",
  },
  {
    id: 6,
    featured_image: "",
    distributor_name: "Neha Kapoor",
    distributor_company: "Oceanic Tours",
    distributor_city: "Mumbai",
    distributor_state: "Maharashtra",
    distributor_country: "India",
    distributor_phoneNumber: "9123456780",
    distributor_email: "neha@oceanic.com",
    status: "1",
  },
  {
    id: 5,
    featured_image:
      "https://images.unsplash.com/photo-1544723795-3fb0b90c07c1?w=200&q=80",
    distributor_name: "Amit Jain",
    distributor_company: "Harbor Travels",
    distributor_city: "Chennai",
    distributor_state: "Tamil Nadu",
    distributor_country: "India",
    distributor_phoneNumber: "9000001111",
    distributor_email: "amit@harbor.com",
    status: "0",
  },
  {
    id: 4,
    featured_image: "",
    distributor_name: "Priya Nair",
    distributor_company: "Desert Sands Holidays",
    distributor_city: "Jaisalmer",
    distributor_state: "Rajasthan",
    distributor_country: "India",
    distributor_phoneNumber: "9112233445",
    distributor_email: "priya@desertsands.com",
    status: "1",
  },
  {
    id: 3,
    featured_image: "",
    distributor_name: "Rahul Mehta",
    distributor_company: "Cityline Hotels",
    distributor_city: "Bengaluru",
    distributor_state: "Karnataka",
    distributor_country: "India",
    distributor_phoneNumber: "9556677880",
    distributor_email: "rahul@cityline.com",
    status: "1",
  },
  {
    id: 2,
    featured_image:
      "https://images.unsplash.com/photo-1544723795-3fb0b90c07c2?w=200&q=80",
    distributor_name: "Kiran Desai",
    distributor_company: "Palm Tree Stays",
    distributor_city: "Goa",
    distributor_state: "Goa",
    distributor_country: "India",
    distributor_phoneNumber: "9222333444",
    distributor_email: "kiran@palmtree.com",
    status: "0",
  },
  {
    id: 1,
    featured_image: "",
    distributor_name: "Deepak Yadav",
    distributor_company: "Mountain View Retreats",
    distributor_city: "Manali",
    distributor_state: "Himachal Pradesh",
    distributor_country: "India",
    distributor_phoneNumber: "9333444555",
    distributor_email: "deepak@mountainview.com",
    status: "1",
  },
];

// avatar color palette + helper (same pattern as hotel list)
const AVATAR_COLORS = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#0EA5E9",
];

const getColorFromString = (str = "") => {
  if (!str) return "#6366F1";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

const DistributorList = () => {
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedType, setSelectedType] = useState({});
  const [distributorNameSearch, setDistributorNameSearch] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [filterStatus, setFilterStatus] = useState(false);
  const [stateDropdownShow, setStateDropdownShow] = useState(false);
  const [cityDropdownShow, setCityDropdownShow] = useState(false);
  const [activeSortColumn, setActiveSortColumn] = useState("id");

  const [filters, setFilters] = useState({
    distributor_name: "",
    status: "",
    country: {},
    state: {},
    city: {},
  });

  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "desc", // default id desc
  });

  const statusOptions = [
    { label: "Select Status", value: "" },
    { label: "Active", value: "1" },
    { label: "Inactive", value: "0" },
  ];

  // type filter agar baad me chahiye to use karo, abhi list me nahi hai
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
    // yaha type filter store me rakhna ho to field add kar sakte ho
  };

  const handleDistributorNameChange = (e) => {
    const value = e.target.value;
    setDistributorNameSearch(value);
    setFilters((prev) => ({
      ...prev,
      distributor_name: value,
    }));
  };

  const handleGo = () => {
    console.log("Apply filters:", filters);
  };

  const handleClear = () => {
    setDistributorNameSearch("");
    setSelectedType({});
    setSelectedStatus({});
    setFilters({
      distributor_name: "",
      status: "",
      country: {},
      state: {},
      city: {},
    });
    setFilterCount(0);
    setFilterStatus(false);
    setStateDropdownShow(false);
    setCityDropdownShow(false);
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

  // 3) sorting handler
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

  // 4) filtering + sorting
  const processedDistributors = useMemo(() => {
    let data = [...distributorsList];

    if (filters.distributor_name) {
      const search = filters.distributor_name.toLowerCase();
      data = data.filter((d) =>
        d.distributor_name.toLowerCase().includes(search)
      );
    }

    if (filters.status) {
      data = data.filter((d) => d.status === filters.status);
    }

    if (filters.country.value) {
      data = data.filter(
        (d) =>
          d.distributor_country.toLowerCase() ===
          filters.country.label.toLowerCase()
      );
    }

    if (filters.state.value) {
      data = data.filter(
        (d) =>
          d.distributor_state.toLowerCase() ===
          filters.state.label.toLowerCase()
      );
    }

    if (filters.city.value) {
      data = data.filter(
        (d) =>
          d.distributor_city.toLowerCase() ===
          filters.city.label.toLowerCase()
      );
    }

    const { key, direction } = sortConfig;
    const dir = direction === "asc" ? 1 : -1;

    data.sort((a, b) => {
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

  const handleDistributorForm = () => {
    // navigation yaha add karo
  };

  // 2) image + avatar (same design)
  const renderDistributorAvatar = (d) => {
    if (d.featured_image) {
      return (
        <span className="distributor-avatar">
          <img src={d.featured_image} alt={d.distributor_name} />
        </span>
      );
    }

    const initial = d.distributor_name?.charAt(0)?.toUpperCase() || "?";
    const bgColor = getColorFromString(d.distributor_name || String(d.id));

    return (
      <span
        className="distributor-avatar avatar-fallback"
        style={{ backgroundColor: bgColor }}
      >
        {initial}
      </span>
    );
  };

  return (
    <>
      <InnerHeader
        heading="Distributor List"
        txtSubHeading="Enter distributor details to create a new account"
        showButton={true}
        iconText="Add Distributor"
        onClick={handleDistributorForm}
      />

      {/* Top filters */}
      <div className="myteam-filters v-center jcsb pr16 brd-b1 pb8 pt8 fww fs12 ">
        <div className="left-side-filter v-center w100 fww">
          <div className="form-group-settings name mb0 flx14 mr8">
            <input
              type="text"
              name="distributor_name"
              placeholder="Enter Distributor Name"
              value={distributorNameSearch}
              onChange={handleDistributorNameChange}
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

      {/* Table */}
      <div
        className="booked table-container df w100 fdc mt16"
        style={{ overflow: "auto" }}
      >
        <table>
          <thead>
            <tr>
              <th
                onClick={() => handleSortByChange("id")}
                className={activeSortColumn === "id" ? "fc1 cp" : "cp"}
              >
                <p className="box-center">
                  Id <ArrowUpDown className="ml4 icon-16" />
                </p>
              </th>
              <th
                onClick={() => handleSortByChange("distributor_name")}
                className={
                  activeSortColumn === "distributor_name" ? "fc1 cp" : "cp"
                }
              >
                <p className="box-center">
                  Name <ArrowUpDown className="ml4 icon-16" />
                </p>
              </th>
              <th
                onClick={() => handleSortByChange("distributor_company")}
                className={
                  activeSortColumn === "distributor_company" ? "fc1 cp" : "cp"
                }
              >
                <p className="box-center">
                  Company <ArrowUpDown className="ml4 icon-16" />
                </p>
              </th>
              <th
                onClick={() => handleSortByChange("distributor_email")}
                className={
                  activeSortColumn === "distributor_email" ? "fc1 cp" : "cp"
                }
              >
                <p className="box-center">
                  Email <ArrowUpDown className="ml4 icon-16" />
                </p>
              </th>
              <th
                onClick={() => handleSortByChange("distributor_phoneNumber")}
                className={
                  activeSortColumn === "distributor_phoneNumber"
                    ? "fc1 cp"
                    : "cp"
                }
              >
                <p className="box-center">
                  Contact <ArrowUpDown className="ml4 icon-16" />
                </p>
              </th>
              <th
                onClick={() => handleSortByChange("distributor_city")}
                className={
                  activeSortColumn === "distributor_city" ? "fc1 cp" : "cp"
                }
              >
                <p className="box-center">
                  Location <ArrowUpDown className="ml4 icon-16" />
                </p>
              </th>
              <th
                onClick={() => handleSortByChange("status")}
                className={activeSortColumn === "status" ? "fc1 cp" : "cp"}
              >
                <p className="box-center">
                  Status <ArrowUpDown className="ml4 icon-16" />
                </p>
              </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {processedDistributors.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-cell">
                  No Distributors added yet
                </td>
              </tr>
            ) : (
              processedDistributors.map((distributor) => (
                <tr key={distributor.id}>
                  <td>{distributor.id}</td>
                  <td>
                    <div className="df v-center">
                      {renderDistributorAvatar(distributor)}
                      <span className="distributor-name">
                        {distributor.distributor_name}
                      </span>
                    </div>
                  </td>
                  <td>{distributor.distributor_company}</td>
                  <td>{distributor.distributor_email}</td>
                  <td>{distributor.distributor_phoneNumber}</td>
                  <td>
                    <span>
                      <IoLocation className="fc1 mr8" />
                      {distributor.distributor_city}
                    </span>
                    <br />
                    <span>
                      ({distributor.distributor_state},{" "}
                      {distributor.distributor_country})
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        distributor.status === "1"
                          ? "status-badge active"
                          : "status-badge inactive"
                      }
                    >
                      {distributor.status === "1" ? "Active" : "Inactive"}
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

      {/* Side filters */}
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

export default DistributorList;
