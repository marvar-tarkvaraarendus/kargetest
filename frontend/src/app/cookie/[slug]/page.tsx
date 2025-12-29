import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import CookieDetailClient from "@/components/CookieDetailClient";
import { getCookieBySlug } from "@/lib/db";
import { getLocalizedText } from "@/lib/utils";

interface CookiePageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CookiePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const cookie = await getCookieBySlug(slug);
    
    if (!cookie) {
      return {
        title: "Cookie not found | Karge Cafe",
      };
    }

    const nameEt = getLocalizedText(cookie.name, "et");
    const nameEn = getLocalizedText(cookie.name, "en");
    const descriptionEt = getLocalizedText(cookie.description, "et");

    return {
      title: `${nameEt} | Karge Cafe`,
      description: descriptionEt,
      openGraph: {
        title: `${nameEn} | Karge Cafe`,
        description: getLocalizedText(cookie.description, "en"),
        images: [cookie.imagePath],
      },
    };
  } catch {
    return {
      title: "Karge Cafe",
    };
  }
}

// Use dynamic rendering (no static generation at build time)
export const dynamic = "force-dynamic";

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

export default async function CookiePage({ params }: CookiePageProps) {
  const { slug } = await params;
  
  try {
    const cookie = await getCookieBySlug(slug);

    if (!cookie) {
      notFound();
    }

    return (
      <>
        <Navigation />
        <CookieDetailClient cookie={cookie} />
      </>
    );
  } catch {
    notFound();
  }
}
