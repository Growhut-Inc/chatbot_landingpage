"use client";
import React, { useEffect, useRef } from "react";
import ChatBot from "./ChatBot/ChatBot";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionSnap = () => {
	const containerRef = useRef(null);

	useEffect(() => {
		gsap.to(".panel", {
			scrollTrigger: {
				trigger: ".panel",
				start: "5% top",
				end: "50% 15%",
				scrub: true,
				pin: true,
				// pinSpacing: false,
				// markers: true,
			},
		});
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<div className="snap_container" ref={containerRef}>
			<ChatBot />
		</div>
	);
};

export default SectionSnap;
