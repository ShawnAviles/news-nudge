import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdvancedAudioPlayer } from "@/components/dashboard/AdvancedAudioPlayer";

// Mock data - replace with actual data fetching
const mockTranscripts = [
  {
    id: 1,
    title: "AI Weekly Digest",
    source: "TechCrunch",
    duration: "5:23",
    audioUrl: "/sample.wav",
    transcript: [
      { id: 1, startTime: 0, endTime: 15, text: "Welcome to this week's AI digest. We're covering the latest developments in artificial intelligence and machine learning." },
      { id: 2, startTime: 15, endTime: 30, text: "First up, OpenAI has announced significant improvements to their language models, focusing on better reasoning capabilities." },
      { id: 3, startTime: 30, endTime: 45, text: "Google has also made strides in AI research, particularly in the field of computer vision and image recognition." },
      { id: 4, startTime: 45, endTime: 60, text: "Meanwhile, startups continue to innovate in the AI space, with several companies raising significant funding rounds." },
      { id: 5, startTime: 60, endTime: 75, text: "Let's dive deeper into each of these stories and understand their implications for the tech industry." },
    ],
  },
  {
    id: 2,
    title: "Market Update",
    source: "Financial Times",
    duration: "3:45",
    audioUrl: "/sample.wav",
    transcript: [
      { id: 1, startTime: 0, endTime: 20, text: "Good morning, and welcome to today's market update. We're seeing mixed signals across global markets." },
      { id: 2, startTime: 20, endTime: 40, text: "Tech stocks are showing resilience despite recent volatility, with several major companies reporting strong earnings." },
      { id: 3, startTime: 40, endTime: 60, text: "Energy sector continues to face headwinds as oil prices fluctuate amid geopolitical tensions." },
    ],
  },
];

interface PlayerPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const resolvedParams = await params;
  const transcriptId = parseInt(resolvedParams.id);
  
  // Find the transcript by ID
  const currentTranscript = mockTranscripts.find(t => t.id === transcriptId);
  
  if (!currentTranscript) {
    redirect("/home");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Audio Player</h1>
          <p className="text-gray-600">Listen to your newsletter briefings</p>
        </div>
        
        <AdvancedAudioPlayer
          currentTranscript={currentTranscript}
          recentTranscripts={mockTranscripts}
          onTranscriptChange={() => {}} // Handle navigation in standalone player
          className="w-full"
        />
      </div>
    </div>
  );
}