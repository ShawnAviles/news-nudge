import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default async function SubscriptionPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>
          <p className="text-gray-600">Plan details, usage metrics, and billing actions</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Subscription Coming Soon</h2>
          <p className="text-gray-600">
            This page will contain the PlanSummaryCard, UsageChart, PlanActions, and BillingHistoryList components.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}