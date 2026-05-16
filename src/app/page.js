"use client";

import DishesCategory from "@/_components/category/DishesCategory";
import FoodList from "@/_components/food/FoodList";
import { HomeFoodList } from "@/_components/food/HomeFoodList";
import OrderDetail from "@/_components/order/OrderDetail";
import { SnowCanvas } from "@/_components/SnowCanvas";
import Footer from "@/_features/Footer";
import Header from "@/_features/Header";
import HeroSection from "@/_features/HeroSection";
import { useCart } from "@/_provider/CartProvider";

export default function Home() {
  const { isOrderOpen, setIsOrderOpen } = useCart();
  return (
    <div>
      <SnowCanvas />
      <Header />
      <HeroSection className=" flex items-center justify-center" />
      <HomeFoodList />
      {isOrderOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px] transition-opacity"
            onClick={() => setIsOrderOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-40 w-full max-w-[535px]">
            <OrderDetail />
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
