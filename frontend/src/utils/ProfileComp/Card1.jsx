import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "@/redux/FormSlice";

export const Card1 = ({ tag, value }) => {
  const select = useSelector((state) => state?.form?.FormData);
  const form = useSelector((state) => state?.form?.FormData?.courses);
  const data =
    value === "true"
      ? form.filter((item) => item.tag.name.toLowerCase() === tag.toLowerCase())
      : form.filter(
          (item) => item.tag.name.toLowerCase() !== tag.toLowerCase()
        );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
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
                {item.ratingAndReview.length} Ratings
              </div>
              <div className="text-gray-600 mb-2">{item.price}</div>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};
