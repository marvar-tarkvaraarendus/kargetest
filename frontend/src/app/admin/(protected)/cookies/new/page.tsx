import AdminHeader from "@/components/admin/AdminHeader";
import CookieForm from "@/components/admin/CookieForm";

export default function NewCookiePage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader />

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-pink-500 mb-8">Add New Cookie</h1>
        <CookieForm />
      </main>
    </div>
  );
}
