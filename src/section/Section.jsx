"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import animation from "@/assets/animation.json";

import Lottie from "lottie-react";

const Section = () => {
  const lottieRef = useRef();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = [
      ".section_1",
      ".section_2",
      ".section_3",
      ".section_4",
      ".section_5",
    ];
    sections.forEach((section, index) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "35% 30%",
          end: "100% 40%",
          scrub: 1,
          markers: true,
          duration: 1,
        },
      });

      timeline.to(section + " h4", {
        opacity: 1,
        y: -100,
        scale: 1.1,
        duration: 1,
      });
    });
  }, []);
  return (
    <>
      <div className="section_1">
        <div className="Lottie_wrapper" style={{ width: "50%" }}>
          <Lottie
            animationData={animation}
            loop={false}
            autoplay={true}
            isStopped={false}
            isPaused={false}
            segments={[0, 100]} // Initially play the first frame
            style={{ width: "100%", height: "auto" }}
            ref={lottieRef}
          />
        </div>

        <h4>
          "Get closer than ever to your customers. So close, in fact, that you
          tell them what they need well before they realize it themselves."
        </h4>
      </div>
      <div className="section_2">
        {/* lottie  */}
        <h4>
          "Get closer than ever to your customers. So close, in fact, that you
          tell them what they need well before they realize it themselves."
        </h4>
      </div>
      <div className="section_3">
        {" "}
        {/* lottie  */}
        <h4>
          "Get closer than ever to your customers. So close, in fact, that you
          tell them what they need well before they realize it themselves."
        </h4>
      </div>
      <div className="section_4">
        {" "}
        {/* lottie  */}
        <h4>
          "Get closer than ever to your customers. So close, in fact, that you
          tell them what they need well before they realize it themselves."
        </h4>
      </div>
      <div className="section_5">
        {" "}
        {/* lottie  */}
        <h4>
          "Get closer than ever to your customers. So close, in fact, that you
          tell them what they need well before they realize it themselves."
        </h4>
      </div>
    </>
  );
};

export default Section;
