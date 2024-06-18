import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export const Pcomp = () => {
  const select = useSelector((state) => state?.form?.FormData?.profile);
  const value = select?.data;
  const name = `${value?.firstName} ${value?.lastName}`;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 justify-around items-center px-4 lg:px-8 xl:px-12">
      <div className="font-bold text-4xl text-white">My Profile</div>

      <Card className="w-full lg:w-[calc(100% - 40px)] xl:w-[calc(100% - 80px)]">
        <div className="my-6 lg:my-10">{/* Vertical margin adjustment */}</div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
          <CardContent className="flex-shrink-0">
            <img
              src={value?.image}
              className="rounded-full h-24 lg:h-32 xl:h-40"
              alt="Profile"
            />
          </CardContent>

          <div className="flex-1 mt-4 lg:mt-0 lg:flex lg:flex-col lg:gap-2">
            <CardContent>
              <p className="font-semibold">{name}</p>
              <p>{value?.email}</p>
            </CardContent>
          </div>
          <div>
            <CardContent>
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
        </div>
      </Card>
    </div>
  );
};
