"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import type { AboutStoryData } from "@/lib/db";

interface AboutStoryFormProps {
  aboutStory: AboutStoryData | null;
}

export default function AboutStoryForm({ aboutStory }: AboutStoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: {
      et: aboutStory?.title?.et || "Meie lugu",
      en: aboutStory?.title?.en || "Our Story",
    },
    content: {
      et: aboutStory?.content?.et || "Karge sündis lihtsast unistusest: luua hubane nurk, kus erakordne kohv kohtub külalislahkusega. Alates ukse avamisest oleme pühendunud kogukonna teenimisele soojuse, kvaliteedi ja hoolega.",
      en: aboutStory?.content?.en || "Karge was born from a simple dream: to create a cozy corner where exceptional coffee meets genuine hospitality. Since opening our doors, we've been dedicated to serving our community with warmth, quality, and care.",
    },
  });

  const handleChange = (field: "title" | "content", lang: "et" | "en", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/about-story", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Success",
          description: "About story updated!",
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update about story",
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
          <CardTitle>About / Our Story Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-4">
            <h3 className="font-semibold">Section Title</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title-et">Title (Estonian)</Label>
                <Input
                  id="title-et"
                  value={formData.title.et}
                  onChange={(e) => handleChange("title", "et", e.target.value)}
                  placeholder="Meie lugu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title-en">Title (English)</Label>
                <Input
                  id="title-en"
                  value={formData.title.en}
                  onChange={(e) => handleChange("title", "en", e.target.value)}
                  placeholder="Our Story"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="font-semibold">Story Content</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content-et">Content (Estonian)</Label>
                <Textarea
                  id="content-et"
                  value={formData.content.et}
                  onChange={(e) => handleChange("content", "et", e.target.value)}
                  placeholder="Sisesta eestikeelne tekst..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content-en">Content (English)</Label>
                <Textarea
                  id="content-en"
                  value={formData.content.en}
                  onChange={(e) => handleChange("content", "en", e.target.value)}
                  placeholder="Enter English text..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Story"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
