"use client";

import CancelIcon from "@/_icons/CancelIcon";
import ShoppingCardIcon from "@/_icons/ShoppingCartIcon";
import FoodIcon from "@/_icons/FoodIcon";
import { useCart } from "@/_provider/CartProvider";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import LineIcon from "@/_icons/LineIcon";
import OrderMiniCard from "./OrderMiniCard";
import Order from "./Order";
import SuccessDialog from "../dialog/SuccessDialog";
import LoginRequiredDialog from "../dialog/LoginRequiredDialog";
import {
  addStoredOrder,
  createStoredOrder,
  getCurrentUser,
  updateCurrentUser,
} from "@/lib/orderStorage";

export default function OrderDetail() {
  const {
    cartItems,
    removeFromCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    clearCart,
    isOrderOpen,
    setIsOrderOpen,
  } = useCart();
  const [isCardView, setIsCardView] = useState(true);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  useEffect(() => {
    if (!isOrderOpen) return;

    const currentUser = getCurrentUser();

    if (currentUser?.address?.trim()) {
      setDeliveryAddress((prev) => prev || currentUser.address.trim());
    }
  }, [isOrderOpen]);

  if (!isOrderOpen) return null;

  const validateAddress = () => {
    if (!deliveryAddress.trim()) {
      setAddressError("Please complete your address");
      return false;
    }

    setAddressError("");
    return true;
  };

  const handleAddressChange = (event) => {
    setDeliveryAddress(event.target.value);

    if (addressError && event.target.value.trim()) {
      setAddressError("");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    if (!validateAddress()) return;

    const token = window.localStorage.getItem("token");

    if (!token) {
      setIsLoginRequiredOpen(true);
      return;
    }

    const currentUser = getCurrentUser();
    const normalizedAddress = deliveryAddress.trim();
    const nextOrder = createStoredOrder({
      cartItems,
      deliveryAddress: normalizedAddress,
      user: currentUser,
      shipping,
    });

    addStoredOrder(nextOrder);

    if (currentUser) {
      updateCurrentUser({ address: normalizedAddress });
    }

    clearCart();
    setIsSuccessOpen(true);
  };

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.totalPrice),
    0
  );
  const shipping = 5.99;
  const total = grandTotal + shipping;
  const isAddressInvalid = Boolean(addressError);

  return (
    <div className="flex h-screen w-full max-w-[535px] flex-col overflow-y-auto rounded-s-[28px] bg-[#3F3F46] px-5 py-3">
      <div className="flex items-center px-2 pt-1">
        <ShoppingCardIcon />
        <p className="ml-[10px] text-white">Order detail</p>

        <button
          className="ml-auto rounded-full border border-white/15 bg-white/10 p-2.5 transition hover:bg-white/15"
          onClick={() => setIsOrderOpen(false)}
          type="button"
        >
          <CancelIcon />
        </button>
      </div>

      <div className="mt-3 flex rounded-full bg-white p-1 shadow-sm">
        <button
          className={`h-9 w-1/2 rounded-full text-sm font-medium transition ${
            isCardView ? "bg-[#EF4444] text-white" : "text-[#3F3F46]"
          }`}
          onClick={() => setIsCardView(true)}
          type="button"
        >
          Card
        </button>
        <button
          className={`h-9 w-1/2 rounded-full text-sm font-medium transition ${
            !isCardView ? "bg-[#EF4444] text-white" : "text-[#3F3F46]"
          }`}
          onClick={() => setIsCardView(false)}
          type="button"
        >
          Order
        </button>
      </div>

      {isCardView ? (
        <>
          <div className="mt-3 flex min-h-[620px] flex-col rounded-[24px] bg-white px-4 py-4 shadow-[0_16px_45px_rgba(15,23,42,0.14)]">
            <p className="text-sm font-medium text-[#3F3F46]">My cart</p>

            <div className="mt-4 flex-1 space-y-5 overflow-y-auto overflow-x-hidden pr-1">
              {cartItems.length === 0 ? (
                <div className="flex h-[182px] flex-col items-center justify-center rounded-[20px] bg-[#F4F4F5] p-4 text-center">
                  <FoodIcon />
                  <p className="mt-3 text-base font-bold leading-7 text-zinc-950">
                    Your cart is empty
                  </p>
                  <p className="text-xs leading-4 text-zinc-500">
                    Hungry? Add some delicious dishes to your cart and satisfy
                    your cravings!
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <OrderMiniCard
                    key={item._id}
                    item={item}
                    removeFromCart={removeFromCart}
                    increaseCartItemQuantity={increaseCartItemQuantity}
                    decreaseCartItemQuantity={decreaseCartItemQuantity}
                  />
                ))
              )}
            </div>

            <div className="mt-5 border-t border-[#E4E4E7] pt-4">
              <p className="text-[15px] font-medium text-[#71717A]">
                Delivery location
              </p>
              <Input
                aria-invalid={isAddressInvalid}
                className={`mt-3 h-[56px] rounded-xl border bg-white px-4 text-sm shadow-none ${
                  isAddressInvalid
                    ? "border-[#F87171] text-[#18181B] placeholder:text-[#A1A1AA] focus-visible:border-[#F87171] focus-visible:ring-[#FCA5A5]/40"
                    : "border-[#E4E4E7] text-[#18181B] placeholder:text-[#A1A1AA] focus-visible:border-[#EF4444] focus-visible:ring-[#FCA5A5]/40"
                }`}
                onBlur={validateAddress}
                onChange={handleAddressChange}
                placeholder="Please complete your address"
                type="text"
                value={deliveryAddress}
              />
              {isAddressInvalid && (
                <p className="mt-2 text-sm text-[#EF4444]">{addressError}</p>
              )}
            </div>
          </div>

          <div className="mt-4 rounded-[24px] bg-white px-4 py-5 shadow-[0_16px_45px_rgba(15,23,42,0.14)]">
            <p className="text-[15px] font-semibold text-[#71717A]">
              Payment info
            </p>

            <div className="mt-5 flex items-center justify-between text-base text-[#71717A]">
              <p>Items</p>
              <p className="font-semibold text-[#18181B]">
                ${grandTotal.toFixed(2)}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between text-base text-[#71717A]">
              <p>Shipping</p>
              <p className="font-semibold text-[#18181B]">
                ${shipping.toFixed(2)}
              </p>
            </div>

            <LineIcon className="mt-5 w-full" />

            <div className="mt-5 flex items-center justify-between text-[15px]">
              <p className="text-[#71717A]">Total</p>
              <p className="text-[28px] font-semibold leading-none text-[#18181B]">
                ${total.toFixed(2)}
              </p>
            </div>

            <button
              className={`mt-5 h-[44px] w-full rounded-full text-sm font-medium text-white transition ${
                cartItems.length === 0
                  ? "cursor-not-allowed bg-[#FCA5A5]"
                  : "bg-[#EF4444] hover:bg-[#DC2626]"
              }`}
              disabled={cartItems.length === 0}
              onClick={handleCheckout}
              type="button"
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <Order />
      )}

      <SuccessDialog
        open={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        onBackHome={() => {
          setIsSuccessOpen(false);
          setIsOrderOpen(false);
          setIsCardView(true);
          setAddressError("");
          setDeliveryAddress("");
        }}
      />
      <LoginRequiredDialog
        open={isLoginRequiredOpen}
        onClose={() => setIsLoginRequiredOpen(false)}
      />
    </div>
  );
}
