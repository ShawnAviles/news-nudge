import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AudioPlayerStrip } from "@/components/dashboard/AudioPlayerStrip";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivityList } from "@/components/dashboard/RecentActivityList";

export default async function HomePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Audio Player Strip */}
        <AudioPlayerStrip />
        
        {/* Summary Cards */}
        <SummaryCards />
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Recent Activity */}
        <RecentActivityList />
      </div>
    </DashboardLayout>
  );
}