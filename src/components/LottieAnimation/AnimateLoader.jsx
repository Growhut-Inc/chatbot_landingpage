"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import animation from "@/assets/animation1.json";
import "./style.css";

export default function AnimatedLoader() {
	const [instance, setInstance] = useState();
	const playerRef = useRef();
	const animationRef = useRef();
	gsap.registerPlugin(ScrollTrigger);

	useEffect(() => {
		ScrollTrigger.defaults({
			// markers: true
		});
		gsap.registerPlugin(ScrollTrigger);
	}, []);

	useEffect(() => {
		playerRef.current.setSeeker("20%");
	}, []);

	useEffect(() => {
		if (!instance) return;

		const onUpdate = (self) => {
			const progress = self.progress;

			const currentFrame = Math.round(instance.totalFrames * progress);
			instance.goToAndStop(currentFrame, true);

			// if (progress === 1) {
			// 	playerRef.current.setSeeker("100%");
			// }
			const animationHeight = instance.totalFrames * 5;
			document.querySelector(".section_bg_wrapper").style.height = `${
				animationHeight - 2200
			}px`;
		};

		ScrollTrigger.create({
			trigger: animationRef.current,
			// pin: true,
			start: "-50% 50%",
			end: () => `+=${instance.totalFrames * 5}`,
			scrub: true,
			onUpdate: onUpdate,
		});

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.revert());
		};
	}, [instance]);

	return (
		<div id="animation" ref={animationRef}>
			<Player
				lottieRef={(ins) => {
					setInstance(ins);
				}}
				autoplay={false}
				setSeeker={"100%"}
				loop={false}
				controls={true}
				src={animation}
				style={{ width: "100%", height: "100%" }}
				ref={playerRef}
			/>
		</div>
	);
}
