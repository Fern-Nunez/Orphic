"use client";

import Image from "next/image";
import Button from "../../assets/buttons/button";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./collection.css";

gsap.registerPlugin(ScrollTrigger);

export default function Collection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef(null);          // ✅ for gsap scoping
  const scrollerRef = useRef(null);
  const itemCount = 4;

  const scrollToIndex = (i) => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;

    const step = maxScroll / (itemCount - 1);
    el.scrollTo({ left: step * i, behavior: "smooth" });
  };

  // ✅ keeps your activeIndex logic (unchanged)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = null;

    const update = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) {
        setActiveIndex(0);
        return;
      }

      const step = maxScroll / (itemCount - 1);
      const idx = Math.round(el.scrollLeft / step);
      const clamped = Math.max(0, Math.min(itemCount - 1, idx));

      setActiveIndex((prev) => (prev === clamped ? prev : clamped));
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  // ✅ ANIMATION: text pops up, then cards fade up quickly one after another
  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // start states (prevents flash)
      gsap.set(".collectionText > *", { y: 18, opacity: 0 });
      gsap.set(".collectionSection", { y: 22, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          toggleActions: "play none none reset",
        },
      });

      // text first (quick pop)
      tl.to(".collectionText > *", {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.08,
      });

      // then cards (fade up, fairly quick)
      tl.to(
        ".collectionSection",
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.2" // slight overlap so it feels snappy
      );

      // optional: indicator after cards
      tl.fromTo(
        ".bubbleIndicator",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        "-=0.2"
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="collectionContainer" ref={rootRef}>
      <div className="collectionText">
        <h2 className="collectionTitle">
          The <br /> Collection
        </h2>
        <p className="collectionDesc">
          A collection centered on celebration, achievement, and place &ndash; captured through honest,
          story-driven imagery.
        </p>
      </div>

      <div className="collection" ref={scrollerRef}>
        <div
          className={`collectionSection ${activeIndex === 0 ? "active" : ""}`}
          onClick={() => scrollToIndex(0)}
        >
          <div className="collectionImageContainer">
            <Image src="/collection/graduation.webp" alt="Graduation" fill style={{ objectFit: "cover" }} />
          </div>
          <div className="collectionImageText">
            <h3>Graduation XIVX</h3>
            <p>A milestone captured thoughtfully.</p>
            <Button text="View Project" size="small" variant="black" />
          </div>
        </div>

        <div
          className={`collectionSection ${activeIndex === 1 ? "active" : ""}`}
          onClick={() => scrollToIndex(1)}
        >
          <div className="collectionSmallImageContainer">
            <Image src="/collection/twentyOne.webp" alt="Twenty One" fill style={{ objectFit: "cover" }} />
          </div>
          <div className="collectionImageText">
            <h3>The Big Twenty&ndash;One</h3>
            <p>A celebration captured in motion.</p>
            <Button text="View Project" size="small" variant="black" />
          </div>
        </div>

        <div
          className={`collectionSection ${activeIndex === 2 ? "active" : ""}`}
          onClick={() => scrollToIndex(2)}
        >
          <div className="collectionImageContainer">
            <Image
              src="/collection/beautifulMoments.webp"
              alt="Beautiful Moments"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="collectionImageText">
            <h3>Beautiful Moments</h3>
            <p>Warm, candid connection.</p>
            <Button text="View Project" size="small" variant="black" />
          </div>
        </div>

        <div
          className={`collectionSection ${activeIndex === 3 ? "active" : ""}`}
          onClick={() => scrollToIndex(3)}
        >
          <div className="collectionSmallImageContainer">
            <Image src="/collection/romantic.webp" alt="Golden Gatherings" fill style={{ objectFit: "cover" }} />
          </div>
          <div className="collectionImageText">
            <h3>Golden Gatherings</h3>
            <p>Love preserved forever still.</p>
            <Button text="View Project" size="small" variant="black" />
          </div>
        </div>
      </div>

      <div className="bubbleIndicator">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`circleOutside ${activeIndex === i ? "active" : ""}`}
            onClick={() => scrollToIndex(i)}
          >
            {activeIndex === i && <div className="circleInside" />}
          </div>
        ))}
      </div>
    </div>
  );
}