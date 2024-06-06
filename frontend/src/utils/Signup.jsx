import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "@/redux/FormSlice";

export const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("student");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setFormData((prev) => ({ ...prev, role: tab }));
  };

  const handler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const dispatch = useDispatch();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/sendotp",
        formData
      );
      dispatch(update(formData));
      navigate("/verifyOtp");
    } catch (error) {
      console.error(error);
    }

    // Add ur form submission logic here
  };

  return (
    <div>
      <div className="h-screen w-screen bg-gray-800">
        <Navbar></Navbar>
        <div className="flex flex-row justify-evenly gap-10 ">
          <div className="mt-28 flex flex-col gap-1">
            <div className="font-bold text-4xl text-white w-full mb-7">
              Join the millions learning to <br></br>code with Lucifer for free
            </div>
            <div className="text-cyan-900 font-sans font-semibold text-xl mb-4">
              Build skills for today, tomorrow, and beyond.
              <span className="text-blue-300 font-mono font-semibold">
                Education<br></br> to future-proof your career.
              </span>
            </div>
            <form onSubmit={submit}>
              <Tabs defaultValue="student" className="w-[400px]">
                <TabsList>
                  <TabsTrigger
                    value="student"
                    className={`text-lg ${
                      selectedTab === "student" && "active"
                    }`}
                    onClick={() => handleTabChange("student")}
                  >
                    student
                  </TabsTrigger>
                  <TabsTrigger
                    value="instructor"
                    className={`text-lg ${
                      selectedTab === "instructor" && "active"
                    }`}
                    onClick={() => handleTabChange("instructor")}
                  >
                    instructor
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-row gap-2 justify-start">
                <div className="flex flex-col justify-start gap-2 w-full">
                  <label
                    htmlFor="firstName"
                    className="text-white font-mono font-bold text-base"
                  >
                    First Name<span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Fname"
                    required
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handler}
                  ></Input>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="lastName"
                    className="text-white font-mono font-bold text-base"
                  >
                    Last Name<span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Lname"
                    required
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handler}
                  ></Input>
                </div>
              </div>
              <div className="mt-2 mb-2">
                <label
                  htmlFor="email"
                  className="text-white font-mono font-bold text-base"
                >
                  Email<span className="text-red-600">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="email"
                  required
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handler}
                ></Input>
              </div>
              <div className="flex flex-row gap-2 justify-start">
                <div className="flex flex-col justify-start gap-2 w-full">
                  <label
                    htmlFor="password"
                    className="text-white font-mono font-bold text-base"
                  >
                    Create Password<span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="password"
                    required
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handler}
                  ></Input>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="confirmPassword"
                    className="text-white font-mono font-bold text-base"
                  >
                    Confirm Password<span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="password"
                    required
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handler}
                  ></Input>
                </div>
              </div>

              <Button
                type="submit"
                variant="ghost"
                className="text-white font-mono font-bold text-xl"
              >
                Create Account
              </Button>
            </form>
          </div>

          <div className="relative">
            <div className="relative">
              <img
                src="https://th.bing.com/th/id/OIP.bjpuVFr7I-ezRBgsZOjGVAAAAA?pid=ImgDet&w=207&h=207&c=7&dpr=1.3"
                width="400px"
                className="relative mt-28 h-96 z-10"
                alt="Image1"
              />
              <img
                src="https://th.bing.com/th/id/OIP.QfVtbp3K9OYu_skQuNJi7AHaHa?rs=1&pid=ImgDetMain"
                width="400px"
                className="absolute top-3 left-3 h-96 "
                alt="Image2"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
