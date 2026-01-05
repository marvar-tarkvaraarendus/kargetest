import { getAboutStory } from "@/lib/db";
import AboutStoryForm from "@/components/admin/AboutStoryForm";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AboutStoryPage() {
  const aboutStory = await getAboutStory();

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-pink-500 mb-8">About Story</h1>
        <AboutStoryForm aboutStory={aboutStory} />
      </main>
    </div>
  );
}
