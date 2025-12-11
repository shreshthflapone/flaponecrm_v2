import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./Dashboard.css";
import "./Dashboard_new.css";
import DashboardTable from "../../components/DashboardTable";
import { useEffect, useState } from "react";
import commonApi from "../../components/commonApi";
import { Camera,Wifi, Volume2, Dot, VolumeOff, Eye } from "lucide-react";
import Popup from "../../components/Popup";
//import Tooltip from "../components/Tooltip.jsx";

const data = {
  threatLevel: "LOW",
  currentVisitor: 21345,
  totalCollection: "47/50",
  totalDues: 12,
  activeGrievances: 28,
  propertyTypeTaxStatus: [
    { type: "Home/Apartment", Paid: 7200, Due: 1800 },
    { type: "Office/Factory", Paid: 1800, Due: 350 },
    { type: "School/College", Paid: 420, Due: 80 },
    { type: "Commercial", Paid: 1400, Due: 200 },
    { type: "Community Center", Paid: 90, Due: 15 },
    { type: "Hospital/Clinic", Paid: 120, Due: 10 },
    { type: "Others", Paid: 250, Due: 55 },
  ],
  grievanceStatus: [
    { name: "Security Breach", value: 26, color: "#4caf50" },
    { name: "Fire Alert", value: 8, color: "#2196f3" },
    { name: "Technical Issue", value: 10, color: "#fe6960" },
    { name: "Others", value: 15, color: "#bdbdbd" },
    { name: "Medical Emergency", value: 6, color: "#f44336" },
  ],
};
// #fe6960
const data1 = {
  totalProperties: 14125,
  verifiedProperties: 12200,
  pendingKYCVerifications: 1925,
  resolvedThisMonth: 920,
};
const tableData = [
  {
    id: 1,
    date: "1 Aug 2025",
    name: "Naveen Tiwari",
    location: "Noida",
    contact: "1234567890",
    description: "Broken street light",
    image:
      "https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg?mbid=social_retweet",
    assigned: "Technician A",
    viewDetails: "",
    status: "Resolved",
    lat: 28.2786639, 
    lng: 77.132925,
  },
  {
    id: 2,
    date: "05 Aug 2025",
    name: "Nand Jha",
    location: "Noida",
    contact: "9876543210",
    description: "Pothole repair needed",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC52U-Qyk1jL5ibkQOQVMxnXjGNnhrJ-yIwA&s",
    assigned: "Technician B",
    viewDetails: "",
    status: "In Progress",
  },
];

const Dashboard = () => {
  // const [data, setData] = useState([]);
  // const [data1, setData1] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [zoomed, setZoomed] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [zoomVideo, setZoomVideo] = useState("");
  
  useEffect(() => {
    fetchData();
    fetchVideoData();
  }, []);
  
  const fetchData = async () => {
    const paramsData = {
      'limit':5,
    }
    try {
      const res = await commonApi("queries_details.php?fun=fetchlist", "POST",paramsData);
      if (res) {
        setTableData(res.data.list);
      } else {
        console.error("Error fetching data:", res);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const fetchVideoData = async () => {
    const paramsData = {}
    try {
      const res = await commonApi("queries_details.php?fun=fetchVideoData", "POST",paramsData);
      if (res) {
        setFeeds(res.data.list);
      } else {
        console.error("Error fetching data:", res);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const statusColors = {
    REC: "text-red-500",
    LIVE: "text-green-500",
    ALERT: "text-yellow-500",
    OFFLINE: "text-gray-400"
  };

  const handleZoomClick = (video_url) => {
    if(video_url !== '') {
      setZoomed(true);
      setZoomVideo(video_url);
    }
  };

  const closeZoomClick = () => {
    setZoomed(false);
    setZoomVideo("");
    document.body.style.overflow = "auto";
  };

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          Real-time monitoring and incident management
        </p>
      </div>

      <div className="stats-container">
        <div className="stat-box stat-box-dashboard">
          <h3 className="v-center jcsb">
            Threat Level
            <svg style={{color:"#16a249"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield" data-lov-id="src/pages/Index.tsx:86:18" data-lov-name="Shield" data-component-path="src/pages/Index.tsx" data-component-line="86" data-component-file="Index.tsx" data-component-name="Shield" data-component-content="%7B%7D">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            </svg>
          </h3>
          <p>{data.threatLevel}</p>
          <small className="v-center mt2" style={{color:"#88939c"}}>
            No active threats
          </small>
        </div>
        <div className="stat-box stat-box-dashboard">
          <h3 className="v-center jcsb">
            Current Visitor
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9944 15.5C13.9274 15.5 15.4944 13.933 15.4944 12C15.4944 10.067 13.9274 8.5 11.9944 8.5C10.0614 8.5 8.49439 10.067 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5ZM11.9944 13.4944C11.1691 13.4944 10.5 12.8253 10.5 12C10.5 11.1747 11.1691 10.5056 11.9944 10.5056C12.8197 10.5056 13.4888 11.1747 13.4888 12C13.4888 12.8253 12.8197 13.4944 11.9944 13.4944Z" fill="#16a249"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5C7.18879 5 3.9167 7.60905 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C16.8112 19 20.0833 16.391 21.8107 14.5202C23.1426 13.0778 23.1426 10.9222 21.8107 9.47978C20.0833 7.60905 16.8112 5 12 5ZM3.65868 10.8366C5.18832 9.18002 7.9669 7 12 7C16.0331 7 18.8117 9.18002 20.3413 10.8366C20.9657 11.5128 20.9657 12.4872 20.3413 13.1634C18.8117 14.82 16.0331 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366Z" fill="#16a249"/>
            </svg>
          </h3>
          <div className="df aibl">
            <p>{data.currentVisitor.toLocaleString()}</p>
            <div className="arrow-section">→</div>
          </div>
          <small className="v-center" style={{color:"#88939c"}}>
          --  {/* 3 offline for maintenance */}
          </small>
        </div>
        <div className="stat-box stat-box-dashboard">
          <h3 className="v-center jcsb">
            Active Cameras
            <svg style={{color:"#16a249"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera" data-lov-id="src/pages/Index.tsx:93:18" data-lov-name="Camera" data-component-path="src/pages/Index.tsx" data-component-line="93" data-component-file="Index.tsx" data-component-name="Camera" data-component-content="%7B%7D"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
          </h3>
          <div className="df aibl">
            <p>{data.totalCollection.toLocaleString()}</p>
            <div className="arrow-section">→</div>
          </div>
          <small className="v-center" style={{color:"#88939c"}}>
            3 offline for maintenance
          </small>
        </div>
        <div className="stat-box stat-box-dashboard yellow">
          <h3 className="v-center jcsb">
            Open Incidents
            <svg style={{color:"#f8c630"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert" data-lov-id="src/pages/Index.tsx:101:18" data-lov-name="AlertTriangle" data-component-path="src/pages/Index.tsx" data-component-line="101" data-component-file="Index.tsx" data-component-name="AlertTriangle" data-component-content="%7B%7D"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
          </h3>
          <div className="df aibl">
            <p>{data.totalDues.toLocaleString()}</p>
            <div className="arrow-section yellow">↘</div>
          </div>
          <small className="v-center" style={{color:"#88939c"}}>2 high priority</small>
        </div>
        <div className="stat-box stat-box-dashboard">
          <h3 className="v-center jcsb">
            Personnel On Duty
            <svg style={{color:"#16a249"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users" data-lov-id="src/pages/Index.tsx:109:18" data-lov-name="Users" data-component-path="src/pages/Index.tsx" data-component-line="109" data-component-file="Index.tsx" data-component-name="Users" data-component-content="%7B%7D"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </h3>
          <div className="df aibl">
            <p>{data.activeGrievances}</p>
            <div className="arrow-section">→</div>
          </div>
          <small className="v-center mt2" style={{color:"#88939c"}}>Full coverage</small>
        </div>
      </div>

      {/* <div className="charts-container">
        <h3 className="w100 df fdc">Live Surveillance Feeds</h3>
        <div className="w100 feeds-grid">
          {feeds.map((cam) => (
            <div key={cam.id} className={`feed-card status-${cam.status.toLowerCase()}`}>
               <div className="feed-header">
                <span className={`status-badge ${cam.status.toLowerCase()}`}>
                  <Dot className="dot-icon animate-pulse" />
                  {cam.status}
                </span>
                {cam.wifi && <Wifi className="wifi-icon" />}
              </div> 
              <div className="feed-body">
                <div className="video-wrapper">
                  {cam.video_url !== "" ? (
                    <video
                      src={cam.video_url}
                      autoPlay
                      muted
                      playsInline
                      loop
                    />
                  ) : (
                    <div className="camera-placeholder">
                      <Camera className="camera-icon" />
                    </div>
                  )}

                  <div className="video-overlay-header">
                    <span className={`status-badge ${cam.status.toLowerCase()}`}>
                      <Dot className="dot-icon animate-pulse" />
                      {cam.status}
                    </span>
                    {cam.wifi && <Wifi className="wifi-icon" />}
                  </div>
                </div>
              </div>

              {cam.video_url !== "" ?(
                <div className="feed-overlay">
                  <button
                    className="zoom-btn"
                    onClick={() => handleZoomClick(cam.video_url)}
                  >
                    Zoom
                  </button>
                </div>
              ) : ("")}
              
              <div className="feed-footer">
                <div>
                  <p className="feed-name">{cam.name}</p>
                  <p className="feed-location">{cam.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="cam-id">{cam.id}</span>
                  {cam.sound ? (
                    <Volume2 className="sound-icon" />
                  ) : (
                    <VolumeOff className="sound-icon muted" />
                  )}
                </div>
              </div>
              {cam.alertText && (
                <p className="alert-text">{cam.alertText}</p>
              )}
            </div>
          ))}
        </div>
      </div> */}

      <div className="charts-container mt24">
        <div className="chart-box">
          <h3>Incident Type</h3>
          {/* <small>Current status of all reported issues</small> */}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.grievanceStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.grievanceStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="dashboard-table-wrap">
        <h3 className="mb12 fw6 fs18">Recent Issues</h3>
        <DashboardTable 
          data={tableData}
          HistoryPopup={true}
          PastPopup={true}
          hiddenColumn={'action'}
        />
      </div>
      
      {zoomed && (
        <Popup 
          onClose={closeZoomClick} 
          title="Video"
        >
          <video
            src={zoomVideo}
            controls
            autoPlay
            style={{ width: "100%", borderRadius: "8px" }}
          /> 
        </Popup>
      )}
    </div>
  );
};

export default Dashboard;
