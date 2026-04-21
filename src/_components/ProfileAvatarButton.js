"use client";

import { getCurrentUser, USER_UPDATED_EVENT } from "@/lib/orderStorage";
import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfileAvatarButton() {
  const [displayName, setDisplayName] = useState("Profile");

  useEffect(() => {
    const syncUser = () => {
      const currentUser = getCurrentUser();
      setDisplayName(
        currentUser?.firstName?.trim() ||
          currentUser?.email?.trim() ||
          "Profile"
      );
    };

    syncUser();

    window.addEventListener(USER_UPDATED_EVENT, syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener(USER_UPDATED_EVENT, syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  return (
    <button
      aria-label={displayName}
      className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/80 bg-[radial-gradient(circle_at_30%_30%,#f5f3ff,#c084fc_52%,#8b5cf6_90%)] shadow-[0_10px_24px_rgba(139,92,246,0.18)] transition hover:scale-[1.02]"
      type="button"
    >
      <div className="absolute inset-[2px] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.88),rgba(255,255,255,0.16)_42%,transparent_68%)]" />
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] text-white">
        <UserRound className="h-5 w-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.2)]" />
      </div>
    </button>
  );
}
