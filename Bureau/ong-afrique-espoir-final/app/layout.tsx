import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ONG Afrique Espoir",
  description: "Site officiel de l'ONG Afrique Espoir - Œuvrer pour un avenir meilleur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${roboto.variable} antialiased`}
      >
        {children}
        
        {/* FedaPay SDK */}
        <Script
          src="https://cdn.fedapay.com/checkout.js?v=1.1.7"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
