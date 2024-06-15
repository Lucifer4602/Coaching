import React, { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Pnav } from "./ProfileComp/Pnav";
import axios from "axios";
import { useSelector } from "react-redux";
export const Dashboard = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const authToken = select?.authToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/profile/instructorDashboard",
          {
            params: { id: select?._id },
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.courses);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);
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
