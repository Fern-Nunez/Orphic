"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./collection.css";

gsap.registerPlugin(ScrollTrigger);

export default function Collection() {
  const sectionRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    const isDesktop = window.innerWidth >= 768;

    const title = sectionRef.current.querySelector(".collectionTitle");

    gsap.fromTo(
      title,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
        },
      }
    );

    const cards = sectionRef.current.querySelectorAll(
      ".projectLong, .projectShort, .projectLongLast"
    );

    cards.forEach((card, i) => {
      const text = card.querySelectorAll(".projectDesc, .projectTitle");
      const image = card.querySelector("[class*='Image']");

      gsap.fromTo(
        text,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay: isDesktop ? i * 0.08 : 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        image,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: isDesktop ? i * 0.08 + 0.15 : 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <>
      <div className="collectionSection" ref={sectionRef}>
        <div className="collectionTitle">
          <h2>Moments <br/>Worth Keeping</h2>
        </div>

        <div className="projects">


            <div className="projectLong">
              <Link href={"/concept"}>
                <div className="projectLongImage">
                  <Image
                    src="/collection/twentyOneCompress.webp"
                    alt="Birthday"
                    fill style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="projectDesc">
                  <span>Birthday • 2026</span>
                </div>
                <div className="projectTitle">
                  <h5>The Big Twenty-One</h5>
                </div>
              </Link>
            </div>



            <div className="projectShort">
              <Link href={"/concept"}>
                <div className="projectShortImage">
                  <Image
                    src="/collection/graduationCompress.webp"
                    alt="Graduation"
                    fill style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="projectDesc">
                  <span>Graduation • 2026</span>
                </div>
                <div className="projectTitle">
                  <h5>Graduation XIVX</h5>
                </div>
              </Link>
            </div>



            <div className="projectShort">
              <Link href={"/concept"}>
                <div className="projectShortImage">
                  <Image
                    src="/collection/beautifulMomentsCompress.webp"
                    alt="Family"
                    fill style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="projectDesc">
                  <span>Family • 2026</span>
                </div>
                <div className="projectTitle">
                  <h5>Beautiful Moments</h5>
                </div>
              </Link>
            </div>



            <div className="projectLong">
              <Link href={"/concept"}>
                <div className="projectLongImage">
                  <Image
                    src="/collection/romanticCompress.webp"
                    alt="Wedding"
                    fill style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="projectDesc">
                  <span>Wedding • 2025</span>
                </div>
                <div className="projectTitle">
                  <h5>Lopez Family Engagement</h5>
                </div>
              </Link>
            </div>


            <div className="projectLongLast projectRowEnd">
              <Link href={"/concept"}>
                <div className="projectLongImageLast">
                  <Image
                    src="/collection/charlie.webp"
                    alt="Birthday"
                    fill style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="projectDesc">
                  <span>Birthday • 2025</span>
                </div>
                <div className="projectTitle">
                  <h5>Charlie&apos;s First</h5>
                </div>
              </Link>
            </div>


        </div>
      </div>
    </>
  );
}