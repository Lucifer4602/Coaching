import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { update } from "@/redux/FormSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CourseDetails = () => {
  const form = useSelector((state) => state?.form?.FormData);
  const userId = useSelector((state) => state?.form?.FormData?._id);
  const id = useSelector((state) => state?.form?.FormData?.c_id);
  const authToken = useSelector((state) => state?.form?.FormData?.authToken);
  const [courseDetails, setCourseDetails] = useState(null);
  const [sum, setSum] = useState(0);
  const [wish, setWish] = useState(false);
  const [inCart, setInCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/course/getCourse`,
          {
            params: { courseId: id },
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const fetchedCourseDetails = response.data.data.courseDetails;
        setCourseDetails(fetchedCourseDetails);

        const subsectionSum = fetchedCourseDetails.courseContent.reduce(
          (total, item) => total + item.subsection.length,
          0
        );
        setSum(subsectionSum);

        checkWishlistStatus();
        checkCartStatus();
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, authToken]);

  useEffect(() => {
    if (userId && id && authToken) {
      checkWishlistStatus();
      checkCartStatus();
    }
  }, [userId, id, authToken]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const checkWishlistStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/cart/checkWishlistStatus`,
        {
          params: { userId, courseId: id },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setWish(response.data.isInWishlist);
    } catch (error) {
      console.error("Error checking wishlist status:", error);
    }
  };

  const checkCartStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/cart/checkCartStatus`,
        {
          params: { userId, courseId: id },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setInCart(response.data.isInCart);
    } catch (error) {
      console.error("Error checking cart status:", error);
    }
  };

  const wishlistHandler = async () => {
    try {
      if (wish) {
        await axios.delete(`http://localhost:3000/api/v1/cart/removeWishlist`, {
          params: { userId, courseId: id },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        setWish(false);
        toast.info("Removed from Wishlist");
      } else {
        await axios.post(
          `http://localhost:3000/api/v1/cart/addWishlist`,
          { userId, courseId: id },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setWish(true);
        toast.success("Added to Wishlist");
      }
    } catch (error) {
      console.error(
        "Error handling wishlist:",
        error.response?.data || error.message
      );
      toast.error("Failed to update Wishlist");
    }
  };

  const cartHandler = async () => {
    try {
      if (inCart) {
        await axios.delete(`http://localhost:3000/api/v1/cart/removeCart`, {
          params: { userId, courseId: id },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        setInCart(false);
        toast.info("Removed from Cart");
      } else {
        await axios.post(
          `http://localhost:3000/api/v1/cart/addCart`,
          { userId, courseId: id },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setInCart(true);
        toast.success("Added to Cart");
      }
    } catch (error) {
      console.error(
        "Error handling cart:",
        error.response?.data || error.message
      );
      toast.error("Failed to update Cart");
    }
  };

  const courseHandler = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/cart/addEnrolled`,
        { userId, courseId: id },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      toast.success("Successfully enrolled!");
    } catch (error) {
      console.error(
        "Error enrolling in course:",
        error.response?.data || error.message
      );
      toast.error("Failed to enroll in course");
    }
  };

  const name = courseDetails?.instructor
    ? `${courseDetails.instructor.firstName} ${courseDetails.instructor.lastName}`
    : "Instructor not available";

  const courses = courseDetails?.instructor?.courses.filter(
    (item) => item._id !== id
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 relative overflow-hidden">
      <Navbar />
      <div className="animated-background"></div>
      {courseDetails ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden relative z-10">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              {courseDetails.courseName}
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              {courseDetails.courseDescription}
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-600">
                {courseDetails.ratingAndReview.length} Ratings{" "}
                <span className="ml-2">
                  {courseDetails.studentsEnrolled.length} students Enrolled
                </span>
              </div>
              <div className="text-gray-600">Created By: {name}</div>
            </div>
            <div className="text-gray-600 mb-4">
              Created At: {formatTimestamp(courseDetails.createdAt)}
            </div>
            <div className="text-gray-600 mb-4">
              What You Will Learn: {courseDetails.whatIsThis}
            </div>
            <div className="text-gray-600 mb-4">
              Course Content: {courseDetails.courseContent.length} section(s){" "}
              <span>{sum} lecture(s)</span>
            </div>
            <div>
              {courseDetails.courseContent.map((item, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="cursor-pointer bg-gray-200 px-4 py-2 rounded-lg mb-2">
                    {item.sectionName}{" "}
                    <span className="ml-2">
                      {item.subsection.length} lecture(s)
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 py-2">
                    {item.subsection.map((sub, subIndex) => (
                      <div
                        key={subIndex}
                        className="text-gray-600 mb-2 overflow-hidden"
                      >
                        {sub.title} <span className="ml-2">{sub.duration}</span>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Avatar>
                    <AvatarImage
                      src={courseDetails.instructor?.image}
                      alt="Instructor"
                      className="rounded-full"
                    />
                  </Avatar>
                </div>
                <div>
                  <div className="text-xl font-semibold">{name}</div>
                  <div className="text-gray-600 mb-2">
                    {courseDetails.instructor?.additional?.about}
                  </div>
                </div>
              </div>
              <div className="text-gray-600 mb-4">
                <div>Review From Students:</div>
                {courseDetails.ratingAndReview.length === 0 ? (
                  <div className="mt-4 text-center">No Ratings Yet</div>
                ) : (
                  <div className="mt-4">
                    {courseDetails.ratingAndReview.map((review, index) => (
                      <div key={index} className="mb-2">
                        <div className="font-semibold">{review.title}</div>
                        <div className="text-gray-600">{review.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-gray-600 mb-4">
                <div>More Courses by {name}:</div>
                <div className="flex flex-wrap m-4">
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <button
                        key={course._id}
                        className="course-card overflow-hidden rounded-lg shadow-lg mr-4 mb-4 relative transform transition duration-500 hover:scale-105"
                        onClick={() => {
                          dispatch(update({ ...form, c_id: course._id }));
                          navigate("/CourseDetails");
                        }}
                      >
                        <div className="overflow-hidden rounded-lg shadow-lg">
                          <img
                            src={course.thumbnail}
                            alt="Course Thumbnail"
                            className="h-44 w-64 object-cover"
                          />
                        </div>
                        <div className="mt-2 text-lg font-semibold">
                          {course.courseName}
                        </div>
                        <div className="text-gray-600 mb-2">{name}</div>
                        <div className="text-gray-600 mb-2">
                          {course.ratingAndReview.length} Ratings
                        </div>
                        <div className="text-gray-600">{course.price}</div>
                      </button>
                    ))
                  ) : (
                    <div>No courses found</div>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={cartHandler}
                  className="mx-2 transform transition duration-500 hover:scale-105"
                >
                  {inCart ? "Remove from Cart" : "Add to Cart"}
                </Button>
                <Button
                  variant="outline"
                  onClick={wishlistHandler}
                  className="mx-2 transform transition duration-500 hover:scale-105"
                >
                  {wish ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
                <Button
                  variant="outline"
                  onClick={courseHandler}
                  className="mx-2 transform transition duration-500 hover:scale-105"
                >
                  Buy
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">Loading...</div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};
