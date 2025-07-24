"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AdvancedAudioPlayer } from "@/components/player/AdvancedAudioPlayer";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivityList } from "@/components/dashboard/RecentActivityList";
import { ROUTE_TO_LOGIN } from "@/lib/constants";

// Mock data - replace with actual data fetching
const mockTranscripts = [
	{
		id: 1,
		title: "Weekly Digest",
		source: "TLDR Tech",
		duration: "5:23",
		audioUrl: "/sample.wav",
		transcript: [
			{
				id: 1,
				startTime: 0,
				endTime: 15,
				text: "Welcome to this week's AI digest. We're covering the latest developments in artificial intelligence and machine learning.",
			},
			{
				id: 2,
				startTime: 15,
				endTime: 30,
				text: "First up, OpenAI has announced significant improvements to their language models, focusing on better reasoning capabilities.",
			},
			{
				id: 3,
				startTime: 30,
				endTime: 45,
				text: "Google has also made strides in AI research, particularly in the field of computer vision and image recognition.",
			},
			{
				id: 4,
				startTime: 45,
				endTime: 60,
				text: "Meanwhile, startups continue to innovate in the AI space, with several companies raising significant funding rounds.",
			},
			{
				id: 5,
				startTime: 60,
				endTime: 75,
				text: "Let's dive deeper into each of these stories and understand their implications for the tech industry.",
			},
		],
	},
	{
		id: 2,
		title: "Market Update",
		source: "Financial Times",
		duration: "3:45",
		audioUrl: "/sample.wav",
		transcript: [
			{
				id: 1,
				startTime: 0,
				endTime: 20,
				text: "Good morning, and welcome to today's market update. We're seeing mixed signals across global markets.",
			},
			{
				id: 2,
				startTime: 20,
				endTime: 40,
				text: "Tech stocks are showing resilience despite recent volatility, with several major companies reporting strong earnings.",
			},
			{
				id: 3,
				startTime: 40,
				endTime: 60,
				text: "Energy sector continues to face headwinds as oil prices fluctuate amid geopolitical tensions.",
			},
		],
	},
	{
		id: 3,
		title: "Product Hunt Daily",
		source: "Product Hunt",
		duration: "4:12",
		audioUrl: "/sample.wav",
		transcript: [
			{
				id: 1,
				startTime: 0,
				endTime: 25,
				text: "Hello and welcome to Product Hunt Daily. Today we're featuring some exciting new launches in the tech space.",
			},
			{
				id: 2,
				startTime: 25,
				endTime: 50,
				text: "Our top pick today is an innovative AI-powered productivity tool that's gaining significant traction.",
			},
		],
	},
];
export default function HomePage() {
	const [currentTranscript, setCurrentTranscript] = useState(
		mockTranscripts[0]
	);
	const { loading, error, user } = useUser();
	const router = useRouter();

	useEffect(() => {
		const checkUser = async () => {
			if ((!loading && !user) || error) {
				router.push(ROUTE_TO_LOGIN);
			}
		};
		checkUser();
	}, [router, error, user, loading]);

	return (
		<DashboardLayout>
			<div className="space-y-6">
				{/* Audio Player Strip */}
				<AdvancedAudioPlayer
					currentTranscript={currentTranscript}
					recentTranscripts={mockTranscripts}
					onTranscriptChange={setCurrentTranscript}
				/>

				{/* Summary Cards */}
				<SummaryCards />

				{/* Quick Actions */}
				<QuickActions />

				{/* Recent Activity */}
				<RecentActivityList
					onTranscriptSelect={setCurrentTranscript}
					transcripts={mockTranscripts}
				/>
			</div>
		</DashboardLayout>
	);
}
