"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import type { CookieData } from "@/lib/db";

interface CookieFormProps {
  cookie?: CookieData;
}

export default function CookieForm({ cookie }: CookieFormProps) {
  const router = useRouter();
  const isEditing = !!cookie;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    slug: cookie?.slug || "",
    price: cookie?.price || "",
    imagePath: cookie?.imagePath || "",
    nameEt: cookie?.name?.et || "",
    nameEn: cookie?.name?.en || "",
    descriptionEt: cookie?.description?.et || "",
    descriptionEn: cookie?.description?.en || "",
    ingredientsEt: cookie?.ingredients?.et || "",
    ingredientsEn: cookie?.ingredients?.en || "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await res.json();

      if (res.ok) {
        setFormData((prev) => ({ ...prev, imagePath: data.path }));
        toast({
          title: "Uploaded",
          description: "Image uploaded successfully",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to upload image",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      slug: formData.slug,
      price: formData.price,
      imagePath: formData.imagePath,
      name: { et: formData.nameEt, en: formData.nameEn },
      description: { et: formData.descriptionEt, en: formData.descriptionEn },
      ingredients: { et: formData.ingredientsEt, en: formData.ingredientsEn },
    };

    try {
      const url = isEditing ? `/api/cookies/${cookie.id}` : "/api/cookies";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Success",
          description: isEditing ? "Cookie updated!" : "Cookie created!",
        });
        router.push("/admin/cookies");
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to save cookie",
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL identifier)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                  }))
                }
                placeholder="kinder-bueno"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (€)</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="3.50"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {formData.imagePath && (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                <Image
                  src={formData.imagePath}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <Label htmlFor="image" className="cursor-pointer">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {uploading ? "Uploading..." : "Click to upload image"}
                  </p>
                </div>
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imagePath">Or enter image path manually</Label>
            <Input
              id="imagePath"
              value={formData.imagePath}
              onChange={(e) => setFormData((prev) => ({ ...prev, imagePath: e.target.value }))}
              placeholder="/uploads/my-cookie.png"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Name</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nameEt">Name (Estonian)</Label>
              <Input
                id="nameEt"
                value={formData.nameEt}
                onChange={(e) => setFormData((prev) => ({ ...prev, nameEt: e.target.value }))}
                placeholder="Kinder Bueno"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nameEn">Name (English)</Label>
              <Input
                id="nameEn"
                value={formData.nameEn}
                onChange={(e) => setFormData((prev) => ({ ...prev, nameEn: e.target.value }))}
                placeholder="Kinder Bueno"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="descriptionEt">Description (Estonian)</Label>
            <Textarea
              id="descriptionEt"
              value={formData.descriptionEt}
              onChange={(e) => setFormData((prev) => ({ ...prev, descriptionEt: e.target.value }))}
              placeholder="Maitsev küpsis..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="descriptionEn">Description (English)</Label>
            <Textarea
              id="descriptionEn"
              value={formData.descriptionEn}
              onChange={(e) => setFormData((prev) => ({ ...prev, descriptionEn: e.target.value }))}
              placeholder="Delicious cookie..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ingredients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ingredientsEt">Ingredients (Estonian)</Label>
            <Textarea
              id="ingredientsEt"
              value={formData.ingredientsEt}
              onChange={(e) => setFormData((prev) => ({ ...prev, ingredientsEt: e.target.value }))}
              placeholder="Jahu, või, suhkur..."
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ingredientsEn">Ingredients (English)</Label>
            <Textarea
              id="ingredientsEn"
              value={formData.ingredientsEn}
              onChange={(e) => setFormData((prev) => ({ ...prev, ingredientsEn: e.target.value }))}
              placeholder="Flour, butter, sugar..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEditing ? "Update Cookie" : "Create Cookie"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
