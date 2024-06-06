import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Navbar } from "./Navbar";
export const Home = () => {
  return (
    <div className="bg-gray-900">
      <Navbar></Navbar>
      <Button> Become a Instructor</Button>
      <div>Empower your Future with Coding Skills</div>
      <div>
        With our online coding courses, you can learn at your own pace, from
        anywhere in the world, and get access to a wealth of<br></br> resources,
        including hands-on projects, quizzes, and personalized feedback from
        instructors.
      </div>
      <Button>Learn More</Button>
      <Button>Book Demo</Button>
      <div className="flex  items-center justify-center relative">
        <div className="bg-white absolute z-0 w-[82%] h-[700px] mt-6 ml-6"></div>
        <div className="bg-[#314e80] absolute z-0  blur-[20px] w-[80%] h-[700px] "></div>
        <video
          loop
          muted
          autoPlay
          type="video/mp4"
          src="https://cdn.pixabay.com/video/2015/10/16/1058-142621439_large.mp4"
          className=" w-[95%] h-[700px] z-20"
        ></video>
      </div>
    </div>
  );
};
