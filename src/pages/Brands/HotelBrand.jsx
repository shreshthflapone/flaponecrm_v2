import React, { useEffect, useState } from "react";
import InnerHeader from "../../components/InnerHeader";
import Card from "../../components/Card";
import Tabs from "../../components/Tabs";
import BrandGroups from "./BrandGroup";
import SubBrand from "./SubBrand";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const hotelBrands = [
  {
    id: 1,
    brand_group_name: "Taj Hotels",
    brand_group_headquarters: "Mumbai, India",
    brand_group_status: "1",
    brand_group_properties: "110",
  },
  {
    id: 2,
    brand_group_name: "Oberoi Hotels & Resorts",
    brand_group_headquarters: "New Delhi, India",
    brand_group_status: "2",
    brand_group_properties: "35",
  },
  {
    id: 3,
    brand_group_name: "ITC Hotels",
    brand_group_headquarters: "Kolkata, India",
    brand_group_status: "1",
    brand_group_properties: "100",
  },
  {
    id: 4,
    brand_group_name: "Marriott International",
    brand_group_headquarters: "Bethesda, USA",
    brand_group_status: "1",
    brand_group_properties: "8000",
  },
  {
    id: 5,
    brand_group_name: "Hyatt Hotels Corporation",
    brand_group_headquarters: "Chicago, USA",
    brand_group_status: "1",
    brand_group_properties: "1300",
  },
  {
    id: 6,
    brand_group_name: "Accor Hotels",
    brand_group_headquarters: "Paris, France",
    brand_group_status: "2",
    brand_group_properties: "5400",
  },
  {
    id: 7,
    brand_group_name: "Radisson Hotel Group",
    brand_group_headquarters: "Brussels, Belgium",
    brand_group_status: "1",
    brand_group_properties: "1700",
  },
  {
    id: 8,
    brand_group_name: "IHG Hotels & Resorts",
    brand_group_headquarters: "Denham, United Kingdom",
    brand_group_status: "1",
    brand_group_properties: "6000",
  },
  {
    id: 9,
    brand_group_name: "The Leela Palaces, Hotels and Resorts",
    brand_group_headquarters: "Mumbai, India",
    brand_group_status: "1",
    brand_group_properties: "12",
  },
  {
    id: 10,
    brand_group_name: "Lemon Tree Hotels",
    brand_group_headquarters: "New Delhi, India",
    brand_group_status: "1",
    brand_group_properties: "90",
  },
];

const subHotelBrands = [
  {
    id: 1,
    brand_group_name: "Taj Hotels",
    sub_brand_name: "Taj Hotels & Palaces",
    sub_brand_website: "https://www.tajhotels.com/",
    sub_brand_headquarters: "Mumbai, India",
    sub_brand_status: "1",
    sub_brand_properties: "110",
  },
  {
    id: 2,
    brand_group_name: "Taj Hotels",
    sub_brand_name: "Vivanta",
    sub_brand_website: "https://www.vivantahotels.com/",
    sub_brand_headquarters: "Mumbai, India",
    sub_brand_status: "1",
    sub_brand_properties: "35",
  },
  {
    id: 3,
    brand_group_name: "Taj Hotels",
    sub_brand_name: "SeleQtions",
    sub_brand_website: "https://www.seleqtionshotels.com/",
    sub_brand_headquarters: "Mumbai, India",
    sub_brand_status: "1",
    sub_brand_properties: "20",
  },
  {
    id: 4,
    brand_group_name: "Taj Hotels",
    sub_brand_name: "Ginger Hotels",
    sub_brand_website: "https://www.gingerhotels.com/",
    sub_brand_headquarters: "Gurugram, India",
    sub_brand_status: "1",
    sub_brand_properties: "85",
  },
  {
    id: 5,
    brand_group_name: "Taj Hotels",
    sub_brand_name: "Ama Stays & Trails",
    sub_brand_website: "https://www.amastaysandtrails.com/",
    sub_brand_headquarters: "Mumbai, India",
    sub_brand_status: "1",
    sub_brand_properties: "30",
  },
  {
    id: 6,
    brand_group_name: "Taj Hotels",
    sub_brand_name: "Qmin",
    sub_brand_website: "https://www.qmin.co.in/",
    sub_brand_headquarters: "Mumbai, India",
    sub_brand_status: "1",
    sub_brand_properties: "15",
  },
  {
    id: 7,
    brand_group_name: "Taj Hotels",
    sub_brand_name: "Taj Exotica",
    sub_brand_website: "https://www.tajhotels.com/en-in/hotels/taj-exotica/",
    sub_brand_headquarters: "Mumbai, India",
    sub_brand_status: "1",
    sub_brand_properties: "10",
  },
  {
    id: 8,
    brand_group_name: "Taj Hotels",
    sub_brand_name: "Taj Safaris",
    sub_brand_website: "https://www.tajsafaris.com/",
    sub_brand_headquarters: "Mumbai, India",
    sub_brand_status: "1",
    sub_brand_properties: "8",
  },
  {
    id: 9,
    brand_group_name: "Taj Hotels",
    sub_brand_name: "Taj Spiritual & Wellness Retreats",
    sub_brand_website: "https://www.tajhotels.com/",
    sub_brand_headquarters: "Rishikesh, India",
    sub_brand_status: "1",
    sub_brand_properties: "6",
  },
  {
    id: 10,
    brand_group_name: "Taj Hotels",
    sub_brand_name: "Taj Homestays",
    sub_brand_website: "https://www.tajhotels.com/",
    sub_brand_headquarters: "Mumbai, India",
    sub_brand_status: "0",
    sub_brand_properties: "12",
  },
];

const HotelBrand = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const tabs = [
        { label: "Brand Groups", value: "brand_groups" },
        { label: "Sub Brands", value: "sub_brands" },
    ];

    // const hotelGroupOptions = [
    //     { label: "Independent Hotel", value: "independent" },
    //     { label: "Luxury Hotel Group", value: "luxury" },
    //     { label: "Business Hotel Group", value: "business" },
    //     { label: "Boutique Hotel Group", value: "boutique" },
    //     { label: "Resort Group", value: "resort" },
    //     { label: "Budget / Economy Group", value: "budget" },
    //     { label: "Heritage Hotel Group", value: "heritage" },
    //     { label: "Serviced Apartments Group", value: "serviced_apartments" },
    //     { label: "Extended Stay Hotel Group", value: "extended_stay" },
    //     { label: "Eco / Green Hotel Group", value: "eco" },
    // ];


    const [selectedTab, setSelectedTab] = useState(id ? id : "brand_groups");
    const [sortBy, setSortBy] = useState("id");
    const [sortDirection, setSortDirection] = useState("desc");
    const [activeSortColumn, setActiveSortColumn] = useState("id");

    const handleTabChange = (value) => {
        navigate(`/hotel-brands/`+value);
        setSelectedTab(value);
    };

    useEffect(()=>{
      if(selectedTab==='sub_brands'){
        handleSortByChange('id');
      } else {
        handleSortByChange('id');
      }
    },[selectedTab]);


    const handleSortByChange = (field) => {
        if (field === sortBy) {
          setSortDirection(sortDirection === "desc" ? "asc" : "desc");
        } else {
          setSortBy(field);
          setSortDirection("desc");
        }
        setActiveSortColumn(field);
    };

    return (
        <>
            <InnerHeader
                heading="Hotel Brands"
                txtSubHeading="Manage your hotel brand portfolio and their details"
                showButton={false}
                iconText="Add New Lead"
            />
            <Card className="bg5 mt16 pb16">
                <Tabs
                    tabs={tabs}
                    showCheckboxes={false}
                    showFilter={false}
                    onTabChange={handleTabChange}
                    selectedTab={selectedTab}
                />
                {selectedTab === "brand_groups" && 
                  <BrandGroups 
                    recordList={hotelBrands}
                    allApidata={""}
                    handleSortByChange={handleSortByChange}
                    activeSortColumn={activeSortColumn}
                  />
                }
                {selectedTab === "sub_brands" && 
                  <SubBrand 
                    recordList={subHotelBrands}
                    allApidata={""}
                    handleSortByChange={handleSortByChange}
                    activeSortColumn={activeSortColumn}
                  />
                }
            </Card>
        </>
    );
}

export default HotelBrand;