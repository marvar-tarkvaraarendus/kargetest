import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import MeistClient from "@/components/MeistClient";
import { getOpeningTimes, getContactInfo, getAboutStory } from "@/lib/db";

export const metadata: Metadata = {
  title: "Meist | Karge Cafe",
  description: "Tutvu meie looga ja võta ühendust. Learn about our story and get in touch.",
};

export default async function MeistPage() {
  const openingTimes = await getOpeningTimes();
  const contactInfo = await getContactInfo();
  const aboutStory = await getAboutStory();

  return (
    <>
      <Navigation />
      <MeistClient 
        openingTimes={openingTimes?.content || null} 
        contactInfo={contactInfo ? { phone: contactInfo.phone, email: contactInfo.email } : null}
        aboutStory={aboutStory ? { title: aboutStory.title, content: aboutStory.content } : null}
      />
    </>
  );
}
