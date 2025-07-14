"use client";

import { motion } from "framer-motion";
import { Volume2, Play, Headphones, Clock } from "lucide-react";

export function Hero() {
	const scrollToWaitlist = () => {
		document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section className="pt-24 pb-12 lg:pt-48 lg:pb-32">
			<div className="container mx-auto px-4 sm:px-6 lg:px-12">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Column - Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
					>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.6 }}
							className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6"
						>
							<span className="animate-pulse-glow w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
							Beta coming soon!
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.6 }}
							className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
						>
							Transform Your
							<span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
								{" "}
								Newsletters
							</span>
							<br />
							Into Audio Briefings
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.6 }}
							className="text-xl text-gray-600 mb-8 leading-relaxed"
						>
							Stay informed without breaking your flow. NewsNudge converts your
							favorite email newsletters into engaging audio briefings, perfect
							for commutes, workouts, and busy schedules.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 0.6 }}
							className="flex flex-col sm:flex-row gap-4 mb-8"
						>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={scrollToWaitlist}
								className="btn btn-primary btn-lg text-white px-8 py-4 text-lg font-semibold"
							>
								Join the Waitlist
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="btn btn-outline btn-lg px-8 py-4 text-lg font-semibold"
							>
								<Play className="w-5 h-5 mr-2" />
								Listen to Demo
							</motion.button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.6 }}
							className="flex items-center space-x-6 text-sm text-gray-500"
						>
							<div className="flex items-center">
								<Clock className="w-4 h-4 mr-2" />
								<span>5-min avg listen</span>
							</div>
							<div className="flex items-center">
								<Headphones className="w-4 h-4 mr-2" />
								<span>Human-like voices</span>
							</div>
							<div className="flex items-center">
								<span className="w-4 h-4 mr-2">🤖</span>
								<span>AI-powered</span>
							</div>
						</motion.div>
					</motion.div>

					{/* Right Column - Visual */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative"
					>
						<div className="relative">
							<motion.div
								animate={{ y: [0, -10, 0] }}
								transition={{
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200"
							>
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center space-x-3">
										<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
											<Volume2 className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">
												Morning Briefing
											</h3>
											<p className="text-sm text-gray-500">
												Tech Newsletter Digest
											</p>
										</div>
									</div>
									<div className="text-sm text-gray-500">5:32</div>
								</div>

								<div className="space-y-4">
									<div className="w-full bg-gray-200 rounded-full h-2">
										<motion.div
											initial={{ width: "0%" }}
											animate={{ width: "35%" }}
											transition={{ duration: 2, delay: 1 }}
											className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
										></motion.div>
									</div>

									<div className="flex items-center justify-center space-x-6">
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
										>
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L12 10.202 4.555 5.168z" />
											</svg>
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
										>
											<Play className="w-6 h-6" />
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
										>
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M15.445 5.168A1 1 0 0117 6v8a1 1 0 01-1.555.832L8 10.202l7.445-5.034z" />
											</svg>
										</motion.button>
									</div>
								</div>
							</motion.div>

							{/* Floating Elements */}
							<motion.div
								animate={{ y: [0, -20, 0] }}
								transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
								className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
							></motion.div>
							<motion.div
								animate={{ y: [0, -15, 0] }}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-30"
							></motion.div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
