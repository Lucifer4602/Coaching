import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { Contact } from "./utils/Contact.jsx";
import { Home } from "./utils/Home.jsx";
import { Login } from "./utils/Login.jsx";
import { About } from "./utils/About.jsx";
import { Signup } from "./utils/Signup.jsx";
import { VerifyOtp } from "./utils/VerifyOtp.jsx";
import { Profile } from "./utils/Profile.jsx";
import { Setting } from "./utils/Setting.jsx";
import { Addcourse } from "./utils/Addcourse.jsx";
import { Dashboard } from "./utils/Dashboard.jsx";
import { Mycourse } from "./utils/Mycourse.jsx";
import { Ecomp } from "./utils/ProfileComp/Ecomp.jsx";
import { Query } from "./utils/Query.jsx";
import { CourseDetails } from "./utils/CourseDetails.jsx";
import { EnrolledCourses } from "./utils/EnrolledCourses.jsx";
import { Wishlist } from "./utils/Wishlist.jsx";
import { Cart } from "./utils/Cart.jsx";
import { Search } from "./utils/Search.jsx";
import { ViewCourse } from "./utils/ViewCourse.jsx";

function App() {
  const isAuthenticated = useSelector(
    (state) => state.form.FormData.auth === "true"
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/contactUs" element={<Contact />} />
        <Route path="/aboutUs" element={<About />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/" element={<Home />} />
        <Route path="/Web development" element={<Query />} />
        <Route path="/Android development" element={<Query />} />
        <Route path="/Devops" element={<Query />} />
        <Route path="/Blockchain" element={<Query />} />
        <Route path="/search" element={<Search />} />
        <Route path="/CourseDetails" element={<CourseDetails />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/add-course" element={<Addcourse />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mycourse" element={<Mycourse />} />
            <Route path="/editCourse" element={<Ecomp />} />

            <Route path="/Enrolled-courses" element={<EnrolledCourses />} />
            <Route path="/Wishlist" element={<Wishlist />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/view-course" element={<ViewCourse />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
