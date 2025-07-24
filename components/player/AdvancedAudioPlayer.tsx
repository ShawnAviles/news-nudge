"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
	Play,
	Pause,
	SkipBack,
	SkipForward,
	Volume2,
	VolumeX,
	FileText,
	ChevronUp,
	ChevronDown,
	Repeat,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Transcript {
	id: number;
	title: string;
	source: string;
	duration: string;
	audioUrl: string;
	transcript: TranscriptSegment[];
}

interface TranscriptSegment {
	id: number;
	startTime: number;
	endTime: number;
	text: string;
}

interface AdvancedAudioPlayerProps {
	currentTranscript: Transcript | null;
	recentTranscripts: Transcript[];
	onTranscriptChange: (transcript: Transcript) => void;
	className?: string;
}

const playbackSpeeds = [0.5, 1, 1.5, 2, 2.5];

export function AdvancedAudioPlayer({
	currentTranscript,
	recentTranscripts,
	onTranscriptChange,
	className,
}: AdvancedAudioPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(false);
	const [playbackSpeed, setPlaybackSpeed] = useState(1);
	const [showTranscript, setShowTranscript] = useState(true);
	const [autoplay, setAutoplay] = useState(false);
	const [currentSegmentId, setCurrentSegmentId] = useState<number | null>(null);
	const [isExpanded, setIsExpanded] = useState(false);

	const audioRef = useRef<HTMLAudioElement | null>(null);
	const transcriptRef = useRef<HTMLDivElement | null>(null);

	// Initialize audio element
	useEffect(() => {
		if (currentTranscript && typeof window !== "undefined") {
			if (audioRef.current) {
				audioRef.current.pause();
			}

			audioRef.current = new Audio(currentTranscript.audioUrl);
			audioRef.current.volume = volume;
			audioRef.current.playbackRate = playbackSpeed;

			const audio = audioRef.current;

			const handleTimeUpdate = () => {
				setCurrentTime(audio.currentTime);
				updateCurrentSegment(audio.currentTime);
			};

			const handleLoadedMetadata = () => {
				setDuration(audio.duration);
			};

			const handleEnded = () => {
				setIsPlaying(false);
				if (autoplay) {
					playNext();
				}
			};

			audio.addEventListener("timeupdate", handleTimeUpdate);
			audio.addEventListener("loadedmetadata", handleLoadedMetadata);
			audio.addEventListener("ended", handleEnded);

			return () => {
				audio.removeEventListener("timeupdate", handleTimeUpdate);
				audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
				audio.removeEventListener("ended", handleEnded);
				audio.pause();
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTranscript, volume, playbackSpeed, autoplay]);

	const updateCurrentSegment = useCallback(
		(time: number) => {
			if (!currentTranscript?.transcript) return;

			const segment = currentTranscript.transcript.find(
				(seg) => time >= seg.startTime && time <= seg.endTime
			);

			if (segment && segment.id !== currentSegmentId) {
				setCurrentSegmentId(segment.id);

				// Auto-scroll to current segment
				if (transcriptRef.current) {
					const segmentElement = transcriptRef.current.querySelector(
						`[data-segment-id="${segment.id}"]`
					);
					if (segmentElement) {
						segmentElement.scrollIntoView({
							behavior: "smooth",
							block: "center",
						});
					}
				}
			}
		},
		[currentSegmentId, currentTranscript]
	);

	const togglePlayPause = () => {
		if (!audioRef.current) return;

		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const skipTime = (seconds: number) => {
		if (!audioRef.current) return;

		const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
		audioRef.current.currentTime = newTime;
		setCurrentTime(newTime);
	};

	const seekTo = (percentage: number) => {
		if (!audioRef.current) return;

		const newTime = (percentage / 100) * duration;
		audioRef.current.currentTime = newTime;
		setCurrentTime(newTime);
	};

	const changeSpeed = (speed: number) => {
		setPlaybackSpeed(speed);
		if (audioRef.current) {
			audioRef.current.playbackRate = speed;
		}
	};

	const toggleMute = () => {
		if (!audioRef.current) return;

		if (isMuted) {
			audioRef.current.volume = volume;
			setIsMuted(false);
		} else {
			audioRef.current.volume = 0;
			setIsMuted(true);
		}
	};

	const playNext = () => {
		if (!currentTranscript) return;

		const currentIndex = recentTranscripts.findIndex(
			(t) => t.id === currentTranscript.id
		);
		const nextIndex = (currentIndex + 1) % recentTranscripts.length;
		onTranscriptChange(recentTranscripts[nextIndex]);
	};

	const playPrevious = () => {
		if (!currentTranscript) return;

		const currentIndex = recentTranscripts.findIndex(
			(t) => t.id === currentTranscript.id
		);
		const prevIndex =
			currentIndex === 0 ? recentTranscripts.length - 1 : currentIndex - 1;
		onTranscriptChange(recentTranscripts[prevIndex]);
	};

	const jumpToSegment = (startTime: number) => {
		if (!audioRef.current) return;

		audioRef.current.currentTime = startTime;
		setCurrentTime(startTime);
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
	};

	const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

	if (!currentTranscript) {
		return (
			<Card className={className}>
				<CardContent className="p-6 text-center">
					<p className="text-gray-500">
						Select a transcript to start listening
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className={className}>
			<CardHeader className="pb-4">
				<div className="flex items-center justify-between">
					<CardTitle className="text-lg">Audio Player</CardTitle>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsExpanded(!isExpanded)}
						className="h-8 w-8"
					>
						{isExpanded ? (
							<ChevronUp className="h-4 w-4" />
						) : (
							<ChevronDown className="h-4 w-4" />
						)}
					</Button>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Track Info */}
				<div className="flex items-center space-x-3">
					<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
						<Volume2 className="w-6 h-6 text-white" />
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-gray-900 truncate">
							{currentTranscript.title}
						</h3>
						<p className="text-sm text-gray-500 truncate">
							{currentTranscript.source}
						</p>
					</div>
				</div>

				{isExpanded && (
					<>
						{/* Progress Bar */}
						<div className="space-y-2">
							<div
								className="w-full bg-gray-200 rounded-full h-2 cursor-pointer"
								onClick={(e) => {
									const rect = e.currentTarget.getBoundingClientRect();
									const percentage =
										((e.clientX - rect.left) / rect.width) * 100;
									seekTo(percentage);
								}}
							>
								<div
									className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-150"
									style={{ width: `${progress}%` }}
								/>
							</div>
							<div className="flex justify-between text-xs text-gray-500">
								<span>{formatTime(currentTime)}</span>
								<span>{formatTime(duration)}</span>
							</div>
						</div>

						{/* Main Controls */}
						<div className="flex items-center justify-center space-x-4">
							<Button
								variant="ghost"
								size="icon"
								onClick={playPrevious}
								className="h-10 w-10 rounded-full"
							>
								<SkipBack className="h-5 w-5" />
							</Button>

							<Button
								variant="ghost"
								size="icon"
								onClick={() => skipTime(-15)}
								className="h-10 w-10 rounded-full"
							>
								<span className="text-xs font-medium">-15</span>
							</Button>

							<Button
								size="icon"
								onClick={togglePlayPause}
								className="h-12 w-12 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 rounded-full"
							>
								{isPlaying ? (
									<Pause className="h-6 w-6" />
								) : (
									<Play className="h-6 w-6" />
								)}
							</Button>

							<Button
								variant="ghost"
								size="icon"
								onClick={() => skipTime(15)}
								className="h-10 w-10 rounded-full"
							>
								<span className="text-xs font-medium">+15</span>
							</Button>

							<Button
								variant="ghost"
								size="icon"
								onClick={playNext}
								className="h-10 w-10"
							>
								<SkipForward className="h-5 w-5" />
							</Button>
						</div>

						{/* Secondary Controls */}
						<div className="flex items-center justify-between">
							{/* Volume Control */}
							<div className="flex items-center space-x-2">
								<Button
									variant="ghost"
									size="icon"
									onClick={toggleMute}
									className="h-8 w-8 rounded-full"
								>
									{isMuted ? (
										<VolumeX className="h-4 w-4" />
									) : (
										<Volume2 className="h-4 w-4" />
									)}
								</Button>
								<input
									type="range"
									min="0"
									max="1"
									step="0.1"
									value={isMuted ? 0 : volume}
									onChange={(e) => {
										const newVolume = parseFloat(e.target.value);
										setVolume(newVolume);
										if (audioRef.current) {
											audioRef.current.volume = newVolume;
										}
										if (newVolume > 0) setIsMuted(false);
									}}
									className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
								/>
							</div>

							{/* Playback Speed */}
							<div className="flex items-center">
								<Select
									value={playbackSpeed.toString()}
									onValueChange={(value) => changeSpeed(parseFloat(value))}
								>
									<SelectTrigger className="h-8 w-20 text-xs">
										<SelectValue placeholder="Speed" />
									</SelectTrigger>
									<SelectContent>
										{playbackSpeeds.map((speed) => (
											<SelectItem key={speed} value={speed.toString()}>
												{speed}x
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{/* Additional Controls */}
							<div className="flex items-center space-x-2">
								<Button
									variant={autoplay ? "default" : "ghost"}
									size="icon"
									onClick={() => setAutoplay(!autoplay)}
									className="h-8 w-8"
									title="Autoplay next"
								>
									<Repeat className="h-4 w-4" />
								</Button>

								<Button
									variant={showTranscript ? "default" : "ghost"}
									size="icon"
									onClick={() => setShowTranscript(!showTranscript)}
									className="h-8 w-8"
									title="Toggle transcript"
								>
									<FileText className="h-4 w-4" />
								</Button>
							</div>
						</div>

						{/* Transcript */}
						{showTranscript && currentTranscript.transcript && (
							<div className="border-t pt-4">
								<h4 className="font-medium text-gray-900 mb-3">Transcript</h4>
								<div
									ref={transcriptRef}
									className="max-h-64 overflow-y-auto space-y-2 text-sm leading-relaxed"
								>
									{currentTranscript.transcript.map((segment) => (
										<p
											key={segment.id}
											data-segment-id={segment.id}
											className={cn(
												"cursor-pointer p-2 rounded transition-colors",
												currentSegmentId === segment.id
													? "bg-blue-100 text-blue-900 border-l-4 border-blue-500"
													: "text-gray-700 hover:bg-gray-50"
											)}
											onClick={() => jumpToSegment(segment.startTime)}
										>
											<span className="text-xs text-gray-500 mr-2">
												{formatTime(segment.startTime)}
											</span>
											{segment.text}
										</p>
									))}
								</div>
							</div>
						)}
					</>
				)}
			</CardContent>
		</Card>
	);
}
