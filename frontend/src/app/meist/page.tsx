import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import MeistClient from "@/components/MeistClient";

export const metadata: Metadata = {
  title: "Meist | Karge Cafe",
  description: "Tutvu meie looga ja võta ühendust. Learn about our story and get in touch.",
};

export default function MeistPage() {
  return (
    <>
      <Navigation />
      <MeistClient />
    </>
  );
}
