import ScrollWrapper from "../components/ScrollWrapper/ScrollWrapper";
import FixedSection from "../components/FixedWrapper/FixedSection";
import Navbar from "../components/Navbar/Navbar";

export default function Home() {
	return (
		<main>
			<ScrollWrapper>
				<Navbar />
				<FixedSection />
			</ScrollWrapper>
		</main>
	);
}
