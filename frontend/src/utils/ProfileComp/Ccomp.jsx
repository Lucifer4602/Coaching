import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { EditLectureDialog } from "./EditLectureDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomFileUploader from "./CustomFileUploader";
import { MdDeleteOutline } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";

export const Ccomp = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const authToken = select?.authToken;
  const navigate = useNavigate();

  const [course_id, setCourseId] = useState("");

  const fileTypes = ["jpg", "mp4", "jpeg"];
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    section: "",
    title: "",
    description: "",
    price: "",
    level: "",
    language: "",
    Ltitle: "",
    Ldescription: "",
    benefits: "",
    tag: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [sections, setSections] = useState([]);

  const [sectionId, setSectionId] = useState([]);
  const [subsectionId, setSubsectionId] = useState([]);
  const [editingSection, setEditingSection] = useState(null);

  const [activeSection, setActiveSection] = useState(null);

  const [lectures, setLectures] = useState([]);
  const [video, setVideo] = useState(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingLectureIndex, setEditingLectureIndex] = useState(null);
  const [editingLectureSectionIndex, setEditingLectureSectionIndex] =
    useState(null);

  const handler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file) => {
    setThumbnail(file);
  };

  const handleSubmit = async () => {
    try {
      navigate("/mycourse");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateSection = async () => {
    if (editingSection !== null) {
      const updatedSections = [...sections];
      updatedSections[editingSection] = data.section;

      try {
        const formData = new FormData();
        formData.append("sectionName", data.section);
        formData.append("sectionId", sectionId[editingSection]);
        formData.append("courseId", course_id);
        await axios.put(
          "http://localhost:3000/api/v1/course/updateSection",
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSections(updatedSections);
        setEditingSection(null);
        toast.success("Section updated successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to update section!");
      }
    } else {
      setSections((prevSections) => [...prevSections, data.section]);
      try {
        const formData = new FormData();
        formData.append("sectionName", data.section);
        formData.append("courseId", course_id);
        const response = await axios.post(
          "http://localhost:3000/api/v1/course/addSection",
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const sec = response.data.newSection._id;
        setSectionId((prev) => [...prev, sec]);
        toast.success("Section created successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to create section!");
      }
    }
    setData({ ...data, section: "" });
  };

  const handleEditSection = (index) => {
    setEditingSection(index);
    setData({ ...data, section: sections[index] });
  };

  const handleDeleteSection = async (index) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/v1/course/deleteSection",
        {
          params: {
            sectionId: sectionId[index],
            courseId: course_id,
          },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSections((prevSections) => prevSections.filter((_, i) => i !== index));
      setSectionId((prevSectionId) =>
        prevSectionId.filter((_, i) => i !== index)
      );
      toast.success("Section deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete section!");
    }
  };

  const handleSaveLecture = async (i) => {
    const newLecture = {
      Ltitle: data.Ltitle,
      Ldescription: data.Ldescription,
    };
    const updatedLectures = [...lectures];
    if (updatedLectures[activeSection]) {
      updatedLectures[activeSection].push(newLecture);
    } else {
      updatedLectures[activeSection] = [newLecture];
    }
    try {
      const formData = new FormData();
      formData.append("sectionId", sectionId[i]);
      formData.append("title", data.Ltitle);
      formData.append("body", data.Ldescription);
      formData.append("duration", "23");
      formData.append("videoFile", video);
      const response = await axios.post(
        "http://localhost:3000/api/v1/course/addSubSection",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newsubsectionId = {
        _id: response.data.updatedSection.subsection[
          response.data.updatedSection.subsection.length - 1
        ]._id,
      };

      const values = [...subsectionId];

      if (Array.isArray(values[activeSection])) {
        values[activeSection].push(newsubsectionId);
      } else {
        values[activeSection] = [newsubsectionId];
      }

      setSubsectionId(values);
      toast.success("Lecture added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add lecture!");
    }
    setLectures(updatedLectures);
    setData({ ...data, Ltitle: "", Ldescription: "" });
  };

  const handleEditLecture = async (sectionIndex, lectureIndex) => {
    const lecture = lectures[sectionIndex][lectureIndex];
    setData({
      ...data,
      Ltitle: lecture.Ltitle,
      Ldescription: lecture.Ldescription,
    });
    setEditingLectureIndex(lectureIndex);
    setEditingLectureSectionIndex(sectionIndex);
    setIsEditDialogOpen(true);
  };

  const handleDeleteLecture = async (sectionIndex, lectureIndex) => {
    try {
      const updatedLectures = [...lectures];
      const y = subsectionId[sectionIndex][lectureIndex]._id;

      await axios.delete(
        `http://localhost:3000/api/v1/course/deleteSubSection`,
        {
          params: {
            subsectionId: y,
            sectionId: sectionId[sectionIndex],
          },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      updatedLectures[sectionIndex].splice(lectureIndex, 1);
      setLectures(updatedLectures);
      const updates = [...subsectionId];
      updates[sectionIndex].splice(lectureIndex, 1);
      setSubsectionId(updates);
      toast.success("Lecture deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete lecture!");
    }
  };

  const handleSaveEditedLecture = async () => {
    const updatedLectures = [...lectures];
    updatedLectures[editingLectureSectionIndex][editingLectureIndex] = {
      Ltitle: data.Ltitle,
      Ldescription: data.Ldescription,
    };
    try {
      const formData = new FormData();
      formData.append(
        "subsectionId",
        subsectionId[editingLectureSectionIndex][editingLectureIndex]._id
      );
      formData.append("title", data.Ltitle);
      formData.append("body", data.Ldescription);
      formData.append("duration", "23");
      formData.append("videoFile", video);

      const response = await axios.put(
        `http://localhost:3000/api/v1/course/updateSubSection`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSubsectionId(response.data.updateSubSection._id);
      toast.success("Lecture updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update lecture!");
    }
    setLectures(updatedLectures);
    setData({ ...data, Ltitle: "", Ldescription: "" });
    setIsEditDialogOpen(false);
  };

  const saveHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("courseName", data.title);
      formData.append("courseDescription", data.description);
      formData.append("whatIsThis", data.benefits);
      formData.append("tag", "666db07fdbe97a8ec048bed7");
      formData.append("price", data.price);
      if (thumbnail) {
        formData.append("thumbnailImage", thumbnail);
      }

      const response = await axios.post(
        "http://localhost:3000/api/v1/course/createCourse",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const courseId = response.data.data._id;
      setCourseId(courseId);
      toast.success("Course created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create course!");
    }
    setStep(step + 1);
  };

  return (
    <div className="overflow-scroll overflow-x-hidden overflow-y-hidden">
      <div className="font-bold text-4xl text-white mb-6">Add a Course</div>

      <Card className="w-4/5 mx-auto">
        <CardContent className={step === 1 ? "block" : "hidden"}>
          <label
            htmlFor="title"
            className="text-gray-800 font-mono font-bold text-lg mb-1"
          >
            Course Title<span className="text-red-600">*</span>
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            value={data.title}
            onChange={handler}
            className="border-2 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter course title"
          />
        </CardContent>

        <CardContent className={step === 1 ? "block" : "hidden"}>
          <label
            htmlFor="description"
            className="text-gray-800 font-mono font-bold text-lg mb-1"
          >
            Course Description<span className="text-red-600">*</span>
          </label>
          <textarea
            rows="4"
            id="description"
            name="description"
            value={data.description}
            onChange={handler}
            className="border-2 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter course description"
          />
        </CardContent>

        <CardContent className={step === 1 ? "block" : "hidden"}>
          <label
            htmlFor="price"
            className="text-gray-800 font-mono font-bold text-lg mb-1"
          >
            Course Price<span className="text-red-600">*</span>
          </label>
          <Input
            type="text"
            id="price"
            name="price"
            value={data.price}
            onChange={handler}
            className="border-2 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter course price"
          />
        </CardContent>

        <CardContent className={step === 1 ? "block" : "hidden"}>
          <label
            htmlFor="level"
            className="text-gray-800 font-mono font-bold text-lg mb-1"
          >
            Course Level<span className="text-red-600">*</span>
          </label>
          <Select
            onValueChange={(value) =>
              setData((prev) => ({ ...prev, level: value }))
            }
            className="w-[180px] border-2 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="advance">Advance</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>

        <CardContent className={step === 1 ? "block" : "hidden"}>
          <label
            htmlFor="language"
            className="text-gray-800 font-mono font-bold text-lg mb-1"
          >
            Course Language<span className="text-red-600">*</span>
          </label>
          <Select
            onValueChange={(value) =>
              setData((prev) => ({ ...prev, language: value }))
            }
            className="w-[180px] border-2 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="english">English</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>

        <CardContent className={step === 1 ? "block" : "hidden"}>
          <label
            htmlFor="tag"
            className="text-gray-800 font-mono font-bold text-lg mb-1"
          >
            Tags<span className="text-red-600">*</span>
          </label>
          <Input
            type="text"
            id="tag"
            name="tag"
            value={data.tag}
            onChange={handler}
            className="border-2 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter category"
          />
        </CardContent>

        <CardContent className={step === 1 ? "block" : "hidden"}>
          <label className="text-gray-800 font-mono font-bold text-lg mb-1">
            Course Thumbnail<span className="text-red-600">*</span>
          </label>
          <CustomFileUploader
            name="file"
            types={fileTypes}
            className="border-2 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            handleChange={handleFileChange}
          />
        </CardContent>

        <CardContent className={step === 1 ? "block" : "hidden"}>
          <label
            htmlFor="benefits"
            className="text-gray-800 font-mono font-bold text-lg mb-1"
          >
            Course Benefits<span className="text-red-600">*</span>
          </label>
          <textarea
            rows="4"
            id="benefits"
            name="benefits"
            value={data.benefits}
            onChange={handler}
            className="border-2 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter course benefits"
          />
        </CardContent>

        <CardContent className={step === 1 ? "block" : "hidden"}>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-20"
            onClick={saveHandler}
          >
            Save <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </CardContent>

        <CardContent className={step === 2 ? "block" : "hidden"}>
          <div className="text-gray-800 font-mono font-bold text-lg mb-4">
            Course Builder
          </div>
        </CardContent>

        <CardContent className={step === 2 ? "block" : "hidden"}>
          <div className="border-gray-950 border-2 p-4">
            <label
              htmlFor="section"
              className="text-gray-800 font-mono font-bold text-lg mb-1"
            >
              Section Name<span className="text-red-600">*</span>
            </label>
            <Input
              type="text"
              id="section"
              name="section"
              value={data.section}
              onChange={handler}
              className="border-2 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter section name"
            />
          </div>
          <div className="mt-6"></div>
          <Button onClick={handleCreateSection}>Create Section</Button>
        </CardContent>

        {sections.map((section, index) => (
          <CardContent key={index}>
            <Collapsible className="relative mb-4 border-b border-gray-300">
              <CollapsibleTrigger className="flex flex-col md:flex-row justify-between items-start md:items-center w-full px-6 py-4 relative bg-gray-100 hover:bg-gray-200">
                <div
                  className="flex items-center gap-3 w-full"
                  onClick={() => setActiveSection(index)}
                >
                  <FaList className="text-gray-600" />
                  <span className="text-gray-800 font-mono text-lg">
                    {section}
                  </span>
                </div>
              </CollapsibleTrigger>

              <div className="absolute top-4 right-3 flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => handleEditSection(index)}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <AiOutlineEdit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteSection(index)}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <MdDeleteOutline size={20} />
                </button>
              </div>

              <CollapsibleContent className="ml-10 mt-3">
                {(lectures[index] || []).map((lecture, lectureIndex) => (
                  <div
                    key={lectureIndex}
                    className="relative mt-4 border-b border-gray-300 pb-4"
                  >
                    <div className="text-gray-800 font-mono font-semibold">
                      {lecture.Ltitle}
                    </div>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEditLecture(index, lectureIndex)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <AiOutlineEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteLecture(index, lectureIndex)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <MdDeleteOutline size={20} />
                      </button>
                    </div>
                  </div>
                ))}

                <Dialog>
                  <DialogTrigger className="text-gray-800 font-mono font-bold text-lg mt-4">
                    Add Lecture
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="text-gray-800 font-mono font-bold text-lg mb-4">
                      Adding Lecture
                    </DialogHeader>
                    <div className="mb-4">
                      <label
                        htmlFor="Ltitle"
                        className="block text-gray-800 font-mono font-bold text-lg mb-1"
                      >
                        Lecture Title
                      </label>
                      <Input
                        type="text"
                        id="Ltitle"
                        name="Ltitle"
                        value={data.Ltitle}
                        onChange={handler}
                        className="border-2 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="Ldescription"
                        className="block text-gray-800 font-mono font-bold text-lg mb-1"
                      >
                        Lecture Description
                      </label>
                      <textarea
                        id="Ldescription"
                        rows="4"
                        name="Ldescription"
                        value={data.Ldescription}
                        onChange={handler}
                        className="border-2 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-800 font-mono font-bold text-lg mb-1">
                        Lecture Video
                      </label>
                      <CustomFileUploader
                        name="file"
                        types={fileTypes}
                        className="border-2 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        handleChange={(file) => setVideo(file)}
                      />
                    </div>
                    <DialogClose
                      onClick={() => handleSaveLecture(index)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Save
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        ))}

        <CardContent>
          {step < 2 && step > 1 && (
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-20"
              onClick={() => setStep(step + 1)}
            >
              Next <ChevronRightIcon className="h-4 w-4" />
            </Button>
          )}

          {step === 2 && (
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-20"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
        </CardContent>
        <div className="mt-16"></div>
      </Card>

      <EditLectureDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setData({ ...data, Ltitle: "", Ldescription: "" });
          setIsEditDialogOpen(false);
        }}
        onSave={handleSaveEditedLecture}
        lectureData={{ Ltitle: data.Ltitle, Ldescription: data.Ldescription }}
        onChange={handler}
        fileTypes={fileTypes}
        xyz={(file) => setVideo(file)}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="mt-24"></div>
    </div>
  );
};
