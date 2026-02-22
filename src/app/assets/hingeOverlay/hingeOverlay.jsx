"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./hingeOverlay.css";

export default function HingeOverlay({ open, children }) {
  const root = useRef(null);
  const tl = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ✅ start hidden
      gsap.set(root.current, { autoAlpha: 0, pointerEvents: "none" });

    tl.current = gsap
      .timeline({ paused: true })
      .set(root.current, { autoAlpha: 1, pointerEvents: "auto" })
      // content in
      .fromTo(
        ".mobileMenuInner > *",
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.06 },
        0.8
      )
      // panel open
      .fromTo(
        ".hingePanel",
        { rotate: -90, scale: 0.8, transformOrigin: "top left" },
        { rotate: 0, scale: 1, duration: 0.9, ease: "expo.inOut" },
        0
      );
    }, root);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!tl.current) return;

    if (open) {
      tl.current.play(0);
    } else {
      // ✅ after reverse finishes, hide overlay so nothing lingers
      tl.current.eventCallback("onReverseComplete", () => {
        gsap.set(root.current, { autoAlpha: 0, pointerEvents: "none" });
        tl.current.eventCallback("onReverseComplete", null); // cleanup
      });

      tl.current.reverse();
    }
  }, [open]);

  return (
    <div ref={root} className="hingeOverlay">
      <div className="hingePanel" />
      <div className="hingeContent">{children}</div>
    </div>
  );
}