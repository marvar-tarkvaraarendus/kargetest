"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ShoppingBag, CheckCircle, Plus, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalizedText, type MultiLang } from "@/lib/utils";
import { starPositions } from "@/lib/constants";

interface Product {
  id: string;
  slug: string;
  name: MultiLang;
  imagePath: string;
  price: string;
}

export default function TellimusedClient() {
  const { t, language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/cookies")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setProducts(data.data);
        }
      })
      .catch(console.error);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const newCount = Math.max(0, current + delta);
      return { ...prev, [id]: newCount };
    });
  };

  const orderSummary = Object.entries(quantities)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      const name = product ? getLocalizedText(product.name, language) : id;
      return `${name}: ${qty}tk`;
    })
    .join(", ");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mnnkvqov", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        setQuantities({});
        toast({
          title: t("Tellimus vastu võetud!", "Order Received!"),
          description: t(
            "Saatsime kinnituse teie e-postile.",
            "We sent a confirmation to your email."
          ),
        });
      } else {
        toast({
          variant: "destructive",
          title: "Viga!",
          description: "Midagi läks valesti. Palun proovi uuesti.",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Viga!",
        description: "Ühenduse viga.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 py-20">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {t("Tellimus kinnitatud!", "Order Confirmed!")}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t(
              "Teie tellimusega tegeletakse",
              "We'll have your order ready soon"
            )}
          </p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => setIsSubmitted(false)}
          >
            {t("Tee uus tellimus", "Place another order")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-background py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <Image
          src="/assets/karge-kasi-keerd.png"
          alt=""
          width={576}
          height={576}
          className="absolute -right-32 -top-24 w-[24rem] md:w-[36rem] opacity-100 animate-fade-in"
        />
        <Image
          src="/assets/karge-kasi-tass.png"
          alt=""
          width={576}
          height={576}
          className="absolute -left-32 top-[40%] w-[24rem] md:w-[36rem] opacity-100 animate-fade-in"
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

      <div className="container mx-auto px-6 relative z-30">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            {t("Tee tellimus", "Place Your Order")}
          </h1>
        </div>

        <Card className="max-w-2xl mx-auto shadow-[var(--shadow-soft)] border-0 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-2xl">
              {t("Tellimuse üksikasjad", "Order Details")}
            </CardTitle>
            <CardDescription>
              {t(
                "Ütle meile, mida soovid ja millal tuled järele",
                "Tell us what you'd like and when you'll pick it up"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="hidden"
                name="order_details"
                value={orderSummary || "No items selected"}
              />

              <div className="space-y-2">
                <Label htmlFor="name">{t("Nimi", "Your Name")}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t("Mari Maasikas", "John Doe")}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  {t("E-posti aadress", "Email Address")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("mari@näide.ee", "john@example.com")}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("Telefon", "Phone Number")}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+372 1234 5678"
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-4">
                <Label>{t("Vali küpsised", "Select Cookies")}</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {products.length === 0 ? (
                    <p className="col-span-3 text-center">
                      {t("Laen küpsiseid...", "Loading cookies...")}
                    </p>
                  ) : (
                    products.map((product) => (
                      <div
                        key={product.id}
                        className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-muted/30"
                      >
                        <div className="relative w-32 h-32">
                          <Image
                            src={product.imagePath}
                            alt={getLocalizedText(product.name, language)}
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                        <p className="font-semibold text-center">
                          {getLocalizedText(product.name, language)}
                        </p>
                        <p className="text-lg font-bold text-pink-500">
                          {product.price}€
                        </p>
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(product.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="text-xl font-bold w-8 text-center">
                            {quantities[product.id] || 0}
                          </span>

                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(product.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickupTime">
                  {t("Peale võtmise aeg", "Pickup Time")}
                </Label>
                <Input
                  id="pickupTime"
                  name="pickupTime"
                  type="text"
                  placeholder="14:00"
                  pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">
                  {t("Erimärkused (valikuline)", "Special Notes (Optional)")}
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder={t(
                    "Kas on erisoove või dieedi nõudeid?",
                    "Any special requests or dietary requirements?"
                  )}
                  className="rounded-xl"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full rounded-full text-lg py-6 bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-[var(--shadow-soft)]"
              >
                {isLoading
                  ? t("Saadan...", "Sending...")
                  : t("Saada tellimus", "Submit Order")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
