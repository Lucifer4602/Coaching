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
  const formData = useSelector((state) => state.form.FormData);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const submitHandler = async () => {
    const updatedForm = { ...formData, otp: otp };
    console.log(updatedForm);
    try {
      await axios.post("http://localhost:3000/api/v1/auth/signup", updatedForm);
      dispatch(update(updatedForm));
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-800 w-screen h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-start mt-36 gap-4 ml-[40%]">
        <div className="font-bold text-4xl text-white w-full">Verify Email</div>
        <div className="text-blue-300 font-mono font-semibold">
          A verification code has been sent to you. Enter the <br />
          code below
        </div>
        <div className="h-[100%] w-[100%] text-white pl-[11%] pt-[5%]">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value);
            }}
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

        <Button variant="outline" className="ml-[18%]" onClick={submitHandler}>
          Verify Email
        </Button>
        <div className="flex flex-row justify-evenly gap-64 mt-[1%]">
          <Button
            variant="ghost"
            className="text-white"
            onClick={() => {
              navigate("/signUp");
            }}
          >
            Back to Login
          </Button>
          <Button
            variant="ghost"
            className="text-blue-200"
            onClick={async () => {
              try {
                await axios.post(
                  "http://localhost:3000/api/v1/auth/sendotp",
                  formData
                );
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Resend
          </Button>
        </div>
      </div>
    </div>
  );
};
