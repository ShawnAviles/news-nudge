import { Icons } from "@/components/icons";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function Loading() {
	return (
		<DashboardLayout>
			{/* Fullscreen loading spinner */}
			<div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
				<Icons.loaderCircle className="h-10 w-10 animate-spin text-blue-500" />
			</div>
		</DashboardLayout>
	);
}
