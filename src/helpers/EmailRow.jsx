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



  function EmailRow({ email }) {
      const [showEmail, setShowEmail] = useState(false);
  
      const toggleEmailVisibility = () => setShowEmail(!showEmail);
  
      const maskEmail = (email) => {
        if (!email || !email.includes("@")) return "N/A";
  
        const [username, domain] = email.split("@");
        const maskedUsername =
          username.length <= 2
            ? username[0] + "*".repeat(username.length - 1)
            : username.slice(0, 2) + "*".repeat(username.length - 2);
        return `${maskedUsername}@${domain}`;
      };
  
      return (
        <tr>
          <td style={cellLabelStyle}>Email</td>
          <td
            style={{
              ...cellValueStyle,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                marginLeft: showEmail ? "0" : "6px",
                fontSize: "14px",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                opacity: showEmail ? 1 : 0.7,
                transform: showEmail ? "translateX(0)" : "translateX(-5px)",
              }}
            >
              {showEmail ? email : maskEmail(email)}
            </span>
  
            <span
              onClick={toggleEmailVisibility}
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                color: "#555",
                transition: "transform 0.2s ease",
                marginLeft: "6px",
              }}
            >
              {showEmail ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </td>
        </tr>
      );
    }


    export default EmailRow;