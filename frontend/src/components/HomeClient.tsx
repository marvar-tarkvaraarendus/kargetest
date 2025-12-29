"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import CookieCard from "@/components/CookieCard";
import type { CookieData } from "@/lib/db";

interface HomeClientProps {
  cookies: CookieData[];
}

const starPositions = [
  { top: "top-20", left: "left-10", width: "w-16", opacity: "opacity-70" },
  { top: "top-40", left: "right-32", width: "w-12", opacity: "opacity-60" },
  { top: "top-1/3", left: "left-1/3", width: "w-10", opacity: "opacity-55" },
  { top: "top-2/3", left: "right-1/4", width: "w-18", opacity: "opacity-70" },
  { top: "bottom-32", left: "left-1/4", width: "w-20", opacity: "opacity-50" },
  { top: "bottom-48", left: "right-1/3", width: "w-14", opacity: "opacity-65" },
  { top: "top-10", left: "right-1/2", width: "w-8", opacity: "opacity-45" },
  { top: "bottom-20", left: "right-20", width: "w-15", opacity: "opacity-60" },
  { top: "top-1/4", left: "left-16", width: "w-11", opacity: "opacity-50" },
  { top: "top-1", left: "left-1/2", width: "w-13", opacity: "opacity-55" },
  { top: "bottom-1/4", left: "right-16", width: "w-10", opacity: "opacity-55" },
  { top: "top-5", left: "right-10", width: "w-9", opacity: "opacity-40" },
  { top: "top-1/2", left: "left-6", width: "w-14", opacity: "opacity-30" },
  { top: "bottom-10", left: "left-24", width: "w-12", opacity: "opacity-65" },
  { top: "top-32", left: "left-1/2", width: "w-8", opacity: "opacity-50" },
  { top: "bottom-1/3", left: "right-1/2", width: "w-16", opacity: "opacity-25" },
  { top: "top-24", left: "right-1/4", width: "w-10", opacity: "opacity-60" },
  { top: "bottom-64", left: "left-16", width: "w-7", opacity: "opacity-45" },
  { top: "top-3/4", left: "right-12", width: "w-20", opacity: "opacity-35" },
  { top: "top-12", left: "left-1/4", width: "w-6", opacity: "opacity-50" },
  { top: "bottom-8", left: "right-1/3", width: "w-11", opacity: "opacity-55" },
  { top: "top-1/2", left: "right-6", width: "w-12", opacity: "opacity-40" },
  { top: "top-4", left: "left-32", width: "w-10", opacity: "opacity-45" },
];

export default function HomeClient({ cookies }: HomeClientProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/assets/KARGE käsi keerd lp.png"
          alt=""
          width={576}
          height={576}
          className="absolute -right-32 -top-24 w-[24rem] md:w-[36rem] opacity-100 animate-fade-in"
        />
        <Image
          src="/assets/KARGE käsi tass lp.png"
          alt=""
          width={576}
          height={576}
          className="absolute -left-32 top-[55%] w-[24rem] md:w-[36rem] opacity-100 animate-fade-in"
        />
        <Image
          src="/assets/KARGE käsi kohv lp.png"
          alt=""
          width={576}
          height={576}
          className="absolute -right-16 -bottom-32 w-[24rem] md:w-[36rem] opacity-100 animate-fade-in"
        />
        {starPositions.map((star, index) => (
          <Image
            key={index}
            src="/assets/KARGE täht lp.png"
            alt=""
            width={80}
            height={80}
            className={`absolute ${star.top} ${star.left} ${star.width} ${star.opacity} animate-fade-in`}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center">
          <div className="relative container mx-auto px-6 text-center animate-fade-in-up">
            <div className="mb-6 flex justify-center">
              <Image
                src="/assets/karge-logo.png"
                alt="Karge"
                width={640}
                height={640}
                className="h-128 md:h-160 w-auto"
                priority
              />
            </div>

            <Link href="/tellimused">
              <Button
                size="lg"
                className="rounded-full text-lg px-8 py-6 bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)]"
              >
                {t("Telli kohe", "Order Now")}{" "}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Cookies Section */}
        <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-primary/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-pink-500">
                {t("Küpsised", "Cookies")}
              </h2>
              <p className="text-2xl md:text-3xl text-foreground mt-2">
                {t("& muu hea ja parem", "& other good and better")}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="animate-fade-in-up w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cookies.map((cookie) => (
                  <CookieCard
                    key={cookie.id}
                    id={cookie.id}
                    slug={cookie.slug}
                    name={cookie.name}
                    imagePath={cookie.imagePath}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">
              {t("Valmis kohvipausi jaoks?", "Ready for a Coffee Break?")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up">
              {t(
                "Külasta meid täna või tee tellimus järele tulekuks",
                "Visit us today or place an order for pickup"
              )}
            </p>
            <Link href="/tellimused">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-lg px-8 py-6 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:scale-105"
              >
                {t("Tee tellimus", "Place Your Order")}
              </Button>
            </Link>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-6">
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/karge_tallinn/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-secondary/10 hover:bg-secondary hover:text-secondary-foreground rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-[var(--shadow-soft)]"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61559307929923"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-secondary/10 hover:bg-secondary hover:text-secondary-foreground rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-[var(--shadow-soft)]"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
