"use client";

import BabyIcon from "@/_icons/BabyIcon";
import CancelIcon from "@/_icons/CancelIcon";

export default function SuccessDialog({ open, onClose, onBackHome }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="relative max-h-[calc(100vh-2rem)] w-full max-w-[calc(100%-2rem)] overflow-y-auto rounded-2xl bg-white p-6 text-center shadow-[0_32px_64px_rgba(15,23,42,0.18)] sm:max-w-xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-zinc-100 p-2 transition hover:bg-zinc-200"
          aria-label="Close success dialog"
        >
          <CancelIcon />
        </button>

        <p className="text-lg font-semibold">
          Your order has been successfully placed!
        </p>

        <div className="flex justify-center py-6">
          <BabyIcon />
        </div>

        <button
          type="button"
          onClick={onBackHome}
          className="rounded-full bg-zinc-100 px-6 py-2 text-sm font-medium transition hover:bg-zinc-200"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
