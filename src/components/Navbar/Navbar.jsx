"use client";
import Image from "next/image";
import React from "react";
import logo from "../../assets/images/logo.svg";
import "./style.css";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";

const Navbar = () => {
	// useEffect(() => {
	// 	gsap.registerPlugin(ScrollTrigger);
	// 	const tl = gsap.timeline({
	// 		scrollTrigger: {
	// 			trigger: "#animation",
	// 			start: "top top",
	// 			end: "bottom bottom",
	// 			scrub: true,
	// 			markers: true,
	// 		},
	// 	});
	// 	tl.to(contentSelectors[0], {
	// 		opacity: 1,
	// 		scale: 1.1,
	// 		delay: 0.2,
	// 		y: -30,
	// 		duration: contentAnimationDuration,
	// 	});
	// }, []);
	return (
		<div className="navbar">
			<Image src={logo} width={80} height={0} alt="logo" />
		</div>
	);
};

export default Navbar;
