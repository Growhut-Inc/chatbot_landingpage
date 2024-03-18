import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

function LottieScrollTrigger() {
	const preloadedAnimations = useRef([]);
	const maxLength = 8;
	const animationContainer = useRef(
		[...Array(maxLength)].map(() => React.createRef())
	);
	const currentIndexRef = useRef(0);
	const isAnimating = useRef(false);

	const loadAnimation = (index, direction) => {
		const newAnimation = preloadedAnimations.current[index];
		if (!newAnimation) return;
		for (var i = 0; i < maxLength; i++) {
			animationContainer.current[i].current.style.display = "none";
		}
		animationContainer.current[index].current.style.display = "block";
		if (direction === -1) {
			newAnimation.goToAndStop(newAnimation.totalFrames - 1, true);
			newAnimation.setDirection(-1);
		} else {
			newAnimation.goToAndStop(0, true);
			newAnimation.setDirection(1);
		}
		newAnimation.play();
		isAnimating.current = true;
	};

	const handleScroll = (direction) => {
		if (isAnimating.current) return;
		let newIndex = currentIndexRef.current + direction;
		console.log("newIndex", newIndex);
		if (newIndex < -1 || newIndex >= maxLength) return;
		isAnimating.current = true;
		currentIndexRef.current = newIndex;
		loadAnimation(currentIndexRef.current, direction);
	};

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

	const debouncedHandleScroll = debounce(handleScroll, 200);

	useEffect(() => {
		Observer.create({
			type: "wheel,touch,pointer",
			wheelSpeed: -1,
			onDown: () => debouncedHandleScroll(-1),
			onUp: () => debouncedHandleScroll(1),
			tolerance: 10,
		});

		const animationPromises = animationContainer.current.map(
			(ref, index) =>
				new Promise((resolve, reject) => {
					if (ref.current) {
						const anim = lottie.loadAnimation({
							container: ref.current,
							renderer: "svg",
							loop: false,
							autoplay: false,
							path: `/animations/lottie${index + 1}.json`,
						});
						anim.addEventListener("DOMLoaded", () => {
							resolve(anim);
						});
						anim.addEventListener("complete", () => {
							isAnimating.current = false;
						});
						preloadedAnimations.current.push(anim);
					} else {
						reject(
							new Error(
								`Container for animation ${
									index + 1
								} is not available`
							)
						);
					}
				})
		);

		Promise.all(animationPromises).then(() => {
			loadAnimation(0, 1);
		});

		return () => {
			preloadedAnimations.current.forEach((anim) => anim.destroy());
			ScrollTrigger.getAll().forEach((st) => st.kill());
		};
	}, []);

	return (
		<div
			style={{
				overflow: "hidden",
				height: "100vh",
				position: "relative",
			}}
		>
			{Array.from({ length: maxLength }).map((_, i) => (
				<div
					style={{
						width: "100%",
						height: "100vh",
						position: "absolute",
					}}
					key={i}
				>
					<div
						ref={animationContainer.current[i]}
						style={{
							width: "100%",
							height: "40vh",
							display: "none",
						}}
					/>
				</div>
			))}
		</div>
	);
}

export default LottieScrollTrigger;
