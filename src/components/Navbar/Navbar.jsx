"use client";
import Image from "next/image";
import React, { useEffect } from "react";
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
	// 			start: "200% top",
	// 			end: "=+1000",
	// 			scrub: true,
	// 			// markers: true,
	// 		},
	// 	});
	// 	tl.to(".navbar", {
	// 		opacity: 0,
	// 		y: -50,
	// 	});
	// }, []);
	return (
		<div className="navbar">
			<Image src={logo} width={68} height={0} alt="logo" />
		</div>
	);
};

export default Navbar;
