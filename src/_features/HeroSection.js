"use client";

import Image from "next/image";

export default function HeroSection({ className = "" }) {
  return (
    <section className={`bg-neutral-700 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Image
          src="/Hero.png"
          width={1440}
          height={570}
          priority
          alt="NomNom hero banner"
          sizes="(max-width: 1024px) 100vw, 1280px"
          className="h-auto w-full rounded-2xl object-cover"
        />
      </div>
    </section>
  );
}
