"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalizedText, type MultiLang } from "@/lib/utils";

interface CookieCardProps {
  id: string;
  slug: string;
  name: MultiLang;
  imagePath: string;
}

export default function CookieCard({ id, slug, name, imagePath }: CookieCardProps) {
  const { language } = useLanguage();
  const cookieName = getLocalizedText(name, language);
  
  const pathIdTop = `circlePathTop-${id}`;
  const pathIdBottom = `circlePathBottom-${id}`;

  return (
    <Link
      href={`/cookie/${slug}`}
      className="relative inline-block group cursor-pointer w-full"
    >
      <div className="aspect-square w-full relative">
        <Image
          src={imagePath}
          alt={cookieName}
          fill
          className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-center animate-slow-spin pointer-events-none">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            <defs>
              <path
                id={pathIdTop}
                d="M 150, 150 m -110, 0 a 110,110 0 0,1 220,0"
              />
              <path
                id={pathIdBottom}
                d="M 150, 150 m 110, 0 a 110,110 0 0,1 -220,0"
              />
            </defs>
            <text
              className="fill-pink-500 text-3xl font-bold tracking-widest"
              style={{ letterSpacing: "0.1em" }}
            >
              <textPath
                href={`#${pathIdTop}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {cookieName}
              </textPath>
            </text>
            <text
              className="fill-pink-500 text-3xl font-bold tracking-widest"
              style={{ letterSpacing: "0.1em" }}
            >
              <textPath
                href={`#${pathIdBottom}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {cookieName}
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </Link>
  );
}
