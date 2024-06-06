import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pcomp } from "./ProfileComp/Pcomp.jsx";
import { Pcomp1 } from "./ProfileComp/Pcomp1.jsx";
import { Pnav } from "./ProfileComp/Pnav.jsx";
import { Pcomp2 } from "./ProfileComp/Pcomp2.jsx";
import { update } from "@/redux/FormSlice";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Profile = () => {
  const [loading, setLoading] = useState(true);
  const select = useSelector((state) => state.form.FormData);
  const authToken = select.authToken;
  const navigate = useNavigate();
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
        console.log("Response data:", response.data);
        dispatch(update({ ...select, profile: response.data }));
        console.log(select.profile);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authToken && select._id) {
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
          <ScrollArea className="h-[100%] w-[70%] mx-auto">
            {loading ? (
              <div className="flex flex-col gap-5"></div>
            ) : (
              <div className="flex flex-col gap-5">
                <Pcomp></Pcomp>
                <Pcomp1></Pcomp1>
                <Pcomp2></Pcomp2>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
