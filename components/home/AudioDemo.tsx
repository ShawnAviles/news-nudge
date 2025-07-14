"use client";

import { motion } from "framer-motion";
import { Volume2, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import {
	useState,
	useRef,
	useEffect,
	useImperativeHandle,
	forwardRef,
} from "react";

interface AudioDemoProps {
	title?: string;
	subtitle?: string;
}

// Define a handle type that exposes methods to the parent
export type AudioDemoHandle = {
	status: () => "Paused" | "Playing";
	play: () => void;
	pause: () => void;
	toggle: () => void;
	skip: (seconds: number) => void;
};

const audioSrc = "/sample.wav";
const startTimeInSeconds = 68;

// Use forwardRef to expose methods to parent component
export const AudioDemo = forwardRef<AudioDemoHandle, AudioDemoProps>(
	(
		{ title = "Morning Briefing", subtitle = "Tech Newsletter Digest" },
		ref
	) => {
		const [isPlaying, setIsPlaying] = useState(false);
		const [progress, setProgress] = useState(0);
		const [duration, setDuration] = useState(0);
		const audioRef = useRef<HTMLAudioElement | null>(null);

		// Expose functions to the parent component
		useImperativeHandle(ref, () => ({
			status: () => {
				return isPlaying ? "Playing" : "Paused";
			},
			play: () => {
				if (audioRef.current && !isPlaying) {
					audioRef.current.play();
					setIsPlaying(true);
				}
			},
			pause: () => {
				if (audioRef.current && isPlaying) {
					audioRef.current.pause();
					setIsPlaying(false);
				}
			},
			toggle: () => {
				togglePlayPause();
			},
			skip: (seconds: number) => {
				skipTime(seconds);
			},
		}));

		useEffect(() => {
			// Initialize audio element
			if (typeof window !== "undefined") {
				audioRef.current = new Audio(audioSrc);
				audioRef.current.currentTime = startTimeInSeconds;

				// Set up event listeners
				audioRef.current.addEventListener("timeupdate", updateProgress);
				audioRef.current.addEventListener("loadedmetadata", () => {
					setDuration(audioRef.current?.duration || 0);
				});
				audioRef.current.addEventListener("ended", () => {
					setIsPlaying(false);
					setProgress(0);
					if (audioRef.current)
						audioRef.current.currentTime = startTimeInSeconds;
				});
			}

			// Cleanup
			return () => {
				if (audioRef.current) {
					audioRef.current.pause();
					audioRef.current.removeEventListener("timeupdate", updateProgress);
					audioRef.current.removeEventListener("loadedmetadata", () => {});
					audioRef.current.removeEventListener("ended", () => {});
				}
			};
		}, []);

		const updateProgress = () => {
			if (audioRef.current) {
				const value =
					(audioRef.current.currentTime / audioRef.current.duration) * 100;
				setProgress(value);
			}
		};

		const togglePlayPause = () => {
			if (audioRef.current) {
				if (isPlaying) {
					audioRef.current.pause();
				} else {
					audioRef.current.play();
				}
				setIsPlaying(!isPlaying);
			}
		};

		const skipTime = (seconds: number) => {
			if (audioRef.current) {
				audioRef.current.currentTime = Math.max(
					0,
					Math.min(
						audioRef.current.duration,
						audioRef.current.currentTime + seconds
					)
				);
			}
		};

		const formatTime = (seconds: number) => {
			const mins = Math.floor(seconds / 60);
			const secs = Math.floor(seconds % 60);
			return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
		};

		const currentTime = audioRef.current?.currentTime || 0;

		return (
			<motion.div
				animate={{ y: [0, -10, 0] }}
				transition={{
					duration: 3,
					repeat: Infinity,
					ease: "easeInOut",
				}}
				className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200"
			>
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center space-x-3">
						<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
							<Volume2 className="w-6 h-6 text-white" />
						</div>
						<div>
							<h3 className="font-semibold text-gray-900">{title}</h3>
							<p className="text-sm text-gray-500">{subtitle}</p>
						</div>
					</div>
					<div className="text-sm text-gray-500">
						{formatTime(currentTime)}/{formatTime(duration)}
					</div>
				</div>

				<div className="space-y-4">
					<div className="w-full bg-gray-200 rounded-full h-2">
						<motion.div
							initial={{ width: "0%" }}
							animate={{ width: `${progress}%` }}
							className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
						></motion.div>
					</div>

					<div className="flex items-center justify-center space-x-6">
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
							onClick={() => skipTime(-15)}
							aria-label="Skip back 15 seconds"
						>
							<SkipBack className="w-5 h-5" />
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
							onClick={togglePlayPause}
							aria-label={isPlaying ? "Pause" : "Play"}
						>
							{isPlaying ? (
								<Pause className="w-6 h-6" />
							) : (
								<Play className="w-6 h-6" />
							)}
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
							onClick={() => skipTime(15)}
							aria-label="Skip forward 15 seconds"
						>
							<SkipForward className="w-5 h-5" />
						</motion.button>
					</div>
				</div>
			</motion.div>
		);
	}
);

// Add display name for better debugging
AudioDemo.displayName = "AudioDemo";
