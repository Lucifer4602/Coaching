import React, { useState, useEffect } from "react";
import { Navbar } from "../utils/Navbar";
import { Pnav } from "./ProfileComp/Pnav";
import { Separator } from "@/components/ui/separator";
import { Scomp } from "./ProfileComp/Scomp";
import axios from "axios"; // Ensure axios is imported
import { useDispatch, useSelector } from "react-redux";
import { update } from "@/redux/FormSlice"; // Ensure update action is imported
import { Scomp1 } from "./ProfileComp/Scomp1";

export const Setting = () => {
  const [loading, setLoading] = useState(true);
  const select = useSelector((state) => state.form.FormData);
  const authToken = select.authToken;
  const dispatch = useDispatch();

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
        console.log(response.data);
        localStorage.setItem("profileData", JSON.stringify(response.data));
        dispatch(update({ ...select, profile: response.data }));
      } catch (error) {
        console.error("Error fetching user details:", error);
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
    <div>
      <Navbar />
      <Separator className=" bg-slate-900" />
      <div className="flex flex-row h-screen">
        <Pnav />
        <div className="w-[80%] bg-slate-900">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Scomp />
              <Scomp1></Scomp1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
