import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { ROUTE_TO_LOGIN, ROUTE_TO_SIGN_UP } from "@/lib/constants";

export async function AuthButton() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user ? (
		<div className="flex items-center gap-4">
			Hey, {user.email}!
			<LogoutButton />
		</div>
	) : (
		<div className="flex gap-2">
			<Button asChild size="sm" variant={"outline"}>
				<Link href={ROUTE_TO_LOGIN}>Sign in</Link>
			</Button>
			<Button asChild size="sm" variant={"default"}>
				<Link href={ROUTE_TO_SIGN_UP}>Sign up</Link>
			</Button>
		</div>
	);
}
