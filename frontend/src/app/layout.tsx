import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karge Cafe | Tallinn",
  description: "Maitsevad küpsised ja kohv Tallinnas. Delicious cookies and coffee in Tallinn.",
  keywords: ["cafe", "kohvik", "Tallinn", "cookies", "küpsised", "coffee", "kohv", "karge"],
  authors: [{ name: "Karge Cafe" }],
  openGraph: {
    title: "Karge Cafe | Tallinn",
    description: "Maitsevad küpsised ja kohv Tallinnas",
    type: "website",
    locale: "et_EE",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="et" suppressHydrationWarning>
      <body className="font-body antialiased">
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
