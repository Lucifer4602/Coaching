import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSelector } from "react-redux";
import axios from "axios";

export const Search = () => {
  const select = useSelector((state) => state?.form?.FormData);
  // console.log(select);
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
      // console.log(courseId, authToken, select._id);
      const response = await axios.post(
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
      console.log(response);
    } catch (error) {
      console.error("Error moving to wishlist:", error);
    }
  };

  const calculateTotalDuration = (sections) => {
    let totalDuration = 0;
    let totalSubsections = 0;

    sections.forEach((section) => {
      section.subsection.forEach((sub) => {
        // console.log(sub);
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
    <div className="flex flex-col h-screen">
      <Navbar className="sticky top-0 left-0 right-0 z-10" />
      <Separator className="bg-slate-900" />
      <div className="flex flex-1">
        <div className="flex-1 bg-slate-900 overflow-hidden">
          <ScrollArea className="h-full overflow-y-auto">
            {courses.length > 0 ? (
              <div>
                {courses.map((item) => {
                  const { totalDuration, totalSubsections } =
                    calculateTotalDuration(item.courseContent);
                  return (
                    <div
                      key={item._id}
                      className="p-4 border-b border-gray-700"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.thumbnail}
                          alt={item.courseName}
                          className="w-32 h-32 object-cover"
                        />
                        <div className="flex flex-col justify-between">
                          <div>
                            <div className="text-xl font-bold">
                              {item.courseName}
                            </div>
                            <div className="text-gray-400">
                              {item.ratingAndReview.length} Ratings
                            </div>
                          </div>
                          <div className="text-gray-400">
                            Price: ₹{item.price}
                          </div>
                          <div className="text-gray-400">
                            Total Duration: {totalDuration} seconds
                          </div>
                          <div className="text-gray-400">
                            Total Subsections: {totalSubsections}
                          </div>
                          <button
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
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
              <div className="p-4">
                Sorry, no courses are available with the query "{query}"
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
