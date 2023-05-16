import React, { Fragment, useRef, useState, useEffect } from "react";
import "../../styles/LoginSignUp.scss";
import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Register_Mobile from "./Register_Mobile";

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
  const [otpVerified, setOtpVerified] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "user",
    address: "",
    dealershipName: "",
    verifyButton: false,
    verifyOtp: false,
    otp: "",
  });

  const { name, email, password, mobile, role, address, dealershipName } = user;

  const [avatar, setAvatar] = useState("/Images/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Images/Profile.png");

  const handleOtpVerification = () => {
    setOtpVerified(true);
  };

  // Login Submition

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  // Register Submition

  const registerSubmit = (e) => {
    e.preventDefault(); // prevent default form submission
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    myForm.set("mobile", mobile);
    myForm.set("role", role);
    myForm.set("address", address);
    myForm.set("dealershipName", dealershipName);

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
  const [showForm, setShowForm] = useState(false);

  const showFormComponent = () => {
    setShowForm(true);
  };

  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    setActiveTab(tab);
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      if (registerTab.current) {
        registerTab.current.classList.remove("shiftToNeutralForm");
      }

      if (loginTab.current) {
        loginTab.current.classList.remove("shiftToLeft");
      }
    }

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      if (registerTab.current) {
        registerTab.current.classList.add("shiftToNeutralForm");
      }

      if (loginTab.current) {
        loginTab.current.classList.add("shiftToLeft");
      }
    }
  };

  return (
    <Fragment>
      {loading &&
      !"./Images/user-action-bg.jpg" &&
      !"./Images/monitoring-login.png" ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer pt-[50px] flex justify-center">
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

                {/* login  */}
                {activeTab === "login" && (
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
                )}

                {/* signup or Register  */}
                {activeTab === "register" && showForm ? (
                  <form
                    className="signUpForm sm:h-[400px] xs:px-6 flex flex-col gap-2 mt-[6rem] sm:mt-[120px]"
                    ref={registerTab}
                    encType="multipart/form-data"
                    onSubmit={registerSubmit}
                  >
                    {/* Name input */}
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

                    {/* Email input */}
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
                    {/* Role input */}
                    <div className="signUpRole">
                      <select
                        name="role"
                        value={user.role}
                        onChange={registerDataChange}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      >
                        <option value="user" className="text-primary">
                          User
                        </option>
                        <option value="dealer" className="text-primary">
                          Dealer
                        </option>
                      </select>
                    </div>

                    {/* dealershipName  */}
                    {user.role === "dealer" && (
                      <div className="signUpDealershipName">
                        <MdDriveFileRenameOutline />
                        <input
                          type="text"
                          placeholder="Dealership Name"
                          required
                          name="dealershipName"
                          value={user.dealershipName}
                          onChange={registerDataChange}
                          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                      </div>
                    )}

                    {/* address input  */}
                    <div className="signUpAddress">
                      <textarea 
                        type="text"
                        placeholder="Address"
                        required
                        name="address"
                        value={user.address}
                        onChange={registerDataChange}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>

                    {/* Password */}
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
                ) : (
                  activeTab === "register" && (
                    <div>
                      <Register_Mobile
                        onNext={showFormComponent}
                        user={user}
                        setUser={setUser}
                        onOtpVerification={handleOtpVerification}
                      />
                      <button
                        className="btn-next relative left-[160px]"
                        onClick={showFormComponent}
                        disabled={!otpVerified}
                      >
                        Next
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
