// "use client";

// import CancelIcon from "@/_icons/CancelIcon";
// import LineIcon from "@/_icons/LineIcon";
// import ShoppingCardIcon from "@/_icons/ShoppingCartIcon";

// import { useCart } from "@/_provider/CartProvider";
// import OrderFoodIcon from "@/_icons/OrderFoodIcon";
// import OrderDateIcon from "@/_icons/OrderDateIcon";
// import OrderMapIcon from "@/_icons/OrderMapIcon";
// import { Badge } from "@/components/ui/badge";

// export default function Order() {
//   return (
//     <>
//       <div className="bg-neutral-700 rounded-s-2xl  w-[535px] h-[1024px]  flex flex-col">
//         <div>
//           <button onClick={() => setIsOrderOpen(false)}></button>
//         </div>

//         <div className="flex flex-row pl-[34.5px] pt-[8px] ">
//           <ShoppingCardIcon />
//           <p className=" text-white ml-[10px]">Order detail</p>

//           <button className=" px-3 py-3 bg-gray-200 ml-[320px] mb-[20px] rounded-full">
//             <CancelIcon />
//           </button>
//         </div>
//         <div className=" bg-white h-[44px] w-[471px] flex justify-center ml-[30px] items-center rounded-xl ">
//           <button className="bg-white w-[227.5px] h-[36px] rounded-xl text-black">
//             {" "}
//             Card
//           </button>
//           <button className="bg-red-500  w-[227.5px] h-[36px] text-white rounded-xl">
//             Order
//           </button>
//         </div>
//         <div className="w-[471px] h-[532px] bg-white rounded-lg ml-[30px] mt-[30px] p-[16px] ">
//           <div className="mb-[20px]">
//             {" "}
//             <p>Order history</p>
//           </div>

//           <div className="flex flex-row">
//             <p> total price</p>
//             <p> (#20156)</p>
//             <Badge className="rounded-lg border border-red-500 bg-white text-black ml-[240px]">
//               <p>Pending</p>
//             </Badge>
//           </div>
//           <div className="flex flex-row">
//             <OrderFoodIcon />
//             <p>Sunshine Stackers </p>
//             <p> x 1</p>
//           </div>
//           <div className="flex flex-row">
//             <OrderDateIcon />
//             <p>2024/12/20</p>
//             <p> x 1</p>
//           </div>
//           <div className="flex flex-row">
//             <OrderMapIcon />
//             <p>Sunshine Stackers </p>
//             <p> x 1</p>
//           </div>

//           <LineIcon className />
//           <div className="flex flex-row justify-between pt-[20px] pb-[20px]">
//             <p>Total </p>

//             <p></p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import CancelIcon from "@/_icons/CancelIcon";
import LineIcon from "@/_icons/LineIcon";
import ShoppingCardIcon from "@/_icons/ShoppingCartIcon";

import { useCart } from "@/_provider/CartProvider";
import OrderFoodIcon from "@/_icons/OrderFoodIcon";
import OrderDateIcon from "@/_icons/OrderDateIcon";
import OrderMapIcon from "@/_icons/OrderMapIcon";
import { Badge } from "@/components/ui/badge";

export default function Order() {
  const { cartItems, removeFromCart, isOrderOpen, setIsOrderOpen } = useCart();

  const shipping = 5.99;
  const grandTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const total = grandTotal + shipping;

  if (!isOrderOpen) return null;

  return (
    <div className="bg-neutral-700 rounded-s-2xl w-[535px] h-[1024px] flex flex-col p-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsOrderOpen(false)}
          className="p-2 bg-gray-200 rounded-full"
        >
          <CancelIcon />
        </button>
      </div>

      <div className="flex flex-row items-center gap-2 mb-4">
        <ShoppingCardIcon />
        <p className="text-white text-lg">Order detail</p>
      </div>

      <div className="flex bg-white rounded-xl h-[44px] mb-4">
        <button className="bg-white w-1/2 text-black rounded-l-xl">Card</button>
        <button className="bg-red-500 w-1/2 text-white rounded-r-xl">
          Order
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 flex-1 overflow-y-auto">
        <div className="mb-4 flex justify-between items-center">
          <p>Order history</p>
          <Badge className="rounded-lg border border-red-500 bg-white text-black">
            Pending
          </Badge>
        </div>

        {cartItems.length === 0 && (
          <p className="text-gray-400">No items in cart</p>
        )}

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center mb-2"
          >
            <div className="flex items-center gap-2">
              <OrderFoodIcon />
              <p>{item.foodName}</p>
            </div>
            <p>x {item.qty}</p>
            <p>${item.totalPrice.toFixed(2)}</p>
            <button onClick={() => removeFromCart(item._id)}>
              <CancelIcon />
            </button>
          </div>
        ))}

        <LineIcon className="my-4" />

        <div className="flex justify-between font-bold text-lg">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
