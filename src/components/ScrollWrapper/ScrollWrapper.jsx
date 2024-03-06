"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
const ScrollWrapper = ({ children }) => {
	return (
		<ReactLenis
			root
			options={{
				lerp: 0.02,
				smoothWheel: true,
			}}
		>
			{children}
		</ReactLenis>
	);
};

export default ScrollWrapper;
