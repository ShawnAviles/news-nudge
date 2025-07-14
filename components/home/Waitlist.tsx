"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import WaitlistWidget from "./WaitlistWidget";

export function Waitlist() {
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<section
			id="waitlist"
			className="py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 relative overflow-hidden"
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-10">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					}}
				></div>
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
				<div className="max-w-8xl mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
							Ready to Transform Your
							<br />
							Newsletter Experience?
						</h2>
						{/* Add info here once testimonials are ready
            
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Join thousands of professionals who are already on the waitlist. Be among the first to experience the future of newsletter consumption.
            </p>
            */}
					</motion.div>

					{/* {!isSubmitted ? ( */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<form onSubmit={handleSubmit} className="max-w-xl mx-auto">
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="flex-1 relative py-8">
									<div className="shadow-2xl shadow-white/50 m-2 ring-8 ring-white rounded-lg">
										<WaitlistWidget />
									</div>
								</div>
							</div>
						</form>

						<div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100">
							<div className="flex items-center">
								<CheckCircle className="w-5 h-5 mr-2 text-green-400" />
								<span>Free to join</span>
							</div>
							<div className="flex items-center">
								<CheckCircle className="w-5 h-5 mr-2 text-green-400" />
								<span>Early access</span>
							</div>
							<div className="flex items-center">
								<CheckCircle className="w-5 h-5 mr-2 text-green-400" />
								<span>Special pricing</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
