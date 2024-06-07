import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
export const Pcomp = () => {
  const select = useSelector((select) => select?.form?.FormData?.profile);
  const value = select?.data;
  const name = value?.firstName + " " + value?.lastName;

  const navigate = useNavigate();
  //   console.log(value);
  return (
    <div className="flex flex-col gap-6 justify-around">
      <div className="font-bold text-4xl text-white ">My Profile</div>
      <Card>
        <div className="my-10"></div>
        <div className="flex flex-row">
          <CardContent>
            <img src={value?.image} className="rounded-full h-[75px]"></img>
          </CardContent>
          <CardContent>
            <p>{name}</p>
            <p>{value?.email}</p>
          </CardContent>
          <CardContent>
            <Button
              variant="destructive"
              className="bg-yellow-500 text-zinc-700"
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
