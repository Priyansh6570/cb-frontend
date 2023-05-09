import React, { Fragment, useRef, useState, useEffect } from "react";
import "../../styles/LoginSignUp.scss";
import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import PhoneIcon from "@material-ui/icons/Phone";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import app from "../firebase_config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const LoginSignUp = ({ history, location }) => {
  
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    verifyButton: false,
    verifyOtp: false,
    otp: "",
  });



  const { name, email, password, mobile } = user;

  const [avatar, setAvatar] = useState("/Images/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Images/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault(); // prevent default form submission
      const myForm = new FormData();
    
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);
      myForm.set("mobile", mobile);
    
      dispatch(register(myForm));
    };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  // Firebase Phone Auth
  const auth = getAuth(app);

  const onCaptchVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        'size': "invisible",
        'callback': () => {
          alert.success("Captcha verified");
        },

        'expired-callback': () => {
          alert.error("Captcha expired");

          window.recaptchaVerifier.render().then((widgetId) => {
            window.recaptchaVerifier.reset(widgetId);
          });
        }
      },
      auth
    );
  };



  const onSignInSubmit = (e) => {
    onCaptchVerify();
    const phoneNumber = "+91" + user.mobile;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert.success("OTP sent successfully");
      })
      .catch((error) => {
        alert.error("Failed to send OTP");
      });
  };

  const onVerifyOtp = (e) => {
    window.confirmationResult
      .confirm(user.otp)
      .then((result) => {
        const userData = result.user;
        alert.success("OTP verified successfully");
        // setUser({ 
        //   ...userData, 
        //   verified: true, 
        //   verifyOtp: false 
        // });
        // setOtpVerified(true); // set the flag to true when OTP is verified successfully
      })
      .catch((error) => {
        alert.error("Invalid OTP");
      });
  };

  const mobileChange = (e) => {
    setUser({ ...user, mobile: e.target.value });
  };

  useEffect(() => {
    if (user.mobile && user.mobile.length === 10) {
      setUser({ ...user, verifyButton: true });
    }
  }, [user.mobile]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer flex justify-center">
            <div id="recaptcha-container"></div>
            <div className="left-main-container sm:relative sm:top-[-100px] sm:h-[920px] p-3 flex flex-row h-[550px] w-[60vw] sm:w-[100vw] sm:flex-col sm:justify-center sm:align-baseline">
              <img
                src="./Images/user-action-bg.jpg"
                alt=""
                className="user-action-img w-[880px] sm:right-1 sm:rounded-none absolute h-[70%] sm:h-[113%] rounded-3xl"
              />
              <img
                src="./Images/monitoring-login.png"
                alt="login-logo"
                className="login-img sm:hidden relative scale-[0.5] left-[-20px] bottom-[-60px]"
              />
              <div className="LoginSignUpBox overflow-x-hidden overflow-y-auto relative right-[50px] sm:top-[-14px] sm:right-0 shrink-0 scale-[1] self-center">
                <div>
                  <div className="login_signUp_toggle">
                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                  </div>
                  <button ref={switcherTab}></button>
                </div>
                <form
                  className="loginForm xs:px-10"
                  ref={loginTab}
                  onSubmit={loginSubmit}
                >
                  <div className="loginEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  <Link to="/password/forgot">Forget Password ?</Link>
                  <input
                    type="submit"
                    value="Login"
                    className="loginBtn sm:scale-[1] bg-[#ee3131] text-white text-xl sm:text-sm sm:h-[30px] font-bold rounded font-sans"
                  />
                </form>

                {/* signup or Register  */}
                <form
                  className="signUpForm sm:h-[400px] xs:px-6 flex flex-col gap-2 mt-[4rem] sm:mt-[12.25rem]"
                  ref={registerTab}
                  encType="multipart/form-data"
                  onSubmit={registerSubmit}
                >
                  {/* Name input  */}
                  <div className="signUpName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={user.name}
                      onChange={registerDataChange}
                    />
                  </div>

                  {/* Email input  */}
                  <div className="signUpEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={user.email}
                      onChange={registerDataChange}
                    />
                  </div>
                  {/* Mobile input */}
                  <div className="signUpMobile flex flex-col">
                    <PhoneIcon className="sm:left-[28px] left-[46px] sgv-mo" />
                    <input
                      type="text"
                      placeholder="Mobile"
                      required
                      name="mobile"
                      value={user.mobile}
                      onChange={mobileChange}
                      className="mobileInput"
                      
                    />
                    {user.mobile && user.mobile.length === 10 ? (
                      <input
                        type="button"
                        className="btn-secondary ver sm:pr-0 mb-4 text-xl sm:text-sm sm:scale-[1] font-bold font-sans rounded"
                        onClick={onSignInSubmit}
                      />
                    ) : null}
                    {/* OTP Verification */}
                    {user.verifyButton ? (
                      <div className="signup-field">
                        <div className="signUpOTP flex flex-col">
                          <input
                            type="number"
                            placeholder="OTP"
                            value={user.otp}
                            onChange={(e) =>
                              setUser({ ...user, otp: e.target.value })
                            }
                            className="OTPInput outline-none w-full focus:border-slate-200 border-spacing-1 border-slate-200 border-[0.5px] font-sans rounded"
                            
                          />
                          <input
                            type="button"
                            value="Verify"
                            onClick={onVerifyOtp}
                            className="btn-secondary verify sm:pr-0 py-2 border-[1px] text-xl sm:text-sm sm:scale-[1] font-bold font-sans rounded"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Password  */}
                  <div className="signUpPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={user.password}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div id="registerImage" className="mt-6">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className=""
                    />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Register"
                    className="signUpBtn bg-[#ee3131] text-white text-xl sm:text-sm sm:scale-[1] font-bold font-sans rounded"
                  />
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
