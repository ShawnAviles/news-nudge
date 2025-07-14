import Link from "next/link";
import { Volume2, Home } from "lucide-react";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
			<div className="text-center max-w-md mx-auto">
				{/* Logo */}
				<div className="flex items-center justify-center space-x-2 mb-8">
					<div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
						<Volume2 className="h-6 w-6 text-white" />
					</div>
					<span className="text-xl font-bold text-gray-900">NewsNudge</span>
				</div>

				{/* 404 */}
				<div className="mb-6">
					<h1 className="text-6xl font-bold text-gray-300 mb-2">404</h1>
					<h2 className="text-2xl font-semibold text-gray-900 mb-4">
						Page Not Found
					</h2>
					<p className="text-gray-600 leading-relaxed">
						Oops! The page you&apos;re looking for doesn&apos;t exist. It might
						have been moved or deleted.
					</p>
				</div>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link href="/" className="btn btn-primary text-white">
						<Home className="w-4 h-4 mr-2" />
						Go Home
					</Link>
				</div>
			</div>
		</div>
	);
}
