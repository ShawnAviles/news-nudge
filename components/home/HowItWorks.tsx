"use client";

import { motion } from "framer-motion";
import { UserPlus, Mail, Volume2, Headphones } from "lucide-react";

const steps = [
	{
		icon: UserPlus,
		title: "Sign Up & Connect",
		description:
			"Create your account and securely connect your email or subscribe to curated newsletters.",
		color: "from-blue-500 to-purple-500",
	},
	{
		icon: Mail,
		title: "Select Newsletters",
		description:
			"Choose from your existing subscriptions or browse our curated collection of premium newsletters.",
		color: "from-purple-500 to-pink-500",
	},
	{
		icon: Volume2,
		title: "AI Processing",
		description:
			"Our AI automatically converts newsletter content into natural, engaging audio scripts.",
		color: "from-pink-500 to-red-500",
	},
	{
		icon: Headphones,
		title: "Listen & Learn",
		description:
			"Enjoy your personalized audio briefings anywhere - during commutes, workouts, or walks.",
		color: "from-red-500 to-orange-500",
	},
];

export function HowItWorks() {
	return (
		<section
			id="how-it-works"
			className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						How NewsNudge
						<span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
							{" "}
							Works
						</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Get started in minutes with our simple, automated process that
						transforms your reading into listening.
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
					{steps.map((step, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
							viewport={{ once: true }}
							className="text-center group"
						>
							<div className="relative mb-8">
								{/* Connection Line */}
								{index < steps.length - 1 && (
									<div className="hidden lg:block absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform -translate-y-1/2 z-0">
										<motion.div
											initial={{ scaleX: 0 }}
											whileInView={{ scaleX: 1 }}
											transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
											viewport={{ once: true }}
											className="h-full bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
										></motion.div>
									</div>
								)}

								{/* Step Number */}
								<motion.div
									whileHover={{ scale: 1.1 }}
									className="relative inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border-4 border-gray-100 mb-4 z-10"
								>
									<span className="text-2xl font-bold text-gray-400 group-hover:text-blue-500 transition-colors">
										{index + 1}
									</span>
								</motion.div>

								{/* Icon */}
								<motion.div
									whileHover={{ scale: 1.1, rotate: 5 }}
									className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-r ${step.color} shadow-l z-10`}
								>
									<step.icon className="w-8 h-8 text-white" />
								</motion.div>
							</div>

							<h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
								{step.title}
							</h3>

							<p className="text-gray-600 leading-relaxed">
								{step.description}
							</p>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 1 }}
					viewport={{ once: true }}
					className="text-center mt-16"
				>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() =>
							document
								.getElementById("waitlist")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="btn btn-primary text-white btn-lg px-8 py-4 text-lg font-semibold shadow-lg"
					>
						Start Your Journey
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
}
