import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { update } from "@/redux/FormSlice";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export const Scomp1 = () => {
  const select = useSelector((state) => state.form.FormData);
  const authToken = select.authToken;

  const [data, setData] = useState({
    firstName: select.profile.data?.firstName || "",
    lastName: select.profile.data?.lastName || "",
    dob: select.profile.data?.dob || "",
    phoneNumber: select.profile.data?.phoneNumber || "",
    gender: select.profile.data?.gender || "",
    about: select.profile.data?.about || "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
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
      // Dispatch action to update profile data in Redux store
      dispatch(
        update({
          ...select,
          profile: { ...select.profile, data }, // Update profile data
          isTrue: "true",
        })
      );
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 justify-around">
      <form onSubmit={submitHandler}>
        <Card>
          <div className="my-10"></div>
          <div className="flex flex-row">
            <CardContent>Personal Information</CardContent>
            <div>
              <CardContent>
                <label htmlFor="firstName">First Name</label>
                <Input
                  type="text"
                  placeholder="First Name"
                  id="firstName"
                  name="firstName"
                  value={data.firstName}
                  onChange={handler}
                />
              </CardContent>
              <CardContent>
                <label htmlFor="dob">Date of Birth</label>
                <Input
                  type="date"
                  placeholder="Date of Birth"
                  id="dob"
                  name="dob"
                  value={data.dob}
                  onChange={handler}
                />
              </CardContent>
              <CardContent>
                <label htmlFor="phoneNumber">phoneNumber No.</label>
                <Input
                  type="text"
                  placeholder="phoneNumber"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handler}
                />
              </CardContent>
            </div>
            <div>
              <CardContent>
                <label htmlFor="lastName">Last Name</label>
                <Input
                  type="text"
                  placeholder="Last Name"
                  id="lastName"
                  name="lastName"
                  value={data.lastName}
                  onChange={handler}
                />
              </CardContent>
              <CardContent>
                <label htmlFor="gender">Gender</label>
                <Input
                  type="text"
                  placeholder="Gender"
                  id="gender"
                  name="gender"
                  value={data.gender}
                  onChange={handler}
                />
              </CardContent>
              <CardContent>
                <label htmlFor="about">About</label>
                <Input
                  type="text"
                  placeholder="About"
                  id="about"
                  name="about"
                  value={data.about}
                  onChange={handler}
                />
              </CardContent>
            </div>
          </div>
        </Card>
        <Button variant="ghost" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};
