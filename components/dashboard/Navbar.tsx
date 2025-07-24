"use client";

import { Bell, Menu, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "@/components/logout-button";
import NewsNudgeLogo from "../NewsNudgeLogo";
import { User } from "@supabase/supabase-js";

const OPTIONS = ["Settings", "Help"];

interface NavbarProps {
	user: User | null;
	onMenuClick: () => void;
}

export function Navbar({ user, onMenuClick }: NavbarProps) {
	return (
		<div className="top-0 z-50 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
			{/* Mobile sidebar */}
			<button
				type="button"
				className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
				onClick={onMenuClick}
			>
				<span className="sr-only">Open sidebar</span>
				<Menu className="h-6 w-6" aria-hidden="true" />
			</button>

			{/* Separator */}
			<div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

			<div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
				<div className="flex flex-1">
					<NewsNudgeLogo />
				</div>
				<div className="flex items-center gap-x-4 lg:gap-x-6">
					{/* Notifications */}
					<Button variant="ghost" size="icon" className="relative">
						<Bell className="h-6 w-6" />
						<span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
							3
						</span>
					</Button>

					{/* Separator */}
					<div
						className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
						aria-hidden="true"
					/>

					{/* Profile dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="relative">
								<UserIcon className="h-6 w-6" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									{user?.app_metadata?.full_name && (
										<p className="text-sm font-medium leading-none">
											{user?.app_metadata?.full_name || "Guest"}
										</p>
									)}
									{user?.email && (
										<p className="text-xs leading-none text-muted-foreground">
											{user?.email || "No email"}
										</p>
									)}
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{OPTIONS.map((option) => (
								<DropdownMenuItem key={option}>{option}</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<LogoutButton />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
}
