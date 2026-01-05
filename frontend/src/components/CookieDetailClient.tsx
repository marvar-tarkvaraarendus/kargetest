"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalizedText, formatPrice, type MultiLang } from "@/lib/utils";
import { starPositions } from "@/lib/constants";

interface CookieDetailClientProps {
  cookie: {
    name: MultiLang;
    imagePath: string;
    description: MultiLang;
    ingredients: MultiLang;
    price: string;
  };
}

export default function CookieDetailClient({ cookie }: CookieDetailClientProps) {
  const { t, language } = useLanguage();
  
  const name = getLocalizedText(cookie.name, language);
  const description = getLocalizedText(cookie.description, language);
  const ingredients = getLocalizedText(cookie.ingredients, language);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
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
          className="absolute -left-32 top-[40%] w-[24rem] md:w-[36rem] opacity-100 animate-fade-in"
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

      <div className="container mx-auto px-6 relative z-10 py-20">
        <Link href="/">
          <Button variant="ghost" className="mb-8 hover:bg-primary/5">
            <ArrowLeft className="mr-2 w-4 h-4" />
            {t("Tagasi", "Back")}
          </Button>
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-pink-500 mb-8 animate-fade-in">
              {name}
            </h1>
            <div className="relative animate-scale-in">
              <Image
                src={cookie.imagePath}
                alt={name}
                width={768}
                height={768}
                className="w-full h-auto rounded-3xl shadow-[var(--shadow-hover)] mx-auto max-w-3xl"
                priority
              />
              <div className="text-center mt-6">
                <p className="text-4xl font-bold text-pink-500">
                  {formatPrice(cookie.price)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-card/50 p-8 rounded-2xl shadow-[var(--shadow-soft)] backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-4 text-pink-500">
                {t("Kirjeldus", "Description")}
              </h2>
              <p className="text-xl text-foreground leading-relaxed">
                {description}
              </p>
            </div>

            <div className="bg-card/50 p-8 rounded-2xl shadow-[var(--shadow-soft)] backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-4 text-pink-500">
                {t("Koostisosad", "Ingredients")}
              </h2>
              <p className="text-xl text-foreground leading-relaxed">
                {ingredients}
              </p>
            </div>

            <div className="text-center pt-6">
              <Link href="/tellimused">
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 rounded-full hover:scale-105 transition-all shadow-[var(--shadow-soft)] hover:bg-primary hover:text-primary-foreground"
                >
                  {t("Telli kohe", "Order Now")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
