"use client";
import React, { useRef, useEffect, useState } from "react";
import lottie from "lottie-web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import "./style.css";
import SlideCounter from "../SlideCounter/SlideCounter";

gsap.registerPlugin(ScrollTrigger, Observer);

function LottieScrollTrigger() {
	const preloadedAnimations = useRef([]);
	const maxLength = 8;
	const animationContainer = useRef(
		[...Array(maxLength)].map(() => React.createRef())
	);
	const [currentCount, setCurrentCount] = useState(1);
	const currentIndexRef = useRef(0);
	const currentIndexDirection = useRef(1);
	const isAnimating = useRef(false);

	const loadAnimation = (index, direction) => {
		if (index < 0 || index >= maxLength) {
			console.error("Index out of bounds:", index);
			return;
		}
		if (direction === -1) {
			const newAnimation = preloadedAnimations.current[index + 1];
			if (!newAnimation) return;
			newAnimation.goToAndStop(newAnimation.totalFrames - 1, true);
			newAnimation.setDirection(-1);
			newAnimation.play();
			isAnimating.current = true;
			currentIndexDirection.current = -1;
		} else {
			const newAnimation = preloadedAnimations.current[index];
			if (!newAnimation) return;
			for (var i = 0; i < maxLength; i++) {
				animationContainer.current[i].current.style.display = "none";
			}
			animationContainer.current[index].current.style.display = "block";
			newAnimation.goToAndStop(0, true);
			newAnimation.setDirection(1);
			newAnimation.play();
			isAnimating.current = true;
			currentIndexDirection.current = 1;
		}
	};

	const handleScroll = (direction) => {
		if (isAnimating.current) return;
		let newIndex = currentIndexRef.current + direction;
		if (newIndex < 0) {
			newIndex = 0;
		} else if (newIndex >= maxLength) {
			newIndex = maxLength - 1;
		}
		console.log("newIndex", newIndex);
		if (newIndex < -1 || newIndex >= maxLength) return;
		isAnimating.current = true;
		currentIndexRef.current = newIndex;
		setCurrentCount(newIndex + 1);
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
							if (currentIndexDirection.current === -1) {
								for (var i = 0; i < maxLength; i++) {
									animationContainer.current[
										i
									].current.style.display = "none";
								}
								animationContainer.current[
									currentIndexRef.current
								].current.style.display = "block";
							}
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
	const content = [
		<>
			<span className="italic_text">
				"Get closer than ever to your customers.
				<br />
				So close, in fact, that you tell them what they need well before
				they realize it themselves."
			</span>
			<p>- Steve Jobs</p>
		</>,
		<>
			<h4>Every business owner knows the dance.</h4>
			<p>
				Attracting new customers while keeping the loyal ones not just
				satisfied, but delighted. It's more than a balance; it's an art,
				crucial for growth and thriving in today's market.
			</p>
		</>,
		<>
			<p>
				Now, imagine a tool, not just any tool, but one that embodies
				this balance, enhancing it. What we're introducing today isn't
				just a solution; it's a revolution in customer relationships.
				Let's dive into how it transforms your business.
			</p>
		</>,
		<>
			<h4>Here's where our journey takes a turn.</h4>
			<p>
				We unveil the power of tailor-made AI Chatbots by Growhut. These
				aren't just chatbots; they're your partners in ensuring customer
				loyalty. With them, every client has a compelling reason to keep
				coming back.
			</p>
		</>,
		<>
			<h4>Step with us into the future of customer engagement.</h4>
			<p>
				The Growhut AI Chatbots offer more than just interactions; they
				provide 24/7 support and personalized conversations, turning
				each touchpoint into an opportunity for growth and connection.
			</p>
		</>,
		<>
			<h4>This is where the magic happens.</h4>
			<p>
				Transform your sales process with the Growhut AI Chatbots. Watch
				the seamless transition as casual visitors on your website
				become satisfied, loyal customers, smoothly navigating through
				your sales funnel.
			</p>
		</>,
		<>
			<h4>And finally, it's about making informed decisions.</h4>
			<p>
				Growhut AI Chatbots do more than just converse; they provide a
				wealth of data-driven insights. This intelligence is what puts
				you ahead, always one step ahead in your market.
			</p>
		</>,
	];
	return (
		<div className="homepage_design">
			<div className="bg_star"></div>
			{Array.from({ length: maxLength }).map((_, i) => (
				<div className="panel" key={i}>
					<div
						ref={animationContainer.current[i]}
						className="icon_animation"
					/>
					<div className="content_wrapper">
						<div className="content1">
							<div
								className={`text_wrapper ${
									i === currentCount - 1 ? "show" : "hide"
								}`}
							>
								{content[i]}
							</div>
						</div>
					</div>
					<SlideCounter count={`${currentCount}/${maxLength}`} />
				</div>
			))}
		</div>
	);
}

export default LottieScrollTrigger;
