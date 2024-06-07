import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
export const Pcomp1 = () => {
  const select = useSelector((select) => select?.form?.FormData?.profile);
  const value = select?.data;
  //   console.log(value);
  return (
    <div className="flex flex-col gap-6 ">
      <Card>
        <div className="my-10"></div>
        <div className="flex flex-row">
          <CardContent>
            <p>About</p>
            <p>{value?.additional?.about || "Tell us about yourself"}</p>
            <p>Account Type: {value?.role}</p>
          </CardContent>
          <CardContent>
            <div className="mx-9"></div>
          </CardContent>
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
