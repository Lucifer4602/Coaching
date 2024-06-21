// EditLectureDialog.js

import React from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import CustomFileUploader from "./CustomFileUploader";
import { Button } from "@/components/ui/button";

export const EditLectureDialog = ({
  isOpen,
  onClose,
  onSave,
  lectureData,
  onChange,
  fileTypes,
  xyz,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-6 text-center">Editing Lecture</h2>
        <div className="mb-4">
          <label htmlFor="editLtitle" className="block font-semibold mb-1">
            Lecture Title
          </label>
          <Input
            type="text"
            id="editLtitle"
            name="Ltitle"
            value={lectureData.Ltitle}
            onChange={onChange}
            className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-4/5"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="editLdescription"
            className="block font-semibold mb-1"
          >
            Lecture Description
          </label>
          <textarea
            id="editLdescription"
            rows="4"
            name="Ldescription"
            value={lectureData.Ldescription}
            onChange={onChange}
            className=" p-2 border border-gray-300 rounded-md resize-y focus:outline-none focus:border-blue-500 w-4/5"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Lecture Video</label>
          <CustomFileUploader
            name="file"
            types={fileTypes}
            className=" w-4/5 p-2 border border-gray-300 rounded-md focus:outline-none
        focus:border-blue-500"
            handleChange={xyz}
          />
        </div>

        <DialogFooter className="flex justify-end">
          <Button onClick={onSave} className="mr-2">
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
