"use client";

import Image from "next/image";
import Button from "../../assets/buttons/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./cta.css";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // starting state
      gsap.set(".ctaText > *", { y: 20, opacity: 0 });

      // animation
      gsap.to(".ctaText > *", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          toggleActions: "play none none reset",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="ctaSection" ref={rootRef}>
      <div className="ctaImage">
        <Image
          src="/cta/landscapeCompress.webp"
          alt="CTA Image"
          fill
          priority={false}
          sizes="100vw"
          unoptimized
          style={{ objectFit: "cover", objectPosition: "33% 50%", padding: "1rem 0" }}
        />
        <div className="ctaOverlay"></div>
      </div>

      <div className="ctaTextContainer">
        <div className="ctaText">
          <span className="actualCTAText">
            Your next meaningful moment starts here.
          </span>
          <Button text="Start your Story" size="medium" href={"/concept"}/>
        </div>
      </div>
    </div>
  );
}