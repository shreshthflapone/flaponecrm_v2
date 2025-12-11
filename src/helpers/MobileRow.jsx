import { useState} from "react";
import {  Eye, EyeOff } from "lucide-react";
 
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



function MobileRow({ mobile }) {
    const [showMobile, setShowMobile] = useState(false);

    const toggleMobileVisibility = () => {
      setShowMobile(!showMobile);
    };

    const maskedMobile = mobile ? `${mobile.slice(0, 2)}XXXXXX` : "N/A";

    return (
      <tr>
        <td style={cellLabelStyle}>Mobile</td>
        <td
          style={{
            ...cellValueStyle,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              marginLeft: showMobile ? "0" : "6px",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              opacity: showMobile ? 1 : 0.7,
              transform: showMobile ? "translateX(0)" : "translateX(-5px)",
            }}
          >
            {showMobile ? mobile : maskedMobile}
          </span>

          <span
            onClick={toggleMobileVisibility}
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              color: "#555",
              transition: "transform 0.2s ease",
              marginLeft: "6px",
            }}
          >
            {showMobile ? <EyeOff size={16} /> : <Eye size={16} />}
          </span>
        </td>
      </tr>
    );
  }

  export default MobileRow;

