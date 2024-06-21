import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export const Pcomp1 = () => {
  const select = useSelector((state) => state?.form?.FormData?.profile);
  const value = select?.data;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-8 xl:px-12 overflow-scroll overflow-x-hidden overflow-y-hidden">
      {/* Adjusted padding for different screen sizes */}
      <Card>
        <div className="my-6 lg:my-10">
          {/* Adjusted vertical margin for different screen sizes */}
        </div>
        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:gap-6">
          {/* About Section */}
          <CardContent className="flex-1">
            <p className="font-bold text-2xl mb-3">About</p>
            <p>{value?.additional?.about || "Tell us about yourself"}</p>
            <p className="mt-4 ">
              <span className="font-bold">Account Type:</span> {value?.role}
            </p>
          </CardContent>

          <div className="lg:hidden">
            {/* Separator for smaller screens */}
            <hr className="my-6 border-gray-300" />
          </div>

          <CardContent className="flex-1 lg:flex-none">
            {/* Edit Button */}
            <Button
              variant="destructive"
              className="w-full lg:w-auto bg-yellow-500 text-zinc-700"
              onClick={() => {
                navigate("/settings");
              }}
            >
              Edit
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
