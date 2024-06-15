import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
// import { useNavigate } from "react-router-dom";

export const Scomp = () => {
  const select = useSelector((state) => state?.form?.FormData?.profile);
  const value = select?.data || {};
  return (
    <div className="flex flex-col gap-6 justify-around">
      <div className="font-bold text-4xl text-white">Edit Profile</div>
      <Card>
        <div className="my-10"></div>
        <div className="flex flex-row">
          <CardContent>
            <img
              src={value?.image}
              className="rounded-full h-[75px]"
              alt="Profile"
            />
          </CardContent>
          <CardContent>Change Profile Photo</CardContent>
          <CardContent>
            <Button variant="destructive" className="bg-slate-900 text-white">
              Select
            </Button>
            <Button
              variant="destructive"
              className="bg-yellow-500 text-zinc-700"
            >
              Upload
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
