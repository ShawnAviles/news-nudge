"use client";

import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mockTranscripts = [
  {
    id: 1,
    title: "AI Weekly Digest",
    source: "TechCrunch",
    duration: "5:23",
    isPlaying: false,
  },
  {
    id: 2,
    title: "Market Update",
    source: "Financial Times",
    duration: "3:45",
    isPlaying: false,
  },
  {
    id: 3,
    title: "Product Hunt Daily",
    source: "Product Hunt",
    duration: "4:12",
    isPlaying: false,
  },
];

export function AudioPlayerStrip() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  const handlePlay = (id: number) => {
    setCurrentTrack(currentTrack === id ? null : id);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transcripts</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            {showTranscript ? "Hide" : "Show"} Transcript
          </Button>
        </div>

        <div className="space-y-3">
          {mockTranscripts.map((transcript) => (
            <div
              key={transcript.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border transition-colors",
                currentTrack === transcript.id ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
              )}
            >
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handlePlay(transcript.id)}
                  className="h-8 w-8"
                >
                  {currentTrack === transcript.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transcript.title}</p>
                    <p className="text-xs text-gray-500">{transcript.source}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{transcript.duration}</span>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <SkipBack className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <SkipForward className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showTranscript && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Transcript</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              This is a sample transcript text that would show the content of the selected audio briefing. 
              The transcript would be generated from the newsletter content and displayed here for users 
              who prefer to read along or reference specific points.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}