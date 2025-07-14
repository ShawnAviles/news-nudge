"use client";

import { motion } from "framer-motion";
import {
	Zap,
	Brain,
	Headphones,
	Smartphone,
	Clock,
	Shield,
} from "lucide-react";

const features = [
	{
		icon: Brain,
		title: "AI-Powered Script Generation",
		description:
			"We leverge powerful AI to transform newsletter content into engaging, natural-sounding scripts optimized for audio consumption.",
		color: "from-blue-500 to-purple-500",
	},
	{
		icon: Headphones,
		title: "Human-Like Narration",
		description:
			"High-fidelity text-to-speech technology deliver crystal-clear audio that sounds natural and professional.",
		color: "from-green-500 to-teal-500",
	},
	{
		icon: Clock,
		title: "Time-Efficient",
		description:
			"Perfect for busy professionals, commuters, and remote workers who want to stay informed on-the-go.",
		color: "from-indigo-500 to-blue-500",
	},
	{
		icon: Zap,
		title: "Automated Processing",
		description:
			"Seamless pipeline handles content ingestion, script crafting, and audio generation without manual intervention.",
		color: "from-orange-500 to-red-500",
	},
	{
		icon: Smartphone,
		title: "Text Updates",
		description:
			"Receive instant text notifications when newsletters are processed and audio is ready for playback.",
		color: "from-pink-500 to-purple-500",
	},
	{
		icon: Shield,
		title: "Secure & Private",
		description:
			"Your email connections and data are protected with enterprise-grade security and privacy measures.",
		color: "from-teal-500 to-green-500",
	},
];

export function Features() {
	return (
		<section id="features" className="py-20 bg-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						Powerful Features for
						<span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
							{" "}
							Busy Professionals
						</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Transform how you consume newsletter content with our streamlined
						solution that brings together the best of AI and audio
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							whileHover={{ y: -5 }}
							className="group"
						>
							<div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
								<div
									className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
								>
									<feature.icon className="w-6 h-6 text-white" />
								</div>

								<h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
									{feature.title}
								</h3>

								<p className="text-gray-600 leading-relaxed">
									{feature.description}
								</p>
							</div>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					viewport={{ once: true }}
					className="text-center mt-16"
				>
					<div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-full">
						<span className="text-sm font-medium text-gray-700">
							✨ More features coming soon in our beta release
						</span>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
