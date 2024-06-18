import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pcomp } from "./ProfileComp/Pcomp";
import { Pcomp1 } from "./ProfileComp/Pcomp1";
import { Pcomp2 } from "./ProfileComp/Pcomp2";
import { Pnav } from "./ProfileComp/Pnav";
import { update } from "@/redux/FormSlice";
import { toast } from "react-toastify";

export const Profile = () => {
  const [loading, setLoading] = useState(true);
  const select = useSelector((state) => state?.form?.FormData);
  const authToken = select?.authToken;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!authToken || !select?._id) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/profile/getUserDetails`,
          {
            params: { id: select?._id },
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        setTimeout(() => {
          dispatch(update({ ...select, profile: response.data }));
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
        toast.error("Failed to fetch user details. Please try again.");
      }
    };

    fetchData();
  }, [select?._id, authToken, dispatch, select?.hello]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Separator className="bg-slate-900" />
      <div className="flex flex-1">
        <Pnav />
        <div className="flex-1 bg-slate-900 p-4 overflow-auto">
          <ScrollArea className="flex flex-col gap-5 items-center">
            {loading ? (
              <p className="text-white text-lg">Loading...</p>
            ) : (
              <>
                <div className="mt-8"></div>
                <Pcomp />
                <div className="mt-8"></div>
                <Pcomp1 />
                <div className="mt-8"></div>
                <Pcomp2 />
                <div className="mt-8"></div>
              </>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
