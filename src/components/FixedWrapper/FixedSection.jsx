"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import AnimatedLoader from "../LottieAnimation/AnimateLoader";
import "./style.css";
import SlideCounter from "../SlideCounter/SlideCounter";

const FixedSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const contentSelectors = [
			".content1 .text_wrapper",
			".content2 .text_wrapper",
			".content3 .text_wrapper",
			".content4 .text_wrapper",
			".content5 .text_wrapper",
			".content6 .text_wrapper",
			".content7 .text_wrapper",
		];
		const animationDuration = 16960; //height of section_bg_wrapper

		const contentAnimationDuration =
			animationDuration / contentSelectors.length;

		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: "#animation",
				start: "top center",
				end: () => `+=${animationDuration}`,
				scrub: true,
				onUpdate: (self) => {
					const progress = Math.ceil(
						self.progress * contentSelectors.length
					);
					setCurrentSlide(progress);
				},
				// markers: true,
			},
		});

		timeline
			.to(contentSelectors[0], {
				opacity: 1,
				scale: 1.1,
				delay: 0.2,
				y: -20,
				duration: contentAnimationDuration,
			})
			.from(contentSelectors[0], {
				opacity: 0,
				duration: 1,
			})
			.to(contentSelectors[1], {
				opacity: 1,
				y: -30,
				scale: 1.1,
				duration: contentAnimationDuration,
			})
			.from(contentSelectors[1], {
				opacity: 0,
				duration: 1,
			})
			.to(contentSelectors[2], {
				opacity: 1,
				y: -30,
				scale: 1.1,
				duration: contentAnimationDuration,
			})
			.from(contentSelectors[2], {
				opacity: 0,
				duration: 1,
			})
			.to(contentSelectors[3], {
				opacity: 1,
				y: -20,
				scale: 1.1,
				duration: contentAnimationDuration,
			})
			.from(contentSelectors[3], {
				opacity: 0,
				duration: 1,
			})
			.to(contentSelectors[4], {
				opacity: 1,
				y: -30,
				scale: 1.1,
				duration: contentAnimationDuration,
			})
			.from(contentSelectors[4], {
				opacity: 0,
				duration: 1,
			})
			.to(contentSelectors[5], {
				opacity: 1,
				y: -30,
				scale: 1.1,
				duration: contentAnimationDuration,
			})
			.from(contentSelectors[5], {
				opacity: 0,
				duration: 1,
			})
			.to(contentSelectors[6], {
				opacity: 1,
				y: -30,
				scale: 1.1,
				duration: contentAnimationDuration,
			})
			.from(contentSelectors[6], {
				opacity: 0,
				duration: 1,
			});
	}, []);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const animationDuration = 16260; //-700

		ScrollTrigger.create({
			trigger: ".section_bg_wrapper",
			start: "top top",
			end: `+=${animationDuration}`,
			pin: ".section1",
			pinSpacing: false,
			onToggle: (self) => {
				if (!self.isActive) {
					gsap.to(".navbar", { opacity: 0, y: -50 });
				} else {
					gsap.to(".navbar", { opacity: 1, y: 0 });
				}
			},
			// markers: true,
		});
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<div className="section_bg_wrapper">
			<div className="section1">
				<div className="bg_star"></div>
				<AnimatedLoader />
				<SlideCounter count={`${currentSlide}/8`} />
				<div className="content_wrapper">
					<div className="content1">
						<div className="text_wrapper">
							<span className="italic_text">
								"Get closer than ever to your customers.
								<br /> So close, in fact, that you tell them
								what they need well before they realize it
								themselves."
							</span>
							<p>- Steve Jobs</p>
						</div>
					</div>
					<div className="content2">
						<div className="text_wrapper">
							<h4>Every business owner knows the dance.</h4>
							<p>
								Attracting new customers while keeping the loyal
								ones not just satisfied, but delighted. It's
								more than a balance; it's an art, crucial for
								growth and thriving in today's market.
							</p>
						</div>
					</div>
					<div className="content3">
						<div className="text_wrapper">
							<p>
								Now, imagine a tool, not just any tool, but one
								that embodies this balance, enhancing it. What
								we're introducing today isn't just a solution;
								it's a revolution in customer relationships.
								Let's dive into how it transforms your business.
							</p>
						</div>
					</div>
					<div className="content4">
						<div className="text_wrapper">
							<h4>Here's where our journey takes a turn.</h4>
							<p>
								We unveil the power of tailor-made AI Chatbots
								by Growhut. These aren't just chatbots; they're
								your partners in ensuring customer loyalty. With
								them, every client has a compelling reason to
								keep coming back.
							</p>
						</div>
					</div>
					<div className="content5">
						<div className="text_wrapper">
							<h4>
								Step with us into the future of customer
								engagement.
							</h4>
							<p>
								The Growhut AI Chatbots offer more than just
								interactions; they provide 24/7 support and
								personalized conversations, turning each
								touchpoint into an opportunity for growth and
								connection.
							</p>
						</div>
					</div>
					<div className="content6">
						<div className="text_wrapper">
							<h4>This is where the magic happens.</h4>
							<p>
								Transform your sales process with the Growhut AI
								Chatbots. Watch the seamless transition as
								casual visitors on your website become
								satisfied, loyal customers, smoothly navigating
								through your sales funnel.
							</p>
						</div>
					</div>
					<div className="content7">
						<div className="text_wrapper">
							<h4>
								And finally, it's about making informed
								decisions.
							</h4>
							<p>
								Growhut AI Chatbots do more than just converse;
								they provide a wealth of data-driven insights.
								This intelligence is what puts you ahead, always
								one step ahead in your market.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FixedSection;
