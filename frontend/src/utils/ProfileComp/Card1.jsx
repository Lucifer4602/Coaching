import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "@/redux/FormSlice";
import axios from "axios";

export const Card1 = ({ tag, value }) => {
  const select = useSelector((state) => state?.form?.FormData);
  const form = useSelector((state) => state?.form?.FormData?.courses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchRatings = async () => {
      for (const item of form) {
        const rating = await fetchAverageRating(item._id);
        setRatings((prevRatings) => ({
          ...prevRatings,
          [item._id]: rating,
        }));
      }
    };

    if (form.length > 0) {
      fetchRatings();
    }
  }, [form]);

  const fetchAverageRating = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/course/getAverageRating`,
        {
          params: { courseId: courseId },
          headers: {
            Authorization: `Bearer ${select?.authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.avgRating;
    } catch (error) {
      console.error("Error fetching average rating:", error);
      return 0; // Return default value or handle error accordingly
    }
  };

  const filteredData =
    value === "true"
      ? form.filter((item) => item.tag.name.toLowerCase() === tag.toLowerCase())
      : form.filter(
          (item) => item.tag.name.toLowerCase() !== tag.toLowerCase()
        );

  return (
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
      {filteredData.map((item) => (
        <div
          key={item._id}
          className=" rounded-lg shadow-2xl overflow-hidden"
          style={{ minWidth: "280px", maxWidth: "320px" }}
        >
          <button
            className="w-full"
            onClick={() => {
              dispatch(update({ ...select, c_id: item._id }));
              navigate("/CourseDetails");
            }}
          >
            <img
              src={item.thumbnail}
              alt="Course Thumbnail"
              className="h-44 w-full object-cover"
            />
            <div className="p-4">
              <div className="font-semibold text-lg mb-2">
                {item.courseName}
              </div>
              <div className="text-gray-600 mb-2">
                {item.instructor
                  ? `${item.instructor.firstName} ${item.instructor.lastName}`
                  : "Instructor not available"}
              </div>
              <div className="text-gray-600 mb-2">
                {renderStarRating(ratings[item._id])}
                {"  "}
                {item.ratingAndReview.length}
                {" Ratings"}
              </div>
              <div className="text-gray-600 mb-2">Price: {item.price}</div>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
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
