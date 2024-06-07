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
      </Routes>
    </Router>
  );
}

export default App;