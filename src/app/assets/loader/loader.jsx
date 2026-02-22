"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./loader.css";

export default function LoaderOverlay() {
  const root = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const ctx = gsap.context(() => {
      // lock page interaction while loader is up
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          document.body.style.overflow = prevOverflow;
          setDone(true);
        },
      });

      tl.set(".loaderOverlay", { autoAlpha: 1 })
        .set(".loaderPanel", {
          transformOrigin: "top left",
          rotate: 0,
        })

        // hold text visible
        .to({}, { duration: 0.6 })

        // text fade
        .to(".loaderText", {
          opacity: 0,
          duration: 0.35,
        })

        // hinge open from top-left
        .to(".loaderPanel", {
          rotate: -90,
          duration: 1,
          scale: 0.8,
          ease: "expo.inOut",
        })

        // remove overlay
        .to(".loaderOverlay", {
          autoAlpha: 0,
          duration: 0.2,
        }, "-=0.2");
    }, root);

    return () => ctx.revert();
  }, [done]);

  if (done) return null;

  return (
    <div className="loaderOverlay" ref={root} aria-hidden="true">
      <div className="loaderPanel" />
      <div className="loaderText">ORPHIC</div>
    </div>
  );
}
