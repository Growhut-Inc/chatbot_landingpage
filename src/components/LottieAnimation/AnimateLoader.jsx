"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import animation from "@/assets/animation2.json";
import "./style.css";

export default function AnimatedLoader() {
	const [instance, setInstance] = useState();
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	const playerRef = useRef();
	const animationRef = useRef();
	gsap.registerPlugin(ScrollTrigger);

	const checkScreenSize = () => {
		if (typeof window !== "undefined") {
			if (window.innerWidth < 768) {
				setIsSmallScreen(true);
			} else {
				setIsSmallScreen(false);
			}
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("resize", checkScreenSize);
			checkScreenSize();
		}
		ScrollTrigger.defaults({
			// markers: true,
		});
		gsap.registerPlugin(ScrollTrigger);
	}, []);

	useEffect(() => {
		playerRef.current.setSeeker("0%");
	}, []);

	useEffect(() => {
		if (!instance) return;

		const onUpdate = (self) => {
			const progress = self.progress;

			const currentFrame = Math.round(instance.totalFrames * progress);
			instance.goToAndStop(currentFrame, true);

			const animationHeight =
				instance.totalFrames * (isSmallScreen ? 2.5 : 5.5);
			document.querySelector(
				".section_bg_wrapper"
			).style.height = `${animationHeight}px`;
			console.log(animationHeight, "animationheight");
		};

		ScrollTrigger.create({
			trigger: animationRef.current,
			start: "-20% 50%",
			end: () =>
				`+=${
					instance.totalFrames * (isSmallScreen ? 2.5 : 5.5)
				} center`,
			// end: "+=5901 center",
			scrub: true,
			onUpdate: onUpdate,
		});

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.revert());
		};
	}, [instance, isSmallScreen]);

	return (
		<div id="animation" ref={animationRef}>
			<Player
				lottieRef={(ins) => {
					setInstance(ins);
				}}
				autoplay={false}
				setSeeker={"0%"}
				loop={false}
				controls={true}
				src={animation}
				style={{ width: "100%", height: "100%" }}
				ref={playerRef}
			/>
		</div>
	);
}
