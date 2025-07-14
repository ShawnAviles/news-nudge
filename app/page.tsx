import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Waitlist } from "@/components/home/Waitlist";
import { Footer } from "@/components/home/Footer";

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
			<Header />
			<Hero />
			<Features />
			<HowItWorks />
			<Waitlist />
			<Footer />
		</main>
	);
}
