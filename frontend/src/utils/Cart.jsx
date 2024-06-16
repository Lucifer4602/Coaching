import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { Separator } from "../components/ui/separator";
import { Pnav } from "./ProfileComp/Pnav";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

export const Cart = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const authToken = select?.authToken;

  const [cartItems, setCartItems] = useState([]);
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
        setCartItems(response.data.data.cart);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (select?._id && authToken) {
      fetchData();
    }
  }, [select?._id, authToken]);

  const handleRemoveFromCart = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/cart/removeCart`,
        {
          params: { userId: select?._id, courseId: itemId },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const updatedCartItems = cartItems.filter(
          (item) => item._id !== itemId
        );
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleMoveToWishlist = async (itemId) => {
    try {
      await handleRemoveFromCart(itemId);

      const response = await axios.post(
        `http://localhost:3000/api/v1/cart/addWishlist`,
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
        console.log("Item moved to wishlist");
      }
    } catch (error) {
      console.error("Error moving to wishlist:", error);
    }
  };

  const totalAmount = cartItems.reduce(
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
              <div className="text-white text-lg mb-4">Your Cart</div>
              {loading ? (
                <div className="text-white">Loading...</div>
              ) : cartItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {cartItems.map((item) => (
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
                      <div className="flex justify-end mt-4">
                        <Button
                          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                          onClick={() => handleMoveToWishlist(item._id)}
                        >
                          Save for Later
                        </Button>
                        <Button
                          className="px-4 py-2 bg-red-500 text-white rounded-md"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          Remove from Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-white">Your cart is empty.</div>
              )}

              {/* Display total amount */}
              {cartItems.length > 0 && (
                <div className="mt-8">
                  <div className="text-white font-semibold">
                    Total Amount: ₹{totalAmount}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
