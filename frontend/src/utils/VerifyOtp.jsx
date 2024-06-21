import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Navbar } from "./Navbar";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { update } from "@/redux/FormSlice";

export const VerifyOtp = () => {
  const navigate = useNavigate();
  const formData = useSelector((state) => state?.form?.FormData);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000); // Clear message after 3 seconds
  };

  const submitHandler = async () => {
    const updatedForm = { ...formData, otp: otp };
    try {
      await axios.post(
        "https://techflix-api-vfly.onrender.com/api/v1/auth/signup",
        updatedForm
      );
      dispatch(update(updatedForm));
      navigate("/login");
    } catch (error) {
      console.error(error);
      showToast("Failed to verify OTP. Please try again.");
    }
  };

  const resendOTP = async () => {
    try {
      await axios.post(
        "https://techflix-api-vfly.onrender.com/api/v1/auth/sendotp",
        formData
      );
      showToast("OTP resent successfully.");
    } catch (error) {
      console.error(error);
      showToast("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <Navbar />
      <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex flex-col justify-center items-center px-6">
        <div className="flex flex-col justify-center items-center mt-10 md:mt-24 gap-4">
          <div className="font-bold text-4xl text-white">Verify Email</div>
          <div className="text-blue-300 font-mono font-semibold text-center">
            A verification code has been sent to you. Enter the code below
          </div>
          <div className="mt-6 w-full max-w-xs md:max-w-md">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                }}
                className="w-full max-w-xs md:max-w-md"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <Button
            variant="outline"
            className="mt-6 md:mt-8"
            onClick={submitHandler}
          >
            Verify Email
          </Button>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Back to Signup
            </Button>
            <Button
              variant="ghost"
              className="text-blue-200"
              onClick={resendOTP}
            >
              Resend
            </Button>
          </div>

          {/* Toast Message */}
          {toastMessage && (
            <div className="fixed bottom-4 right-4 bg-white p-2 rounded shadow-lg">
              {toastMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
