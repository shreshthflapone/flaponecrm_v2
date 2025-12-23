import React, {useState} from "react";
import InnerHeader from "../../components/InnerHeader";
import { Pencil, Trash2 } from 'lucide-react';
import { giveTextColor } from "../../data/textColors";
import SingleDropdown from "../../components/SingleDropdown";

const locationData = [
  { id: 1, location_type: "country", country: "india", state: "", city:"", status: "1", },
  { id: 2, location_type: "state", country: "india", state: "maharashtra", city:"", status: "0", },
  { id: 3, location_type: "city", country: "india", state: "haryana", city:"gurgaon", status: "1", },
  { id: 4, location_type: "country", country: "japan", state: "", city:"", status: "0", },
];

const LocationList = () => {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedLocationType, setSelectedLocationType] = useState({});
    const [selectedStatus, setSelectedStatus] = useState({});
    //

    const locationTypeOptions = [
        {label:"Select Location Type", value:""},
        {label:"Country", value:"country"},
        {label:"State", value:"state"},
        {label:"City", value:"city"},
    ];
    const statusOptions = [
        {label:"Select Status", value:""},
        {label:"Active", value:"1"},
        {label:"Inactive", value:"0"},
    ];
    const handleLocationChange = (e) => {
        const { value } = e.target.value;
        setSelectedLocation(value);
    } 

    const handleLocationTypeChange = (option) => {
        setSelectedLocationType(option);
    }

    const handleStatusChange = (option) => {
        setSelectedStatus(option);
    }
    return (
        <>
            <InnerHeader
                heading="Hotel Locations"
                txtSubHeading="Manage your hotel properties and their details"
                showButton={true}
                iconText="Add Location"
                onClick={() => (window.location.href = "/add-location")}
            />

            <div className="myteam-filters v-center jcsb pr16 brd-b1 pb8 pt8 fww fs12 ">
                <div className="left-side-filter v-center w100 fww">
                    <div className="form-group-settings name mb0 flx14 mr8">
                        <input
                            type="text"
                            name="location_filter"
                            placeholder="Enter locations"
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group-settings flx16 mb0 mr8">
                        <SingleDropdown
                            label=""
                            options={locationTypeOptions}
                            selectedOption={selectedLocationType}
                            onSelect={handleLocationTypeChange}
                            placeholder="Location Type"
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
                    <button className="bg1 fs12 pl12 pr12 pt8 pb8 fc3 cp br16 ls1 mr8">GO</button>
                    <button className="clear fs12 pl12 pr12 pt8 pb8 fc1 cp br16 ls1 fw6">Clear</button>
                </div>
            </div>
            <div class="booked table-container df w100 fdc mt16" style={{ overflow: "auto" }}>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Location Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {locationData.length === 0 ? (
                        <tr>
                        <td colSpan="7" className="empty-cell">
                            No location added yet
                        </td>
                        </tr>
                    ) : (
                        locationData.map((location) => (
                        <tr key={location.id}>
                            <td>{location.id}</td>
                            <td style={{textTransform: "capitalize"}}>{location.country || "--"}</td>
                            <td style={{textTransform: "capitalize"}}>{location.state || "--"}</td>
                            <td style={{textTransform: "capitalize"}}>{location.city || "--"}</td>
                            <td 
                                style={{
                                    color: giveTextColor(
                                    location.location_type === "country"
                                    ? "News"
                                    : location.location_type === "city"
                                    ? "Awards"
                                    : location.location_type === "state"
                                    ? "Pending"
                                    : ""
                                    ),
                                    textTransform: "capitalize",
                                }}
                            >
                                {location.location_type}
                            </td>
                            <td><span className={location.status === "1" ? "status-badge active" : "status-badge inactive"}>{location.status === "1" ? "Active" : "Inactive"}</span></td>
                            <td>
                            <Pencil className="icon-16 mr8 cp" />
                            <Trash2 className="icon-16 cp" />
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

export default LocationList;
