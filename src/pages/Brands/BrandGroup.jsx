import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import "./brand.css";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom";

const BrandGroups = ({
  recordList,
  allApidata,
  handleSortByChange,
  activeSortColumn
}) => {
    const navigate = useNavigate();
    const [allBrandGroupsData, setAllBrandGroupsData] = useState([]);
    useEffect(() => {
        setAllBrandGroupsData([...recordList]);
    }, [recordList]);

    const handleAddBrands = () => {
        navigate(`/brand-group-form`);
    }
    return (
        <>
            <Card className="bg5 mt16 pb16">
                <div className="mylead-filters v-center jcsb pl16 pr16 brd-b1 pb8 pt8 fww fs12">
                    Total Result: 10
                    <div className="v-center">
                        <button
                            className="btn-blue bg1 br24 mr12 fs14 cp pl16 pr16 pt10 pb10 ls1"
                            onClick={handleAddBrands}
                        >
                            Add Brand Group
                        </button>
                    </div>
                </div>
                <div
                    className="booked table-container df w100 fdc mt16"
                    style={{ overflow: "auto" }}
                >
                    <table className="mylead-table log-table cp wsnw">
                        <thead className="w100">
                            <tr>
                                <th onClick={() => handleSortByChange("id")} className={activeSortColumn === "id" ? "fc1" : ""}><p className="box-center">Id <ArrowUpDown className="ml4 icon-16" /></p></th>
                                <th onClick={() => handleSortByChange("brand_group_name")} className={activeSortColumn === "brand_group_name" ? "fc1" : ""}><p className="box-center">Brand Group Name <ArrowUpDown className="ml4 icon-16" /></p></th>
                                <th onClick={() => handleSortByChange("brand_group_headquarters")} className={activeSortColumn === "brand_group_headquarters" ? "fc1" : ""}><p className="box-center">Headquarters <ArrowUpDown className="ml4 icon-16" /></p></th>
                                <th onClick={() => handleSortByChange("brand_group_properties")} className={activeSortColumn === "brand_group_properties" ? "fc1" : ""}><p className="box-center">Properties <ArrowUpDown className="ml4 icon-16" /></p></th>
                                <th onClick={() => handleSortByChange("brand_group_status")} className={activeSortColumn === "brand_group_status" ? "fc1" : ""}><p className="box-center">Status <ArrowUpDown className="ml4 icon-16" /></p></th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allBrandGroupsData.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="no-students">
                                    No Data Available
                                    </td>
                                </tr>
                            ) : (
                                allBrandGroupsData.map((brandGroups, index) => (
                                    <tr key={index}>
                                        <td>{brandGroups.id}</td>
                                        <td>{brandGroups.brand_group_name}</td>
                                        <td>{brandGroups.brand_group_headquarters}</td>
                                        <td><span className="properties-badge">{brandGroups.brand_group_properties}</span></td>
                                        <td><span className={brandGroups.brand_group_status === "1" ? "status-badge active" : "status-badge inactive"}>{brandGroups.brand_group_status === "1" ? "Active" : "Inactive"}</span></td>
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
            </Card>
        </>
    );
}

export default BrandGroups;