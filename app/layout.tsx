import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata: Metadata = {
	// metadataBase: new URL("https://newsnudge.app"),
	metadataBase: new URL(defaultUrl),
	title: "NewsNudge",

	description:
		"Stay informed on-the-go with AI-powered audio briefings from your favorite newsletters. Perfect for busy professionals, commuters, and remote workers.",

	keywords:
		"newsletter, audio, briefing, AI, productivity, commute, professional",

	openGraph: {
		title: "NewsNudge - Transform Newsletters into Audio Briefings",
		description:
			"Stay informed on-the-go with AI-powered audio briefings from your favorite newsletters.",
		type: "website",
	},
};

const geistSans = Geist({
	variable: "--font-geist-sans",
	display: "swap",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.className} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
