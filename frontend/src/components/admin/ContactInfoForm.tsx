"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import type { ContactInfoData } from "@/lib/db";

interface ContactInfoFormProps {
  contactInfo: ContactInfoData | null;
}

export default function ContactInfoForm({ contactInfo }: ContactInfoFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: contactInfo?.phone || "+372 1234 5678",
    email: contactInfo?.email || "hello@karge.ee",
  });

  const handleChange = (field: "phone" | "email", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Success",
          description: "Contact info updated!",
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update contact info",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (Helista meile)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+372 1234 5678"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address (E-post)</Label>
            <Input
              id="email"
              type="email"
              placeholder="hello@karge.ee"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Contact Info"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
