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
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center h-full gap-8">
        <div className="ml-16"></div>
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
                  className={`text-lg ${selectedTab === "student" && "active"}`}
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

            <div className="flex flex-row  gap-2">
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

            <div className="flex flex-row flex-wrap gap-2 mt-4">
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
              className="w-full mt-6 text-white font-mono font-bold text-xl"
            >
              Create Account
            </Button>
          </form>
          <div className="mt-10"></div>
        </div>

        {/* Responsive Image Section */}
        <div className="relative md:ml-8 hidden md:block">
          <div className="relative">
            <img
              src="https://th.bing.com/th/id/OIP.bjpuVFr7I-ezRBgsZOjGVAAAAA?pid=ImgDet&w=207&h=207&c=7&dpr=1.3"
              width="500px"
              className="relative mt-28 h-96 z-10"
              alt="Image1"
            />
            <img
              src="https://th.bing.com/th/id/OIP.QfVtbp3K9OYu_skQuNJi7AHaHa?rs=1&pid=ImgDetMain"
              width="500px"
              className="absolute top-3 left-3 h-96"
              alt="Image2"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
