import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSelector } from "react-redux";
import axios from "axios";

export const Search = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const query = select.query;
  const [courses, setCourses] = useState([]);
  const authToken = useSelector((state) => state?.form?.FormData?.authToken);

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
    } catch (error) {
      console.error("Error moving to wishlist:", error);
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

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <Navbar className="sticky top-0 z-10" />
      <Separator className="bg-slate-800" />
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
                        <h2 className="text-2xl font-bold text-white">
                          {item.courseName}
                        </h2>
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
