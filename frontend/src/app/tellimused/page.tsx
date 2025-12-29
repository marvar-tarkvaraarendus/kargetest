import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import TellimusedClient from "@/components/TellimusedClient";

export const metadata: Metadata = {
  title: "Tellimused | Karge Cafe",
  description: "Tee tellimus meie maitsvate küpsiste ja kohvi jaoks. Place an order for our delicious cookies and coffee.",
};

export default function TellimusedPage() {
  return (
    <>
      <Navigation />
      <TellimusedClient />
    </>
  );
}
