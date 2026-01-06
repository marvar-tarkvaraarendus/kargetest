import AdminHeader from "@/components/admin/AdminHeader";
import OpeningTimesForm from "@/components/admin/OpeningTimesForm";
import { getOpeningTimes } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function OpeningTimesPage() {
  const openingTimes = await getOpeningTimes();

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-pink-500 mb-8">Opening Times</h1>
        <OpeningTimesForm openingTimes={openingTimes} />
      </main>
    </div>
  );
}
