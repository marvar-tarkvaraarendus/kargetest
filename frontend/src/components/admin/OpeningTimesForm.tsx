"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import type { OpeningTimesData } from "@/lib/db";

const DAYS = [
  { key: "monday", labelEt: "Esmaspäev", labelEn: "Monday" },
  { key: "tuesday", labelEt: "Teisipäev", labelEn: "Tuesday" },
  { key: "wednesday", labelEt: "Kolmapäev", labelEn: "Wednesday" },
  { key: "thursday", labelEt: "Neljapäev", labelEn: "Thursday" },
  { key: "friday", labelEt: "Reede", labelEn: "Friday" },
  { key: "saturday", labelEt: "Laupäev", labelEn: "Saturday" },
  { key: "sunday", labelEt: "Pühapäev", labelEn: "Sunday" },
];

interface OpeningTimesFormProps {
  openingTimes: OpeningTimesData | null;
}

export default function OpeningTimesForm({ openingTimes }: OpeningTimesFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const defaultTimes = DAYS.reduce((acc, day) => {
    acc[day.key] = { open: "08:00", close: "18:00" };
    return acc;
  }, {} as Record<string, { open: string; close: string }>);

  const [formData, setFormData] = useState(
    openingTimes?.content || defaultTimes
  );

  const handleTimeChange = (day: string, type: "open" | "close", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/opening-times", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: formData }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Success",
          description: "Opening times updated!",
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update opening times",
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
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {DAYS.map((day) => (
            <div
              key={day.key}
              className="grid grid-cols-3 gap-4 items-center py-2 border-b border-border last:border-0"
            >
              <div>
                <span className="font-medium">{day.labelEn}</span>
                <span className="text-muted-foreground text-sm ml-2">
                  ({day.labelEt})
                </span>
              </div>
              <div className="space-y-1">
                <Label htmlFor={`${day.key}-open`} className="text-xs text-muted-foreground">
                  Opens
                </Label>
                <Input
                  id={`${day.key}-open`}
                  type="time"
                  value={formData[day.key]?.open || ""}
                  onChange={(e) => handleTimeChange(day.key, "open", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`${day.key}-close`} className="text-xs text-muted-foreground">
                  Closes
                </Label>
                <Input
                  id={`${day.key}-close`}
                  type="time"
                  value={formData[day.key]?.close || ""}
                  onChange={(e) => handleTimeChange(day.key, "close", e.target.value)}
                />
              </div>
            </div>
          ))}

          <div className="pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Opening Times"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
