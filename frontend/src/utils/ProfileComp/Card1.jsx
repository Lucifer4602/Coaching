import { update } from "@/redux/FormSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Card1 = ({ tag, value }) => {
  const select = useSelector((state) => state?.form?.FormData);
  const form = useSelector((state) => state?.form?.FormData?.courses);
  // console.log(select);
  const data =
    value === "true"
      ? form.filter(
          (value) => value.tag.name.toLowerCase() === tag.toLowerCase()
        )
      : form.filter(
          (value) => value.tag.name.toLowerCase() !== tag.toLowerCase()
        );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      {data.map((Item) => {
        return (
          <button
            key={Item._id}
            className="m-4 w-72 h-72"
            onClick={() => {
              dispatch(update({ ...select, c_id: Item._id }));
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
              {Item.instructor
                ? `${Item.instructor.firstName} ${Item.instructor.lastName}`
                : "Instructor not available"}
            </div>
            <div>{Item.ratingAndReview.length + " Ratings"}</div>
            <div>{Item.price}</div>
          </button>
        );
      })}
    </div>
  );
};
