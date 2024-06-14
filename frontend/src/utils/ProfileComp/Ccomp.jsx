import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const EditLectureDialog = ({
  isOpen,
  onClose,
  onSave,
  lectureData,
  onChange,
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
      <DialogFooter>
        <Button onClick={onSave}>Save</Button>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const Ccomp = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const authToken = select?.authToken;

  const [course_id, setCourseId] = useState("");
  const maxTags = 5;
  const { tags, handleAddTag, handleRemoveTag } = Usetag(maxTags);
  const fileTypes = ["jpg", "mp4"];
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

  const handleSubmit = () => {
    console.log("Form submitted!");
  };

  const handleCreateSection = async () => {
    if (editingSection !== null) {
      const updatedSections = [...sections];
      updatedSections[editingSection] = data.section;
      setSections(updatedSections);
      setEditingSection(null);
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
          },
        }
      );
      console.log(response.data);
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
          },
        }
      );
      const newsubsectionId = { _id: response.data.updatedSection._id };
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

  const handleEditLecture = (sectionIndex, lectureIndex) => {
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
    const updatedLectures = [...lectures];
    updatedLectures[sectionIndex].splice(lectureIndex, 1);
    setLectures(updatedLectures);

    const updates = [...subsectionId];
    const y = updates[sectionIndex][lectureIndex]._id;
    updates[sectionIndex].splice(lectureIndex, 1);
    setSubsectionId(updates);

    try {
      const formData = new FormData();
      formData.append("subsectionId", y);
      formData.append("sectionId", sectionId[sectionIndex]);
      const response = await axios.delete(
        "http://localhost:3000/api/v1/course/deleteSubSection",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveEditedLecture = () => {
    const updatedLectures = [...lectures];
    updatedLectures[editingLectureSectionIndex][editingLectureIndex] = {
      Ltitle: data.Ltitle,
      Ldescription: data.Ldescription,
    };
    setLectures(updatedLectures);
    setIsEditDialogOpen(false);
    setData({ ...data, Ltitle: "", Ldescription: "" });
  };

  const saveHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("courseName", data.title);
      formData.append("courseDescription", data.description);
      formData.append("whatIsThis", data.benefits);
      formData.append("tag", "666034c1cf195e6592168fbf");
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
    } catch (error) {
      console.error(error);
    }
    setStep(step + 1);
  };

  return (
    <div className="overflow-scroll">
      <div>Add a Course</div>

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
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-20"
            onClick={saveHandler}
          >
            Save
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
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
              {editingSection !== null ? "Update Section" : "Add Section"}
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
                {(lectures[index] || []).map((lecture, lectureIndex) => (
                  <div key={lectureIndex}>
                    <div>{lecture.Ltitle}</div>
                    <Button
                      onClick={() => handleEditLecture(index, lectureIndex)}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteLecture(index, lectureIndex)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
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
                      <label htmlFor="Ldescription">Lecture Description</label>
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
                    <DialogClose onClick={() => handleSaveLecture(index)}>
                      Save
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </CollapsibleContent>
            </Collapsible>
            <Button onClick={() => handleEditSection(index)}>Edit</Button>
            <Button onClick={() => handleDeleteSection(index)}>Delete</Button>
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
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveEditedLecture}
        lectureData={{ Ltitle: data.Ltitle, Ldescription: data.Ldescription }}
        onChange={handler}
      />
    </div>
  );
};
