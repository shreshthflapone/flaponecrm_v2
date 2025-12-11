import React, { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import './Login.css';
import commonApi from "../../components/commonApi.jsx";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/login.gif";
import logoImage from "../../assets/logo.png";
import google from "../../assets/google.png";
import { useParams, Link } from "react-router-dom";


function Login() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState('dummy@email.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);

  const [userIdError, setEmailIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowOtpScreen(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "email") {
      setEmailId(value);
    }

    if (id === "password") {
      setPassword(value);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container df ">
      <div className="login-left-side-image pr">
          <img src={loginImage} alt="login" className="imgrad" />
          <div className="login-left-text box-center fc3 pa t0 b0 l0 r0 fdc tac">
              <p className="overlay-text fs18 pb24 lh22 ls1 fw6">After logging in, you'll benefit from:</p>
              <ul className="fs14 fw5 ls2 lh18 pb32 tal">
                  <li className="v-center">
                      <Check className='icon-20 mr4' />Never miss a class! Stay informed of your upcoming classes and
                      your attendance.
                  </li>
                  <li className="mt4 v-center">
                      <Check className='icon-20 mr4' />Get quick resolution to your concern by raising a service
                      request.
                  </li>
                  <li className="mt4 v-center">
                      <Check className='icon-20 mr4' />Track your comprehensive performance across all assessments.
                  </li>
              </ul>
              <p className="overlay-text fs14 pb32 lh22 ls1 tal">Explore your dashboard to make the most of these features and stay on top of your training.</p>
          </div>
      </div>
      <div className="login-right-side-form right-side">
          <div className="pd20 w100">
            
            <div className="box-center login-head fdc">
              <div>
                {id ? (
                  <h2 className="fs30 fc14">Hello <span className="fc1">Flapone</span></h2>
                ) : (
                  <img src={logoImage} alt="logo" className="slider-company-logo" />
                )}
              </div>
              <h3 className="fc15 fw5 mt24 ls1 tac fs24 mb8">
                Welcome to the Flapone Family!
                <div className="fs14 fc16 mt12 fw4 ls1">Sign in to explore your training resources and stay updated.</div>
              </h3>
            </div>
            {!showOtpScreen ? (
              <>
                <form className="form-area">
                    <label htmlFor="email" className="df fs16 ls1 fw6">Email<span className="fc4">*</span></label>
                    <input
                        type="email"
                        id="email"
                        className="mb16"
                        placeholder="Enter your email address"
                        value={emailId}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <label htmlFor="password" className="df fs16 ls1 fw6">Password<span className="fc4">*</span></label>
                    <div className="col-xl-12 pr mt4 password-input">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                        />
                        <span onClick={togglePasswordVisibility}>
                            <Eye />
                        </span>
                    </div>

                    <div className="remember-forgot df jce fs12 ls1 fc1 cp">
                        <Link to="/forgot-password">Forgot your password?</Link>
                    </div>
                    <button type="submit" className="h40 login-button bg1 fc3" onClick={handleLogin}>
                    {loading ? <SmallLoader/> : "Log in"}
                    </button>
                </form>
                <div className="alternative-login box-center fdc form-area ">
                    <p className="or-login-text fc5 fs14 box-center w100">
                    Or, Login with
                    </p>
                    <button className="h40 google-login w100 fc5 box-center brd1 br4 cp bg5">
                    <img src={google} className="mr8" alt="gmail" />
                    Sign in with Google
                    </button>
                </div>
              </>
            ) : (
              <div className="otp-wrapper">
                <p className="otp-back" onClick={() => setShowOtpScreen(false)}>
                  ← Back
                </p>
                <h2 className="otp-title">Verify OTP</h2>
                <p className="otp-email">{emailId}</p>
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setOtp(value);
                  }}
                  className="otp-input"
                  placeholder="Enter 6-digit code"
                  inputMode="numeric"
                />

                <button className="otp-btn bg1" onClick={() => navigate('/')}>
                  Verify OTP →
                </button>

                <p className="otp-resend">
                  Didn't receive OTP? Click here to <span>resend OTP</span>
                </p>

              </div>
            )}
          </div>
      </div>
    </div>
  );
}

export default Login;
