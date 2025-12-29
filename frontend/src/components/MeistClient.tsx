"use client";

import Image from "next/image";
import { MapPin, Clock, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

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
  { top: "top-36", left: "left-1/2", width: "w-13", opacity: "opacity-55" },
  { top: "bottom-1/4", left: "right-16", width: "w-10", opacity: "opacity-55" },
];

export default function MeistClient() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: t("Külasta meid", "Visit Us"),
      details: ["Müürivahe 28", "Tallinn, 10148", t("Eesti", "Estonia")],
    },
    {
      icon: Clock,
      title: t("Avamisajad", "Opening Hours"),
      details: [
        t("T-L: 13:00 - 19:00", "Tuesday - Saturday: 13:00 - 19:00"),
        t("P: 13:00 - 18:00", "Sunday: 13:00 - 18:00"),
        t("E: Suletud", "Monday: Closed"),
      ],
    },
    {
      icon: Phone,
      title: t("Helista meile", "Call Us"),
      details: ["+372 1234 5678"],
    },
    {
      icon: Mail,
      title: t("E-post", "Email"),
      details: ["hello@karge.ee"],
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
          src="/assets/KARGE käsi keerd lp.png"
          alt=""
          width={768}
          height={768}
          className="absolute -right-40 -top-32 w-[28rem] md:w-[48rem] opacity-100 animate-fade-in"
        />
        <Image
          src="/assets/KARGE käsi tass lp.png"
          alt=""
          width={768}
          height={768}
          className="absolute -left-20 top-[40%] w-[28rem] md:w-[48rem] opacity-100 animate-fade-in"
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

      <div className="relative z-30">
        {/* Our Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-fade-in-up">
              <h1 className="text-5xl font-bold mb-6">
                {t("Meie lugu", "Our Story")}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t(
                  "Karge sündis lihtsast unistusest: luua hubane nurk, kus erakordne kohv kohtub külalislahkusega. Alates ukse avamisest oleme pühendunud kogukonna teenimisele soojuse, kvaliteedi ja hoolega.",
                  "Karge was born from a simple dream: to create a cozy corner where exceptional coffee meets genuine hospitality. Since opening our doors, we've been dedicated to serving our community with warmth, quality, and care."
                )}
              </p>
            </div>

            <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[var(--shadow-hover)] animate-scale-in">
              <Image
                src="/assets/cafe-corner.jpg"
                alt={t("Meie hubane kohviku nurk", "Our cozy café corner")}
                width={1200}
                height={500}
                className="w-full h-[500px] object-cover"
              />
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
              {contactInfo.map((info, index) => (
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
