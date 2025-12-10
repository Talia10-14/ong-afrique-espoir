import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Jean Guillaume - Designer Graphique Polyvalent",
  description: "Portfolio de Jean Guillaume, designer graphique polyvalent spécialisé en design graphique, vidéo, e-books et présentations. Créativité, technique et sens marketing.",
  keywords: ["designer graphique", "design", "vidéo", "montage", "e-books", "présentations", "branding", "identité visuelle"],
  authors: [{ name: "Jean Guillaume" }],
  openGraph: {
    title: "Jean Guillaume - Designer Graphique Polyvalent",
    description: "Portfolio de Jean Guillaume, designer graphique polyvalent",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
