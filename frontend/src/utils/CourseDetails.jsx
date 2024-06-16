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

        // Calculate the sum of all subsections
        const subsectionSum = fetchedCourseDetails.courseContent.reduce(
          (total, item) => total + item.subsection.length,
          0
        );
        setSum(subsectionSum);

        // Check wishlist and cart status
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
    // Update wish and inCart states when userId, id, or authToken changes
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
        console.log("Removing from wishlist");
        await axios.delete(`http://localhost:3000/api/v1/cart/removeWishlist`, {
          params: {
            userId: userId,
            courseId: id,
          },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        setWish(false);
      } else {
        console.log("Adding to wishlist");
        await axios.post(
          `http://localhost:3000/api/v1/cart/addWishlist`,
          {
            userId: userId,
            courseId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setWish(true);
      }
    } catch (error) {
      console.error(
        "Error handling wishlist:",
        error.response?.data || error.message
      );
    }
  };

  const cartHandler = async () => {
    try {
      if (inCart) {
        console.log("Removing from cart");
        await axios.delete(`http://localhost:3000/api/v1/cart/removeCart`, {
          params: {
            userId: userId,
            courseId: id,
          },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        setInCart(false);
      } else {
        console.log("Adding to cart");
        await axios.post(
          `http://localhost:3000/api/v1/cart/addCart`,
          {
            userId: userId,
            courseId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setInCart(true);
      }
    } catch (error) {
      console.error(
        "Error handling cart:",
        error.response?.data || error.message
      );
    }
  };

  const courses = courseDetails?.instructor?.courses.filter(
    (item) => item._id !== id
  );

  return (
    <div>
      <Navbar />
      {courseDetails ? (
        <>
          <div>{courseDetails.courseName}</div>
          <div>{courseDetails.courseDescription}</div>
          <div>
            {courseDetails.ratingAndReview.length + " Ratings"}{" "}
            <span>
              {courseDetails.studentsEnrolled.length + " students Enrolled"}
            </span>
          </div>
          <div>
            {"Created By : " +
              courseDetails.instructor?.firstName +
              " " +
              courseDetails.instructor?.lastName}
          </div>
          <div>Created At: {formatTimestamp(courseDetails.createdAt)}</div>
          <div>What You Will Learn</div>
          <div>{courseDetails.whatIsThis}</div>
          <div>Course Content</div>
          <div>
            {courseDetails.courseContent.length + " section(s)"}{" "}
            <span>{sum + " lecture(s)"}</span>
          </div>
          <div>
            {courseDetails.courseContent.map((item, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger>
                  {item.sectionName}{" "}
                  <span>{item.subsection.length + " lecture(s)"}</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {item.subsection.map((sub, subIndex) => (
                    <div key={subIndex}>
                      {sub.title} <span>{sub.duration}</span>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          <div>Author</div>

          <div>
            <Avatar>
              <AvatarImage
                src={courseDetails.instructor.image}
                alt="Instructor"
              />
            </Avatar>
            <span>
              {courseDetails.instructor?.firstName +
                " " +
                courseDetails.instructor?.lastName}
            </span>
          </div>

          <div>{courseDetails.instructor?.additional?.about}</div>

          <div>
            <div>Review From Students</div>
            {courseDetails.ratingAndReview.length === 0 ? (
              <>No Ratings Till now</>
            ) : (
              <>need to do work</>
            )}
          </div>

          <div>
            <div>
              {"More Courses by " +
                courseDetails.instructor?.firstName +
                " " +
                courseDetails.instructor?.lastName}
            </div>
            <div>
              {courses ? (
                courses.map((Item) => (
                  <button
                    key={Item._id}
                    className="m-4 w-72 h-72"
                    onClick={() => {
                      dispatch(update({ ...form, c_id: Item._id }));
                      navigate("/CourseDetails");
                    }}
                  >
                    <div>
                      <img
                        src={Item.thumbnail}
                        alt="Course Thumbnail"
                        className="h-44 w-72 rounded-lg backdrop-blur-sm"
                      />
                    </div>
                    <div>{Item.courseName}</div>
                    <div>
                      {Item.instructor.firstName +
                        " " +
                        Item.instructor.lastName}
                    </div>
                    <div>{Item.ratingAndReview.length + " Ratings"}</div>
                    <div>{Item.price}</div>
                  </button>
                ))
              ) : (
                <div>No courses found</div>
              )}
            </div>
          </div>

          <div>
            <Button variant="outline" onClick={cartHandler}>
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </Button>
            <Button variant="outline" onClick={wishlistHandler}>
              {wish ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
