import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit } from "lucide-react";
import { getAllCookies } from "@/lib/db";
import { getLocalizedText } from "@/lib/utils";
import AdminHeader from "@/components/admin/AdminHeader";
import DeleteCookieButton from "@/components/admin/DeleteCookieButton";

export default async function AdminCookiesPage() {
  const cookies = await getAllCookies();

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-pink-500">Cookies</h1>
          <Link href="/admin/cookies/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Cookie
            </Button>
          </Link>
        </div>

        {cookies.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No cookies yet</p>
              <Link href="/admin/cookies/new">
                <Button>Add Your First Cookie</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cookies.map((cookie) => (
              <Card key={cookie.id}>
                <CardHeader className="pb-2">
                  <div className="aspect-square relative rounded-lg overflow-hidden mb-2">
                    <Image
                      src={cookie.imagePath}
                      alt={getLocalizedText(cookie.name, "et")}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <CardTitle className="text-lg">
                    {getLocalizedText(cookie.name, "et")}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {getLocalizedText(cookie.name, "en")}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-pink-500">
                      €{cookie.price}
                    </span>
                    <div className="flex gap-2">
                      <Link href={`/admin/cookies/${cookie.id}`}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <DeleteCookieButton cookieId={cookie.id} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
