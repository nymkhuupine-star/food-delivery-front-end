import "./globals.css";
import { Toaster } from "sonner";
import { CategoryFoodProvider } from "@/_provider/CategoryFoodProvider";
import { CartProvider } from "@/_provider/CartProvider";

export const metadata = {
  title: "NomNom | Food Delivery",
  description: "Swift food delivery — order your favorite meals fast and fresh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans" suppressHydrationWarning>
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
