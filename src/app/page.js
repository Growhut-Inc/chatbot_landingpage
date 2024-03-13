import ScrollWrapper from "../components/ScrollWrapper/ScrollWrapper";
import FixedSection from "../components/FixedWrapper/FixedSection";
import Navbar from "../components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SectionSnap from "@/components/ChatbotSection/SectionSnap";
import Slides from "@/components/Slides/Slides";

export default function Home() {
	return (
		<main>
			{/* <ScrollWrapper>
				<Navbar />
				<FixedSection />
			</ScrollWrapper>
			<SectionSnap />
			<Footer /> */}
			<Slides />
			{/* <FadeSlide /> */}
		</main>
	);
}
