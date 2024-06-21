import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { update } from "@/redux/FormSlice";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const query = select.query;
  const [courses, setCourses] = useState([]);
  const authToken = useSelector((state) => state?.form?.FormData?.authToken);
  const [ratings, setRatings] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/course/search?q=${query}`
        );
        setCourses(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [query]);

  useEffect(() => {
    // Fetch average ratings for all courses in search results
    const fetchRatings = async () => {
      for (const course of courses) {
        const rating = await fetchAverageRating(course._id);
        setRatings((prevRatings) => ({
          ...prevRatings,
          [course._id]: rating,
        }));
      }
    };

    if (courses.length > 0) {
      fetchRatings();
    }
  }, [courses]);

  const fetchAverageRating = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/course/getAverageRating`,
        {
          params: { courseId: courseId },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.avgRating; // Assuming the API returns avgRating field
    } catch (error) {
      console.error("Error fetching average rating:", error);
      return 0; // Return default value or handle error accordingly
    }
  };

  const handleSaveForLater = async (courseId) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/cart/addWishlist`,
        {
          userId: select._id,
          courseId: courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Item moved to wishlist");
      toast.success("Item saved for later successfully");
    } catch (error) {
      console.error("Error moving to wishlist:", error);
      toast.error("Failed to save item for later");
    }
  };

  const calculateTotalDuration = (sections) => {
    let totalDuration = 0;
    let totalSubsections = 0;

    sections.forEach((section) => {
      section.subsection.forEach((sub) => {
        totalDuration += parseInt(sub.duration);
        totalSubsections += 1;
      });
    });

    return {
      totalDuration: totalDuration,
      totalSubsections,
    };
  };

  const renderStarRating = (courseId) => {
    if (ratings[courseId] === undefined) {
      return <div>Loading...</div>;
    }

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= ratings[courseId]) {
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar className="sticky top-0 z-10" />
      <Separator className="bg-slate-700 px-6" />
      <div className="flex-1 bg-slate-900 overflow-hidden">
        <ScrollArea className="h-full overflow-y-auto p-4">
          {courses.length > 0 ? (
            <div className="space-y-6">
              {courses.map((item) => {
                const { totalDuration, totalSubsections } =
                  calculateTotalDuration(item.courseContent);
                return (
                  <div
                    key={item._id}
                    className="bg-slate-800 p-6 rounded-lg shadow-lg"
                  >
                    <div className="flex items-center space-x-6">
                      <img
                        src={item.thumbnail}
                        alt={item.courseName}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <Button
                          className="bg-transparent"
                          onClick={() => {
                            dispatch(update({ ...select, c_id: item._id }));
                            navigate("/CourseDetails");
                          }}
                        >
                          <h2 className="text-2xl font-bold text-white">
                            {item.courseName}
                          </h2>
                        </Button>
                        <p className="text-gray-400">
                          {item.ratingAndReview.length} Ratings
                        </p>
                        <p className="text-gray-400">Price: ₹{item.price}</p>
                        <p className="text-gray-400">
                          Total Duration: {totalDuration} seconds
                        </p>
                        <p className="text-gray-400">
                          Total Subsections: {totalSubsections}
                        </p>
                        <button
                          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          onClick={() => handleSaveForLater(item._id)}
                        >
                          Save for Later
                        </button>

                        <div className="mt-2">
                          {renderStarRating(item._id)}
                          {"  "}
                          {item.ratingAndReview.length}
                          {" Ratings"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-gray-400">
              Sorry, no courses are available with the query "{query}"
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};
