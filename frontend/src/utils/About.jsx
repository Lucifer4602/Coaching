import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export const About = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    message: "",
    phoneNumber: "",
  });

  const [reviews, setReviews] = useState([]);
  const { toast } = useToast();

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const response = await axios.get(
          `https://techflix-api-vfly.onrender.com/api/v1/course/getReviews`
        );

        const allReviews = response.data.data;
        setReviews(allReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchAllReviews();
  }, []);

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="text-yellow-500">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }
    return stars;
  };

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
    <div className=" overflow-hidden bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <Navbar />
      <Separator className="bg-slate-700" />
      <div className="flex flex-col items-center justify-center py-16 relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 max-w-2xl px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Founding Story
          </h1>
          <p className="text-gray-300 mb-6">
            Our e-learning platform was born out of a shared vision and passion
            for transforming education. It all began with a group of educators,
            technologists, and lifelong learners who recognized the need for
            accessible, flexible, and high-quality learning opportunities in a
            rapidly evolving digital world.
          </p>
          <p className="text-gray-300 mb-6">
            As experienced educators ourselves, we witnessed firsthand the
            limitations and challenges of traditional education systems. We
            believed that education should not be confined to the walls of a
            classroom or restricted by geographical boundaries. We envisioned a
            platform that could bridge these gaps and empower individuals from
            all walks of life to unlock their full potential.
          </p>

          <div className="flex flex-col md:flex-row md:gap-8 mb-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white p-2 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-300 mb-6">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white  p-2 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-300 mb-6">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </motion.div>

        <ScrollArea className="overflow-scroll overflow-y-hidden overflow-x-hidden">
          <div className="w-full max-w-4xl  mb-10">
            <h2 className="text-3xl font-bold text-indigo-400 mb-4 text-center">
              What Our Learners Say
            </h2>
            <div className="mt-4 flex overflow-x-auto  scrollbar-hide">
              <div
                className="flex overflow-x-auto scrollbar-hide"
                style={{
                  transform: `translateX(-${currentReviewIndex * 100}%)`,
                  transition: "transform 0.5s ease",
                }}
              >
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="min-w-max bg-gray-800 bg-opacity-80 p-4 m-2 rounded-lg shadow-md flex flex-col gap-2 backdrop-blur-lg"
                  >
                    <div className="flex gap-2 justify-center items-center">
                      <div>
                        <Avatar>
                          <AvatarImage
                            src={review.user.image}
                            alt={review.user.firstName}
                          />
                        </Avatar>
                      </div>
                      <div>
                        {review.user.firstName + " " + review.user.lastName}
                      </div>
                    </div>
                    <div className="font-semibold">{review.review}</div>
                    <div className="text-gray-300">
                      {renderStarRating(review.rating)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full max-w-4xl bg-gray-800 bg-opacity-80 rounded-lg shadow-md p-8 backdrop-blur-lg">
          <ScrollArea className="h-full">
            <h2 className="text-3xl font-bold text-indigo-400 mb-4">
              Get in Touch
            </h2>
            <div className="bg-gray-700 bg-opacity-80 p-8 rounded-lg">
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
                    className="p-3 rounded border border-gray-500 bg-gray-900 text-base focus:outline-none focus:border-indigo-400"
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
                    className="p-3 rounded border border-gray-500 bg-gray-900 text-base focus:outline-none focus:border-indigo-400"
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
                    className="p-3 rounded border border-gray-500 bg-gray-900 text-base focus:outline-none focus:border-indigo-400"
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
                    className="p-3 rounded border border-gray-500 bg-gray-900 text-base focus:outline-none focus:border-indigo-400"
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
                    className="p-3 rounded border border-gray-500 bg-gray-900 text-base resize-none focus:outline-none focus:border-indigo-400"
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
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
