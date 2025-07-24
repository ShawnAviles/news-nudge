import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ROUTE_TO_LOGIN } from "@/lib/constants";

export default async function SettingsPage() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect(ROUTE_TO_LOGIN);
	}

	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Settings</h1>
					<p className="text-gray-600">
						Configure account preferences and integrations
					</p>
				</div>

				<div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
					<h2 className="text-lg font-medium text-gray-900 mb-2">
						Settings Coming Soon
					</h2>
					<p className="text-gray-600">
						This page will contain ProfileSection,
						NotificationPreferencesSection, IntegrationsSection, and
						SecuritySection components.
					</p>
				</div>
			</div>
		</DashboardLayout>
	);
}
