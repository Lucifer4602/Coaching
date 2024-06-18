import React, { useState, useEffect } from "react";
import { Navbar } from "../utils/Navbar";
import { Pnav } from "./ProfileComp/Pnav";
import { Separator } from "@/components/ui/separator";
import { Scomp } from "./ProfileComp/Scomp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { update } from "@/redux/FormSlice";
import { Scomp1 } from "./ProfileComp/Scomp1";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useMediaQuery from "react-responsive";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Setting = () => {
  const [loading, setLoading] = useState(true);
  const select = useSelector((state) => state.form.FormData);
  const authToken = select.authToken;
  const dispatch = useDispatch();

  // Define a toast function
  const showToast = (message, type = "info") => {
    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/profile/getUserDetails`,
          {
            params: { id: select._id },
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.setItem("profileData", JSON.stringify(response.data));
        dispatch(update({ ...select, profile: response.data }));
        showToast("User details fetched successfully", "success");
      } catch (error) {
        console.error("Error fetching user details:", error);
        showToast("Failed to fetch user details. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    };

    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      dispatch(update({ ...select, profile: JSON.parse(savedData) }));
      setLoading(false);
    } else if (authToken && select._id) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [select._id, authToken, dispatch]);

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
                <Scomp />
                <div className="mt-8"></div>
                <Scomp1 />
                <div className="mt-8"></div>
              </>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
