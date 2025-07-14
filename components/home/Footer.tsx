"use client";

import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
// import { ThemeSwitcher } from "../theme-switcher";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 text-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid md:grid-cols-4 gap-8">
					{/* Brand */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="col-span-2 md:col-span-1"
					>
						<div className="flex items-center space-x-2 mb-6">
							<div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
								<Volume2 className="h-6 w-6 text-white" />
							</div>
							<span className="text-xl font-bold">NewsNudge</span>
						</div>
						<p className="text-gray-400 leading-relaxed mb-6">
							Transform your newsletter reading into an effortless audio
							experience. Stay informed while staying active.
						</p>
						{/* Remove social links for now
            
            <div className="flex space-x-4">
							<a
								href="#"
								className="text-gray-400 hover:text-blue-400 transition-colors"
							>
								<Mail className="w-5 h-5" />
							</a>
						</div> 
            
            */}
					</motion.div>

					{/* Product */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						viewport={{ once: true }}
					>
						<h3 className="font-semibold text-lg mb-6">Product</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#features"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Features
								</a>
							</li>
							<li>
								<a
									href="#how-it-works"
									className="text-gray-400 hover:text-white transition-colors"
								>
									How It Works
								</a>
							</li>
							<li>
								<a
									href="#waitlist"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Join Waitlist
								</a>
							</li>
						</ul>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true }}
					className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
				>
					<p className="text-gray-400 text-sm">
						© {currentYear} NewsNudge. All rights reserved.
					</p>
					{/* <ThemeSwitcher /> */}
					<div className="flex items-center space-x-6 mt-4 md:mt-0">
						<span className="text-sm text-gray-400">
							Made with ❤️ for busy professionals
						</span>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}
