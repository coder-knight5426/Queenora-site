import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import CartProvider from "../components/CartProvider";
import MiniCart from "../components/MiniCart";

const interSans = Inter({
  variable: "--font-sans-var",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display-var",
  subsets: ["latin"],
  display: "swap",
});

// Build-safe metadataBase: tolerate values without protocol
const rawSite = process.env.NEXT_PUBLIC_SITE_URL;
let safeMetadataBase = undefined;
if (rawSite) {
  try {
    const withProtocol = rawSite.startsWith("http://") || rawSite.startsWith("https://")
      ? rawSite
      : `https://${rawSite}`;
    safeMetadataBase = new URL(withProtocol);
  } catch {}
}

export const metadata = {
  title: {
    default: "Queenora - Fine Jewelry",
    template: "%s | Queenora",
  },
  description: "Discover handcrafted fine jewelry. Powered by WooCommerce.",
  ...(safeMetadataBase ? { metadataBase: safeMetadataBase } : {}),
  openGraph: {
    title: "Queenora - Fine Jewelry",
    description: "Discover handcrafted fine jewelry.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
      >
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <MiniCart />
        </CartProvider>
      </body>
    </html>
  );
}
