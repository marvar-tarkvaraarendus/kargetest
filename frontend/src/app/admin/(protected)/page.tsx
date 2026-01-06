import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllCookies, getOpeningTimes, getContactInfo, getAboutStory } from "@/lib/db";
import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const cookies = await getAllCookies();
  const openingTimes = await getOpeningTimes();
  const contactInfo = await getContactInfo();
  const aboutStory = await getAboutStory();

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-pink-500 mb-8">Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

          {/* Contact Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Info</CardTitle>
              <CardDescription>Phone & email details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                {contactInfo ? "Last updated: " + new Date(contactInfo.updatedAt).toLocaleDateString() : "Not configured"}
              </div>
              <Link href="/admin/contact-info">
                <Button className="w-full" variant="outline">
                  Edit Contact
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* About Story Card */}
          <Card>
            <CardHeader>
              <CardTitle>About Story</CardTitle>
              <CardDescription>Meie lugu section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                {aboutStory ? "Last updated: " + new Date(aboutStory.updatedAt).toLocaleDateString() : "Not configured"}
              </div>
              <Link href="/admin/about-story">
                <Button className="w-full" variant="outline">
                  Edit Story
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
