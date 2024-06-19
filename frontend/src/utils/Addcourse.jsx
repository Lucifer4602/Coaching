import React from "react";
import { Navbar } from "./Navbar";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Pnav } from "./ProfileComp/Pnav";
import { Ccomp } from "./ProfileComp/Ccomp";
import "../utils/Scroll.css";

export const Addcourse = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Navbar />
      <Separator className="bg-slate-900" />
      <div className="flex flex-1 flex-col lg:flex-row h-full">
        <Pnav className="flex-shrink-0" />
        <div className="flex-1 bg-slate-900 p-4">
          <ScrollArea className="h-full overflow-y-auto scrollbar-hide p-4">
            <Ccomp />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
