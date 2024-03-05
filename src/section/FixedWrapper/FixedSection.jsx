"use client";

import React, { useEffect } from "react";
import animation from "@/assets/animation.json";
import "./style.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import AnimatedLoader from "../demo/AnimateLoader";
import Lenis from "@studio-freight/lenis";

const FixedSection = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".section1",
        start: "top 20%",
        end: "1050% 40%",
        scrub: true,
        // markers: true,
      },
    });

    timeline
      .to(".content1 h4", {
        opacity: 1,
        scale: 1.1,
        duration: 3,
      })
      .from(".content1 h4", {
        opacity: 0,
        duration: 1,
      })
      .to(".content2 h4", {
        opacity: 1,
        y: -50,
        scale: 1.1,
        duration: 3,
      })
      .from(".content2 h4", {
        opacity: 0,
        duration: 1,
      })
      .to(".content3 h4", {
        opacity: 1,
        y: -50,
        scale: 1.1,
        duration: 3,
      })
      .from(".content3 h4", {
        opacity: 0,
        duration: 1,
      })
      .to(".content4 h4", {
        opacity: 1,
        y: -50,
        scale: 1.1,
        duration: 3,
      })
      .from(".content4 h4", {
        opacity: 0,
        duration: 1,
      })
      .to(".content5 h4", {
        opacity: 1,
        y: -50,
        scale: 1.1,
        duration: 2,
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
        <div className="content5">
          <h4>
            "Content 5 Get closer than ever to your customers. So close, in
            fact, that you tell them what they need well before they realize it
            themselves."
          </h4>
        </div>
      </div>
    </div>
  );
};

export default FixedSection;
