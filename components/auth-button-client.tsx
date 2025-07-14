"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";
import type { User } from "@supabase/supabase-js";

export function AuthButtonClient() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const supabase = createClientComponentClient();

	useEffect(() => {
		const getUser = async () => {
			const { data } = await supabase.auth.getUser();
			setUser(data.user);
			setLoading(false);
		};

		getUser();

		const { data: authListener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				setUser(session?.user || null);
			}
		);

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, [supabase.auth]);

	if (loading) {
		return <div className="h-5 w-12 animate-pulse bg-gray-200 rounded"></div>;
	}

	return user ? (
		<div className="flex items-center gap-4">
			Hey, {user.email}!
			<LogoutButton />
		</div>
	) : (
		<div className="flex gap-2">
			<Button asChild size="sm" variant={"outline"}>
				<Link href="/auth/login">Sign in</Link>
			</Button>
			<Button asChild size="sm" variant={"default"}>
				<Link href="/auth/sign-up">Sign up</Link>
			</Button>
		</div>
	);
}
