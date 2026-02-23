"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "./about.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: "words" });

    const textTween = gsap.fromTo(
      split.words,
      { color: "#ececec" },
      {
        color: "#000000",
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
          end: "top 10%",
          scrub: true,
        },
      }
    );

    const imagesTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".aboutImages",
        start: "top 90%",
        end: "top 10%",
        scrub: 0.6,
        // markers: true,
      },
    });

    imagesTl
      .from(".aboutImage1Container", { x: -80, opacity: 0.8, ease: "none" }, 0)
      .from(".aboutImage2Container", { x: 80, opacity: 0.8, ease: "none" }, 0)
      .from(".aboutImage3Container", { y: 80, opacity: 0.8, ease: "none" }, 0)
      .from(".aboutImage4Container", { x: -60, opacity: 0.8, ease: "none" }, 0)
      .from(".aboutImage5Container", { x: 60, opacity: 0.8, ease: "none" }, 0)
      .from(".aboutImage6Container", { y: 80, opacity: 0.8, ease: "none" }, 0);

    return () => {
      textTween?.scrollTrigger?.kill();
      textTween?.kill();

      imagesTl?.scrollTrigger?.kill();
      imagesTl?.kill();

      split.revert();
    };
  }, []);

  return (
    <>
      <div className="aboutSection">
        <div className="aboutText">
          <h2 ref={textRef}>
            We document life&apos;s milestones &ndash; weddings, graduations, and meaningful
            spaces &ndash; with care and intention.
          </h2>
        </div>

        <div className="aboutImages">
          <div className="aboutImage1Container">
            <div className="aboutImage1">
              <Image src="/about/graduationCompress.webp" alt="Graduation" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="aboutImage1Text">
              <span>Graduations</span>
            </div>
          </div>

          <div className="aboutImage2Container">
            <div className="aboutImage1">
              <Image src="/about/romanticCompress.webp" alt="Wedding" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="aboutImage1Text">
              <span>Weddings</span>
            </div>
          </div>

          <div className="aboutImage3Container">
            <div className="aboutImage1">
              <Image src="/about/bubblesCompress.webp" alt="Moments" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="aboutImage1Text">
              <span>Moments</span>
            </div>
          </div>

          <div className="aboutImage4Container">
            <div className="aboutImage1">
              <Image src="/about/birthdayCompressed.webp" alt="Birthday" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="aboutImage1Text">
              <span>Birthdays</span>
            </div>
          </div>

          <div className="aboutImage5Container">
            <div className="aboutImage2">
              <Image src="/about/partyCompress.webp" alt="Party" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="aboutImage1Text">
              <span>Parties</span>
            </div>
          </div>

          <div className="aboutImage6Container">
            <div className="aboutImage2">
              <Image
                src="/about/oldBirthdayCompress.webp"
                alt="Birthday memory"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="aboutImage1Text">
              <span>Birthdays</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}