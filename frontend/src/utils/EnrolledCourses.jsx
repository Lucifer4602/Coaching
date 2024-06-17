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
        // console.log(sub);
        totalDuration += parseInt(sub.duration);
      });
    });
    return {
      totalDuration: totalDuration,
    };
  };

  const handler = (e) => {
    dispatch(update({ ...select, enrolled: e }));
    navigate("/view-course");
  };

  return (
    <div>
      <Navbar />
      <Separator className="bg-slate-900" />
      <div className="flex flex-row h-screen">
        <Pnav />
        <div className="w-[80%] bg-slate-900">
          <ScrollArea className="h-[100%] w-[70%] mx-auto">
            <div>EnrolledCourses</div>
            {enrolled.map((item) => {
              const { totalDuration } = calculateTotalDuration(
                item.courseContent
              );
              return (
                <Button
                  variant="outline"
                  className="h-28 w-auto"
                  onClick={() => handler(item)}
                >
                  <div>
                    <img src={item.thumbnail}></img>
                  </div>
                  <div>{item.courseName}</div>
                  <div>{item.courseDescription}</div>
                  <div>{totalDuration + " seconds"}</div>
                </Button>
              );
            })}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
