import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/contactUs" element={<Contact />} />
        <Route path="/aboutUs" element={<About />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/verifyOtp" element={<VerifyOtp></VerifyOtp>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/settings" element={<Setting></Setting>}></Route>
        <Route path="/add-course" element={<Addcourse></Addcourse>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/mycourse" element={<Mycourse></Mycourse>}></Route>
        <Route path="/editCourse" element={<Ecomp></Ecomp>}></Route>
        <Route path="/Web development" element={<Query></Query>}></Route>
        <Route path="/Android development" element={<Query></Query>}></Route>
        <Route path="/Devops" element={<Query></Query>}></Route>
        <Route path="/Blockchain" element={<Query></Query>}></Route>
        <Route
          path="/Enrolled-courses"
          element={<EnrolledCourses></EnrolledCourses>}
        ></Route>
        <Route path="/Wishlist" element={<Wishlist></Wishlist>}></Route>
        <Route
          path="/CourseDetails"
          element={<CourseDetails></CourseDetails>}
        ></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
        <Route path="view-course" element={<ViewCourse></ViewCourse>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
