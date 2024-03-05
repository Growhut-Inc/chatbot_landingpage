"use client";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import animation from "@/assets/animation.json";
export default function AnimatedLoader() {
  const [instance, setInstance] = useState();
  const playerRef = useRef();
  const animationRef = useRef();
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    ScrollTrigger.defaults({
      //   markers: true,
    });
    gsap.registerPlugin(ScrollTrigger);
    // console.log(animationRef.current);
  }, []);

  useEffect(() => {
    playerRef.current.setSeeker("20%");
  }, []);

  const handleWhy = () => {
    instance.goToAndStop(50, true);
  };
  return (
    <>
      <div id={"animation"} ref={animationRef}>
        <Player
          lottieRef={(ins) => {
            setInstance(ins); // the lottie instance is returned in the argument of this prop. set it to your local state
          }}
          onEvent={(event) => {
            if (event === "load")
              ScrollTrigger.create({
                trigger: animationRef.current,
                pin: true,
                start: "0px 20px",
                end: "800% top",
                scrub: 1,
                onUpdate: (self) => {
                  //   console.log(Math.round(instance.totalFrames * self.progress));
                  instance.goToAndStop(
                    Math.round(instance.totalFrames * self.progress),
                    true
                  );
                  playerRef.current.setSeeker("100%");
                },
              });
          }}
          ref={playerRef}
          autoplay={false}
          setSeeker={"50%"}
          loop={false}
          controls={true}
          src={animation}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </>
  );
}
