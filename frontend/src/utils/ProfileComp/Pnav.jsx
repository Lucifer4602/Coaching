import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
export const Pnav = () => {
  return (
    <>
      <div className="w-[20%] mx-auto bg-zinc-500 sticky flex flex-col">
        <Button variant="ghost"> My Profile</Button>
        <Button variant="ghost"> Dashboard</Button>
        <Button variant="ghost"> My Courses</Button>
        <Button variant="ghost"> Add Courses</Button>
        <Separator className="my-9 bg-slate-900" />
        <Button variant="ghost"> Setting</Button>
        <Button variant="ghost"> Logout</Button>
      </div>
    </>
  );
};
