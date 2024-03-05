import FixedSection from "@/section/FixedWrapper/FixedSection";
import styles from "./page.module.css";
import Section from "@/section/Section";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <Section /> */}
      <FixedSection />
    </main>
  );
}
