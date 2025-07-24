import { Volume2 } from "lucide-react";

const NewsNudgeLogo = () => {
	return (
		<div className="flex h-16 shrink-0 items-center">
			<div className="flex items-center space-x-2">
				<div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
					<Volume2 className="h-6 w-6 text-white" />
				</div>
				<span className="text-xl font-bold text-gray-900">NewsNudge</span>
			</div>
		</div>
	);
};

export default NewsNudgeLogo;
