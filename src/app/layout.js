import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CategoryFoodProvider } from "@/_provider/CategoryFoodProvider";
import { CartProvider } from "@/_provider/CartProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NomNom | Food Delivery",
  description: "Swift food delivery — order your favorite meals fast and fresh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <CategoryFoodProvider>
            {children}
            <Toaster richColors position="top-right" />
          </CategoryFoodProvider>
        </CartProvider>
      </body>
    </html>
  );
}
