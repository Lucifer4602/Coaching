import React, { useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";
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
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { update } from "@/redux/FormSlice";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const [isClicked, setClick] = useState(false);
  const auth = select?.auth === "true";
  const handleSearchClick = () => {
    console.log({ auth });
    setClick(!isClicked);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/course/getAllCourses"
        );

        const x = response.data.data;
        dispatch(update({ ...select, courses: x }));
      } catch (er) {
        console.log(er);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-row justify-evenly bg-zinc-500 p-3 flex-wrap sticky">
      <div className="flex flex-row gap-1">
        <img
          src="https://th.bing.com/th/id/OIP.31Ucf--dxHuaCmG0XOebtwHaE7?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          height="20px"
          width="60px"
          className="rounded-full"
        />
        <div className="content-center">Dummy</div>
      </div>

      <div className="flex flex-row gap-4 flex-wrap">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Catalog</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col gap-2 flex-wrap pl-10 pr-10 pt-2 pb-2">
                  <li>
                    <NavigationMenuLink href="/Web development">
                      Web Dev
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="/Android development">
                      Andro Dev
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="/Devops">
                      Devops
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="/Blockchain">
                      Blockchain
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/aboutUs">About Us</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/contactUs">
                Contact Us
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex flex-row gap-2">
        <>
          {!auth ? ( // Change to !auth to show Sign In and Sign Up when not authenticated
            <>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/login">
                      <Button variant="outline">Sign In</Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/signUp">
                      <Button variant="outline">Sign Up</Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </>
          ) : null}
        </>

        <div className="relative rounded-xl">
          {isClicked && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "150px" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white search-input"
            >
              <div className="rounded-full">
                <input
                  type="text"
                  placeholder="search..."
                  className="rounded-full w-auto h-9 outline-none"
                />
              </div>
            </motion.div>
          )}
          <Button
            variant="outline"
            className={`rounded-full ${
              !isClicked ? "relative" : "absolute top-0 -right-8"
            }`}
            onClick={handleSearchClick}
          >
            {isClicked ? <IoClose /> : <FaSearch />}
          </Button>
        </div>
      </div>
    </div>
  );
};
