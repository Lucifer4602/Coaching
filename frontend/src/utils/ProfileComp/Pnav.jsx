import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/redux/FormSlice";

export const Pnav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector((state) => state?.form?.FormData?.role);

  const handleLogout = () => {
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="w-[20%] mx-auto bg-zinc-500 sticky flex flex-col">
      <Button variant="ghost" onClick={() => navigate("/profile")}>
        My Profile
      </Button>
      {role === "instructor" && (
        <>
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
          <Button variant="ghost" onClick={() => navigate("/mycourse")}>
            My Courses
          </Button>
          <Button variant="ghost" onClick={() => navigate("/add-course")}>
            Add Courses
          </Button>
        </>
      )}
      {role === "student" && (
        <>
          <Button variant="ghost" onClick={() => navigate("/Enrolled-courses")}>
            Enrolled Courses
          </Button>
          <Button variant="ghost" onClick={() => navigate("/Wishlist")}>
            Wishlist
          </Button>
        </>
      )}
      <Separator className="my-9 bg-slate-900" />
      <Button variant="ghost" onClick={() => navigate("/settings")}>
        Settings
      </Button>
      <Button variant="ghost" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
