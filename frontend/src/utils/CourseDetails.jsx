import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Navbar } from "./Navbar";
import { update } from "@/redux/FormSlice";

const Collapsible = ({ sectionName, subsection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full md:w-3/5 mb-4">
      <button
        className="bg-gray-200 px-4 py-2 rounded-lg border-b-2 border-gray-800 cursor-pointer w-full text-left flex items-center justify-between"
        onClick={toggleCollapse}
      >
        <div>
          {isOpen ? (
            <MdExpandLess className="text-xl" />
          ) : (
            <MdExpandMore className="text-xl" />
          )}
          <span className="ml-2">{sectionName}</span>
        </div>
        <span className="ml-2">{subsection?.length || 0} lecture(s)</span>
      </button>
      {isOpen && (
        <div className="px-4 py-2 grid gap-2">
          {subsection.map((sub, subIndex) => (
            <div
              key={subIndex}
              className="text-white flex items-center border border-gray-300 rounded-lg p-2"
            >
              <BsPlayFill className="text-blue-500 text-lg mr-2" />
              <div>{sub.title}</div>
              <span className="ml-2">{sub.duration}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CourseDetails = () => {
  const form = useSelector((state) => state?.form?.FormData);
  const userId = useSelector((state) => state?.form?.FormData?._id);
  const id = useSelector((state) => state?.form?.FormData?.c_id);
  const authToken = useSelector((state) => state?.form?.FormData?.authToken);
  const [courseDetails, setCourseDetails] = useState(null);
  const [sum, setSum] = useState(0);
  const [wish, setWish] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [courseRatings, setCourseRatings] = useState({});
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
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
          (total, item) => total + item?.subsection?.length,
          0
        );
        setSum(subsectionSum);

        fetchAverageRating(id);

        checkWishlistStatus();
        checkCartStatus();

        fetchAllReviews();
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

  useEffect(() => {
    if (courseDetails?.instructor?.courses) {
      courseDetails.instructor.courses.forEach((course) => {
        fetchAverageRating(course._id);
        fetchAllReviews();
      });
    }
  }, [courseDetails]);

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

  const fetchAverageRating = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/course/getAverageRating`,
        {
          params: { courseId },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCourseRatings({
        ...courseRatings,
        [courseId]: response.data.avgRating,
      });
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };

  const fetchAllReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/course/getReviews`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const allReviews = response.data.data;
      const filteredReviews = allReviews.filter(
        (review) => review.course._id === id
      );
      setReviews(filteredReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
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

  const name = courseDetails?.instructor
    ? `${courseDetails.instructor.firstName} ${courseDetails.instructor.lastName}`
    : "Instructor not available";

  return (
    <div className="w-full mx-auto relative bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <Navbar />
      {courseDetails ? (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 p-6">
            <div className="md:w-2/3 p-6 bg-gray-800 rounded-lg shadow-lg mb-8">
              <h2 className="text-4xl font-bold mb-4 text-white">
                {courseDetails.courseName}
              </h2>
              <p className="text-gray-400 mb-6">
                {courseDetails.courseDescription}
              </p>
              <div className="flex items-center justify-between mb-6">
                <div className="text-white text-lg">
                  {renderStarRating(courseRatings[id])}{" "}
                  <span className="text-gray-500">
                    {courseDetails.ratingAndReview.length} Ratings
                  </span>
                </div>
              </div>
              <div className="text-white mb-6">Created By: {name}</div>
              <div className="text-white mb-6">
                Created At: {formatTimestamp(courseDetails.createdAt)}
              </div>
            </div>

            <div className="text-gray-600 mb-4">
              <div className="text-white border border-white rounded-lg p-4 w-3/5">
                <div className="text-2xl font-bold mb-6 text-white">
                  What You Will Learn:
                </div>
                <div className="text-gray-300 mb-2">
                  {courseDetails.whatIsThis}
                </div>
              </div>
            </div>
            <div className="text-white font-bold text-2xl mb-4 mt-10">
              Course Content: <br />
              <span className="font-semibold text-lg">
                {courseDetails.courseContent?.length} section(s){" "}
                <span>{sum} lecture(s)</span>
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {courseDetails.courseContent?.map((item, index) => (
                <Collapsible
                  key={index}
                  sectionName={item.sectionName}
                  subsection={item.subsection}
                />
              ))}
            </div>
          </div>
          <div className="md:w-1/3 p-6 md:sticky md:top-0 bg-slate-800 rounded-xl">
            <img
              src={courseDetails.thumbnail}
              alt="Course Thumbnail"
              className="h-64 w-full object-cover mb-4 rounded-3xl"
            />
            <div className="flex text-white justify-between items-center mb-4">
              <div className="text-2xl">{"₹" + courseDetails.price}</div>
              <button
                onClick={wishlistHandler}
                className="flex bg-transparent text-white px-4 py-2 rounded-lg items-center hover:bg-transparent transition duration-300"
              >
                {wish ? (
                  <AiFillHeart className="text-xl mr-2 text-yellow-500" />
                ) : (
                  <AiOutlineHeart className="text-xl mr-2 text-gray-500" />
                )}
                <span className="text-sm">
                  {wish ? "Remove from Wishlist" : "Add to Wishlist"}
                </span>
              </button>
            </div>
            <div className="flex flex-col">
              <button
                onClick={cartHandler}
                className={`flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg mb-2 w-full justify-center hover:bg-gray-600 transition duration-300 ${
                  inCart ? "bg-red-500" : ""
                }`}
              >
                <AiOutlineShoppingCart className="text-xl mr-2" />
                <span>{inCart ? "Remove from Cart" : "Add to Cart"}</span>
              </button>

              <button
                onClick={courseHandler}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full justify-center hover:bg-gray-700 transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">Loading...</div>
      )}

      <div className="p-6">
        <div className="flex items-center mb-4">
          <div>
            <div className="text-xl font-semibold">{name}</div>
            <div className="text-gray-600 mb-2">
              {courseDetails?.instructor?.additional?.about}
            </div>
          </div>
        </div>
        <div className="text-gray-600 mb-4">
          <div
            id="reviews"
            className="text-white font-bold text-3xl mt-28 mb-20"
          >
            Review From Students:
          </div>

          {reviews?.length === 0 ? (
            <div className="mt-4 text-center font-semibold text-green-700 text-3xl">
              No Reviews Yet
            </div>
          ) : (
            <div className="mt-4 flex overflow-x-auto">
              <div
                className="flex"
                style={{
                  transform: `translateX(-${currentReviewIndex * 100}%)`,
                  transition: "transform 0.5s ease",
                }}
              >
                {reviews?.map((review, index) => (
                  <div
                    key={index}
                    className="min-w-max bg-gray-100 p-4 m-2 rounded-lg shadow-md flex flex-col gap-2"
                  >
                    <div className="flex gap-2 justify-center items-center">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          src={review.user.image}
                          alt={`${review.user.firstName} ${review.user.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        {review.user.firstName} {review.user.lastName}
                      </div>
                    </div>
                    <div className="font-semibold">{review.review}</div>
                    <div className="text-gray-600">
                      {renderStarRating(review.rating)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="text-gray-400 mb-4">
          <div className="text-white font-bold text-3xl mt-28 mb-20">
            More Courses by {name}:
          </div>
          <div className="flex flex-wrap m-4">
            {courseDetails?.instructor?.courses?.length > 0 ? (
              courseDetails.instructor.courses
                .filter((course) => course._id !== id) // Exclude current course
                .map((course) => (
                  <button
                    key={course._id}
                    className="flex flex-col items-center course-card overflow-hidden rounded-lg shadow-lg mr-4 mb-4 relative transform transition duration-500 hover:scale-105"
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
                    <div className="text-gray-400 mb-2 text-center">
                      {renderStarRating(courseRatings[course._id] || 0)}{" "}
                      {course.ratingAndReview.length} Ratings
                    </div>
                    <div className="text-gray-400">{"₹" + course.price}</div>
                  </button>
                ))
            ) : (
              <div className="mt-4 text-center font-semibold text-green-700 text-3xl">
                No courses found
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-32"></div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};
