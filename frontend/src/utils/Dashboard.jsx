import React from "react";
import { Navbar } from "./Navbar";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Pnav } from "./ProfileComp/Pnav";
export const Dashboard = () => {
  return (
    <div>
      <Navbar />

      <Separator className=" bg-slate-900" />
      <div className="flex flex-row h-screen">
        <Pnav />
        <div className="w-[80%] bg-slate-900">
          <ScrollArea className="h-[100%] w-[70%] mx-auto"></ScrollArea>
        </div>
      </div>
    </div>
  );
};
