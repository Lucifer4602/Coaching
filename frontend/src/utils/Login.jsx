import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Navbar } from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { update } from "@/redux/FormSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const select = useSelector((state) => state?.form?.FormData);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        formData
      );
      const userId = response.data.user1._id;
      const authToken = response.data.token;
      const role = response.data.user1.role;

      const updated = {
        ...select,
        auth: "true",
        _id: userId,
        authToken: authToken,
        role: role,
      };
      dispatch(update(updated));
      navigate("/profile");
      toast.success("Login successful!");
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500">
      <Navbar />

      <div className="flex flex-col md:flex-row justify-center items-center h-full gap-32">
        <div className="ml-36"></div>
        <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0 flex flex-col items-center ">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome Back
            </h1>
            <p className="text-cyan-900 font-sans font-semibold text-lg">
              Build skills for today, tomorrow, and beyond.
              <span className="block text-blue-300 font-mono font-semibold">
                Education to future-proof your career.
              </span>
            </p>
          </motion.div>
          <form
            onSubmit={submit}
            className="w-full max-w-md p-4 md:p-8 bg-white rounded-lg shadow-md"
          >
            <label
              htmlFor="email"
              className="text-gray-800 font-mono font-bold text-lg"
            >
              Email<span className="text-red-600">*</span>
            </label>
            <Input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
            <label
              htmlFor="password"
              className="text-gray-800 font-mono font-bold text-lg"
            >
              Password<span className="text-red-600">*</span>
            </label>
            <Input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
            />
            <div className="text-blue-300 mb-4 text-right text-base">
              Forgot password?
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full text-white font-mono font-bold text-xl"
            >
              Sign In
            </Button>
          </form>
          <div className="mt-20 "></div>
        </div>

        <div className="relative md:w-1/2 lg:w-2/3 mt-8 md:mt-0 hidden md:block ">
          <div className="relative">
            <img
              src="https://static.student.com/storm-frontend-wp/uploads/2016/05/Study-Tips-and-Techniques-student-studyingV1.jpg"
              width="440px"
              className="relative mt-28 h-96 z-10"
              alt="Study Tips"
            />
            <img
              src="https://th.bing.com/th/id/OIP.QfVtbp3K9OYu_skQuNJi7AHaHa?rs=1&pid=ImgDetMain"
              width="440px"
              className="absolute top-3 left-3 h-96"
              alt="Study Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
