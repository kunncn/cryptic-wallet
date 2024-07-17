import React from "react";
import { useState } from "react";
import { RequestOtpComponent, ResetPasswordComponent } from "../components";

const ResetPasswordPage = () => {
  const [showOtp, setShowOtp] = useState(true); // for showing two component in a page
  const [email, setEmail] = useState(""); // for UX purpose, after request otp, email will auto fill
  return showOtp ? (
    <RequestOtpComponent setShowOtp={setShowOtp} setEmail={setEmail} />
  ) : (
    <ResetPasswordComponent email={email} />
  );
};

export default ResetPasswordPage;
