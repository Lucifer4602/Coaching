import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

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
        "http://localhost:3000/api/v1/contact/form",
        formData
      );
      console.log("Form submitted successfully", response.data);
      toast({
        title: "Form successfuly submitted",
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
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-500 to-indigo-600 min-h-screen">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600 to-indigo-700 animate-gradient-xy"></div>
      </div>
      <Navbar />
      <Separator className="bg-slate-900" />
      <div className="flex flex-col items-center justify-center py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 max-w-2xl px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-white">
            We'd love to hear from you. Fill out the form below and we'll get
            back to you as soon as possible.
          </p>
        </motion.div>
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
          <ScrollArea className="h-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-sm text-gray-800">
                  First Name
                </label>
                <motion.input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-300 text-base focus:outline-none focus:border-blue-600"
                  whileFocus={{ scale: 1.05 }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-sm text-gray-800">
                  Last Name
                </label>
                <motion.input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-300 text-base focus:outline-none focus:border-blue-600"
                  whileFocus={{ scale: 1.05 }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm text-gray-800">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-300 text-base focus:outline-none focus:border-blue-600"
                  whileFocus={{ scale: 1.05 }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="text-sm text-gray-800">
                  Phone Number (+91)
                </label>
                <motion.input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number (+91)"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-300 text-base focus:outline-none focus:border-blue-600"
                  whileFocus={{ scale: 1.05 }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="text-sm text-gray-800">
                  Your Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="p-3 rounded border border-gray-300 text-base resize-none focus:outline-none focus:border-blue-600"
                  whileFocus={{ scale: 1.05 }}
                ></motion.textarea>
              </div>
              <motion.button
                type="submit"
                className="p-3 bg-blue-600 text-white rounded cursor-pointer text-base hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
              >
                Submit
              </motion.button>
            </form>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
