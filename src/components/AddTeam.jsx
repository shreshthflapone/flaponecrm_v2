import React, { useState, useEffect } from "react";
import SingleDropdown from "./SingleDropdown";

const AddTeam = ({ onClose, editedMember, onSubmit ,editStatus}) => {
  
  // STATIC DROPDOWN OPTIONS  
  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Manager", value: "manager" },
    { label: "Executive", value: "executive" },
  ];

  const departmentOptions = [
    { label: "Sales", value: "sales" },
    { label: "Marketing", value: "marketing" },
    { label: "Support", value: "support" },
  ];

  const managerOptions = [
    { label: "Rohit Sharma", value: "101" },
    { label: "Virat Kohli", value: "102" },
    { label: "Hardik Pandya", value: "103" },
  ];

  const locationOptions = [
    { label: "Delhi", value: "delhi" },
    { label: "Mumbai", value: "mumbai" },
    { label: "Bangalore", value: "bangalore" },
  ];

  // STATES
  const [email, setEmail] = useState([]);
  const [department, SetDepartment] = useState("");
  const [role, setRole] = useState("");
  const [manager, setManager] = useState("");
  const [designation, setDesignation] = useState("");
  const [instructorAsUser, setInstructorAsUser] = useState("");
  const [location, setLocation] = useState([]);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const handleEmailChange = (newEmail) => setEmail(newEmail);
  const handleLocationChange = (newData) => setLocation(newData);

  // 🔥 API related data (console logs only)
  useEffect(() => {
    console.log("Fetching API data for editedMember...");
    console.log("Edited Member Response:", editedMember);
  }, [editedMember]);

  // Prefill if Editing
  useEffect(() => {
    if (editedMember) {
      console.log("Prefilling data from API...");

      if (editedMember.location) {
        const foundLocation = editedMember.location.map((loc) =>
          locationOptions.find((opt) => opt.value === loc)
        );
        setLocation(foundLocation || []);
      }

      if (editedMember.role_name) {
        setRole(roleOptions.find((r) => r.label === editedMember.role_name));
      }

      if (editedMember.manager) {
        setManager(
          managerOptions.find((m) => m.value === editedMember.fk_parent_id)
        );
      }

      if (editedMember.department) {
        SetDepartment(
          departmentOptions.find((d) => d.label === editedMember.department)
        );
      }

      setDesignation(editedMember.designation || "");
      setInstructorAsUser(editedMember.instructorAsUser || "");
      setEmail(
        editedMember.email
          ? editedMember.email.split(",").map((e) => e.trim())
          : []
      );
    }
  }, [editedMember]);

  // VALIDATION
  const validate = (values) => {
    const errors = {
      email: [],
      role: [],
      department: [],
      manager: [],
    };

    if (!editedMember) {
      if (values.email.length === 0) {
        errors.email.push("Enter email");
        setErrorStatus(true);
      }
    }

    if (!values.roles) {
      errors.role.push("Role required");
      setErrorStatus(true);
    }

    if (!values.department) {
      errors.department.push("Department required");
      setErrorStatus(true);
    }

    if (!values.manager) {
      errors.manager.push("Manager required");
      setErrorStatus(true);
    }

    if (
      errors.email.length === 0 &&
      errors.role.length === 0 &&
      errors.department.length === 0 &&
      errors.manager.length === 0
    ) {
      return { status: false, errors };
    }

    return { status: true, errors };
  };

  const handleSubmit = () => {
    setFormSubmitted(true);

    const values = {
      email: email.map((obj) => obj.value),
      roles: role?.value,
      department: department?.value,
      manager: manager?.value,
    };

    const validation = validate(values);
    setErrorStatus(validation.status);

    if (!validation.status) {
      const newMember = {
        email: values.email,
        role,
        department,
        manager,
        designation,
        instructorAsUser,
        locations: location.map((l) => l.value),
        location_names: location.map((l) => l.label),
      };

      console.log("FINAL SUBMIT PAYLOAD =>", newMember);

      if (editedMember) {
        onSubmit({ ...editedMember, ...newMember });
      } else {
        onSubmit(newMember);
      }

      onClose();
    } else {
      setFormErrors(validation.errors);
    }
  };

  return (
    <>
      <div className="add-team-details">

        {/* Email */}
        <div className="mt16 df fdc">
            <label className="fc15 fw6 fs14 ls1 mb8">
                Email Address<span className="fc4">*</span>
            </label>
            <input
                type="text"
                value={email}
                className="brd1 pl12 pt8 pb8 h40 br4"
                placeholder="Enter Email ID"
            />
        </div>

        {/* Email Errors */}
        {formSubmitted && formErrors.email && (
          <div className="error fc4 mt10">
            {formErrors.email.map((er, i) => (
              <p key={i}>{er}</p>
            ))}
          </div>
        )}

        {/* Role */}
        <div className="mt16">
          <SingleDropdown
            compulsory={<span className="fc4">*</span>}
            label="Define a Role"
            options={roleOptions}
            selectedOption={role}
            onSelect={setRole}
          />
        </div>

        {/* Department */}
        <div className="mt16">
          <SingleDropdown
            compulsory={<span className="fc4">*</span>}
            label="Department"
            options={departmentOptions}
            selectedOption={department}
            onSelect={SetDepartment}
          />
        </div>

        {/* Manager */}
        <div className="mt16">
          <SingleDropdown
            compulsory={<span className="fc4">*</span>}
            label="Manager"
            options={managerOptions}
            selectedOption={manager}
            onSelect={setManager}
          />
        </div>

        {/* Designation */}
        <div className="mt16 fdc df">
          <label className="fc15 fw6 fs14 mb12 ls1">Designation</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="brd1 h40 br4 pl12"
            placeholder="Enter Designation"
          />
        </div>

        {/* User ID */}
        {/*<div className="mt16 fdc df">
          <label className="fc15 fw6 fs14 mb12 ls1">Enter User ID</label>
          <input
            type="text"
            value={instructorAsUser}
            onChange={(e) => setInstructorAsUser(e.target.value)}
            className="brd1 h40 br4 pl12"
            placeholder="Enter User ID"
          />
        </div>*/}
      </div>

      {/* Buttons */}
      <div className="button-container mt32">
        <button className="btn-cancel" onClick={onClose}>
          Cancel
        </button>
        <button className="btn-blue update-button" onClick={handleSubmit}>
          {editStatus?"Update employee":"Invite employee"}
        </button>
      </div>
    </>
  );
};

export default AddTeam;