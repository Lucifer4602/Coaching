import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
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

export const Ccomp = () => {
  const maxTags = 5;
  const { tags, handleAddTag, handleRemoveTag } = Usetag(maxTags);

  const [name, setName] = useState("");
  const fileTypes = ["JPG", "PNG", "GIF"];
  return (
    <div className="overflow-scroll">
      <div>Add a Course</div>

      <Card>
        <CardContent>
          <label htmlFor="title">Course Title</label>
          <Input
            type="text"
            placeholder="Enter course title"
            id="title"
            name="title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-double"
          />
        </CardContent>

        <CardContent>
          <label htmlFor="description">Course Description</label>
          <div>
            <textarea
              rows="4"
              cols="67"
              placeholder="Enter course description"
              id="description"
              name="description"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-double"
            />
          </div>
        </CardContent>

        <CardContent>
          <label htmlFor="price">Course Price</label>
          <Input
            type="text"
            placeholder="Enter course price"
            id="price"
            name="price"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-double"
          />
        </CardContent>

        <CardContent>
          <label htmlFor="level">Course level</label>
          <Select>
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

        <CardContent>
          <label htmlFor="language">Course language</label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hindi">hindi</SelectItem>
              <SelectItem value="english">english</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>

        <CardContent>
          <label htmlFor="tag">Tags</label>
          <Tag
            tags={tags}
            addTag={handleAddTag}
            removeTag={handleRemoveTag}
            maxTags={maxTags}
          />
        </CardContent>

        <CardContent>
          <label> Coruse Thumbnail</label>
          <FileUploader
            name="file"
            types={fileTypes}
            className="outline-double"
          />
        </CardContent>

        <CardContent>
          <label htmlFor="description">Course Description</label>
          <div>
            <textarea
              rows="4"
              cols="67"
              placeholder="Enter course description"
              id="description"
              name="description"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-double"
            />
          </div>
        </CardContent>
        <CardContent>
          <Button variant="outline" size="icon" className="h-11 w-20">
            Next <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </CardContent>
        <div className="mt-16"></div>
      </Card>
    </div>
  );
};
