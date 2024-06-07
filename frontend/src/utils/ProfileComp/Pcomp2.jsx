import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";

export const Pcomp2 = () => {
  const select = useSelector((state) => state?.form?.FormData?.profile);
  const value = select?.data;

  return (
    <div className="flex flex-col gap-6 ">
      <Card>
        <div className="my-10"></div>
        <div className="flex flex-row">
          <CardContent>
            <p>Personal Details</p>
          </CardContent>
          <div>
            <CardContent>
              <p>First Name</p>
              <p>{value?.firstName || "N/A"}</p>
            </CardContent>
            <CardContent>
              <p>Email</p>
              <p>{value?.email || "N/A"}</p>
            </CardContent>
            <CardContent>
              <p>Gender</p>
              <p>{value?.additional?.gender || "N/A"}</p>
            </CardContent>
          </div>

          <div>
            <CardContent>
              <p>Last Name</p>
              <p>{value?.lastName || "N/A"}</p>
            </CardContent>
            <CardContent>
              <p>Phone No.</p>
              <p>{value?.additional?.phoneNumber || "N/A"}</p>
            </CardContent>
            <CardContent>
              <p>Date of Birth</p>
              <p>{value?.additional?.dob || "N/A"}</p>
            </CardContent>
          </div>

          <CardContent>
            <Button
              variant="destructive"
              className="bg-yellow-500 text-zinc-700 "
            >
              Edit
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
