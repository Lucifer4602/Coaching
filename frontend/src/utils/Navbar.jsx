import React, { useEffect, useState } from "react";
import { IoClose, IoMenuOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { reset, update } from "@/redux/FormSlice";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const AuthMenu = () => (
  <>
    <div className="flex flex-col">
      <div>
        <a href="/login" className="text-white hover:text-gray-300 block py-2">
          Sign In
        </a>
      </div>
      <div>
        <a href="/signUp" className="text-white hover:text-gray-300 block py-2">
          Sign Up
        </a>
      </div>
    </div>
  </>
);

const LoggedInMenu = ({ role, handleLogout }) => (
  <>
    <div className="flex flex-col">
      <div>
        <a
          href="/profile"
          className="text-white hover:text-gray-300 block py-2"
        >
          Profile
        </a>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="text-white hover:text-gray-300 block py-2"
        >
          Logout
        </button>
      </div>
      <div>
        <a href="/cart" className="text-white hover:text-gray-300 block py-2">
          Cart
        </a>
      </div>
      <div>
        <a
          href="/profile"
          className="text-white hover:text-gray-300 block py-2"
        >
          My Profile
        </a>
      </div>
      {role === "student" && (
        <>
          <div>
            <a
              href="/enrolled-courses"
              className="text-white hover:text-gray-300 block py-2"
            >
              Enrolled Courses
            </a>
          </div>
          <div>
            <a
              href="/wishlist"
              className="text-white hover:text-gray-300 block py-2"
            >
              Wishlist
            </a>
          </div>
        </>
      )}
      {role === "instructor" && (
        <>
          <div>
            <a
              href="/dashboard"
              className="text-white hover:text-gray-300 block py-2"
            >
              Dashboard
            </a>
          </div>
          <div>
            <a
              href="/my-courses"
              className="text-white hover:text-gray-300 block py-2"
            >
              My Courses
            </a>
          </div>
          <div>
            <a
              href="/add-course"
              className="text-white hover:text-gray-300 block py-2"
            >
              Add Course
            </a>
          </div>
        </>
      )}
      <div>
        <a
          href="/settings"
          className="text-white hover:text-gray-300 block py-2"
        >
          Settings
        </a>
      </div>
    </div>
  </>
);

export const Navbar = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const [data, setData] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false); // Ensure initial state is false
  const auth = select?.auth === "true";
  const role = select?.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isTabletOrDesktop = useMediaQuery({ maxWidth: 1024 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://techflix-api-vfly.onrender.com/api/v1/course/getAllCourses"
        );
        const x = response.data.data;
        dispatch(update({ ...select, courses: x }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    dispatch(reset());
    navigate("/login");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(update({ ...select, query: data }));
      navigate("/search");
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen); // Toggle drawer state
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-white shadow-md relative z-20 bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center py-3 lg:justify-start lg:space-x-10">
            {isTabletOrDesktop && (
              <button
                type="button"
                onClick={toggleDrawer} // Ensure this calls toggleDrawer function
                className="order-1 bg-gray-800 rounded-md p-2  items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white z-50"
                aria-expanded="false"
              >
                <span className="sr-only">Open menu</span>
                <IoMenuOutline className="h-6 w-6" aria-hidden="true" />
              </button>
            )}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              <a href="/" className="lg:order-2">
                <div className="flex justify-center items-center gap-1">
                  <Avatar>
                    <AvatarImage
                      className="w-10 h-10 rounded-full"
                      src="https://static.vecteezy.com/system/resources/previews/000/562/543/original/creative-luxury-letter-t-logo-concept-design-vector.jpg"
                    />
                  </Avatar>
                  <span className="text-white">TechFlix</span>
                </div>
              </a>
              {isTabletOrDesktop && (
                <div className="relative flex items-center rounded-full bg-white border border-gray-300 z-50 w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="py-2 pl-4 pr-10 w-full outline-none text-gray-900"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    onKeyUp={handleKeyPress}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 bottom-0 px-3"
                    onClick={closeDrawer} // Ensure this calls closeDrawer function
                  >
                    <FaSearch className="text-gray-600" />
                  </button>
                </div>
              )}
            </motion.div>

            {!isTabletOrDesktop && (
              <div className="hidden md:flex flex-wrap items-center justify-end md:flex-1 lg:w-0 space-x-4">
                <NavigationMenu>
                  <NavigationMenuList>
                    <div className="flex justify-center items-center gap-4">
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          href="/"
                          className="text-white hover:text-gray-300"
                        >
                          Home
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="z-50 text-black">
                          Catalog
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="z-50">
                          <ul className="flex flex-col gap-2 pl-4 pr-4 pt-2 pb-2">
                            <li>
                              <NavigationMenuLink
                                href="/Web development"
                                className="text-black hover:text-gray-300"
                              >
                                Web Development
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink
                                href="/Android development"
                                className="text-black hover:text-gray-300"
                              >
                                Android Development
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink
                                href="/Devops"
                                className="text-black hover:text-gray-300"
                              >
                                DevOps
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink
                                href="/Blockchain"
                                className="text-black hover:text-gray-300"
                              >
                                Blockchain
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          href="/aboutUs"
                          className="text-white hover:text-gray-300"
                        >
                          About Us
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          href="/contactUs"
                          className="text-white hover:text-gray-300"
                        >
                          Contact Us
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </div>
                  </NavigationMenuList>
                </NavigationMenu>
                <div className="relative flex items-center rounded-full bg-white border border-gray-300 z-50 w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="py-2 pl-4 pr-10 w-full outline-none text-gray-900"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    onKeyUp={handleKeyPress}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 bottom-0 px-3"
                    onClick={closeDrawer}
                  >
                    <FaSearch className="text-gray-600" />
                  </button>
                </div>
                {!auth ? (
                  <>
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuLink href="/login">
                            <Button
                              variant="outline"
                              className="text-black hover:text-gray-300"
                            >
                              Sign In
                            </Button>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuLink href="/signUp">
                            <Button
                              variant="outline"
                              className="text-black hover:text-gray-300"
                            >
                              Sign Up
                            </Button>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </>
                ) : (
                  <>
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger className="text-black z-50">
                            Dashboard
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="z-50">
                            <ul className="flex flex-col gap-2 pl-4 pr-4 pt-2 pb-2">
                              <li>
                                <NavigationMenuLink
                                  href="/profile"
                                  className="text-black hover:text-gray-300"
                                >
                                  <FaUser className="inline-block mr-2" />{" "}
                                  Profile
                                </NavigationMenuLink>
                              </li>
                              <li>
                                <Button
                                  variant="text"
                                  onClick={handleLogout}
                                  className="text-black hover:text-gray-300"
                                >
                                  <IoClose className="inline-block mr-2" />{" "}
                                  Logout
                                </Button>
                              </li>
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuLink
                            href="/cart"
                            className="text-black hover:text-gray-300"
                          >
                            <Button variant="outline">
                              <FaShoppingCart className="inline-block mr-2" />{" "}
                              Cart
                            </Button>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Tablet and Desktop Drawer */}
        {isDrawerOpen && isTabletOrDesktop && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className=" absolute top-0 left-0 w-72 bg-black bg-opacity-90 flex flex-col items-start justify-start z-50"
          >
            <div className="px-4 pt-6 pb-3 space-y-3 w-full">
              <div className="flex flex-col">
                <div className="text-white hover:text-gray-300">
                  <a href="/" className="block py-2">
                    Home
                  </a>
                </div>
                <div className="text-white hover:text-gray-300 relative">
                  <button className="block py-2" onClick={toggleMenu}>
                    Catalog
                  </button>
                  {menu && (
                    <ul className="flex flex-col absolute left-0 mt-2 bg-white shadow-lg rounded-md py-2 px-3">
                      <li>
                        <a
                          href="/Web development"
                          className="text-black hover:text-gray-300 block py-1"
                        >
                          Web Development
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Android development"
                          className="text-black hover:text-gray-300 block py-1"
                        >
                          Android Development
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Devops"
                          className="text-black hover:text-gray-300 block py-1"
                        >
                          DevOps
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Blockchain"
                          className="text-black hover:text-gray-300 block py-1"
                        >
                          Blockchain
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="text-white hover:text-gray-300">
                  <a href="/aboutUs" className="block py-2">
                    About Us
                  </a>
                </div>
                <div className="text-white hover:text-gray-300">
                  <a href="/contactUs" className="block py-2">
                    Contact Us
                  </a>
                </div>
              </div>
              {!auth ? (
                <>
                  <AuthMenu />
                </>
              ) : (
                <>
                  <LoggedInMenu role={role} handleLogout={handleLogout} />
                </>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};
