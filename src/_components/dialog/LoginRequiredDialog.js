"use client";

import CancelIcon from "@/_icons/CancelIcon";
import Link from "next/link";

export default function LoginRequiredDialog({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 px-4">
      <div
        aria-labelledby="login-required-title"
        aria-modal="true"
        role="dialog"
        className="relative w-full max-w-[360px] rounded-[24px] bg-white px-6 py-7 text-center shadow-[0_24px_80px_rgba(15,23,42,0.24)]"
      >
        <button
          aria-label="Close login required dialog"
          className="absolute right-4 top-4 rounded-full bg-zinc-100 p-2"
          onClick={onClose}
          type="button"
        >
          <CancelIcon />
        </button>

        <h2
          id="login-required-title"
          className="mx-auto max-w-[220px] text-2xl font-semibold leading-8 text-[#18181B]"
        >
          You need to log in first
        </h2>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <Link
            href="/login"
            className="flex h-11 items-center justify-center rounded-xl bg-[#18181B] text-sm font-medium text-white transition hover:bg-[#27272A]"
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="flex h-11 items-center justify-center rounded-xl border border-[#E4E4E7] bg-white text-sm font-medium text-[#18181B] transition hover:bg-[#F4F4F5]"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
