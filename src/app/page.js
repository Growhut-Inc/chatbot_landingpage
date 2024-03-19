"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SectionSnap from "@/components/ChatbotSection/SectionSnap";
import LottieScrollTrigger from "@/components/LottieScrollTrigger/LottieScrollTrigger";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollToPlugin, Observer);

export default function Home() {
	const [lastSlideReached, setLastSlideReached] = useState(false);
	const [newDirection, setNewDirection] = useState(0);
	let currentSectionIndex = 0;
	let scrollContainer = null;
	let sections = [];

	const debounce = (func, wait) => {
		let timeout;

		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};

			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	};

	const handleScroll = (direction) => {
		if (lastSlideReached) {
			currentSectionIndex += direction;
			if (currentSectionIndex === 0) {
				setLastSlideReached(false);
				setNewDirection(direction);
			}
			scrollToSection();
		} else {
			setNewDirection(direction);
		}
	};
	const debouncedHandleScroll = debounce(handleScroll, 200);

	const scrollToSection = () => {
		const targetY = -sections[currentSectionIndex].offsetTop;
		sections.forEach((a) => gsap.to(a, { duration: 1, y: targetY }));
	};

	const handleLastSlide = (isLast) => {
		console.log("isLast", isLast);
		setLastSlideReached(isLast);
		if (!isLast) return;
		currentSectionIndex = 1;
		scrollToSection();
	};

	useEffect(() => {
		scrollContainer = document.getElementById("scrollContainer");
		sections = document.querySelectorAll(".section");

		const observer = Observer.create({
			type: "wheel,touch,pointer",
			wheelSpeed: -1,
			onDown: () => debouncedHandleScroll(-1),
			onUp: () => debouncedHandleScroll(1),
			tolerance: 10,
		});

		return () => {
			observer.kill();
		};
	}, []);
	return (
		<main className="main">
			<Navbar />
			<div className="scroll_container" id="scrollContainer">
				<div className="section">
					<LottieScrollTrigger
						onLastSlide={handleLastSlide}
						newDirection={newDirection}
					/>
				</div>
				<div
					className="section"
					onScroll={(e) => {
						console.log(e);
					}}
				>
					<SectionSnap />
				</div>
				<div className="section">
					<Footer />
				</div>
			</div>
		</main>
	);
}
