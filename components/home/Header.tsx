"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Volume2 } from "lucide-react";
// import { hasEnvVars } from "@/lib/utils";
// import { EnvVarWarning } from "@/components/env-var-warning";
// import { AuthButtonClient } from "../auth-button-client";

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6 }}
			className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<a href="#">
						<motion.div
							whileHover={{ scale: 1.05 }}
							className="flex items-center space-x-2"
						>
							<div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
								<Volume2 className="h-6 w-6 text-white" />
							</div>
							<span className="text-xl font-bold text-gray-900">NewsNudge</span>
						</motion.div>
					</a>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<a
							href="#features"
							className="text-gray-600 hover:text-blue-600 transition-colors"
						>
							Features
						</a>
						<a
							href="#how-it-works"
							className="text-gray-600 hover:text-blue-600 transition-colors"
						>
							How It Works
						</a>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="btn btn-primary text-white px-6"
							onClick={() =>
								document
									.getElementById("waitlist")
									?.scrollIntoView({ behavior: "smooth" })
							}
						>
							Join Waitlist
						</motion.button>
						{/* removing for while in waitlist stage
						
						<div className="flex-1 w-full flex flex-col gap-20 items-center">
							<div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
								{!hasEnvVars ? <EnvVarWarning /> : <AuthButtonClient />}
							</div>
						</div> 
						
						*/}
					</nav>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden p-2"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden py-4 border-t border-gray-200"
					>
						<nav className="flex flex-col space-y-4">
							<a
								href="#features"
								className="text-gray-600 hover:text-blue-600 transition-colors"
							>
								Features
							</a>
							<a
								href="#how-it-works"
								className="text-gray-600 hover:text-blue-600 transition-colors"
							>
								How It Works
							</a>
							<button
								className="btn btn-primary text-white w-full"
								onClick={() => {
									setIsMenuOpen(false);
									document
										.getElementById("waitlist")
										?.scrollIntoView({ behavior: "smooth" });
								}}
							>
								Join Waitlist
							</button>
						</nav>
					</motion.div>
				)}
			</div>
		</motion.header>
	);
}
