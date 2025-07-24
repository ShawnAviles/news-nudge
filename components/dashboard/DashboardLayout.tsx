"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { ROUTE_TO_LOGIN } from "@/lib/constants";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const { loading, error, user } = useUser();
	const router = useRouter();

	useEffect(() => {
		const checkUser = async () => {
			if ((!loading && !user) || error) {
				router.push(ROUTE_TO_LOGIN);
			}
		};
		checkUser();
	}, [router, error, user, loading]);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Navbar - Fixed at the top */}
			<Navbar user={user} onMenuClick={() => setSidebarOpen(true)} />

			<div className="flex">
				{/* Sidebar */}
				<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

				{/* Main Content */}
				<div className="flex-1 transition-all duration-300 ease-in-out">
					<main className="p-6">
						<div className="max-w-7xl mx-auto">{children}</div>
					</main>
				</div>
			</div>

			{/* Mobile overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}
		</div>
	);
}
