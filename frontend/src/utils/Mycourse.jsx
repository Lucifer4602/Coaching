import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Pnav } from "./ProfileComp/Pnav";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "@/redux/FormSlice";

export const Mycourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const formData = useSelector((state) => state?.form?.FormData);
  const authToken = formData?.authToken;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/course/getInstructorCourses",
          {
            params: { id: formData?._id },
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (authToken && formData?._id) {
      fetchCourses();
    }
  }, [authToken, formData?._id]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const deleteHandler = async (courseId) => {
    try {
      await axios.delete("http://localhost:3000/api/v1/course/deleteCourse", {
        params: { courseId },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      console.log("Error deleting course:", error);
    }
  };

  const editHandler = async (courseId) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/course/getCourse",

        {
          params: { courseId: courseId },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const x = response.data.data.courseDetails;
      // console.log(response.data);

      dispatch(update({ ...formData, resp: x }));
      navigate("/editCourse");
    } catch (error) {
      console.log("Error editing course:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <Separator className="bg-slate-900" />
      <div className="flex flex-row h-screen">
        <Pnav />
        <div className="w-[80%] bg-slate-900">
          <div className="mt-12 flex justify-between items-center">
            <div className="text-white text-xl font-bold">My Courses</div>
            <Button onClick={() => navigate("/add-course")}>Add Course</Button>
          </div>
          <ScrollArea className="h-[80vh] w-[70%] mx-auto mt-8 p-4 overflow-y-auto">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course._id} className="text-white mb-4">
                  <img src={course.thumbnail} alt="Course Thumbnail" />
                  <div>{course.courseName}</div>
                  <div>{course.courseDescription}</div>
                  <div>Price: {course.price}</div>
                  <div>Created At: {formatTimestamp(course.createdAt)}</div>
                  <div>
                    <Button onClick={() => editHandler(course._id)}>
                      Edit
                    </Button>
                    <Button onClick={() => deleteHandler(course._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white">No courses found.</div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
