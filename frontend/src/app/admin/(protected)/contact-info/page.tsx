import AdminHeader from "@/components/admin/AdminHeader";
import ContactInfoForm from "@/components/admin/ContactInfoForm";
import { getContactInfo } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ContactInfoPage() {
  const contactInfo = await getContactInfo();

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-pink-500 mb-8">Contact Info</h1>
        <ContactInfoForm contactInfo={contactInfo} />
      </main>
    </div>
  );
}
