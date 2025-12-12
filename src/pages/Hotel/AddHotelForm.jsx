import React from "react";

const AddHotelForm = () => {

  return (
    <>
      <InnerHeader
        heading="Add Hotel"
        txtSubHeading="Effortlessly set up your team, inviting and efficiently managing members with different roles."
        showButton={true}
        iconText="Add New Member"
        onClick={openAddTeamPopup}
      />
    </>
  );
};

export default AddHotelForm;
