import React from "react";
import { Navbar } from "./Navbar";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Pnav } from "./ProfileComp/Pnav";
import { Ccomp } from "./ProfileComp/Ccomp";
import "../utils/Scroll.css";

export const Addcourse = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Navbar />

      <Separator className=" bg-slate-900" />
      <div className="flex flex-row h-screen">
        <Pnav />
        <div className="w-[80%] bg-slate-900 mx-auto">
          <ScrollArea className="h-[75%] w-[70%] m-auto mt-10 mb-10 overflow-scroll overflow-x-hidden scrollbar-hide">
            <Ccomp></Ccomp>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
