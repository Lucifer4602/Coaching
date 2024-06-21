import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "@/redux/FormSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

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
  const dispatch = useDispatch();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setFormData((prev) => ({ ...prev, role: tab }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/sendotp",
        formData
      );
      dispatch(update(formData));
      navigate("/verifyOtp");
      toast.success("Account created successfully! Please verify your email.");
    } catch (error) {
      console.error(error);
      toast.error("Signup failed. Please check your information.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black ">
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black w-full ">
        <Navbar />
        <div className="flex flex-col md:flex-row justify-center items-center h-full gap-8 px-6">
          <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <div className="font-bold text-4xl md:text-5xl text-white mb-7">
                Join the millions learning to code with Lucifer for free
              </div>
              <div className="text-cyan-900 font-sans font-semibold text-lg mb-4">
                Build skills for today, tomorrow, and beyond.
                <span className="block text-blue-300 font-mono font-semibold">
                  Education to future-proof your career.
                </span>
              </div>
            </motion.div>
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md p-4 md:p-8 bg-white rounded-lg shadow-md"
            >
              <Tabs defaultValue="student" className="w-full mb-4">
                <TabsList>
                  <TabsTrigger
                    value="student"
                    className={`text-lg ${
                      selectedTab === "student" && "active"
                    }`}
                    onClick={() => handleTabChange("student")}
                  >
                    Student
                  </TabsTrigger>
                  <TabsTrigger
                    value="instructor"
                    className={`text-lg ${
                      selectedTab === "instructor" && "active"
                    }`}
                    onClick={() => handleTabChange("instructor")}
                  >
                    Instructor
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-col md:flex-row gap-2">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="firstName"
                    className="text-gray-800 font-mono font-bold text-lg"
                  >
                    First Name<span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    required
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="lastName"
                    className="text-gray-800 font-mono font-bold text-lg"
                  >
                    Last Name<span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    required
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="text-gray-800 font-mono font-bold text-lg"
                >
                  Email<span className="text-red-600">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="flex flex-col md:flex-row flex-wrap gap-2 mt-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="password"
                    className="text-gray-800 font-mono font-bold text-lg"
                  >
                    Create Password<span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-gray-800 font-mono font-bold text-lg"
                  >
                    Confirm Password<span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full mt-6 font-mono font-bold text-xl"
              >
                Create Account
              </Button>
            </form>
            <div className="mt-32"></div>
          </div>

          <div className="flex flex-col md:w-1/2 lg:w-1/3 mt-8 md:mt-0 gap-10 justify-center">
            {/* First Video Background Section */}
            <div className="relative overflow-hidden w-full h-96 md:h-full">
              <video
                className="absolute inset-0 w-full h-full object-cover z-10"
                autoPlay
                loop
                muted
              >
                <source
                  src="https://cdn.pixabay.com/video/2020/04/21/36784-412873690_tiny.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
              <div className="relative z-30 text-center text-white p-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold"
                >
                  Learn with Us
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-lg md:text-xl mt-4"
                >
                  Build your future with our coding courses.
                </motion.div>
              </div>
            </div>

            <div className="relative overflow-hidden w-full h-96 md:h-full">
              <video
                className="absolute inset-0 w-full h-full object-cover z-10"
                autoPlay
                loop
                muted
              >
                <source
                  src="https://cdn.pixabay.com/video/2019/10/12/27816-366185131_tiny.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
              <div className="relative z-30 text-center text-white p-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold"
                >
                  Build with us
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-lg md:text-xl mt-4"
                >
                  Driving Innovation in Online Education for a Brighter Future
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
