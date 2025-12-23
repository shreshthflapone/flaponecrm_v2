import React, { useState } from "react";
import InnerHeader from "../../components/InnerHeader";
import { Pencil } from "lucide-react";
import "./activities.css";
import SingleDropdown from "../../components/SingleDropdown";

const activitiesList = [
  {
    id: 1,
    name: "Chess / Ludo",
    type: "indoor",
    age_group: "All Ages",
    timing: "09:00 AM to 06:00 PM",
    capacity: "2 People",
    status: "1",
  },
  {
    id: 2,
    name: "Cricket",
    type: "outdoor",
    age_group: "All Ages",
    timing: "09:00 AM to 06:00 PM",
    capacity: "12 People",
    status: "0",
  },
];

const ActivitiesList = () => {
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedType, setSelectedType] = useState({});
  const [activityNameSearch, setActivityNameSearch] = useState("");

  const [filters, setFilters] = useState({
    activity_name: "",
    type: "",
    status: "",
  });

  const statusOptions = [
    { label: "Select Status", value: "" },
    { label: "Active", value: "1" },
    { label: "Inactive", value: "0" },
  ];

  const typeOptions = [
    { label: "Select Type", value: "" },
    { label: "Indoor", value: "indoor" },
    { label: "Outdoor", value: "outdoor" },
  ];

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

  const handleActivityChange = (e) => {
    const value = e.target.value;
    setActivityNameSearch(value);
    setFilters((prev) => ({
      ...prev,
      activity_name: value,
    }));
  };

  const handleGo = () => {
    console.log("Apply filters:", filters);
  };

  const handleClear = () => {
    setActivityNameSearch("");
    setSelectedType({});
    setSelectedStatus({});
    setFilters({
      activity_name: "",
      type: "",
      status: "",
    });
  };

  const filteredActivities = activitiesList.filter((activity) => {
    const matchName = filters.activity_name
      ? activity.name
          .toLowerCase()
          .includes(filters.activity_name.toLowerCase())
      : true;

    const matchType = filters.type ? activity.type === filters.type : true;

    const matchStatus = filters.status
      ? activity.status === filters.status
      : true;

    return matchName && matchType && matchStatus;
  });

  return (
    <>
      <InnerHeader
        heading="Hotel Activities"
        txtSubHeading="Manage indoor and outdoor activities available at your hotels."
        showButton={true}
        iconText="Add Hotel Activity"
        onClick={() => (window.location.href = "/add-activity")}
      />

      <div className="myteam-filters v-center jcsb pr16 brd-b1 pb8 pt8 fww fs12 ">
        <div className="left-side-filter v-center w100 fww">
          <div className="form-group-settings name mb0 flx14 mr8">
            <input
              type="text"
              name="activity_name"
              placeholder="Enter Activity"
              value={activityNameSearch}
              onChange={handleActivityChange}
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
              placeholder="Location Status"
            />
          </div>

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
              <th>ID</th>
              <th>Activity Name</th>
              <th>Type</th>
              <th>Age Group</th>
              <th>Timing</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredActivities.length === 0 ? (
              <tr>
                <td colSpan="9" className="empty-cell">
                  No Activity added yet
                </td>
              </tr>
            ) : (
              filteredActivities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.id}</td>
                  <td>{activity.name}</td>
                  <td>
                    <span
                      className={
                        activity.type === "indoor"
                          ? "type-badge indoor"
                          : "type-badge outdoor"
                      }
                    >
                      {activity.type}
                    </span>
                  </td>
                  <td>{activity.age_group}</td>
                  <td>{activity.timing}</td>
                  <td>{activity.capacity}</td>
                  <td>
                    <span
                      className={
                        activity.status === "1"
                          ? "status-badge active"
                          : "status-badge inactive"
                      }
                    >
                      {activity.status === "1" ? "Active" : "Inactive"}
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
    </>
  );
};

export default ActivitiesList;