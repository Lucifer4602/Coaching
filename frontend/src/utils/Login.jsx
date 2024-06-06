import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Navbar } from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { update } from "@/redux/FormSlice";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const dispatch = useDispatch();
  const select = useSelector((state) => state.form.FormData);
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        formData
      );
      const userId = response.data.user1._id;
      const authToken = response.data.token;

      const updated = {
        ...select,
        auth: "true",
        _id: userId,
        authToken: authToken,
      };
      dispatch(update(updated));
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-800">
      <Navbar />
      <div className="flex flex-row justify-around">
        <div className="mt-28 flex flex-col gap-1">
          <div className="font-bold text-4xl text-white w-full mb-7">
            Welcome Back
          </div>
          <div className="text-cyan-900 font-sans font-semibold text-xl">
            Build skills for today, tomorrow, and beyond.
            <span className="text-blue-300 font-mono font-semibold">
              Education
              <br /> to future-proof your career.
            </span>
          </div>
          <form onSubmit={submit}>
            <label
              htmlFor="email"
              className="text-white font-mono font-bold text-lg"
            >
              Email<span className="text-red-600">*</span>
            </label>
            <Input
              type="email"
              placeholder="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label
              htmlFor="password"
              className="text-white font-mono font-bold text-lg"
            >
              Password<span className="text-red-600">*</span>
            </label>
            <Input
              type="password"
              placeholder="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="text-blue-300 mb-4 text-right text-base">
              forget password?
            </div>
            <Button
              type="submit"
              variant="ghost"
              className="text-white font-mono font-bold text-xl"
            >
              Sign In
            </Button>
          </form>
        </div>

        <div className="relative">
          <div className="relative">
            <img
              src="https://static.student.com/storm-frontend-wp/uploads/2016/05/Study-Tips-and-Techniques-student-studyingV1.jpg"
              width="400px"
              className="relative mt-28 h-96 z-10"
            />
            <img
              src="https://th.bing.com/th/id/OIP.QfVtbp3K9OYu_skQuNJi7AHaHa?rs=1&pid=ImgDetMain"
              width="400px"
              className="absolute top-3 left-3 h-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
