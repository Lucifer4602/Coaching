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

export const CourseDetails = () => {
  const form = useSelector((state) => state?.form?.FormData);
  const id = useSelector((state) => state?.form?.FormData?.c_id);
  const authToken = useSelector((state) => state?.form?.FormData?.authToken);
  const [courseDetails, setCourseDetails] = useState(null);
  const [sum, setSum] = useState(0);
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

        // console.log(fetchedCourseDetails);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, authToken]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const courses = courseDetails?.instructor?.courses.filter(
    (item) => item._id != id
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
              <AvatarImage src={courseDetails.instructor.image} alt="@" />
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
            {courseDetails.ratingAndReview.length == 0 ? (
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
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
