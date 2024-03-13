"use client";
import React, { useEffect, useRef } from "react";
import "./style.css";
import { Player } from "@lottiefiles/react-lottie-player";
import part1 from "@/assets/slides/part1.json";
import part2 from "@/assets/slides/part2.json";
import gsap from "gsap";
import Observer from "gsap/dist/Observer";

const Slides = () => {
	useEffect(() => {
		gsap.registerPlugin(Observer);

		const totalSlides = document.querySelectorAll(".slide").length;

		function goto(value) {
			const currentValue = gsap.getProperty(".slides_wrapper", "y");
			const slideHeight = 100; //height 100%
			const maxValue = -(totalSlides - 1) * slideHeight;
			let newValue = currentValue + value;

			// nearest multiple of 100
			const nearestMultiple =
				Math.round(newValue / slideHeight) * slideHeight;
			// Ensure the new value is within the range of slide heights
			newValue = Math.max(maxValue, Math.min(0, nearestMultiple));

			gsap.to(".slides_wrapper", {
				y: `${newValue}%`,
				duration: 1,
				ease: "power1.inOut",
			});
		}

		Observer.create({
			target: ".slides_wrapper",
			type: "wheel,touch,pointer",
			wheelSpeed: -1,
			onDown: () => goto(100), //scroll item up
			onUp: () => goto(-100), //scroll item down
			tolerance: 10,
			preventDefault: true,
		});
	}, []);
	return (
		<div className="main_wrapper">
			<div className="slides_wrapper">
				{/* <div className="bg_star"></div> */}
				<div className="slide slide1">
					<div className="lottie_player_wrapper">
						<Player
							autoplay={true}
							loop={true}
							controls={true}
							src={part1}
							style={{ width: "100%", height: "100%" }}
						/>
					</div>
					<div className="text_wrapper">
						<span className="italic_text">
							"Get closer than ever to your customers.
							<br /> So close, in fact, that you tell them what
							they need well before they realize it themselves."
						</span>
						<p>- Steve Jobs</p>
					</div>
				</div>
				<div className="slide slide2">
					<div className="lottie_player_wrapper">
						<Player
							autoplay={true}
							loop={true}
							controls={true}
							src={part2}
							style={{ width: "100%", height: "100%" }}
						/>
					</div>
					<div className="text_wrapper">
						<h4>Every business owner knows the dance.</h4>
						<p>
							Attracting new customers while keeping the loyal
							ones not just satisfied, but delighted. It's more
							than a balance; it's an art, crucial for growth and
							thriving in today's market.
						</p>
					</div>
				</div>
				<div className="slide slide3">
					<div className="lottie_player_wrapper">
						<Player
							autoplay={true}
							loop={true}
							controls={true}
							src={part1}
							style={{ width: "100%", height: "100%" }}
						/>
					</div>
					<div className="text_wrapper">
						<span className="italic_text">
							"Get closer than ever to your customers.
							<br /> So close, in fact, that you tell them what
							they need well before they realize it themselves."
						</span>
						<p>- Steve Jobs</p>
					</div>
				</div>
				<div className="slide slide4">
					<div className="lottie_player_wrapper">
						<Player
							autoplay={true}
							loop={true}
							controls={true}
							src={part2}
							style={{ width: "100%", height: "100%" }}
						/>
					</div>
					<div className="text_wrapper">
						<h4>Every business owner knows the dance.</h4>
						<p>
							Attracting new customers while keeping the loyal
							ones not just satisfied, but delighted. It's more
							than a balance; it's an art, crucial for growth and
							thriving in today's market.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Slides;
