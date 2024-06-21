import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Separator } from "../components/ui/separator";
import { Pnav } from "./ProfileComp/Pnav";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { update } from "@/redux/FormSlice";

export const Wishlist = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const authToken = select?.authToken;
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/profile/getUserDetails`,
          {
            params: { id: select?._id },
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setWishlist(response.data.data.wishlist);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (select?._id && authToken) {
      fetchData();
    }
  }, [select?._id, authToken]);

  const fetchAverageRating = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/course/getAverageRating`,
        {
          params: { courseId: courseId },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.avgRating; // Assuming the API returns avgRating field
    } catch (error) {
      console.error("Error fetching average rating:", error);
      return 0; // Return default value or handle error accordingly
    }
  };

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/cart/removeWishlist`,
        {
          params: { userId: select?._id, courseId: itemId },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const updatedWishlist = wishlist.filter((item) => item._id !== itemId);
        setWishlist(updatedWishlist);
        toast.success("Item removed from wishlist successfully");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  const handleAddToCart = async (itemId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/cart/addCart`,
        {
          userId: select?._id,
          courseId: itemId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Item added to cart");
        await handleRemoveFromWishlist(itemId);
        toast.success("Item added to cart successfully");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const handleAddAllToCart = async () => {
    try {
      const itemIds = wishlist.map((item) => item._id);

      for (const itemId of itemIds) {
        await handleAddToCart(itemId);
      }

      setWishlist([]);
      toast.success("All items added to cart successfully");
    } catch (error) {
      console.error("Error adding all to cart:", error);
      toast.error("Failed to add all items to cart");
    }
  };

  const totalAmount = wishlist.reduce(
    (total, item) => total + parseInt(item.price),
    0
  );

  useEffect(() => {
    // Fetch average ratings for all wishlist items
    const fetchRatings = async () => {
      for (const item of wishlist) {
        const rating = await fetchAverageRating(item._id);
        setRatings((prevRatings) => ({
          ...prevRatings,
          [item._id]: rating,
        }));
      }
    };

    if (wishlist.length > 0) {
      fetchRatings();
    }
  }, [wishlist]);

  const renderStarRating = (itemId) => {
    if (ratings[itemId] === undefined) {
      return <div>Loading...</div>;
    }

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= ratings[itemId]) {
        stars.push(
          <span key={i} className="text-yellow-500">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <Navbar />
      <Separator className="bg-slate-700" />
      <div className="flex flex-row h-screen">
        <Pnav />
        <div className="w-full bg-gradient-to-b from-gray-900 to-black mx-auto">
          <ScrollArea className="h-[90%] w-[90%] m-auto mt-10 mb-10 overflow-scroll overflow-x-hidden scrollbar-hide">
            <div className="p-4">
              <div className="text-white text-3xl font-bold mb-4">
                Your Wishlist
              </div>
              {loading ? (
                <div className="text-white">Loading...</div>
              ) : wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {wishlist.map((item) => (
                    <div
                      key={item._id}
                      className="bg-transparent rounded-lg shadow-md p-4 relative hover:bg-gray-800 transition duration-300 ease-in-out cursor-pointer"
                    >
                      <img
                        src={item.thumbnail}
                        alt="Course Thumbnail"
                        className="h-40 w-full object-cover rounded-lg mb-2"
                      />
                      <div className="font-semibold text-lg mb-2 text-white">
                        {item.courseName}
                      </div>
                      <div className="text-gray-400">
                        {item.instructor.firstName} {item.instructor.lastName}
                      </div>
                      <div className="text-gray-400 mt-2">
                        {renderStarRating(item._id)}
                        {"  "}
                        {item.ratingAndReview.length}
                        {" Ratings"}
                      </div>
                      <div className="font-semibold mt-2 text-white">
                        ₹{item.price}
                      </div>
                      <div className="flex flex-col justify-end gap-3">
                        <Button
                          className="px-4 py-2 bg-cyan-500 text-white rounded-md mr-2 hover:bg-cyan-600 transition duration-300 z-40"
                          onClick={() => handleAddToCart(item._id)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          className="px-4 py-2 bg-neon-gray-500 text-white rounded-md hover:bg-neon-gray-600 transition duration-300 z-40"
                          onClick={() => handleRemoveFromWishlist(item._id)}
                        >
                          Remove from Wishlist
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-white">
                  No courses found in your wishlist.
                </div>
              )}

              {/* Display total amount and Add All to Cart button */}
              {wishlist.length > 0 && (
                <div className="mt-8">
                  <div className="text-white font-semibold">
                    Total Amount: ₹{totalAmount}
                  </div>
                  <Button
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                    onClick={handleAddAllToCart}
                  >
                    Add All to Cart
                  </Button>
                </div>
              )}
            </div>
            <div className="mt-36"></div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
