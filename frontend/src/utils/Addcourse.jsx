import React from "react";
import { Navbar } from "./Navbar";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Pnav } from "./ProfileComp/Pnav";
import { Ccomp } from "./ProfileComp/Ccomp";
import "../utils/Scroll.css";

export const Addcourse = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-gradient-to-b from-gray-900 to-black">
      <Navbar />
      <Separator className="bg-slate-700" />
      <div className="flex flex-grow h-full">
        <Pnav />
        <div className="flex-1 bg-gradient-to-b from-gray-900 to-black p-4 overflow-auto">
          <ScrollArea className="h-full overflow-y-auto scrollbar-hide p-4">
            <Ccomp />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
