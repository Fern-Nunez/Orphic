"use client";

import Image from "next/image";
import gsap from "gsap";
import "./hero.css";
import { useEffect, useRef } from "react";

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const intro = gsap.timeline({ delay: 1.9 });

      intro
        .from(".heroTitle h1", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".heroDesc",
          { y: 12, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.35"
        )
        .from(
          [".heroArrow", ".heroScrollDown"],
          { y: 10, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.35"
        );

      // Arrow + Scroll text loop
      const arrowLoop = gsap.timeline({
        repeat: -1,
        repeatDelay: 2.5,
        paused: true,
      });

      arrowLoop
        .set([".heroArrow", ".heroScrollDown"], { y: 0 })
        .to([".heroArrow", ".heroScrollDown"], {
          y: 10,
          duration: 0.5,   // your updated timing
          ease: "power2.in",
          overwrite: "auto",
        })
        .to([".heroArrow", ".heroScrollDown"], {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });

      intro.eventCallback("onComplete", () => {
        gsap.set([".heroArrow", ".heroScrollDown"], { y: 0 });
        arrowLoop.play(0);
      });

    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="heroContainer" ref={root}>
      <div className="heroImage">
<Image
  src="/home/heroLong.jpg"
  alt="Hero Image"
  fill
  priority
  sizes="100vw"
  unoptimized
  style={{ objectFit: "cover" }}
/>
        <div className="heroContent">
          <div className="heroTitle">
            <h1>
              Orphic <br /> Photography
            </h1>
          </div>
          <div className="heroDesc">
            <p>
              Capturing weddings, graduations, and venues with an eye for emotion, detail, and
              atmosphere.
            </p>
          </div>
          <div className="heroArrow">
            <Image src="/assets/circleArrow.svg" alt="Scroll Down" width={26} height={26} />
          </div>
          <div className="heroScrollDown">
            <p>Scroll Down →</p>
          </div>
        </div>
      </div>
    </div>
  );
}
