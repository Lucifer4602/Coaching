import React from "react";
import { useSelector } from "react-redux";
import { Navbar } from "./Navbar";
import { Button } from "../components/ui/button";

export const Home = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const auth = select.auth;

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

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
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
      </div>

      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-30"></div>
          <div className="absolute inset-0 bg-[#314e80] blur-[20px]"></div>
          <video
            loop
            muted
            autoPlay
            type="video/mp4"
            src="https://cdn.pixabay.com/video/2015/10/16/1058-142621439_large.mp4" // Replace with your desired video link
            className="w-full h-full object-cover"
          ></video>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-white">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">
              Transform your Coding Skills
            </h2>
            <p className="max-w-2xl mx-auto text-lg mb-8">
              Dive into our comprehensive courses designed to boost your career.
              Learn practical skills through real-world projects and expert
              mentorship.
            </p>
            <Button onClick={handleLearnMore}>Explore Courses</Button>
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
              src="https://cdn.pixabay.com/video/2017/11/28/10/49/code-2983429_1280.mp4" // Replace with another video link if needed
              className="rounded-lg shadow-lg"
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

      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-30"></div>
          <div className="absolute inset-0 bg-[#314e80] blur-[20px]"></div>
          {/* Add another engaging element here */}
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
        </div>
      </div>
    </div>
  );
};
