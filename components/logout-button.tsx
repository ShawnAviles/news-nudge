"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTE_TO_LOGIN } from "@/lib/constants";

export function LogoutButton() {
	const router = useRouter();

	const logout = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push(ROUTE_TO_LOGIN);
	};

	return (
		<Button onClick={logout} className="w-full">
			Logout
		</Button>
	);
}
