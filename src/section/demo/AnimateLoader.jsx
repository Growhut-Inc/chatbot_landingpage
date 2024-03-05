"use client";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import animation from "@/assets/animation.json";
import Lenis from "@studio-freight/lenis";
export default function AnimatedLoader() {
  const [instance, setInstance] = useState();
  const playerRef = useRef();
  const animationRef = useRef();
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
  useEffect(() => {
    ScrollTrigger.defaults({
      //   markers: true,
    });
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    playerRef.current.setSeeker("20%");
  }, []);

  useEffect(() => {
    if (!instance) return;

    const onUpdate = (self) => {
      const progress = self.progress;
      const currentFrame = Math.round(instance.totalFrames * progress);
      instance.goToAndStop(currentFrame, true);

      if (progress === 1) {
        // Reached the end, keep animation visible at the last frame
        playerRef.current.setSeeker("100%");
      }
    };

    ScrollTrigger.create({
      trigger: animationRef.current,
      pin: true,
      start: "top 20px",
      end: () => `+=${instance.totalFrames * 1.7}`, // End slightly beyond the animation
      scrub: true,
      onUpdate: onUpdate,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.revert());
    };
  }, [instance]);
  //   const [instance, setInstance] = useState();
  //   const playerRef = useRef();
  //   const animationRef = useRef();
  //   gsap.registerPlugin(ScrollTrigger);

  //   useEffect(() => {
  //     ScrollTrigger.defaults({
  //       markers: true,
  //     });
  //     gsap.registerPlugin(ScrollTrigger);
  //     console.log(animationRef.current);
  //   }, []);

  //   useEffect(() => {
  //     playerRef.current.setSeeker("0%");
  //   }, []);

  //   const handleWhy = () => {
  //     instance.goToAndStop(50, true);
  //   };
  return (
    <>
      {/* <div id={"animation"} ref={animationRef}>
        <Player
          lottieRef={(ins) => {
            setInstance(ins);
          }}
          onEvent={(event) => {
            if (event === "load")
              ScrollTrigger.create({
                trigger: animationRef.current,
                pin: true,
                start: "top 20px",
                end: "1790% 40%",
                duration: 15,
                scrub: 1,
                onUpdate: (self) => {
                  console.log(Math.round(instance.totalFrames * self.progress));
                  instance.goToAndStop(
                    Math.round(instance.totalFrames * self.progress),
                    true
                  );
                  playerRef.current.setSeeker("80%");
                },
              });
          }}
          ref={playerRef}
          autoplay={false}
          setSeeker={"0%"}
          loop={false}
          controls={true}
          src={animation}
          style={{ width: "100%", height: "100%" }}
        />
      </div> */}
      <div id="animation" ref={animationRef}>
        <Player
          lottieRef={(ins) => {
            setInstance(ins);
          }}
          autoplay={false}
          setSeeker={"10%"}
          loop={false}
          controls={true}
          src={animation}
          style={{ width: "100%", height: "100%" }}
          ref={playerRef}
        />
      </div>
    </>
  );
}
