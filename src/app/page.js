import styles from "./page.module.css";
import ScrollWrapper from "../components/ScrollWrapper/ScrollWrapper";
import FixedSection from "../components/FixedWrapper/FixedSection";
import Navbar from "../components/Navbar/Navbar";

export default function Home() {
	return (
		<main className={styles.main}>
			<ScrollWrapper>
				<Navbar />
				<FixedSection />
			</ScrollWrapper>
		</main>
	);
}
