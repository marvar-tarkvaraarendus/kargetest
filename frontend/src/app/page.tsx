import Navigation from "@/components/Navigation";
import HomeClient from "@/components/HomeClient";
import { getAllCookies } from "@/lib/db";

// Use dynamic rendering (no static generation at build time)
export const dynamic = "force-dynamic";

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

export default async function HomePage() {
  const cookies = await getAllCookies();

  return (
    <>
      <Navigation />
      <HomeClient cookies={cookies} />
    </>
  );
}
