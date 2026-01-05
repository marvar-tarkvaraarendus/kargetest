"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-12">
          {/* Tellimused */}
          <Link
            href="/tellimused"
            className="font-medium transition-colors hover:text-primary text-foreground"
          >
            {t("Tellimused", "Orders")}
          </Link>

          {/* Logo - centered */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/assets/karge-logo-new.jpg"
              alt="KARGE"
              width={64}
              height={64}
              className="h-16 w-auto group-hover:scale-110 transition-transform"
            />
          </Link>

          {/* Meist */}
          <Link
            href="/meist"
            className="font-medium transition-colors hover:text-primary text-foreground"
          >
            {t("Meist", "About")}
          </Link>

          {/* Language switcher - absolute positioned to right */}
          <div className="absolute right-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "et" ? "en" : "et")}
              className="flex items-center gap-2"
            >
              <Image
                src={language === "et" ? "/assets/flag-gb.png" : "/assets/flag-ee.png"}
                alt={language === "et" ? "GB" : "EE"}
                width={20}
                height={16}
                className="object-cover rounded-sm"
              />
              {language === "et" ? "EN" : "ET"}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <Link href="/" className="flex items-center">
            <Image
              src="/assets/karge-logo-new.jpg"
              alt="KARGE"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "et" ? "en" : "et")}
            className="flex items-center gap-2"
          >
            <Image
              src={language === "et" ? "/assets/flag-gb.png" : "/assets/flag-ee.png"}
              alt={language === "et" ? "GB" : "EE"}
              width={20}
              height={16}
              className="object-cover rounded-sm"
            />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-4">
            <Link
              href="/tellimused"
              onClick={() => setIsOpen(false)}
              className="block font-medium transition-colors hover:text-primary text-foreground"
            >
              {t("Tellimused", "Orders")}
            </Link>
            <Link
              href="/meist"
              onClick={() => setIsOpen(false)}
              className="block font-medium transition-colors hover:text-primary text-foreground"
            >
              {t("Meist", "About")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
