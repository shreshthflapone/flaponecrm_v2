import React from "react";
import "./InnerHeader.css"; // Vite uses relative import smoothly

const InnerHeader = ({
  heading = "",
  txtSubHeading = "",
  onClick = () => {},
  icon = null,
  iconText = "",
  showButton = false,
}) => {
  return (
    <div className="df aic pt8 pb8 inner-header fww">
      
      {/* LEFT SECTION */}
      <div className={`df fdc ${showButton ? "flx75" : "flx100"}`}>
        <div className="flx1 fs22 fw6 fc14 df">
          <h1>{heading}</h1>
        </div>

        <div className="fs14 fc5 fw4 mt8 lh18">
          {txtSubHeading || 
            "Unlocking possibilities: Explore the potential and personalization of 'My Packages'"}
        </div>
      </div>

      {/* RIGHT BUTTON SECTION */}
      {showButton && (
        <div className="myteam-button v-center jce flx1">
          <button onClick={onClick} className="btn-blue">
            {icon} {iconText}
          </button>
        </div>
      )}

    </div>
  );
};

export default InnerHeader;
