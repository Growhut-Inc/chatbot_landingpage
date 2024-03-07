import ScrollWrapper from "../components/ScrollWrapper/ScrollWrapper";
import FixedSection from "../components/FixedWrapper/FixedSection";
import Navbar from "../components/Navbar/Navbar";
import ChatBot from "@/components/ChatBot/ChatBot";
import Footer from "@/components/Footer/Footer";

export default function Home() {
	return (
		<main>
			<ScrollWrapper>
				<Navbar />
				<FixedSection />
			</ScrollWrapper>
			<ChatBot />
			<Footer />
		</main>
	);
}
