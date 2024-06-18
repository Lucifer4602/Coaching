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

export const Navbar = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const [data, setData] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const auth = select?.auth === "true";
  const role = select?.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleSearchClick = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/course/getAllCourses"
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
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-white shadow-md relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            {isMobile && (
              <>
                <button
                  type="button"
                  onClick={toggleDrawer}
                  className="md:hidden order-1 bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white z-50"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open menu</span>
                  <IoMenuOutline className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="relative flex items-center rounded-full bg-white border border-gray-300 z-50">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="py-2 pl-4 pr-10 w-full sm:w-64 outline-none text-gray-900"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    onKeyUp={handleKeyPress}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 bottom-0 px-3"
                    onClick={handleSearchClick}
                  >
                    <FaSearch className="text-gray-600" />
                  </button>
                </div>
              </>
            )}
            <a href="/" className="lg:order-2">
              <span className="sr-only">Dummy</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://dummyimage.com/120x40/000/fff"
                alt="Logo"
              />
            </a>
          </motion.div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className="text-white hover:text-gray-300"
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="z-50">
                    Catalog
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-50">
                    <ul className="flex flex-col gap-2 pl-4 pr-4 pt-2 pb-2">
                      <li>
                        <NavigationMenuLink
                          href="/Web development"
                          className="text-white hover:text-gray-300"
                        >
                          Web Development
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/Android development"
                          className="text-white hover:text-gray-300"
                        >
                          Android Development
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/Devops"
                          className="text-white hover:text-gray-300"
                        >
                          DevOps
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/Blockchain"
                          className="text-white hover:text-gray-300"
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
              </NavigationMenuList>
            </NavigationMenu>
            <div className="relative flex items-center rounded-full bg-white border border-gray-300 z-50">
              <input
                type="text"
                placeholder="Search..."
                className="py-2 pl-4 pr-10 w-full sm:w-64 outline-none text-gray-900"
                value={data}
                onChange={(e) => setData(e.target.value)}
                onKeyUp={handleKeyPress}
              />
              <button
                type="button"
                className="absolute right-0 top-0 bottom-0 px-3"
                onClick={handleSearchClick}
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
                      <NavigationMenuTrigger className="z-50">
                        Dashboard
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="z-50">
                        <ul className="flex flex-col gap-2 pl-4 pr-4 pt-2 pb-2">
                          <li>
                            <NavigationMenuLink
                              href="/profile"
                              className="text-black hover:text-gray-300"
                            >
                              <FaUser className="inline-block mr-2" />
                              Profile
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <Button
                              variant="text"
                              onClick={handleLogout}
                              className="text-black hover:text-gray-300"
                            >
                              <IoClose className="inline-block mr-2" />
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
                          <FaShoppingCart className="inline-block mr-2" />
                          Cart
                        </Button>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && isMobile && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:hidden absolute top-0 left-0 w-4/5 h-full bg-gray-900 bg-opacity-90 flex flex-col items-start justify-start z-50"
        >
          <div className="px-4 pt-6 pb-3 space-y-3 w-full">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className="text-white hover:text-gray-300"
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="z-50">
                    Catalog
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-50">
                    <ul className="flex flex-col gap-2 pl-4 pr-4 pt-2 pb-2">
                      <li>
                        <NavigationMenuLink
                          href="/Web development"
                          className="text-white hover:text-gray-300"
                        >
                          Web Development
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/Android development"
                          className="text-white hover:text-gray-300"
                        >
                          Android Development
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/Devops"
                          className="text-white hover:text-gray-300"
                        >
                          DevOps
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/Blockchain"
                          className="text-white hover:text-gray-300"
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
              </NavigationMenuList>
            </NavigationMenu>
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
                      <NavigationMenuLink
                        href="/profile"
                        className="text-black hover:text-gray-300"
                      >
                        <FaUser className="inline-block mr-2" />
                        Profile
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Button
                        variant="text"
                        onClick={handleLogout}
                        className="text-black hover:text-gray-300"
                      >
                        <IoClose className="inline-block mr-2" />
                        Logout
                      </Button>
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
                          <FaShoppingCart className="inline-block mr-2" />
                          Cart
                        </Button>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        href="/profile"
                        className="text-black hover:text-gray-300"
                      >
                        <Button variant="outline">My Profile</Button>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                {role === "student" && (
                  <>
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuLink
                            href="/Enrolled-courses"
                            className="text-black hover:text-gray-300"
                          >
                            <Button variant="outline">Enrolled Courses</Button>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuLink
                            href="/Wishlist"
                            className="text-black hover:text-gray-300"
                          >
                            <Button variant="outline">Wishlist</Button>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </>
                )}

                {role === "instructor" && (
                  <>
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuLink
                            href="/dashboard"
                            className="text-black hover:text-gray-300"
                          >
                            <Button variant="outline">Dashboard</Button>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuLink
                            href="/mycourse"
                            className="text-black hover:text-gray-300"
                          >
                            <Button variant="outline">My courses</Button>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>{" "}
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuLink
                            href="/add-course"
                            className="text-black hover:text-gray-300"
                          >
                            <Button variant="outline">Add course</Button>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>{" "}
                  </>
                )}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        href="/settings"
                        className="text-black hover:text-gray-300"
                      >
                        <Button variant="outline">Settings</Button>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
