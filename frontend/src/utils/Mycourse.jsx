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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.success("Courses fetched successfully");
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Error fetching courses");
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
      toast.success("Course deleted successfully");
    } catch (error) {
      console.log("Error deleting course:", error);
      toast.error("Error deleting course");
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
      dispatch(update({ ...formData, resp: x }));
      navigate("/editCourse");
      toast.success("Course details fetched successfully");
    } catch (error) {
      console.log("Error editing course:", error);
      toast.error("Error fetching course details");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Separator className="bg-slate-900" />
      <div className="flex flex-1 flex-row h-full">
        <Pnav />
        <div className="flex-1 bg-slate-900 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white text-xl font-bold">My Courses</div>
            <Button onClick={() => navigate("/add-course")}>Add Course</Button>
          </div>
          <ScrollArea className="h-[70vh] overflow-y-auto p-4">
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-gray-800 p-4 mb-4 rounded-lg"
                  >
                    <img
                      src={course.thumbnail}
                      alt="Course Thumbnail"
                      className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <div className="text-white text-lg font-semibold mb-2">
                      {course.courseName}
                    </div>
                    <div className="text-gray-400 mb-2">
                      {course.courseDescription}
                    </div>
                    <div className="text-gray-400 mb-2">
                      Price: {course.price}
                    </div>
                    <div className="text-gray-400 mb-4">
                      Created At: {formatTimestamp(course.createdAt)}
                    </div>
                    <div className="flex justify-between">
                      <Button onClick={() => editHandler(course._id)}>
                        Edit
                      </Button>
                      <Button onClick={() => deleteHandler(course._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-white">No courses found.</div>
            )}
          </ScrollArea>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
