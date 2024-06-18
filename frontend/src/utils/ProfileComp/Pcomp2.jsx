import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export const Pcomp2 = () => {
  const select = useSelector((state) => state?.form?.FormData?.profile);
  const value = select?.data;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-8 xl:px-12 ">
      <Card>
        <div className="my-6 lg:my-10">
          <h2 className="text-lg font-semibold ml-10">Personal Details</h2>
          {/* Vertical margin adjustment */}
        </div>
        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:gap-6">
          {/* Personal Details Section */}

          <div className="bg-gray-100 lg:bg-transparent flex-1 p-4 lg:p-0">
            {/* Added background color and padding */}

            <CardContent>
              <p className="font-semibold">First Name</p>
              <p>{value?.firstName || "N/A"}</p>
            </CardContent>
            <CardContent>
              <p className="font-semibold">Email</p>
              <p>{value?.email || "N/A"}</p>
            </CardContent>
            <CardContent>
              <p className="font-semibold">Gender</p>
              <p>{value?.additional?.gender || "N/A"}</p>
            </CardContent>
          </div>

          <div className="lg:hidden">
            {/* Separator for smaller screens */}
            <hr className="my-6 border-gray-300" />
          </div>

          {/* Other Details Section */}
          <div className="flex-1">
            <CardContent>
              <p className="font-semibold">Last Name</p>
              <p>{value?.lastName || "N/A"}</p>
            </CardContent>
            <CardContent>
              <p className="font-semibold">Phone No.</p>
              <p>{value?.additional?.phoneNumber || "N/A"}</p>
            </CardContent>
            <CardContent>
              <p className="font-semibold">Date of Birth</p>
              <p>{value?.additional?.dob || "N/A"}</p>
            </CardContent>
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
