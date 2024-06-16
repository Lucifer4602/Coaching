import React from "react";
import { Navbar } from "./Navbar";
import { Separator } from "../components/ui/separator";
// import { Pnav } from "./ProfileComp/Pnav";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export const Contact = () => {
  return (
    <div>
      <Navbar />
      <Separator className="bg-slate-900" />
      <div className="flex flex-row h-screen">
        <div className="w-[100%] bg-slate-900">
          <ScrollArea className="h-[100%] w-[70%] mx-auto"></ScrollArea>
        </div>
      </div>
    </div>
  );
};
