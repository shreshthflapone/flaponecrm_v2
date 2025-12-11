import { useState, useMemo, useRef, useEffect } from "react";
import "./MainContent.css";
import {
  GoogleMap,
  Marker,
  useJsApiLoader
} from "@react-google-maps/api";
import { MapPin, Eye, EyeOff } from "lucide-react";
import getKycStyle from "../helpers/getKycStyle";
import MobileRow from "../helpers/MobileRow";
import EmailRow from "../helpers/EmailRow";
import allMarkers from "../helpers/AllMarkers";
import Swal from "sweetalert2";
import Loader from "./Loader";

const MainContent = () => {
  const apiKey = "AIzaSyACp77XNyRyMGWuneoi43txjasns_pymlE";
  const mapRef = useRef(null);
  const groundOverlayRef = useRef(null);
  const defaultCenter = { lat: 28.2786639, lng: 77.132925 };
  const defaultZoom = 16;
  const kmlUrl =
    "https://imc.flapone.com/Farmhouse1_ortho_MonJul21093813548198.kml";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [activePanel, setActivePanel] = useState(null);
  const [isKmlVisible, setIsKmlVisible] = useState(false);
  const [popupPixel, setPopupPixel] = useState({ x: 0, y: 0 });
  const [isLoadingKml, setIsLoadingKml] = useState(false);


  //Shreshth 
  const legendRef = useRef(null);
  const layerRef = useRef(null);
  const paymentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (activePanel === "legend" && legendRef.current && !legendRef.current.contains(event.target)) ||
        (activePanel === "layer" && layerRef.current && !layerRef.current.contains(event.target)) ||
        (activePanel === "payment" && paymentRef.current && !paymentRef.current.contains(event.target))
      ) {
        setActivePanel(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activePanel]);


  const [visibleLayers, setVisibleLayers] = useState({
    "Home/Apartment": true,
    "Office/Factory": true,
    "School/College": true,
    "Shops & Commercial Places": true,
    "Community Center": true,
  });

  const [paymentStatus, setPaymentStatus] = useState({
    "Property Tax": { Paid: false, Due: false },
    "Water & Sewerage Charges": { Paid: false, Due: false },
    "Waste Management Fee": { Paid: false, Due: false },
    "Public Parking Charges": { Paid: false, Due: false },
    "Electricity Bill": { Paid: false, Due: false },
    "Water Usage Bill": { Paid: false, Due: false },
    "Piped Gas Bill": { Paid: false, Due: false },
    "Sweeping & Cleaning Charges": { Paid: false, Due: false },
  });
  const togglePaymentStatus = (type, status) => {
    setPaymentStatus((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [status]: !prev[type][status],
      },
    }));
  };

  const toggleLayer = (type) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };
  const doesMarkerMatchPaymentFilters = (marker) => {
    const activeFilters = [];

    Object.entries(paymentStatus).forEach(([taxType, statuses]) => {
      if (statuses.Paid) activeFilters.push({ type: taxType, isPaid: true });
      if (statuses.Due) activeFilters.push({ type: taxType, isPaid: false });
    });

    if (activeFilters.length === 0) return true;

    return activeFilters.some((filter) => {
      if (filter.isPaid) {
        return (
          marker.propertyDetails.paidTaxes &&
          marker.propertyDetails.paidTaxes.some(
            (tax) => tax.type === filter.type
          )
        );
      } else {
        return (
          marker.propertyDetails.dueTaxes &&
          marker.propertyDetails.dueTaxes.some(
            (tax) => tax.type === filter.type
          )
        );
      }
    });
  };
  function FormatDate({ dateString }) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return <div>{formattedDate}</div>;
  }
  const filteredMarkers = useMemo(() => {
    return allMarkers.filter(
      (marker) =>
        visibleLayers[marker.type] && doesMarkerMatchPaymentFilters(marker)
    );
  }, [allMarkers, visibleLayers, paymentStatus]);

  const cellLabelStyle = {
    padding: "8px 12px",
    fontWeight: "bold",
    color: "#444",
    fontSize: "13px",
    verticalAlign: "top",
    borderBottom: "1px solid #eee",
  };

  const cellValueStyle = {
    padding: "8px 12px",
    color: "#333",
    fontSize: "13px",
    borderBottom: "1px solid #eee",
  };

  const rowAltStyle = {
    backgroundColor: "#f9f9f9",
  };

  const toggleKmlLayer = async () => {
    const map = mapRef.current;
    if (!map || !window.google || !window.google.maps) return;

    if (isKmlVisible && groundOverlayRef.current) {
      groundOverlayRef.current.setMap(null);
      groundOverlayRef.current = null;
      setIsKmlVisible(false);

       map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP);
      map.setCenter(defaultCenter);
      map.setZoom(defaultZoom);
    } else {
      await addGroundOverlay();
    }
  };

  const parseKmlForGroundOverlay = async (kmlUrl) => {
    try {
      const response = await fetch(kmlUrl);
      const kmlText = await response.text();

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(kmlText, "application/xml");

      const href = xmlDoc.querySelector(
        "GroundOverlay > Icon > href"
      )?.textContent;

      const north = parseFloat(
        xmlDoc.querySelector("LatLonBox > north")?.textContent
      );
      const south = parseFloat(
        xmlDoc.querySelector("LatLonBox > south")?.textContent
      );
      const east = parseFloat(
        xmlDoc.querySelector("LatLonBox > east")?.textContent
      );
      const west = parseFloat(
        xmlDoc.querySelector("LatLonBox > west")?.textContent
      );
      if (
        href &&
        !isNaN(north) &&
        !isNaN(south) &&
        !isNaN(east) &&
        !isNaN(west)
      ) {
        return {
          imageUrl: href,
          bounds: {
            north,
            south,
            east,
            west,
          },
        };
      } else {
        await Swal.fire({
          title: "Error!",
          text: "Failed to parse KML: Incomplete or invalid KML data.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "legend-toggle-button",
          },
        });
        toggleKmlLayer();
        return null;
      }
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: `Failed to parse KML: ${error.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
      toggleKmlLayer();
      return null;
    }
  };


const addGroundOverlay = async () => {
  const map = mapRef.current;
  if (!map || !window.google || !window.google.maps) return;

  setIsLoadingKml(true);
  map.setMapTypeId(window.google.maps.MapTypeId.HYBRID);

  const result = await parseKmlForGroundOverlay(kmlUrl);
  if (result) {
    const img = new Image();
    img.src = result.imageUrl;

    img.onload = () => {
      const overlay = new window.google.maps.GroundOverlay(
        result.imageUrl,
        {
          north: result.bounds.north,
          south: result.bounds.south,
          east: result.bounds.east,
          west: result.bounds.west,
        },
        { map }
      );

      groundOverlayRef.current = overlay;
      setIsKmlVisible(true);

      const bounds = new window.google.maps.LatLngBounds(
        { lat: result.bounds.south, lng: result.bounds.west },
        { lat: result.bounds.north, lng: result.bounds.east }
      );
      map.fitBounds(bounds);

      setIsLoadingKml(false);
    };

    img.onerror = () => {
      setIsLoadingKml(false);
      map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP); 
      Swal.fire({
        title: "Error!",
        text: "Failed to load KML image.",
        icon: "error",
        confirmButtonText: "OK",
      });
    };
  } else {
    setIsLoadingKml(false);
    map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP);
  }
};

  const getMarkerPixelPosition = (latLng, mapInstance) => {
    if (!mapInstance || !mapInstance.getProjection) return { x: 0, y: 0 };

    const projection = mapInstance.getProjection();
    const bounds = mapInstance.getBounds();
    if (!projection || !bounds) return { x: 0, y: 0 };

    const topRight = projection.fromLatLngToPoint(bounds.getNorthEast());
    const bottomLeft = projection.fromLatLngToPoint(bounds.getSouthWest());
    const scale = Math.pow(2, mapInstance.getZoom());
    const worldPoint = projection.fromLatLngToPoint(latLng);

    return {
      x: (worldPoint.x - bottomLeft.x) * scale,
      y: (worldPoint.y - topRight.y) * scale,
    };
  };
  useEffect(() => {
    if (!hoveredMarker || !mapRef.current) return;

    const map = mapRef.current;

    const updatePosition = () => {
      const pixel = getMarkerPixelPosition(hoveredMarker.position, map);
      setPopupPixel(pixel);
    };

    updatePosition();

    const idleListener = map.addListener("idle", updatePosition);
    const zoomListener = map.addListener("zoom_changed", updatePosition);
    const dragListener = map.addListener("dragend", updatePosition);

    return () => {
      if (idleListener) idleListener.remove();
      if (zoomListener) zoomListener.remove();
      if (dragListener) dragListener.remove();
      window.removeEventListener("resize", updatePosition);
    };
  }, [hoveredMarker, mapRef.current]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter(defaultCenter);
      mapRef.current.setZoom(defaultZoom);
    }
  }, []);
  
  return (
    <div className="map-container">
      {isLoaded ? (
        <div style={{ height: "100%", width: "100%", position: "relative" }}>
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            onLoad={(mapInstance) => {
              mapRef.current = mapInstance;
              mapInstance.setCenter(defaultCenter);
              mapInstance.setZoom(defaultZoom);
            mapInstance.setMapTypeId(window.google.maps.MapTypeId.ROADMAP);

            }}
          >
            {filteredMarkers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                icon={marker.icon}
                onMouseOver={() => {
                  setHoveredMarker(marker);
                }}
              />
            ))}
          </GoogleMap>

          {hoveredMarker && (
            <div
              style={{
                position: "absolute",
                left: `${popupPixel.x}px`,
                top: `${popupPixel.y - 28}px`,
                transform: "translate(-50%, -100%)",
                zIndex: 999,
                pointerEvents: "auto",
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "380px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                    backgroundColor: "#fff",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#ff6b6b",
                      color: "#fff",
                      padding: "8px 12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                      {hoveredMarker.type}
                    </span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setHoveredMarker(null)}
                    >
                      &#x2715;
                    </span>
                  </div>

                  <div style={{ maxHeight: "240px", overflowY: "auto" }}>
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <tbody>
                        <tr>
                          <td style={cellLabelStyle}>Property Type</td>
                          <td style={cellValueStyle}>
                            {hoveredMarker.propertyDetails.propertyType}
                          </td>
                        </tr>
                        <tr style={rowAltStyle}>
                          <td style={cellLabelStyle}>Contact Name</td>
                          <td style={cellValueStyle}>
                            {hoveredMarker.propertyDetails.ownerName}
                          </td>
                        </tr>
                        <tr>
                          <td style={cellLabelStyle}>Property Name</td>
                          <td style={cellValueStyle}>
                            {hoveredMarker.propertyDetails.propertyName}
                          </td>
                        </tr>
                        <MobileRow
                          mobile={hoveredMarker.propertyDetails.mobile}
                        />
                        <EmailRow email={hoveredMarker.propertyDetails.email} />
                        <tr style={rowAltStyle}>
                          <td style={cellLabelStyle}>KYC Status</td>
                          <td style={cellValueStyle}>
                            <span
                              style={{
                                display: "inline-block",
                                padding: "4px 10px",
                                borderRadius: "6px",
                                fontSize: "13px",
                                fontWeight: 500,
                                ...getKycStyle(
                                  hoveredMarker.propertyDetails.kycStatus
                                ),
                              }}
                            >
                              {hoveredMarker.propertyDetails.kycStatus}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style={cellLabelStyle}>Ward / Zone</td>
                          <td style={cellValueStyle}>
                            {hoveredMarker.propertyDetails.wardZone}
                          </td>
                        </tr>
                        <tr style={rowAltStyle}>
                          <td style={cellLabelStyle}>Address</td>
                          <td style={cellValueStyle}>
                            {hoveredMarker.propertyDetails.address}
                          </td>
                        </tr>
                        <tr>
                          <td style={cellLabelStyle}>Lat/Long</td>
                          <td style={cellValueStyle}>
                            <a
                              href={`https://maps.google.com/?q=${hoveredMarker.propertyDetails.latLong.lat},${hoveredMarker.propertyDetails.latLong.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                color: "#ff6b6b",
                                textDecoration: "none",
                              }}
                            >
                              <MapPin size={18} />
                              <span
                                style={{
                                  marginLeft: "6px",
                                  fontSize: "13px",
                                }}
                              >
                                View on Map
                              </span>
                            </a>
                          </td>
                        </tr>

                        <tr style={rowAltStyle}>
                          <td style={cellLabelStyle}>Paid Taxes</td>
                          <td
                            style={{
                              ...cellValueStyle,
                              padding: "8px 12px",
                            }}
                          >
                            {hoveredMarker.propertyDetails.paidTaxes.length >
                            0 ? (
                              hoveredMarker.propertyDetails.paidTaxes.map(
                                (tax, i) => (
                                  <div
                                    key={i}
                                    style={{
                                      backgroundColor: "#e6f4ea",
                                      border: "1px solid #b7e0c4",
                                      borderRadius: "6px",
                                      padding: "6px 10px",
                                      marginBottom: "6px",
                                      color: "#2e7d32",
                                      fontSize: "13px",
                                    }}
                                  >
                                    <span>
                                      <strong>{tax.type}</strong>
                                    </span>
                                    <br />
                                    <span className="mt4 db">
                                      Amount: ₹{tax.amount}
                                    </span>
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "#388e3c",
                                        display: "flex",
                                      }}
                                      className="mt4 db"
                                    >
                                      Date:{" "}
                                      <FormatDate
                                        dateString={tax.lastPaymentDate}
                                      />
                                    </span>
                                  </div>
                                )
                              )
                            ) : (
                              <div style={{ color: "#777", fontSize: "13px" }}>
                                No Paid Taxes
                              </div>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td style={cellLabelStyle}>Due Taxes</td>
                          <td
                            style={{
                              ...cellValueStyle,
                              padding: "8px 12px",
                            }}
                          >
                            {hoveredMarker.propertyDetails.dueTaxes.length >
                            0 ? (
                              hoveredMarker.propertyDetails.dueTaxes.map(
                                (tax, i) => (
                                  <div
                                    key={i}
                                    style={{
                                      backgroundColor: "#fdecea",
                                      border: "1px solid #f5c6cb",
                                      borderRadius: "6px",
                                      padding: "6px 10px",
                                      marginBottom: "6px",
                                      color: "#c62828",
                                      fontSize: "13px",
                                    }}
                                  >
                                    <span>
                                      <strong>{tax.type}</strong>
                                    </span>
                                    <span className="mt4 db">
                                      Amount: ₹{tax.amount}
                                    </span>
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "#b71c1c",
                                        display: "flex",
                                      }}
                                      className="mt4 db"
                                    >
                                      Due by:{" "}
                                      <FormatDate dateString={tax.dueDate} />
                                    </span>
                                  </div>
                                )
                              )
                            ) : (
                              <div style={{ color: "#777", fontSize: "13px" }}>
                                No Due Taxes
                              </div>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "99%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderTop: "10px solid white",
                    zIndex: 5,
                  }}
                />
              </div>
            </div>
          )}

          <div
            ref={legendRef}
            className={`legend-wrapper ${
              activePanel === "legend" ? "visible" : ""
            }`}
          >
            <div className="legend-list-head">
              <span>Legend</span>
              <span
                onClick={() => setActivePanel(null)}
                style={{ cursor: "pointer" }}
              >
                &#x2715;
              </span>
            </div>
            <ul className="scrollable-list">
              {allMarkers
                .filter(
                  (marker, index, self) =>
                    index === self.findIndex((m) => m.type === marker.type)
                )
                .map((marker, i) => (
                  <li key={i} className="legend-item">
                    <img
                      src={marker.icon.url}
                      className="legend-icon"
                      alt={marker.type}
                    />
                    <span>{marker.type}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div
            ref={layerRef}
            className={`layer-wrapper ${
              activePanel === "layer" ? "visible" : ""
            }`}
          >
            <div className="legend-list-head">
              <span>Layer List</span>
              <span
                onClick={() => setActivePanel(null)}
                style={{ cursor: "pointer" }}
              >
                &#x2715;
              </span>
            </div>
            <ul className="scrollable-list">
              {Object.keys(visibleLayers).map((type, i) => (
                <li
                  key={i}
                  className="legend-item layer-checkbox"
                  onClick={() => toggleLayer(type)}
                >
                  <input type="checkbox" checked={visibleLayers[type]} />
                  <span style={{ marginLeft: "8px", cursor: "pointer" }}>
                    {type}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={paymentRef}
            className={`payment-wrapper ${
              activePanel === "payment" ? "visible" : ""
            }`}
          >
            <div className="legend-list-head ">
              <span>Tax List</span>
              <span
                onClick={() => setActivePanel(null)}
                style={{ cursor: "pointer" }}
              >
                &#x2715;
              </span>
            </div>
            <ul className="scrollable-list pay tax-list">
              {Object.keys(paymentStatus).map((type, i) => (
                <li
                  key={i}
                  className="legend-item"
                  style={{ flexDirection: "column", alignItems: "self-start" }}
                >
                  <span style={{ fontWeight: "bold" }}>{type}</span>
                  <div style={{ display: "flex" }}>
                    <label className="v-center">
                      <input
                        type="checkbox"
                        checked={paymentStatus[type].Paid}
                        onChange={() => togglePaymentStatus(type, "Paid")}
                      />
                      Paid
                    </label>
                    <label style={{ marginLeft: "15px" }} className="v-center">
                      <input
                        type="checkbox"
                        checked={paymentStatus[type].Due}
                        onChange={() => togglePaymentStatus(type, "Due")}
                      />
                      Due
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {activePanel !== "legend" && (
            <button
              onClick={() => setActivePanel("legend")}
              className="legend-toggle-button"
              style={{ right: "8px", top: "44px" }}
            >
              Legend
            </button>
          )}

          {activePanel !== "layer" && (
            <button
              onClick={() => setActivePanel("layer")}
              className="legend-toggle-button"
              style={{ right: "8px", top: "84px" }}
            >
              Layer List
            </button>
          )}
          {activePanel !== "payment" && (
            <button
              onClick={() => setActivePanel("payment")}
              className="legend-toggle-button"
              style={{ right: "8px", top: "124px" }}
            >
              Tax List
            </button>
          )}
          <button
            onClick={toggleKmlLayer}
            style={{
              top: 164,
              right: 8,
            }}
            className="legend-toggle-button box-center"
          >
            {isKmlVisible ? (
              <>
                KML <Eye size={16} className="ml4" />
              </>
            ) : (
              <>
                KML <EyeOff size={16} className="ml4" />
              </>
            )}
          </button>
          {/* <button
        onClick={toggleKmlLayer}
        style={{
          top: 164,
          right: 8,
        }}
         className="legend-toggle-button"
      >
        OverLay img
      </button> */}
        </div>
      ) : (
        <Loader />
      )}
      {isLoadingKml && (
  <div className="loader-overlay">
    <div className="loader1"></div>
    <p>Please wait 2D Image is Loading... </p>
  </div>
)}
    </div>
  );
};

export default MainContent;
