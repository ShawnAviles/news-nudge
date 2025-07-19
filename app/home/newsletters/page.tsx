import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default async function NewslettersPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletters</h1>
          <p className="text-gray-600">Manage newsletter subscriptions and discover feeds</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Newsletters Coming Soon</h2>
          <p className="text-gray-600">
            This page will contain the NewsletterCatalog, CategoryFilter, and CustomFeedForm components.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}