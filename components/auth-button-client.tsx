"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";
import { ROUTE_TO_LOGIN, ROUTE_TO_SIGN_UP } from "@/lib/constants";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/router";

export function AuthButtonClient() {
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
