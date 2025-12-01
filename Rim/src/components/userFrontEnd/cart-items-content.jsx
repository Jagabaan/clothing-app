import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQty } from "@/storage/shop/cart-slice";
import { toast } from "sonner";


function UserCartItemsContent({ cartItem }) {

    const {user} = useSelector(state=>state.auth)

    const dispatch = useDispatch()

function handleUpdateQuantity(getCartItem, typeOfAction) {
  const newQty =
    typeOfAction === "plus"
      ? getCartItem?.quantity + 1
      : getCartItem?.quantity - 1;

  dispatch(
    updateCartQty({
      userId: user?.id,
      productId: getCartItem?.productId,
      quantity: newQty,
    })
  ).then((data) => {
    if (data?.payload?.success) {
      // ✅ If item is deleted (quantity goes to 0)
      if (newQty <= 0) {
        toast.success("Item removed from cart successfully!");
      } else {
        toast.success("Cart updated successfully!");
      }
    } else {
      toast.error("Something went wrong while updating your cart.");
    }
  });
}


    function handleCartItemDelete(getCartItem){
        dispatch(deleteCartItem({userId: user?.id, productId: getCartItem?.productId}))
    }

  return (
    <div className="flex items-center gap-4 border-b pb-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm md:text-base truncate">
          {cartItem?.title}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          <Button variant="outline" size="icon"
           className="h-8 w-8 " disabled={cartItem?.quantity === 1} onClick={()=>handleUpdateQuantity(cartItem, 'minus')} >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button variant="outline" size="icon"
         className="h-8 w-8"  onClick={()=>handleUpdateQuantity(cartItem, 'plus')} >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="font-semibold">
            ${(cartItem?.price * cartItem?.quantity).toFixed(2)}
          </p>
          <Trash onClick={()=>handleCartItemDelete(cartItem)} className="w-4 h-4 text-red-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
