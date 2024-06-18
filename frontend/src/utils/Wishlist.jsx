import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { Separator } from "../components/ui/separator";
import { Pnav } from "./ProfileComp/Pnav";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Wishlist = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const authToken = select?.authToken;

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex flex-col h-screen">
      <Navbar className="sticky top-0 left-0 right-0 z-10" />
      <Separator className="bg-slate-900" />
      <div className="flex flex-1">
        <Pnav className="w-48 bg-slate-900 min-h-screen sticky top-0" />
        <div className="flex-1 bg-slate-900 overflow-hidden">
          <ScrollArea className="h-full overflow-y-auto">
            <div className="p-4">
              <div className="text-white text-lg mb-4">Your Wishlist</div>
              {loading ? (
                <div className="text-white">Loading...</div>
              ) : wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {wishlist.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <img
                        src={item.thumbnail}
                        alt="Course Thumbnail"
                        className="h-40 w-full object-cover rounded-lg mb-2"
                      />
                      <div className="font-semibold text-lg mb-2">
                        {item.courseName}
                      </div>
                      <div className="text-gray-600">
                        {item.instructor.firstName} {item.instructor.lastName}
                      </div>
                      <div className="text-gray-600 mt-2">
                        {item.ratingAndReview.length} Ratings
                      </div>
                      <div className="font-semibold mt-2">₹{item.price}</div>
                      <div className="flex flex-col justify-end gap-3">
                        <Button
                          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                          onClick={() => handleAddToCart(item._id)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          className="px-4 py-2 bg-red-500 text-white rounded-md"
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
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
                    onClick={handleAddAllToCart}
                  >
                    Add All to Cart
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
