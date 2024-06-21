import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    message: "",
    phoneNumber: "",
  });

  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://techflix-api-vfly.onrender.com/api/v1/contact/form",
        formData
      );
      // console.log("Form submitted successfully", response.data);
      toast({
        title: "Form successfully submitted",
      });
    } catch (error) {
      console.error("Error submitting form", error);
      toast({
        title: "Failed !!!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-black min-h-screen ">
      <Navbar />
      <Separator className="bg-slate-700" />
      <div className="flex items-center justify-center py-16 relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 max-w-2xl px-4 w-[30%]"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-white">
            We'd love to hear from you. Fill out the form below and we'll get
            back to you as soon as possible.
          </p>
        </motion.div>
      </div>
      <div className="flex flex-col md:flex-row items-start justify-center space-y-8 md:space-y-0 md:space-x-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full md:w-1/2 bg-gray-800 bg-opacity-80 rounded-lg shadow-md p-8 backdrop-blur-lg">
          <h2 className="text-2xl font-bold mb-4 text-indigo-400">
            Chat with Us
          </h2>
          <p className="text-gray-300 mb-6">
            Our friendly team is here to help.
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-2xl text-indigo-400" />
              <div>
                <h3 className="text-lg font-semibold text-indigo-400">
                  Email Us
                </h3>
                <p className="text-gray-300">dummymailer4602@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-2xl text-indigo-400" />
              <div>
                <h3 className="text-lg font-semibold text-indigo-400">
                  Visit Us
                </h3>
                <p className="text-gray-300">MBh-F Nit Jalandhar</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone className="text-2xl text-indigo-400" />
              <div>
                <h3 className="text-lg font-semibold text-indigo-400">
                  Call Us
                </h3>
                <p className="text-gray-300">+123 456 7869</p>
                <p className="text-gray-300">Mon - Fri From 8am to 5pm</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-gray-800 bg-opacity-80 rounded-lg shadow-md p-8 backdrop-blur-lg">
          <ScrollArea className="h-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-sm text-white">
                  First Name
                </label>
                <motion.input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-500 text-base bg-gray-900 focus:outline-none focus:border-indigo-400"
                  whileFocus={{ scale: 1.05 }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-sm text-white">
                  Last Name
                </label>
                <motion.input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-500 text-base bg-gray-900 focus:outline-none focus:border-indigo-400"
                  whileFocus={{ scale: 1.05 }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm text-white">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-500 text-base bg-gray-900 focus:outline-none focus:border-indigo-400"
                  whileFocus={{ scale: 1.05 }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="text-sm text-white">
                  Phone Number (+91)
                </label>
                <motion.input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number (+91)"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-500 text-base bg-gray-900 focus:outline-none focus:border-indigo-400"
                  whileFocus={{ scale: 1.05 }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="text-sm text-white">
                  Your Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-500 text-base resize-none bg-gray-900 focus:outline-none focus:border-indigo-400"
                  whileFocus={{ scale: 1.05 }}
                ></motion.textarea>
              </div>
              <motion.button
                type="submit"
                className="p-3 bg-indigo-400 text-white rounded cursor-pointer text-base hover:bg-indigo-500"
                whileHover={{ scale: 1.05 }}
              >
                Submit
              </motion.button>
            </form>
          </ScrollArea>
        </div>
      </div>
      <div className="mt-20"></div>
    </div>
  );
};
