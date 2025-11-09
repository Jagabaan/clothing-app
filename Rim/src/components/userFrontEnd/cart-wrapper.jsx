import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "@/storage/shop/cart-slice";

function UserCartWrapper({ cartItems }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

  const total =
    cartItems?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) || 0;

  return (
    <SheetContent className="sm:max-w-md flex flex-col overflow-y-auto max-h-[90vh] p-6">
      <SheetHeader>
        <SheetTitle className="text-xl font-bold">Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-6 space-y-4 flex-1 overflow-y-auto pr-2">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item._id} cartItem={item} />
          ))
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        )}
      </div>

      {/* Sticky footer section */}
      <div className="border-t pt-4 mt-4 sticky bottom-0 bg-white">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-lg">Total</span>
          <span className="font-bold text-lg">${total.toFixed(2)}</span>
        </div>
        <Button className="w-full">Checkout</Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
