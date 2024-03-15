import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

function LottieScrollTrigger() {
	const animationContainer = useRef(null);
	const animationInstance = useRef(null);
	const currentIndexRef = useRef(0);
	const isAnimating = useRef(false);
	const maxLength = 2;

	const loadAnimation = (index, direction) => {
		if (animationInstance.current) {
			animationInstance.current.destroy();
		}
		animationInstance.current = lottie.loadAnimation({
			container: animationContainer.current,
			renderer: "svg",
			loop: false,
			autoplay: false,
			path: `/animations/lottie${index + (direction === 1 ? 1 : 2)}.json`,
		});

		animationInstance.current.addEventListener("DOMLoaded", () => {
			if (direction === -1) {
				animationInstance.current.goToAndStop(
					animationInstance.current.totalFrames - 1,
					true
				);
				animationInstance.current.setDirection(-1);
			} else {
				animationInstance.current.setDirection(1);
			}
			animationInstance.current.play();
			isAnimating.current = true;
			animationInstance.current.addEventListener("complete", () => {
				isAnimating.current = false;
			});
		});
	};

	const handleScroll = (direction) => {
		if (isAnimating.current) return;
		let newIndex = currentIndexRef.current + direction;
		if (newIndex < -1 || newIndex >= maxLength) return;
		isAnimating.current = true;
		currentIndexRef.current = newIndex;
		loadAnimation(currentIndexRef.current, direction);
	};

	useEffect(() => {
		Observer.create({
			type: "wheel,touch,pointer",
			wheelSpeed: -1,
			onDown: () => handleScroll(-1),
			onUp: () => handleScroll(1),
			tolerance: 10,
		});

		loadAnimation(0, 1);

		return () => {
			animationInstance.current?.destroy();
			ScrollTrigger.getAll().forEach((st) => st.kill());
		};
	}, []);

	return (
		<div
			ref={animationContainer}
			style={{ width: "100%", height: "100vh" }}
		/>
	);
}

export default LottieScrollTrigger;
