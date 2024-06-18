import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Separator } from "../components/ui/separator";
import { Pnav } from "./ProfileComp/Pnav";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { update } from "@/redux/FormSlice";

export const EnrolledCourses = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const authToken = select?.authToken;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/profile/getUserDetails`,
          {
            params: { id: select?._id },
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.data.courses);
        setEnrolled(response.data.data.courses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (select?._id && authToken) {
      fetchData();
    }
  }, [select?._id, authToken]);

  const calculateTotalDuration = (sections) => {
    let totalDuration = 0;

    sections.forEach((section) => {
      section.subsection.forEach((sub) => {
        totalDuration += parseInt(sub.duration);
      });
    });
    return totalDuration;
  };

  const handler = (item) => {
    dispatch(update({ ...select, enrolled: item }));
    navigate("/view-course");
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Separator className="bg-slate-900" />
      <div className="flex flex-row flex-grow overflow-hidden">
        <Pnav />
        <div className="flex-grow bg-slate-900">
          <ScrollArea className="h-full w-full overflow-auto p-6">
            <div className="text-white text-2xl mb-6">Enrolled Courses</div>
            {enrolled.map((item, index) => (
              <div
                key={index}
                className="mb-6 max-w-xl mx-auto bg-gray-800 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <Button
                  variant="outline"
                  className="flex items-start w-full p-4 bg-transparent border-none cursor-pointer h-full"
                  onClick={() => handler(item)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.courseName}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <div className="text-xl font-bold mb-1 text-white">
                      {item.courseName}
                    </div>
                    <div className="mb-2 text-white">
                      {item.courseDescription}
                    </div>
                    <div className="text-sm text-gray-400">
                      {calculateTotalDuration(item.courseContent)} seconds
                    </div>
                  </div>
                </Button>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
