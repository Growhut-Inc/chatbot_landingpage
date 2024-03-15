import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LottieScrollTrigger({ vars }) {
	const animationContainer = useRef(null);

	useEffect(() => {
		const playhead = { frame: 0 };
		const target = animationContainer.current;
		const speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" };

		const animation = lottie.loadAnimation({
			container: target,
			renderer: vars.renderer || "svg",
			loop: false,
			autoplay: false,
			path: vars.path,
			rendererSettings: vars.rendererSettings || {
				preserveAspectRatio: "xMidYMid slice",
			},
		});

		animation.addEventListener("DOMLoaded", function () {
			const st = {
				trigger: target,
				pin: true,
				start: "top top",
				end: speeds[vars.speed] || "+=1000",
				scrub: 1,
				markers: true,
			};
			for (let p in vars) {
				st[p] = vars[p];
			}
			const createTween = function () {
				animation.frameTween = gsap.to(playhead, {
					frame: animation.totalFrames - 1,
					ease: "power1.out",
					// onUpdate: () => animation.goToAndStop(playhead.frame, true),
					onUpdate: () => animation.goToAndPlay(0),
					scrollTrigger: st,
				});
				return () => animation.destroy && animation.destroy();
			};
			createTween();
			// ScrollTrigger.sort();
			ScrollTrigger.refresh();
		});

		return () => {
			animation.destroy && animation.destroy();
		};
	}, [vars.path, vars.speed, vars.renderer, vars.rendererSettings]);

	return <div ref={animationContainer} />;
}

export default LottieScrollTrigger;
