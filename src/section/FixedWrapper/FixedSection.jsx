"use client";

import React, { useEffect } from "react";
import animation from "@/assets/animation.json";
import "./style.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import AnimatedLoader from "../demo/AnimateLoader";

const FixedSection = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".section1",
        start: "top 20%",
        end: "400% 40%",
        scrub: true,
        // markers: true,
      },
    });

    timeline
      .to(".content1 h4", {
        opacity: 1,
        scale: 1.1,
        duration: 2.5,
      })
      .from(".content1 h4", {
        opacity: 0,
        duration: 1,
      })
      .to(".content2 h4", {
        opacity: 1,
        y: -50,
        scale: 1.1,
        duration: 2.5,
      });
    timeline.from(".content2 h4", {
      opacity: 0,
      duration: 1,
    });
    timeline.to(".content3 h4", {
      opacity: 1,
      y: -50,
      scale: 1.1,
      duration: 2.5,
    });
    timeline.from(".content3 h4", {
      opacity: 0,
      duration: 1,
    });
    timeline.to(".content4 h4", {
      opacity: 1,
      y: -50,
      scale: 1.1,
      duration: 2,
    });
    timeline.from(".content4 h4", {
      opacity: 0,
      duration: 1,
    });
  }, []);

  return (
    <div className="section_bg_wrapper">
      <div className="section1">
        <div className="lottie_fixed">
          <AnimatedLoader />
        </div>

        <div className="content1">
          <h4>
            "Content 1 Get closer than ever to your customers. So close, in
            fact, that you tell them what they need well before they realize it
            themselves."
          </h4>
        </div>
        <div className="content2">
          <h4>
            "Content 2 Get closer than ever to your customers. So close, in
            fact, that you tell them what they need well before they realize it
            themselves."
          </h4>
        </div>
        <div className="content3">
          <h4>
            "Content 3 Get closer than ever to your customers. So close, in
            fact, that you tell them what they need well before they realize it
            themselves."
          </h4>
        </div>
        <div className="content4">
          <h4>
            "Content 4 Get closer than ever to your customers. So close, in
            fact, that you tell them what they need well before they realize it
            themselves."
          </h4>
        </div>
      </div>
    </div>
  );
};

export default FixedSection;
