import React from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import app from "../firebase_config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useAlert } from "react-alert";

const Register_Mobile = ({user, setUser, onOtpVerification }) => {

  const alert = useAlert();

 

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
      onOtpVerification(true); // Invoke the callback function with success flag
    })
    .catch((error) => {
      alert.error("Invalid OTP");
      onOtpVerification(false); // Invoke the callback function with failure flag
    });
};

 const mobileChange = (e) => {
   setUser({ ...user, mobile: e.target.value });
 };

  return (
    <div>
      {/* Mobile input */}
      <div className="signUpMobile flex flex-col px-4 sm:h-[330px] h-[280px] mt-[10px]">
        <PhoneIcon className="top-[3.4rem] left-[1.1rem] relative text-slate-500" />
        <input
          type="text"
          placeholder="Mobile"
          required
          name="mobile"
          value={user.mobile}
          onChange={mobileChange}
          className="mobileInput pl-[50px] border-[#c3c2c2] border-[1px] focus:border-[1px] focus:border-[#999] py-4 bg-white mt-3"
        />
        {user.mobile && user.mobile.length === 10 ? (
          <input
            type="button"
            value="Send OTP"
            className="signUpBtn sm:p-4 verify sm:pr-0 bg-[#b9b5b500] mb-4 text-[#ee3131] text-xl sm:scale-[1] font-bold font-sans rounded"
            onClick={onSignInSubmit}
          />
        ) : null}
        {/* OTP Verification */}
        <div className="signup-field">
          <div className="signUpOTP flex flex-col">
            <input
              type="number"
              placeholder="OTP"
              onChange={(e) => setUser({ ...user, otp: e.target.value })}
              className="OTPInput border-[#c3c2c2] border-[1px] mt-3 focus:border-[1px] focus:border-[#999] p-4 bg-white"
            />
            <input
              type="button"
              value="Verify"
              onClick={onVerifyOtp}
              className="signUpBtn sm:p-4 verify sm:pr-0 bg-[#b9b5b500] text-[#ee3131] sm:text-xl sm:scale-[1] font-bold font-sans rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register_Mobile;
