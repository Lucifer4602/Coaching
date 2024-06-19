import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player";
import Rating from "react-rating-stars-component";
import axios from "axios";

export const ViewCourse = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const enrolledCourse = select.enrolled;

  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [openSectionIndex, setOpenSectionIndex] = useState(-1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleVideoClick = (sub) => {
    setSelectedVideoUrl(sub.videoUrl);
    setSelectedSubsection({ name: sub.title, desc: sub.body });
  };

  const toggleSection = (index) => {
    setOpenSectionIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleReviewSubmit = async () => {
    try {
      const x = rating.toString();
      const response = await axios.post(
        "http://localhost:3000/api/v1/course/createRating",
        {
          rating: x,
          review: review,
          courseId: enrolledCourse._id,
          userId: select._id,
        },
        {
          headers: {
            Authorization: `Bearer ${select.authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsDialogOpen(false);
      console.log("Review submitted:", response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Separator className="bg-slate-900" />
      <div className="flex flex-1">
        <div className="w-full md:w-1/4 bg-slate-900 overflow-hidden">
          <ScrollArea className="h-full overflow-y-auto">
            <div className="mx-4">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-20">
                <h1 className="text-3xl font-semibold text-white mb-4">
                  {enrolledCourse.courseName}
                </h1>
                <div>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Add Review
                  </Button>
                </div>
              </div>
              <Separator className="bg-yellow-100 mb-4" />
              <div>
                {enrolledCourse.courseContent.map((section, index) => (
                  <div key={index}>
                    <div
                      className="cursor-pointer flex items-center justify-between"
                      onClick={() => toggleSection(index)}
                    >
                      <span className="text-lg font-medium text-white">
                        {section.sectionName}
                      </span>
                      <span className="text-sm text-gray-400">
                        {section.subsection.length} lecture(s)
                      </span>
                    </div>
                    {openSectionIndex === index && (
                      <div className="pt-2">
                        {section.subsection.map((sub, subIndex) => (
                          <Button
                            key={subIndex}
                            className="w-full mb-2 rounded-lg overflow-hidden h-20"
                            onClick={() => handleVideoClick(sub)}
                          >
                            <div className="flex items-center p-3">
                              <div className="ml-3">
                                <h3 className="text-lg font-medium text-white">
                                  {sub.title}
                                </h3>
                                <p className="text-gray-400">
                                  Duration: {sub.duration} seconds
                                </p>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
        <div className="w-full md:w-3/4 bg-black text-white relative">
          {selectedVideoUrl && (
            <>
              <ReactPlayer
                url={selectedVideoUrl}
                controls
                width="100%"
                height="80%"
                playing
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 },
                  },
                  vimeo: {
                    playerOptions: { controls: true },
                  },
                }}
                className="absolute top-0 left-0"
              />
              <div className="p-4 mt-16 absolute bottom-0">
                <h3 className="text-lg font-medium text-white">
                  {selectedSubsection.name}
                </h3>
                <p className="text-gray-400">{selectedSubsection.desc}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add a Review</h2>
            <Rating
              count={5}
              size={24}
              activeColor="#ffd700"
              value={rating}
              onChange={(newRating) => setRating(newRating)}
            />
            <textarea
              className="w-full mt-4 p-2 border rounded"
              rows="4"
              placeholder="Write your review here"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4">
              <Button className="mr-2" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleReviewSubmit}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
