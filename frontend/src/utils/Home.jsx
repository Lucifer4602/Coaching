import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "./Navbar";
import { Button } from "../components/ui/button";
import axios from "axios";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const Home = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const auth = select.auth;
  const [reviews, setReviews] = useState([]);
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

  const handleBecomeInstructor = () => {
    if (auth) {
      window.location.href = "/profile";
    } else {
      window.location.href = "/signUp";
    }
  };

  const handleLearnMore = () => {
    if (auth) {
      window.location.href = "/profile";
    } else {
      window.location.href = "/signUp";
    }
  };

  const handleBookDemo = () => {
    if (auth) {
      window.location.href = "/profile";
    } else {
      window.location.href = "/login";
    }
  };

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

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden h-full">
      <Navbar />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="absolute inset-0 overflow-hidden"></div>
        <div className="relative text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 z-10">
            Empower your Future with Coding Skills
          </h1>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </p>
          <Button onClick={handleBecomeInstructor}>Become an Instructor</Button>
          <div className="mt-6 space-x-4">
            <Button onClick={handleLearnMore}>Learn More</Button>
            <Button onClick={handleBookDemo}>Book Demo</Button>
          </div>
        </div>

        <div className="relative mt-12">
          <div className="absolute inset-0 bg-[#314e80] opacity-50 blur-2xl"></div>
          <video
            loop
            muted
            autoPlay
            type="video/mp4"
            src="https://cdn.pixabay.com/video/2015/10/16/1058-142621439_large.mp4"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          ></video>
        </div>
      </div>

      <div className="relative bg-gray-900 h-full w-full mt-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-30"></div>
          <div className="absolute inset-0 bg-[#314e80] blur-[20px]"></div>
          <video
            loop
            muted
            autoPlay
            type="video/mp4"
            src="https://cdn.pixabay.com/video/2021/09/09/87910-602074402_large.mp4"
            className="w-full h-full object-cover"
          ></video>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-left text-white">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">
              Transform your Coding Skills
            </h2>
            <p className="text-left max-w-2xl text-lg mb-20">
              Dive into our comprehensive courses designed to boost your career.
              Learn practical skills through real-world projects and expert
              mentorship.
            </p>
          </div>

          <div className="text-center text-white mt-8">
            <h2 className="text-3xl font-extrabold mb-4">
              Get the Skills you need for a Job that is in demand
            </h2>
            <p className="max-w-2xl mx-auto text-lg mb-20">
              Go ahead, give it a try. Our hands-on learning environment means
              you'll be writing real code from your very first lesson.
            </p>
          </div>
          <div className="text-right text-white mt-8">
            <Button onClick={handleLearnMore} className="text-right">
              Explore Courses
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <video
              loop
              muted
              autoPlay
              type="video/mp4"
              src="https://cdn.pixabay.com/video/2019/10/09/27706-365890968_tiny.mp4"
              className="rounded-lg shadow-lg h-full w-full"
            ></video>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
            <p className="text-lg mb-4">
              Our courses are designed by industry experts to provide you with
              hands-on experience and practical skills that are directly
              applicable in today's tech industry.
            </p>
            <ul className="list-disc pl-6">
              <li className="mb-2">Hands-on projects and coding exercises.</li>
              <li className="mb-2">Expert-led video tutorials.</li>
              <li className="mb-2">Personalized feedback and support.</li>
              <li className="mb-2">Flexible learning schedules.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-11/12 mt-4 flex justify-center items-center overflow-x-scroll scrollbar-hide mx-10">
        <div className="flex flex-no-wrap overflow-x-scroll scrolling-touch scrollbar-hide items-start mb-8 ">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-gray-800 bg-opacity-80 p-4 m-2 rounded-lg shadow-md flex flex-col gap-2 backdrop-blur-lg mr-8"
            >
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage
                    src={review.user.image}
                    alt={review.user.firstName}
                    className="w-10 h-10 rounded-full"
                  />
                </Avatar>
                <div>{review.user.firstName + " " + review.user.lastName}</div>
              </div>
              <div className="font-semibold">{review.review}</div>
              <div className="text-gray-300">
                {renderStarRating(review.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative bg-gray-900 mt-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-30"></div>
          <div className="absolute inset-0 bg-[#314e80] blur-[20px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">
              Join Our Community
            </h2>
            <p className="max-w-2xl mx-auto text-lg mb-8">
              Connect with fellow learners, share insights, and collaborate on
              projects. Our community is here to support your learning journey.
            </p>
            <Button onClick={handleBookDemo}>Join Now</Button>
          </div>
          <div className="text-center text-white mt-8">
            Made with love by Achyut*Nit Jalandhar
          </div>
        </div>
      </div>
    </div>
  );
};
