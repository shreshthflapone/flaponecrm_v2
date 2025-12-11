import React, { useState } from "react";
import { Check } from 'lucide-react';
import { Link } from "react-router-dom";

import forgotImage from "../../assets/forgot.gif";
import logoImage from "../../assets/logo.png";

function ForgotPassword() {
  const [forgotEmail, setForgotEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPwd = (e) => {
    e.preventDefault();

    if (!forgotEmail) {
      setEmailError("Email is required");
      return;
    }

    setLoading(true);
    setEmailError("");
    setSuccess("");

    // Dummy API simulation
    setTimeout(() => {
      setLoading(false);
      setSuccess("Reset link sent to your email ✅");
    }, 1500);
  };

  return (
    <div className="login-container box-center ">
      {/* Left Side */}
      <div className="login-left-side-image pr">
        <img src={forgotImage} alt="login" className="imgrad" />
        <div className="pa box-center fc3 login-left-text w100 fdc">
          <div className="fc3 fw5 ls1 lh14">
            <p className="overlay-text fs14 pb32 lh22 ls1 tal">Don't worry. Enter your email to receive a password reset link. Follow the instructions in the email to easily reset your password.</p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="login-right-side-form right-side">
        <div className="pd20 w100">
          <div className="box-center login-head fdc">
            <img src={logoImage} alt="logo" className="slider-company-logo" />
          </div>

          <div className="forgot-password-form-box">
            <h3 className="fc15 fw5 fs20 mt24 ls1 tac forgot-heading">
              Forgot Password
              <p className="fs14 fc16 mt12 fw4 ls1 forgot-text">
                Don't worry. Resetting your password is easy!
              </p>
            </h3>

            <form className="mt24 mb48 form-area">
              <label htmlFor="email" className="df fs16 ls1 fw6">
                Email<span className="fc4">*</span>
              </label>

              <div className="col-xl-12">
                <input
                  type="text"
                  name="email"
                  className="form-control br4"
                  placeholder="Enter registered email address"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  autoComplete="email"
                />

                {emailError && (
                  <div className="form-error-messages error mt4 ml4 blink-text-normal-error">
                    {emailError}
                  </div>
                )}

                {success && (
                  <div className="mt4 ml4 blink-text-normal-success">
                    {success}
                  </div>
                )}

                <button
                  className="login-email login-button box-center w100 mt24 lh22 ls1 cp"
                  onClick={handleForgotPwd}
                >
                  Submit
                </button>
              </div>
            </form>

            <div className="box-center ls1 fc16 have-accout">
              Already have an account?{" "}
              <Link to="/login" className="fc1 ml4 fs16 login-here">
                Login Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
