"use client";

import Footer from "@/_features/Footer";
import Header from "@/_features/Header";
import HeroSection from "@/_features/home/HeroSection";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection className=" flex items-center justify-center" />

      <Footer />
    </div>
  );
}
