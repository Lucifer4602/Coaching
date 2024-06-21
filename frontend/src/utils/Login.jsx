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
        "https://techflix-api-vfly.onrender.com/api/v1/auth/login",
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black ">
      <Navbar />

      <div className="flex flex-col md:flex-row justify-center items-center h-full gap-8 px-6">
        <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0 flex flex-col items-center">
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
              className="text-gray-800 font-mono font-bold text-lg mt-4"
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
              className="w-full font-mono font-bold text-xl"
            >
              Sign In
            </Button>
          </form>
        </div>
        <div className="relative md:w-1/2 lg:w-1/3 mt-8 md:mt-0 hidden md:block">
          <div className="relative overflow-hidden w-full h-full">
            <div className="relative overflow-hidden w-full h-96 md:h-full">
              <video
                className="absolute inset-0 w-full h-full object-cover z-10"
                autoPlay
                loop
                muted
              >
                <source
                  src="https://cdn.pixabay.com/video/2022/12/06/141858-778525394_tiny.mp4"
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
                  Explore the World of Coding
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-lg md:text-xl mt-4"
                >
                  Join our community and start learning today.
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
