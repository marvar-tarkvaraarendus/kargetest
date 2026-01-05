import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import CookieForm from "@/components/admin/CookieForm";
import { getCookieById } from "@/lib/db";

interface EditCookiePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCookiePage({ params }: EditCookiePageProps) {
  const { id } = await params;
  const cookie = await getCookieById(id);

  if (!cookie) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-pink-500 mb-8">Edit Cookie</h1>
        <CookieForm cookie={cookie} />
      </main>
    </div>
  );
}
