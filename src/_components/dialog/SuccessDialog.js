"use client";

import BabyIcon from "@/_icons/BabyIcon";
import CancelIcon from "@/_icons/CancelIcon";
import ShoppingCardIcon from "@/_icons/ShoppingCartIcon";

export default function SuccessDialog({
  open,
  onClose,
  onBackHome,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[664px] h-[439] rounded-2xl p-8 text-center relative">

       
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <CancelIcon />
        </button>

    
       

     
        <p className="text-lg font-semibold mb-6">
          Your order has been successfully placed!
        </p>


 <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center ">
            <BabyIcon />
          </div>
        </div>

        <button
          onClick={onBackHome}
          className="bg-zinc-100 px-6 py-2 rounded-full"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
