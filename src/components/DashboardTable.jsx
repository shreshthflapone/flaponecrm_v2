import React, { useEffect, useState } from "react";
import "./DashboardTable.css";
import { Timer, FilePenLine, MessagesSquare, MapPin, Mail, Phone } from "lucide-react";
import commonApi from "./commonApi";
import Tooltip from "./Tooltip.jsx";
import SidePopup from "./SidePopup.jsx";
import Popup from "./Popup.jsx";
import Dropdown from "./Dropdown.jsx";
import { ToastContainer, toast } from 'react-toastify';

const DashboardTable = ({ data, hiddenColumn=[], UpdateStatus, HistoryPopup, PastPopup }) => {
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(false);
   const [parentID, setParentID] = useState(null);

  const [queries, setQueries] = useState([]);

  const openImageModal = (img, parentID) => {
    setSelectedImage(img);
    setIsImageOpen(true);
    setParentID(parentID);
  };
  const closeImageModal = () => {
    setSelectedImage(null);
    setIsImageOpen(false);
    if (parentID) {
      const parentQuery = queries.find(q => q.user_id === parentID);
      if (parentQuery) {
        handleRowClick(parentQuery.past_issue, parentQuery.user_name);
      }
      setParentID(null);
    }
  };
  const [pastIssuePopup, setPastIssuePopup] = useState(false);
  const [pastIssuePopupData, setPastIssuePopupData] = useState([]);
  const [userName, setUserName] = useState("");
  
  const [showUpdateStatusPopup, setShowUpdateStatusPopup] = useState(false);

  const isHidden = (colName) => hiddenColumn.includes(colName);
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [selectedIssuePopUpStatus, setSelectedIssuePopUpStatus] = useState("");
  const [issueStatusListOptions, setStatusListOptions] = useState([
    { label: "Select Status", value: "" },
    { label: "Open", value: "4" },
    { label: "Pending", value: "3" },
    { label: "In Progress", value: "2" },
    { label: "Resolved", value: "1" },
    { label: "Closed", value: "0" },
  ]);
  const [assignedToChecked, setAssignedToChecked] = useState(false);
  const [selectedAssignedPerson, setSelectedAssignedPerson] = useState("");
  const [description, setDescription] = useState("");

  const [assignedPersonOptions, setAssignedPersonOptions] = useState([]);
  const handleAssignedPersonChange = (value) => {
    setSelectedAssignedPerson(value);
  };

  const handleRowClick = (data, name) => {
    setPastIssuePopup(true);
    setPastIssuePopupData(data);
    setUserName(name);
  }
  const closePastIssuePopup = () => {
    setPastIssuePopupData([]);
    setPastIssuePopup(false);
    setUserName("");
    document.body.style.overflow = "auto";
  };
  function FormatDate({ dateString }) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    return <div>{ formattedDate}</div>;
  }

  const handleFilterClick = () => {
    setShowFilterPopup(true);
  };
  const closeFilter = () => {
    setShowFilterPopup(false);
    document.body.style.overflow = "auto";
  };

  const handleOpenUpdateStatus = (queryId, parent_user_id='') => {
    setSelectedQueryId(queryId);
    setShowUpdateStatusPopup(true);
    setParentID(parent_user_id);
  }
  const handleCloseUpdateStatus = () => {
    setShowUpdateStatusPopup(false);
    document.body.style.overflow = "auto";
    if (parentID) {
      const parentQuery = queries.find(q => q.user_id === parentID);
      if (parentQuery) {
        handleRowClick(parentQuery.past_issue, parentQuery.user_name);
      }
      setParentID(null);
    }
  };
  
  const handleSelectIssuePopupStatus = (option) => {
    setSelectedIssuePopUpStatus(option);
  };

  const handleOpenCommentPopup = (queryId, parent_user_id='') => {
    handleCommentHistory(queryId);
    setParentID(parent_user_id);
  }

  useEffect(() => {
    internalUserList();
  }, []);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setQueries(data);
    }
  }, [data]);

  
  const internalUserList = async () => {
    const paramsData = {
      'user_type':'internal',
    }
    try {
      const res = await commonApi("queries_details.php?fun=internalUserList", "POST",paramsData);
      if (res) {
        setAssignedPersonOptions(res.data.list);
      } else {
        console.error("Error fetching data:", res);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };
  
  const fetchData = async (filterDate='') => {
    setQueries([]);
    const paramsData = {
      'filterDate':filterDate,
    }
    try {
      const res = await commonApi("queries_details.php?fun=fetchlist", "POST",paramsData);
      if (res) {
        setQueries(res.data.list);
      } else {
        console.error("Error fetching data:", res);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };
  
  const handleManageStsUpdate = async () => {
    // Basic validation
    if (!selectedIssuePopUpStatus) {
      toast.warning("Please select a status.");
      return;
    }
    
    if (!description?.trim()) {
      toast.warning("Please enter a comment.");
      return;
    }

    if (assignedToChecked && !selectedAssignedPerson) {
      toast.warning("Assigned person is required when 'Change Assigned' is checked.");
      return;
    }
    var getlocalsession = localStorage.getItem('imcloginDetails');
    getlocalsession = getlocalsession ? JSON.parse(getlocalsession) : {};
    const paramsData = {
      status: selectedIssuePopUpStatus,
      assigned_checked: assignedToChecked ? "1" : "0",
      assigned_to: assignedToChecked ? selectedAssignedPerson : "",
      description: description.trim(),
      id: selectedQueryId,
      loginData: getlocalsession,
    };

    try {
      const res = await commonApi("queries_details.php?fun=updateStatus", "POST", paramsData);
      if (res) {
        fetchData();
        setDescription("");
        setSelectedAssignedPerson("");
        setSelectedQueryId(null);
        setAssignedToChecked(false);
        setSelectedIssuePopUpStatus("");
        toast.success(res.data.msg);
        setShowUpdateStatusPopup(false);
      } else {
        console.error("Error updating status:", res);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };
  
  const handleCommentHistory = async (queryId) => {
    const paramsData = {
      'report_id':queryId,
    }
    try {
      const res = await commonApi("queries_details.php?fun=handleCommentHistory", "POST",paramsData);
      if (res) {
        setShowHistoryPopup(true);
        setHistoryData(res.data.data);
      } else {
        console.error("Error fetching data:", res);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const closeDetailsModal = () => {
    setShowHistoryPopup(false);
    setHistoryData([]);
    document.body.style.overflow = "auto";
    if (parentID) {
      const parentQuery = queries.find(q => q.user_id === parentID);
      if (parentQuery) {
        handleRowClick(parentQuery.past_issue, parentQuery.user_name);
      }
      setParentID(null);
    }
  }

  return (
    <div className="dashboard-table">
      <div className="table-wrapper mt-4">
        <table className="user-table">
          <thead>
            <tr>
              {!isHidden("sno") && <th>Issue ID</th>}
              {!isHidden("postDate") && <th>Created Date</th>}
              {!isHidden("priority_level") && <th>Priority</th>}
              {!isHidden("report_type") && <th>Type</th>}
              {!isHidden("name") && <th>Reported By </th>}
              {!isHidden("contact") && <th>Contact</th>}
              {!isHidden("location") && <th>Location</th>}
              {!isHidden("assignedTo") && <th>Assigned To</th>}
              {!isHidden("description") && <th>Description</th>}
              {!isHidden("image") && <th>Image</th>}
              {!isHidden("pastIssueCount") && <th>Past Issue</th>}
              {!isHidden("status") && <th>Status</th>}
              {!isHidden("action") && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {queries.length > 0 ? (
              queries.map((query, index) => (
                <tr key={query.id}>
                  {!isHidden("sno") && <td>{query.id}</td>}
                  {!isHidden("postDate") && <td>{query.postDate || "--"}<br/> {query.postTime}</td>}
                  {!isHidden("priority_level") && <td>
                    {query.priority_level && query.priority_level === 'Low' ? (
                      <span className="fc13">
                        {query.priority_level}
                      </span>
                    ) : query.priority_level === 'Medium' ? (
                      <span className="fc21">
                        {query.priority_level}
                      </span>
                    ) : query.priority_level === 'Critical' ? (
                      <span className="fc9">
                        {query.priority_level}
                      </span>
                    ) : query.priority_level === '' ? (
                      <span >
                        --
                      </span>
                    ) : (
                      <span>{query.priority_level}</span> 
                    )}</td>
                    }

                  {!isHidden("report_type") && <td>{query.report_type}
                    </td>}
                  {!isHidden("name") && (
                    <td>
                      {query.name || "--"}
                      {query.user_id && (
                        <>
                          <br />
                          <span className="fc5 fs12">({query.user_id})</span>
                        </>
                      )}
                    </td>
                  )}
                  {!isHidden("contact") && (
                    <td>
                      <div className="df fww jcc">
                        {query.mobile_number ? (
                          <Tooltip title={query.mobile_number}>
                            <Phone size={16} className="mr8 text-gray-600 cursor-pointer" />
                          </Tooltip>
                        ) : null}

                        {query.email ? (
                          <Tooltip title={query.email}>
                            <Mail size={16} className="text-gray-600 cursor-pointer" />
                          </Tooltip>
                        ) : null}

                        {!query.mobile_number && !query.email && (
                          <span>--</span>
                        )}
                      </div>
                    </td>
                  )}
                  {!isHidden("location") && (
                    <td>
                      {query.location || "--"}
                      {query.ward_no && (
                        <>
                          <br />
                          <span className="fc5 fs10">({`Ward No.- ${query.ward_no}`})</span>
                        </>
                      )}

                      {query.lat && query.lng ? (
                          <>
                            <br />
                            <a
                              href={`https://maps.google.com/?q=${query.lat},${query.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                color: "#ff6b6b",
                                textDecoration: "none",
                                marginTop: "4px"
                              }}
                            >
                              <MapPin size={14} />
                            </a>
                          </>
                        ) : null}
                    </td>
                  )}
                  {!isHidden("assignedTo") && (
                    <td>
                      {query.assigned_name || "--"}
                      {query.assigned_dept && query.assigned_dept !== "--" && (
                        <>
                          <br />
                          <span className="fc5 fs12">({query.assigned_dept})</span>
                        </>
                      )}
                    </td>
                  )}
                  {!isHidden("description") && (
                    <td className="scrollable-cell"><p>{query.description}</p></td>
                  )}
                  {!isHidden("image") && (
                    <td>
                      {query.image ? (
                        <img
                          src={query.image}
                          alt={`img-${query.name}`}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={() => openImageModal(query.image)}
                        />
                      ) : ( "--")}
                    </td>
                  )}
                  {!isHidden("pastIssueCount") && (
                    query.past_issue?.length > 0 ? (
                      PastPopup ? (
                        <td className="cp" onClick={() => handleRowClick(query.past_issue, query.user_name)}>
                          {query.past_issue.length}
                        </td>
                      ) : (
                        <td>{query.past_issue.length}</td>
                      )
                    ) : <td>--</td>
                  )}
                  {!isHidden("status") && (
                    <td className={`kyc-status ${(query.status || "neutral").toLowerCase().replace(/\s+/g, '-')}`}>
                      {query.status || "--"}
                    </td>
                  )}
                  {!isHidden("action") && (
                    <td>
                      <div className="df jcc aic">
                        {UpdateStatus && query.status !== "Closed" && query.status !== "Resolved" && (
                          <Tooltip title="Update Status">
                            <FilePenLine
                              className="icon-16 cp"
                              title="Update Status"
                              onClick={() => handleOpenUpdateStatus(query.id)}
                            />
                          </Tooltip>
                        )}
                        {query.comment_flag && (
                          <Tooltip title="View Details">
                            <MessagesSquare
                              className="icon-16 cp ml8" 
                              onClick={() => handleOpenCommentPopup(query.id)} 
                            />
                          </Tooltip>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} style={{ textAlign: "center" }}>No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedImage && (
        <div className="modal image-model-class" onClick={closeImageModal}>
          <div className="modal-content image-modal" onClick={(e) => e.stopPropagation()}>
            <div className="v-center jce mb8">
              <p className="cp fc3" onClick={closeImageModal}>
                X
              </p>
            </div>
            <div className="overlay"></div>
            <img
              src={selectedImage}
              alt="Zoomed Image"
              className="zoomed-image"
            />
          </div>
        </div>
      )}
      {pastIssuePopup && (
        <SidePopup show={pastIssuePopup} onClose={closePastIssuePopup} className="flx100">
          <div className="df jcsb brd-b1 p12 box-center bg7 w100 fc1 ls2 lh22" onClick={(e) => e.stopPropagation()}>
            <p className="fs18 fc14">{`Past Issues Details - ${userName}`}</p>
            <button className="lead-close-button" onClick={closePastIssuePopup}>
              X
            </button>
          </div>
          <div className="df fww filter-button-container box-center myteam-filters ">
            <div className="p8 flx100 mb8">
              <div className="dashboard-table">
                <div className="table-wrapper mt-4">
                  <table className="user-table">
                    <thead>
                      <tr>
                        <th>Issue ID</th>
                        <th>Created Date</th>
                        <th>Priority</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Assigned</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastIssuePopupData.map((query, index) => (
                        <tr key={query.id}>
                          <td>{query.id}</td>
                          <td>{query.date || "--"}<br/> {query.time}</td>
                          <td>{query.priority_level}</td>
                          <td>
                            {query.location || "--"}
                            {query.ward_no ? (
                              <>
                                <br />
                                <span className="fc5 fs10">({`Ward No.- ${query.ward_no}`})</span>
                              </>
                            ) : null}
                          </td>
                          <td className="scrollable-cell"><p>{query.description}</p></td>
                          <td>
                            {query.image ? (
                              <img
                                src={query.image}
                                alt={`img-${query.name}`}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  cursor: "pointer",
                                }}
                                onClick={() => openImageModal(query.image,  query.parent_user_id)}
                              />
                            ) : ( "--")}
                          </td>
                          <td>
                            {query.assigned_name || "--"}
                            {query.assigned_dept && query.assigned_dept !== "--" ? (
                              <>
                                <br />
                                <span className="fc5 fs12">({query.assigned_dept})</span>
                              </>
                            ) : null}
                          </td>
                          <td className={`kyc-status ${(query.status || "neutral").toLowerCase().replace(/\s+/g, '-')}`}>
                            {query.status || "--"}
                          </td>
                          <td>
                            <div className="df jcc aic">
                              {UpdateStatus && query.status !== "Closed" && query.status !== "Resolved" && (
                                <Tooltip title="Update Status">
                                  <FilePenLine
                                    className="icon-16 cp"
                                    title="Update Status"
                                    onClick={() => handleOpenUpdateStatus(query.id,  query.parent_user_id)}
                                  />
                                </Tooltip>
                              )}
                              {query.comment_flag && (
                                <Tooltip title="View Details">
                                  <MessagesSquare
                                    className="icon-16 cp ml8" 
                                    onClick={() => handleOpenCommentPopup(query.id,  query.parent_user_id)} 
                                  />
                                </Tooltip>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </SidePopup>
      )}
      {showUpdateStatusPopup && (
        <Popup
          onClose={handleCloseUpdateStatus}
          title="Update Status"
        >
          <div className="filter-button-container box-center myteam-filters ">
            <div className="filter-lists pl16 pt16 pr16 w100">
              <div className="filter">
                <div className="form-group-settings mb12">
                    <p className="fc15 fw6 fs14 mb8">Status</p>
                    <Dropdown
                      label="Status"
                      options={issueStatusListOptions}
                      selectedValue={selectedIssuePopUpStatus}
                      onValueChange={handleSelectIssuePopupStatus}
                    />

                    <div className="mt8">
                      <label className="v-center fs14 fc15">
                        <input
                          type="checkbox"
                          checked={assignedToChecked}
                          onChange={(e) => setAssignedToChecked(e.target.checked)}
                          className="mr8 food-checkbox"
                        />
                        Change Assigned
                      </label>
                    </div>

                    {assignedToChecked && (
                      <div className="mt8">
                        <Dropdown
                          label="Assigned Person"
                          options={assignedPersonOptions}
                          selectedValue={selectedAssignedPerson}
                          onValueChange={handleAssignedPersonChange}
                        />
                      </div>
                    )}
                  </div>
                <div className="form-group-settings searching-drop meta-grp w100">
                  <p className="fc15 fw6 fs14 ls1">Comment</p>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter Comment"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="filter-button-container mt16 pt16 box-center myteam-filters ">
                <button
                  type="button"
                  className="close-button mt16 bg6 fs12 pl12 pr12 pt8 pb8 fc1 cp br16 ls1 fw6 mr8"
                  onClick={handleCloseUpdateStatus}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="bg1 fc3 pt8 pb8 pl16 pr16 br24 mt16 fs12 ls1 cp"
                  onClick={handleManageStsUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </Popup>
      )}
      {showHistoryPopup && (
        <Popup onClose={closeDetailsModal} title="History Details">
          <div className="modal-body pr">
            <div className="timeline">
              {Object.entries(historyData).map(([date, items]) => (
                <div key={date}>
                  <button className="timeline-date bg5 fc1">{date}</button>

                  {items.map((item) => (
                    <div className="timeline-box pr" key={item.id}>
                      <div className="timeline-icon bg15">
                        <Timer className="icon-14" />
                      </div>
                      <div className="timeline-content">
                        <div className="comment-timeline df jcsb fww lh18">
                          <p>{item.username}</p>
                          <div className="df timeline-status">
                            <p className="status">
                              Status:<span className={`comment-status kyc-status ${(item.status || "neutral").toLowerCase().replace(/\s+/g, '-')}`}> {item.status}</span>
                            </p>
                          </div>
                        </div>
                        <div className="comment-message lh18">
                          <div>{item.comment}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Popup>
      )}
      <ToastContainer position="bottom-right" />
    </div>
    
  );
};

export default DashboardTable;
