"use client";

import Image from "next/image";
import { MapPin, Clock, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { starPositions } from "@/lib/constants";

interface OpeningTimesContent {
  [day: string]: { open: string; close: string };
}

interface ContactInfoContent {
  phone: string;
  email: string;
}

interface AboutStoryContent {
  title: { et: string; en: string };
  content: { et: string; en: string };
}

interface MeistClientProps {
  openingTimes: OpeningTimesContent | null;
  contactInfo: ContactInfoContent | null;
  aboutStory: AboutStoryContent | null;
}

const DAY_LABELS: Record<string, { et: string; en: string }> = {
  monday: { et: "Esmaspäev", en: "Monday" },
  tuesday: { et: "Teisipäev", en: "Tuesday" },
  wednesday: { et: "Kolmapäev", en: "Wednesday" },
  thursday: { et: "Neljapäev", en: "Thursday" },
  friday: { et: "Reede", en: "Friday" },
  saturday: { et: "Laupäev", en: "Saturday" },
  sunday: { et: "Pühapäev", en: "Sunday" },
};

function formatOpeningHours(
  openingTimes: OpeningTimesContent | null,
  language: "et" | "en"
): string[] {
  if (!openingTimes) {
    return language === "et" 
      ? ["Avamisajad pole määratud"] 
      : ["Opening hours not set"];
  }

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const result: string[] = [];

  for (const day of days) {
    const times = openingTimes[day];
    if (!times) continue;

    const label = DAY_LABELS[day][language];
    if (times.open === "closed" || times.close === "closed") {
      result.push(language === "et" ? `${label}: Suletud` : `${label}: Closed`);
    } else {
      result.push(`${label}: ${times.open} - ${times.close}`);
    }
  }

  return result;
}

export default function MeistClient({ openingTimes, contactInfo, aboutStory }: MeistClientProps) {
  const { t, language } = useLanguage();

  const openingHoursDetails = formatOpeningHours(openingTimes, language);

  // Dynamic about story content with fallbacks
  const storyTitle = aboutStory?.title?.[language] || t("Meie lugu", "Our Story");
  const storyContent = aboutStory?.content?.[language] || t(
    "Karge sündis lihtsast unistusest: luua hubane nurk, kus erakordne kohv kohtub külalislahkusega. Alates ukse avamisest oleme pühendunud kogukonna teenimisele soojuse, kvaliteedi ja hoolega.",
    "Karge was born from a simple dream: to create a cozy corner where exceptional coffee meets genuine hospitality. Since opening our doors, we've been dedicated to serving our community with warmth, quality, and care."
  );

  const contactItems = [
    {
      icon: MapPin,
      title: t("Külasta meid", "Visit Us"),
      details: ["Müürivahe 28", "Tallinn, 10148", t("Eesti", "Estonia")],
    },
    {
      icon: Clock,
      title: t("Avamisajad", "Opening Hours"),
      details: openingHoursDetails,
    },
    {
      icon: Phone,
      title: t("Helista meile", "Call Us"),
      details: [contactInfo?.phone || "+372 1234 5678"],
    },
    {
      icon: Mail,
      title: t("E-post", "Email"),
      details: [contactInfo?.email || "hello@karge.ee"],
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/karge_tallinn/",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61559307929923",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <Image
          src="/assets/karge-kasi-keerd.png"
          alt=""
          width={768}
          height={768}
          className="absolute -right-40 -top-32 w-[28rem] md:w-[48rem] opacity-100 animate-fade-in"
        />
        <Image
          src="/assets/karge-kasi-tass.png"
          alt=""
          width={768}
          height={768}
          className="absolute -left-20 top-[40%] w-[28rem] md:w-[48rem] opacity-100 animate-fade-in"
        />
        <Image
          src="/assets/karge-kasi-kohv.png"
          alt=""
          width={576}
          height={576}
          className="absolute -right-16 -bottom-32 w-[24rem] md:w-[36rem] opacity-100 animate-fade-in"
        />
        {starPositions.map((star, index) => {
          // Extract percentage values from Tailwind classes (e.g., 'top-[5%]' -> '5%')
          const topValue = star.top.match(/\[(.+)\]/)?.[1] || '0';
          const leftValue = star.left.match(/\[(.+)\]/)?.[1] || '0';
          
          return (
            <Image
              key={index}
              src="/assets/karge-taht.png"
              alt=""
              width={80}
              height={80}
              style={{ top: topValue, left: leftValue }}
              className={`absolute ${star.width} ${star.opacity} animate-fade-in`}
            />
          );
        })}
      </div>

      <div className="relative z-30">
        {/* Our Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-fade-in-up">
              <h1 className="text-5xl font-bold mb-6">
                {storyTitle}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {storyContent}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-6">
                {t("Võta ühendust", "Get in Touch")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t(
                  "Oleks hea sind näha! Külasta meie kohvikut või võta meiega ühendust",
                  "We'd love to see you! Visit our café or reach out with any questions"
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactItems.map((info, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-8 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div className="text-center animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-6">
                {t("Jälgi meid", "Follow Us")}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t(
                  "Püsi kursis meie uuemate loomingute ja eripakkumistega",
                  "Stay updated with our latest creations and special offers"
                )}
              </p>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-secondary/10 hover:bg-secondary hover:text-secondary-foreground rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-[var(--shadow-soft)]"
                    aria-label={social.label}
                  >
                    <social.icon className="w-7 h-7" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="mt-16 rounded-3xl overflow-hidden shadow-[var(--shadow-hover)] h-96 bg-muted animate-scale-in border border-border/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.6823326162588!2d24.743916912853273!3d59.4359336015528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692936168582d91%3A0x8052326779830588!2sM%C3%BC%C3%BCrivahe%20tn%2028%2C%2010140%20Tallinn!5e0!3m2!1sen!2see!4v1716500000000!5m2!1sen!2see"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.2) contrast(1.1)" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
