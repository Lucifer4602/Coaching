import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { update } from "@/redux/FormSlice";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

export const Scomp1 = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const authToken = select?.authToken;
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phoneNumber: "",
    gender: "",
    about: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (select.profile?.data) {
      setData({
        firstName: select.profile.data.firstName || "",
        lastName: select.profile.data.lastName || "",
        dob: select.profile.data.dob || "",
        phoneNumber: select.profile.data.phoneNumber || "",
        gender: select.profile.data.gender || "",
        about: select.profile.data.about || "",
      });
    }
  }, [select]);

  const handler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:3000/api/v1/profile/updateProfile?id=${select._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        update({
          ...select,
          profile: { ...select.profile, data },
          isTrue: true,
          hello: true,
        })
      );
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 justify-around items-center px-4 lg:px-8 xl:px-12">
      <form
        onSubmit={submitHandler}
        className="w-full lg:w-[calc(100% - 40px)] xl:w-[calc(100% - 80px)]"
      >
        <Card className="w-full lg:w-[calc(100% - 40px)] xl:w-[calc(100% - 80px)]">
          <CardContent>
            <div className="font-bold text-2xl mb-6">
              Edit Profile Information
            </div>
            <div className="flex flex-row justify-evenly">
              <div className="flex flex-col gap-4">
                <label htmlFor="firstName" className="font-bold">
                  First Name
                </label>
                <Input
                  type="text"
                  placeholder="First Name"
                  id="firstName"
                  name="firstName"
                  value={data.firstName}
                  onChange={handler}
                />
                <label htmlFor="lastName" className="font-bold">
                  Last Name
                </label>
                <Input
                  type="text"
                  placeholder="Last Name"
                  id="lastName"
                  name="lastName"
                  value={data.lastName}
                  onChange={handler}
                />
                <label htmlFor="dob" className="font-bold">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  placeholder="Date of Birth"
                  id="dob"
                  name="dob"
                  value={data.dob}
                  onChange={handler}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="phoneNumber" className="font-bold">
                  Phone Number
                </label>
                <Input
                  type="text"
                  placeholder="Phone Number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handler}
                />
                <label htmlFor="gender" className="font-bold">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={data.gender}
                  onChange={handler}
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <label htmlFor="about" className="font-bold">
                  About
                </label>
                <Input
                  type="text"
                  placeholder="About"
                  id="about"
                  name="about"
                  value={data.about}
                  onChange={handler}
                />
              </div>
            </div>
          </CardContent>
          <CardContent className="flex justify-end">
            <Button variant="ghost" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
