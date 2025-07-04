import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Gray2Black({ text = "" }) {
  const textRef = useRef([]);
  const containerRef = useRef();

  useLayoutEffect(() => {
    const letters = textRef.current;
    if (!letters.length) return;

    const scrollLength = letters.length * 3; // smaller = faster reveal

    gsap.to(letters, {
      color: "#000000",
      stagger: 0.05,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%", // when the text starts appearing
        end: `+=${scrollLength}`, // tighter range = faster color change
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [text]);

  return (
    <p ref={containerRef}>
      {text.split("").map((letter, index) =>
        letter === "\n" ? (
          <br key={index} />
        ) : (
          <span
            key={index}
            ref={(el) => (textRef.current[index] = el)}
            className="inline-block text-gray-100"
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        )
      )}
    </p>
  );
}
