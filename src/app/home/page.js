"use client";

import DishesCategory from "@/_components/category/DishesCategory";
import { SnowCanvas } from "@/_components/SnowCanvas";
import Footer from "@/_features/Footer";
import Header from "@/_features/Header";
import HeroSection from "@/_features/home/HeroSection";

export default function Home({ formik }) {
  return (
    <div>
      <SnowCanvas />
      <Header />
      <HeroSection className=" flex items-center justify-center" />

      <Footer />
    </div>
  );
}
