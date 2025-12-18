import React, { useRef, useState } from "react";
import InnerHeader from "../../components/InnerHeader";
import SingleDropdownMultiSearch from "../../components/SingleDropdownMultiSearch";

const CategoryForm = () => {
    const [parentCategoryDropdown, setParentCategoryDropdown] = useState(false);
    const [categoryFormData, setCategoryFormData] = useState({
        category_type : {},
        parent_category: {},
        category_name : "",
        category_description: "",
        category_status: "",
    });

    const parentCategoryList = [
        { label: "Parent Category 1", value: "parent_category_1" },
        { label: "Parent Category 2", value: "parent_category_2" },
    ];

    const CategoryTypeOptions = [
        { label: "Parent Category", value: "parent_category" },
        { label: "Sub Category", value: "sub_category" },
    ];

    const parentCategoryOptions = [
        { label: "Aircraft", value: "aircraft" },
        { label: "Drone", value: "drone" },
    ];
    //

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (!value || value.trim() === "") {
            console.error(`${name} is empty`);
            return;
        }
        setCategoryFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSelectHotelCategory = (option) => {
        setCategoryFormData((prevValues) => ({
            ...prevValues,
            hotel_category: option,
        }));

        if(option.value == "sub_category"){
            setParentCategoryDropdown(true);
        } else {
            setParentCategoryDropdown(false);
        }
    }
    const handleSelectParentCategory = (option) => {
        setCategoryFormData((prevValues) => ({
            ...prevValues,
            parent_category: option,
        }));
    }
    const handleStatusChange = (e) => {
        const { value } = e.target;
        setCategoryFormData((prevValues) => ({
            ...prevValues,
            category_status: value,
        }));
    }
    
    return (
        <>
            <InnerHeader
                heading="Add New Category"
                txtSubHeading="Manage your hotel categories and their details"
                showButton={true}
                iconText="Hotel Categories List"
                onClick={() => (window.location.href = "/hotel-categories")}
            />
            <div className="account-details mt24 w100 settings">
                <div className="v-center fww">
                    <div className="form-group-settings email flx31 mr8">
                        <SingleDropdownMultiSearch
                            label="Category Type"
                            options={CategoryTypeOptions}
                            selectedOption={categoryFormData.hotel_category}
                            onSelect={handleSelectHotelCategory}
                            search={true}
                        />
                    </div>
                    {parentCategoryDropdown && (
                        <div className="form-group-settings email flx31 mr8">
                            <SingleDropdownMultiSearch
                                label="Parent Category"
                                options={parentCategoryOptions}
                                selectedOption={categoryFormData.parent_category}
                                onSelect={handleSelectParentCategory}
                                search={true}
                            />
                        </div>
                    )}
                    <div className="form-group-settings name flx31 mr8">
                        <p className="fc15 fw6 fs14 ls1">Category Name</p>
                        <input
                            type="text"
                            name="category_name"
                            placeholder="Enter Category Name"
                            value={categoryFormData.category_name}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group-settings name w100 mr8">
                        <p className="fc15 fw6 fs14 ls1">Category Description</p>
                        <textarea
                            id="categoryDescription"
                            name="category_description"
                            placeholder="Enter Category Description"
                            value={categoryFormData.category_description}
                            onChange={handleInputChange}
                            autoComplete="off"
                        ></textarea>
                    </div>
                </div>
                <div className="radio-grp-status box-center fww mt12 mb12">
                    <label htmlFor="active" className="cp v-center fc13">
                        <input
                        type="radio"
                        className="mr8 cp"
                        id="active"
                        value="1"
                        checked={categoryFormData.category_status === "1"}
                        onChange={handleStatusChange}
                        />
                        Active
                    </label>
                    <label htmlFor="draft" className="cp v-center mr16 ml24 fc12">
                        <input
                        type="radio"
                        className="mr8 cp"
                        id="draft"
                        value="2"
                        checked={categoryFormData.category_status === "2"}
                        onChange={handleStatusChange}
                        />
                        Draft
                    </label>
                    <label htmlFor="inactive" className="cp v-center mr16 fc9 ml24">
                        <input
                            type="radio"
                            className="mr8 cp"
                            id="inactive"
                            value="0"
                            checked={categoryFormData.category_status === "0"}
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

export default CategoryForm;
