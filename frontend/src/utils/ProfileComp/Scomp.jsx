import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { toast } from "react-toastify";

export const Scomp = () => {
  const select = useSelector((state) => state?.form?.FormData?.profile);
  const value = select?.data || {};

  const handleSelectClick = () => {
    toast.info("Select button clicked");
  };

  const handleUploadClick = () => {
    toast.info("Upload button clicked");
  };

  return (
    <div className="flex flex-col gap-6 justify-around px-4 lg:px-8 xl:px-12">
      <div className="font-bold text-4xl text-white">Edit Profile</div>
      <Card className="w-full lg:w-[calc(100% - 40px)] xl:w-[calc(100% - 80px)]">
        <CardContent>
          <div className="my-10"></div>
          <div className="flex flex-row items-center gap-4">
            <img
              src={value?.image}
              className="rounded-full h-24 w-24 object-cover"
              alt="Profile"
            />
            <div className="flex flex-col gap-2">
              <div className="text-sm">Change Profile Photo</div>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  className="bg-slate-900 text-white"
                  onClick={handleSelectClick}
                >
                  Select
                </Button>
                <Button
                  variant="destructive"
                  className="bg-yellow-500 text-zinc-700"
                  onClick={handleUploadClick}
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
