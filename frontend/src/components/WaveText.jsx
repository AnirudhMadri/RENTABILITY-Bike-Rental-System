import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WaveText({ text = "" }) {
  const textRef = useRef([]);

  useLayoutEffect(() => {
    const letters = textRef.current;
    if (!letters.length) return;

    const animation = gsap.fromTo(
      letters,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: letters[0]?.parentNode,
          start: "top 60%",
          toggleActions: "play none none none",
          // markers: true, // optional for debugging
        },
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <p>
      {text.split("").map((letter, index) =>
        letter === "\n" ? (
          <br key={index} />
        ) : (
          <span
            key={index}
            ref={(el) => (textRef.current[index] = el)}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        )
      )}
    </p>
  );
}
