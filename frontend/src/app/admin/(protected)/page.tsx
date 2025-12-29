import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllCookies, getOpeningTimes } from "@/lib/db";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminDashboard() {
  const cookies = await getAllCookies();
  const openingTimes = await getOpeningTimes();

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader />
      
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-pink-500 mb-8">Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Cookies Card */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies</CardTitle>
              <CardDescription>Manage your cookie products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-pink-500 mb-4">
                {cookies.length}
              </div>
              <Link href="/admin/cookies">
                <Button className="w-full">Manage Cookies</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Opening Times Card */}
          <Card>
            <CardHeader>
              <CardTitle>Opening Times</CardTitle>
              <CardDescription>Update your business hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                {openingTimes ? "Last updated: " + new Date(openingTimes.updatedAt).toLocaleDateString() : "Not configured"}
              </div>
              <Link href="/admin/opening-times">
                <Button className="w-full" variant="outline">
                  Edit Hours
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/cookies/new">
                <Button className="w-full" variant="secondary">
                  Add New Cookie
                </Button>
              </Link>
              <Link href="/" target="_blank">
                <Button className="w-full" variant="ghost">
                  View Website →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
