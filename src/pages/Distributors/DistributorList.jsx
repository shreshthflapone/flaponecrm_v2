import "./Distributor.css";
import { useEffect, useState } from "react";
import InnerHeader from "../../components/InnerHeader";
import Card from "../../components/Card";

const DistributorList = () => {
  const handleDistributorForm = () => {
    window.location.href = "/distributor-form";
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
    </>
  );
};

export default DistributorList;
