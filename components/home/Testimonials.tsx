"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
	{
		name: "Sarah Chen",
		role: "Product Manager",
		company: "TechCorp",
		image:
			"https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
		content:
			"NewsNudge has revolutionized my morning routine. I can stay updated on industry trends while commuting, making my drive productive and informative.",
		rating: 5,
	},
	{
		name: "Marcus Rodriguez",
		role: "CEO",
		company: "StartupXYZ",
		image:
			"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
		content:
			"The AI-generated summaries are incredibly accurate and the voice quality is outstanding. It feels like having a personal news anchor.",
		rating: 5,
	},
	{
		name: "Emily Thompson",
		role: "Marketing Director",
		company: "GrowthCo",
		image:
			"https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
		content:
			"I love how I can consume content during my workout sessions. NewsNudge keeps me informed without disrupting my fitness routine.",
		rating: 5,
	},
];

export function Testimonials() {
	return (
		<section id="testimonials" className="py-20 bg-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						What Our
						<span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
							{" "}
							Beta Users Say
						</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Join hundreds of professionals who are already transforming their
						newsletter consumption experience.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
							viewport={{ once: true }}
							whileHover={{ y: -5 }}
							className="group"
						>
							<div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
								{/* Quote Icon */}
								<div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
									<Quote className="w-12 h-12 text-blue-500" />
								</div>

								{/* Rating */}
								<div className="flex items-center mb-4">
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star
											key={i}
											className="w-5 h-5 text-yellow-400 fill-current"
										/>
									))}
								</div>

								{/* Content */}
								<p className="text-gray-700 leading-relaxed mb-6 italic">
									"{testimonial.content}"
								</p>

								{/* Author */}
								<div className="flex items-center">
									<img
										src={testimonial.image}
										alt={testimonial.name}
										className="w-12 h-12 rounded-full object-cover mr-4 group-hover:scale-110 transition-transform duration-300"
									/>
									<div>
										<h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
											{testimonial.name}
										</h4>
										<p className="text-sm text-gray-600">
											{testimonial.role} at {testimonial.company}
										</p>
									</div>
								</div>
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
					<div className="inline-flex items-center space-x-8 px-8 py-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-full">
						<div className="text-center">
							<div className="text-2xl font-bold text-gray-900">500+</div>
							<div className="text-sm text-gray-600">Beta Users</div>
						</div>
						<div className="w-px h-8 bg-gray-300"></div>
						<div className="text-center">
							<div className="text-2xl font-bold text-gray-900">4.9</div>
							<div className="text-sm text-gray-600">Avg Rating</div>
						</div>
						<div className="w-px h-8 bg-gray-300"></div>
						<div className="text-center">
							<div className="text-2xl font-bold text-gray-900">95%</div>
							<div className="text-sm text-gray-600">Satisfaction</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
