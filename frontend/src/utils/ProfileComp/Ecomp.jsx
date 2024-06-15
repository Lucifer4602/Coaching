import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navbar } from "../Navbar";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Pnav } from "./Pnav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag } from "../../hooks/Tag";
import Usetag from "../../hooks/Usetag";
import { FileUploader } from "react-drag-drop-files";
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
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditLectureDialog = ({
  isOpen,
  onClose,
  onSave,
  lectureData,
  onChange,
  fileTypes,
  xyz,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>Editing Lecture</DialogHeader>
      <div>
        <label htmlFor="editLtitle">Lecture Title</label>
        <Input
          type="text"
          id="editLtitle"
          name="Ltitle"
          value={lectureData.Ltitle}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="editLdescription">Lecture Description</label>
        <textarea
          id="editLdescription"
          rows="4"
          cols="50"
          name="Ldescription"
          value={lectureData.Ldescription}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Lecture video</label>
        <FileUploader
          name="file"
          types={fileTypes}
          className="outline-double"
          handleChange={xyz}
        />
      </div>
      <DialogFooter>
        <Button onClick={onSave}>Save</Button>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const Ecomp = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const authToken = select?.authToken;
  const navigate = useNavigate();
  const resp = useSelector((state) => state?.form?.FormData?.resp);
  //   console.log(resp);

  const [course_id, setCourseId] = useState(resp._id);
  const maxTags = 5;
  const { tags, handleAddTag, handleRemoveTag } = Usetag(maxTags);
  const fileTypes = ["jpg", "mp4"];
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    section: "",
    title: resp.courseName,
    description: resp.courseDescription,
    price: resp.price,
    level: "",
    language: "",
    Ltitle: "",
    Ldescription: "",
    benefits: resp.whatIsThis,
  });

  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const response = await axios.get(resp.thumbnail, {
          responseType: "blob",
        });

        const file = new File([response.data], "thumbnail.jpg", {
          type: response.data.type,
        });

        setThumbnail(file);
      } catch (error) {
        console.error("Error fetching thumbnail:", error);
      }
    };

    if (resp.thumbnail) {
      fetchThumbnail();
    }
  }, [resp.thumbnail]);

  //   console.log(thumbnail);
  const [sections, setSections] = useState(
    resp.courseContent.map((item) => item.sectionName)
  );

  const [sectionId, setSectionId] = useState(
    resp.courseContent.map((item) => item._id)
  );
  const [subsectionId, setSubsectionId] = useState(
    resp.courseContent.map((item) => item.subsection.map((x) => x._id))
  );
  const [editingSection, setEditingSection] = useState(null);

  const [activeSection, setActiveSection] = useState(null);

  const [lectures, setLectures] = useState(
    resp.courseContent.map((item) =>
      item.subsection.map((x) => ({
        Ltitle: x.title,
        Ldescription: x.body,
      }))
    )
  );

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
        formData.append("courseId", resp._id);
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
      } catch (err) {
        console.error(err);
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
      } catch (err) {
        console.error(err);
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
      //   console.log(response.data);
      setSections((prevSections) => prevSections.filter((_, i) => i !== index));
      setSectionId((prevSectionId) =>
        prevSectionId.filter((_, i) => i !== index)
      );
    } catch (error) {
      console.error(error);
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
      //   console.log(response.data);
      const newsubsectionId =
        response.data.updatedSection.subsection[
          response.data.updatedSection.subsection.length - 1
        ]._id;
      // console.log(newsubsectionId);
      const values = [...subsectionId];

      if (Array.isArray(values[activeSection])) {
        values[activeSection].push(newsubsectionId);
      } else {
        values[activeSection] = [newsubsectionId];
      }

      setSubsectionId(values);
    } catch (err) {
      console.error(err);
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

      const updates = [...subsectionId];
      const y = updates[sectionIndex].splice(lectureIndex, 1);

      //   console.log("subsection" + y);
      //   console.log("section" + sectionId[sectionIndex]);

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
      updates[sectionIndex].splice(lectureIndex, 1);
      setSubsectionId(updates);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveEditedLecture = async () => {
    try {
      const formData = new FormData();
      formData.append(
        "subsectionId",
        subsectionId[editingLectureSectionIndex][editingLectureIndex]
      );
      formData.append(
        "title",
        lectures[editingLectureSectionIndex][editingLectureIndex].Ltitle
      );
      formData.append(
        "body",
        lectures[editingLectureSectionIndex][editingLectureIndex].Ldescription
      );
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
      const updatedLectures = [...lectures];
      updatedLectures[editingLectureSectionIndex][editingLectureIndex] = {
        Ltitle: data.Ltitle,
        Ldescription: data.Ldescription,
      };
      setLectures(updatedLectures);
      setIsEditDialogOpen(false);
      setData({ ...data, Ltitle: "", Ldescription: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const saveHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("courseId", resp._id);
      formData.append("courseName", data.title);
      formData.append("courseDescription", data.description);
      formData.append("whatIsThis", data.benefits);
      formData.append("tag", "666034c1cf195e6592168fbf");
      formData.append("price", data.price);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const response = await axios.post(
        "http://localhost:3000/api/v1/course/editCourse",
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
    } catch (error) {
      console.error(error);
    }
    setStep(step + 1);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Navbar />

      <Separator className=" bg-slate-900" />
      <div className="flex flex-row h-screen">
        <Pnav />
        <div className="w-[80%] bg-slate-900 mx-auto">
          <ScrollArea className="h-[75%] w-[70%] m-auto mt-10 mb-10 overflow-scroll overflow-x-hidden scrollbar-hide">
            <div className="overflow-scroll">
              <div>Edit Course</div>

              <Card>
                <CardContent style={{ display: step === 1 ? "block" : "none" }}>
                  <label htmlFor="title">Course Title</label>
                  <Input
                    type="text"
                    placeholder="Enter course title"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={handler}
                    className="outline-double"
                  />
                </CardContent>

                <CardContent style={{ display: step === 1 ? "block" : "none" }}>
                  <label htmlFor="description">Course Description</label>
                  <div>
                    <textarea
                      rows="4"
                      cols="67"
                      placeholder="Enter course description"
                      id="description"
                      name="description"
                      value={data.description}
                      onChange={handler}
                      className="outline-double"
                    />
                  </div>
                </CardContent>

                <CardContent style={{ display: step === 1 ? "block" : "none" }}>
                  <label htmlFor="price">Course Price</label>
                  <Input
                    type="text"
                    placeholder="Enter course price"
                    id="price"
                    name="price"
                    value={data.price}
                    onChange={handler}
                    className="outline-double"
                  />
                </CardContent>

                <CardContent style={{ display: step === 1 ? "block" : "none" }}>
                  <label htmlFor="level">Course level</label>
                  <Select
                    onValueChange={(value) =>
                      setData((prev) => ({ ...prev, level: value }))
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choose a level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">immediate</SelectItem>
                      <SelectItem value="beginner">beginner</SelectItem>
                      <SelectItem value="advance">advance</SelectItem>
                      <SelectItem value="all">all</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>

                <CardContent style={{ display: step === 1 ? "block" : "none" }}>
                  <label htmlFor="language">Course language</label>
                  <Select
                    onValueChange={(value) =>
                      setData((prev) => ({ ...prev, language: value }))
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choose a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindi">hindi</SelectItem>
                      <SelectItem value="english">english</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>

                <CardContent style={{ display: step === 1 ? "block" : "none" }}>
                  <label htmlFor="tag">Tags</label>
                  <Tag
                    tags={tags}
                    addTag={handleAddTag}
                    removeTag={handleRemoveTag}
                    maxTags={maxTags}
                  />
                </CardContent>

                <CardContent style={{ display: step === 1 ? "block" : "none" }}>
                  <label>Course Thumbnail</label>
                  <FileUploader
                    name="file"
                    types={fileTypes}
                    className="outline-double"
                    handleChange={handleFileChange}
                    defaultFile={thumbnail}
                  />
                </CardContent>

                <CardContent style={{ display: step === 1 ? "block" : "none" }}>
                  <label htmlFor="benefits">Course Benefits</label>
                  <div>
                    <textarea
                      rows="4"
                      cols="67"
                      placeholder="Enter course benefits"
                      id="benefits"
                      name="benefits"
                      value={data.benefits}
                      onChange={handler}
                      className="outline-double"
                    />
                  </div>
                </CardContent>

                <CardContent style={{ display: step === 1 ? "block" : "none" }}>
                  <div className="flex flex-row justify-evenly">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-11 w-20"
                      onClick={saveHandler}
                    >
                      Save
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-11 w-44"
                      onClick={() => {
                        setStep(step + 1);
                      }}
                    >
                      Save without changes
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>

                <CardContent style={{ display: step === 2 ? "block" : "none" }}>
                  Course Builder
                </CardContent>
                <CardContent style={{ display: step === 2 ? "block" : "none" }}>
                  <div className="border-gray-950 border-2 p-4">
                    <label htmlFor="section">Section Name</label>
                    <Input
                      type="text"
                      placeholder="Enter section name"
                      id="section"
                      name="section"
                      value={data.section}
                      onChange={handler}
                      className="outline-double"
                    />
                    <Button onClick={handleCreateSection}>
                      {editingSection !== null
                        ? "Update Section"
                        : "Add Section"}
                    </Button>
                  </div>
                </CardContent>

                {sections.map((section, index) => (
                  <CardContent
                    key={index}
                    className="flex flex-row"
                    style={{ display: step === 2 ? "block" : "none" }}
                  >
                    <Collapsible>
                      <CollapsibleTrigger>
                        <div
                          className="flex flex-row"
                          onClick={() => setActiveSection(index)}
                        >
                          <div>{section}</div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {(lectures[index] || []).map(
                          (lecture, lectureIndex) => (
                            <div key={lectureIndex}>
                              <div>{lecture.Ltitle}</div>
                              <Button
                                onClick={() =>
                                  handleEditLecture(index, lectureIndex)
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() =>
                                  handleDeleteLecture(index, lectureIndex)
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          )
                        )}
                        <Dialog>
                          <DialogTrigger>Add Lecture</DialogTrigger>
                          <DialogContent>
                            <DialogHeader>Adding Lecture</DialogHeader>
                            <div>
                              <label htmlFor="Ltitle">Lecture Title</label>
                              <Input
                                type="text"
                                id="Ltitle"
                                name="Ltitle"
                                value={data.Ltitle}
                                onChange={handler}
                              />
                            </div>
                            <div>
                              <label htmlFor="Ldescription">
                                Lecture Description
                              </label>
                              <textarea
                                id="Ldescription"
                                rows="4"
                                cols="50"
                                name="Ldescription"
                                value={data.Ldescription}
                                onChange={handler}
                              />
                            </div>
                            <div>
                              <label>Lecture video</label>
                              <FileUploader
                                name="file"
                                types={fileTypes}
                                className="outline-double"
                                handleChange={(file) => setVideo(file)}
                              />
                            </div>
                            <DialogClose
                              onClick={() => handleSaveLecture(index)}
                            >
                              Save
                            </DialogClose>
                          </DialogContent>
                        </Dialog>
                      </CollapsibleContent>
                    </Collapsible>
                    <Button onClick={() => handleEditSection(index)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteSection(index)}>
                      Delete
                    </Button>
                  </CardContent>
                ))}

                <CardContent>
                  {step < 3 && step > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-11 w-20"
                      onClick={() => setStep(step + 1)}
                    >
                      Next <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  )}

                  {step === 3 && (
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
                  setIsEditDialogOpen(false);
                  setData({ ...data, Ltitle: "", Ldescription: "" });
                }}
                onSave={handleSaveEditedLecture}
                lectureData={{
                  Ltitle: data.Ltitle,
                  Ldescription: data.Ldescription,
                }}
                onChange={handler}
                fileTypes={fileTypes}
                xyz={(file) => setVideo(file)}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
