import React from "react";
import InnerHeader from "../../components/InnerHeader";
import { Pencil, Trash2 } from 'lucide-react';

const categories = [
  { id: 1, name: "Hotels", parent_category: "home", status: "1", created_date: "16 Dec 2025", updated_date: "16 Dec 2025" },
  { id: 2, name: "Flights", parent_category: "home", status: "1", created_date: "16 Dec 2025", updated_date: "16 Dec 2025" },
  { id: 3, name: "Packages", parent_category: "home", status: "1", created_date: "16 Dec 2025", updated_date: "16 Dec 2025" },
  { id: 4, name: "Visa", parent_category: "home", status: "1", created_date: "16 Dec 2025", updated_date: "16 Dec 2025" },
];

const CategoryList = () => {
    return (
        <>
            <InnerHeader
                heading="Hotel Categories"
                txtSubHeading="Manage your hotel categories and their details"
                showButton={true}
                iconText="Add Category"
                onClick={() => (window.location.href = "/add-hotel-category")}
            />
            <div class="booked table-container df w100 fdc mt16" style={{ overflow: "auto" }}>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Parent Category</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {categories.length === 0 ? (
                    <tr>
                    <td colSpan="7" className="empty-cell">
                        No categories added yet
                    </td>
                    </tr>
                ) : (
                    categories.map((cat) => (
                    <tr key={cat.id}>
                        <td>{cat.id}</td>
                        <td>{cat.name}</td>
                        <td>{cat.parent_category}</td>
                        <td>{cat.status === "1" ? "Active" : "Inactive"}</td>
                        <td>{cat.created_date}</td>
                        <td>{cat.updated_date}</td>
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

export default CategoryList;
