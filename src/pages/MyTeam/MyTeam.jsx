import React from "react";
import "./MyTeam.css";
import { useEffect, useState } from "react";
import InnerHeader from "../../components/InnerHeader";
import commonApi from "../../components/commonApi";
import Card from "../../components/Card";
import Dropdown from "../../components/Dropdown";
import SearchInput from "../../components/SearchInput";
import { ArrowUpDown, PencilLine } from "lucide-react"
import Tooltip from "../../components/Tooltip";
import { BsTrash, BsToggleOn, BsToggleOff } from "react-icons/bs";
import Popup from "../../components/Popup";
import AddTeam from "../../components/AddTeam";

const tableData = [
    {
        "dept_name": "Faculty",
        "user_id": "82",
        "experts_in": "Instructor",
        "fk_parent_id": "4",
        "role_id": "4",
        "fk_dept_id": "9",
        "view_status": "0",
        "auto_assign": null,
        "orderby": "82",
        "email_id": "mohd.shabbir@flapone.com",
        "mobile_number": "9891311513",
        "status": "1",
        "name": "mohd.shabbir",
        "fk_location_id": "1,2",
        "updated_date": "2025-11-14 17:55:54",
        "small_overview": null,
        "last_login_datetime": "2025-11-14 17:41:14",
        "logFlag": 0,
        "designation": "Instructor",
        "id": "82",
        "email": "mohd.shabbir@flapone.com",
        "role_name": "Executive",
        "department": "Faculty",
        "manager": "Mohit Srivastava (mohit@flapone.com)",
        "location": [
            "1",
            "2"
        ],
        "lastLoginDate": "14 Nov 25",
        "lastLoginTime": "05:41:14 pm",
        "viewStatus": false,
        "leadAutoAssign": false,
        "isToggled": true,
        "statusname": "Active"
    },
    {
        "dept_name": "Sales",
        "user_id": "81",
        "experts_in": "RM",
        "fk_parent_id": "72",
        "role_id": "4",
        "fk_dept_id": "7",
        "view_status": "0",
        "auto_assign": "1",
        "orderby": "81",
        "email_id": "gaurav.rawat@flapone.com",
        "mobile_number": "971122799",
        "status": "1",
        "name": "gaurav.rawat",
        "fk_location_id": "1",
        "updated_date": "2025-12-01 10:07:35",
        "small_overview": null,
        "last_login_datetime": "2025-11-19 09:46:37",
        "logFlag": 0,
        "designation": "RM",
        "id": "81",
        "email": "gaurav.rawat@flapone.com",
        "role_name": "Executive",
        "department": "Sales",
        "manager": "Dineswee (dineswee@flapone.com)",
        "location": [
            "1"
        ],
        "lastLoginDate": "19 Nov 25",
        "lastLoginTime": "09:46:37 am",
        "viewStatus": false,
        "leadAutoAssign": true,
        "isToggled": true,
        "statusname": "Active",
        "autoAssignFlag": 1
    },
    {
        "dept_name": "Sales",
        "user_id": "80",
        "experts_in": "Relationship Manager",
        "fk_parent_id": "72",
        "role_id": "4",
        "fk_dept_id": "7",
        "view_status": "0",
        "auto_assign": "1",
        "orderby": "80",
        "email_id": "shivangi@flapone.com",
        "mobile_number": "9811010991",
        "status": "1",
        "name": "Shivangi Rathore",
        "fk_location_id": "4",
        "updated_date": "2025-12-02 17:03:00",
        "small_overview": null,
        "last_login_datetime": "2025-12-02 17:03:00",
        "logFlag": 0,
        "designation": "Relationship Manager",
        "id": "80",
        "email": "shivangi@flapone.com",
        "role_name": "Executive",
        "department": "Sales",
        "manager": "Dineswee (dineswee@flapone.com)",
        "location": [
            "4"
        ],
        "lastLoginDate": "02 Dec 25",
        "lastLoginTime": "05:03:00 pm",
        "viewStatus": false,
        "leadAutoAssign": true,
        "isToggled": true,
        "statusname": "Active",
        "autoAssignFlag": 1
    },
    {
        "dept_name": "Sales",
        "user_id": "79",
        "experts_in": "AM Aviation",
        "fk_parent_id": "72",
        "role_id": "3",
        "fk_dept_id": "7",
        "view_status": "0",
        "auto_assign": "1",
        "orderby": "79",
        "email_id": "parth@flapone.com",
        "mobile_number": "9811034495",
        "status": "1",
        "name": "Parth Bathla",
        "fk_location_id": "1",
        "updated_date": "2025-12-02 10:36:50",
        "small_overview": null,
        "last_login_datetime": "2025-12-02 10:36:50",
        "logFlag": 0,
        "designation": "AM Aviation",
        "id": "79",
        "email": "parth@flapone.com",
        "role_name": "Assistant Manager",
        "department": "Sales",
        "manager": "Dineswee (dineswee@flapone.com)",
        "location": [
            "1"
        ],
        "lastLoginDate": "02 Dec 25",
        "lastLoginTime": "10:36:50 am",
        "viewStatus": false,
        "leadAutoAssign": true,
        "isToggled": true,
        "statusname": "Active",
        "autoAssignFlag": 1
    },
];

const MyTeam = () => {
  const [addTeamPopup, setAddTeamPopup] = useState(false);
  const [status, setStatus] = useState("");
  const [clearSignal, setClearSignal] = useState(false);
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [overview, setOverview] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [searchLabel, setSearchLabel] = useState("Search by");
  const [showSearchInput, setShowSearchInput] = useState(false);
  

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const departmentOptions = [
    { label: "All", value: "" },
    { label: "Sales", value: "sales" },
    { label: "Marketing", value: "marketing" },
  ];

  const roleOptions = [
    { label: "All", value: "" },
    { label: "Manager", value: "manager" },
    { label: "Admin", value: "admin" },
  ];

  const teamSortByOverview = [
    { label: "Name", value: "name" },
    { label: "Joining Date", value: "joining_date" },
    { label: "Role", value: "role" },
  ];

  const searchByOptions = [
    { label: "Name", value: "name" },
    { label: "Email", value: "email" },
    { label: "Contact Number", value: "contact_number" },
  ];

  const handleDepartmentChange = (value) => {
    setDepartment(value);
  }

  const handleRoleChange = (value) => {
    setRole(value);
  }

  const handleStatusChange = (value) => {
    setStatus(value);
  }

  const handleOverviewChange = (value) => {
    setOverview(value);
  }

  const handleSearchByChange = (value) => {
    setSearchBy(value);
    setShowSearchInput(true);
  }

  const handleSearchChange = (value) => {
    console.log("Search Value:", value);
  }
  
  const openAddTeamPopup = () => {
    setAddTeamPopup(true);
  };
  const closeAddTeamPopup = () => {
    setAddTeamPopup(false);
  };

  const handleTeamMember = () => {
    console.log("handleTeamMember called");
  };

  const setMemberPosition = (e, teamMem) => {
    console.log("Set position called for:", teamMem.name, "New Position:", e.target.value);
  };

  return (
    <>
      <InnerHeader
        heading="My Team"
        txtSubHeading="Effortlessly set up your team, inviting and efficiently managing members with different roles."
        showButton={true}
        iconText="Add New Member"
        onClick={openAddTeamPopup}
      />
      <Card className="bg5 mt16 pb16">
        <div className="myteam-filters v-center jcsb pl16 brd-b1 pb12 pt12 fww">
          <div className="left-side-filter v-center fww">
            <div className="status-filter mr8">
              <Dropdown
                label={"Select Status"}
                options={statusOptions}
                selectedValue={status}
                onValueChange={handleStatusChange}
                clearSignal={clearSignal}
              />
            </div>
            <div className="dept-filter mr8">
              <Dropdown
                label={"Select Department"}
                options={departmentOptions}
                selectedValue={department}
                onValueChange={handleDepartmentChange}
                clearSignal={clearSignal}
              />
            </div>
            <div className="role-filter mr12">
              <Dropdown
                label={"Select Role"}
                options={roleOptions}
                selectedValue={role}
                onValueChange={handleRoleChange}
                clearSignal={clearSignal}
              />
            </div>
            
            <div className="overview-filter mr12">
              <Dropdown
                label={"Overview"}
                options={teamSortByOverview}
                selectedValue={overview}
                onValueChange={handleOverviewChange}
                clearSignal={clearSignal}
              />
            </div>

            <div className="search-by-drp  mr8">
              <Dropdown
                label={searchLabel}
                options={searchByOptions}
                selectedValue={searchBy}
                onValueChange={handleSearchByChange}
              />
            </div>
            <div className="search-filter v-center mr16">
              {showSearchInput && (
                <SearchInput
                  onSearchChange={handleSearchChange}
                  clearSignal={clearSignal}
                  placeholder={searchLabel}
                />
              )}
            </div>
            <button
              className="bg1 fs12 pl12 pr12 pt8 pb8 fc3 cp br16 ls1 mr8"
            >
              GO
            </button>
            <button
              className="clear fs12 pl12 pr12 pt8 pb8 fc1 cp br16 ls1 fw6"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="mylead-filters v-center jcsb pl16 pt16 fww fs12 ">Total Results: 4</div>
        
        <div
          className="booked table-container df w100 fdc mt16"
          style={{ overflow: "auto" }}
        >
          <table>
            <thead>
              <tr>
                <th>
                  <p className="box-center cp">
                    Name&nbsp;/&nbsp;Email
                    <ArrowUpDown className="ml4" />
                  </p>
                </th>
                <th>
                  <p className="box-center cp">
                    Role&nbsp;/&nbsp;Dept.
                    <ArrowUpDown className="ml4" />
                  </p>
                </th>
                <th>
                  <p className="box-center cp">
                    Manager
                    <ArrowUpDown className="ml4" />
                  </p>
                </th>
                <th>
                  <p className="box-center cp">
                    Designation
                    <ArrowUpDown className="ml4" />
                  </p>
                </th>
                {/* <th>
                  <p className="box-center cp">
                    Auto&nbsp;Assign
                    <ArrowUpDown className="ml4" />
                  </p>
                </th>

                <th>
                  <p className="box-center cp">
                    Team Visibility
                    <ArrowUpDown className="ml4" />
                  </p>
                </th> */}
                <th>
                  <p className="box-center cp">
                    Login
                    <ArrowUpDown className="ml4" />
                  </p>
                </th>
                {/* <th>
                  <p className="box-center cp">
                    Order
                    <ArrowUpDown className="ml4" />
                  </p>
                </th> */}
                <th>Action</th>
              </tr>
            </thead>
            {tableData &&
            tableData.length > 0 &&
            tableData.map((member) => (
              <tr key={member.id}>
                <td>
                  <span
                    style={{
                      color: "#76838f",
                      display: "block",
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                      className="ttc"
                  >
                    {member.name}
                  </span>
                  <span style={{ fontSize: "11px" }}>
                    {member.email_id}
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      color: "#eb5c23",
                      display: "block",
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    {member.role_name}
                  </span>
                  <span style={{ fontSize: "11px" }}>
                    {member.department}
                  </span>
                </td>
                <td className="lh18 ttc">
                  {member.manager.split("(")[0]}
                </td>
                <td className="lh18 ttc">{member.experts_in}</td>
                {/* <td>
                  <label
                    className={`custom-checkbox ${
                      member.fk_dept_id !== "7" ? "disabled" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={member.leadAutoAssign}
                      disabled={member.fk_dept_id !== "7"}
                    />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label
                    className="custom-checkbox"
                  >
                    <input
                      type="checkbox"
                      checked={member.viewStatus}
                    />
                    <span className="checkmark"></span>
                  </label>
                </td> */}
                <td>
                  {member.status === "2" ? (
                    <span className="fc10 ls1 fw6">Invited</span>
                  ) : member.status === "3" ? (
                    <span className="fc9 ls1 fw6">Decline</span>
                  ) : (
                    <>
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "#76838f",
                          display: "block",
                        }}
                      >
                        {member.lastLoginDate}
                      </span>
                      <span
                        style={{
                          fontWeight: 400,
                          fontSize: "11px",
                          opacity: "0.9",
                          color: "#748391",
                        }}
                      >
                        {member.lastLoginTime}
                      </span>
                    </>
                  )}
                </td>
                {/* <td>
                  <input
                    className="input-field-position"
                    type="number"
                    min={1}
                    max={3}
                    placeholder="Position"
                    id={`position_${member.id}`}
                    name={`position_${member.id}`}
                    value={member.orderby}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 3) {
                        setMemberPosition(e, member);
                      }
                    }}
                    onInput={(e) => {
                      if (e.target.value.length > 3) {
                        e.target.value = e.target.value.slice(0, 3);
                      }
                    }}
                  />
                </td> */}

                <td className="df bbn">
                  <Tooltip
                    title={
                      member.isToggled
                        ? "Active Member"
                        : "Inactive Member"
                    }
                  >
                    <label>
                      <span
                        className={`custom-toggle ${
                          member.isToggled ? "toggle-on" : "toggle-off"
                        }`}
                      >
                        {member.isToggled ? (
                          <BsToggleOn />
                        ) : (
                          <BsToggleOff />
                        )}
                      </span>
                    </label>
                  </Tooltip>
                  <div className="action-icons v-center">
                    <Tooltip title="Edit">
                      <PencilLine
                        title="Edit"
                        className="icon-16 edit-icon ml12 cp fs18 fc5"
                        style={{
                          verticalAlign: "middle",
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
            <tbody></tbody>
          </table>
        </div>

        {addTeamPopup && (
          <Popup
            onClose={closeAddTeamPopup}
            title={"Add New Member(s)"}
            txtSubHeading={
              "Add new team members - an invite email is sent to each to accept and join the team"
            }
          >
            <AddTeam
              onClose={closeAddTeamPopup}
              editedMember={[]}
              onSubmit={handleTeamMember}
            />
          </Popup>
        )}
      </Card>
    </>
  );
};

export default MyTeam;
