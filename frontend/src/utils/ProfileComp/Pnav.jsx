import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { persistor } from "@/redux/Store";

export const Pnav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="w-[20%] mx-auto bg-zinc-500 sticky flex flex-col">
      <Button
        variant="ghost"
        onClick={() => {
          navigate("/profile");
        }}
      >
        My Profile
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Dashboard
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          navigate("/mycourse");
        }}
      >
        My Courses
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          navigate("/add-course");
        }}
      >
        Add Courses
      </Button>
      <Separator className="my-9 bg-slate-900" />
      <Button
        variant="ghost"
        onClick={() => {
          navigate("/settings");
        }}
      >
        Setting
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          persistor.purge();
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
};
