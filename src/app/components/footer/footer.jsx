"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import fitty from "fitty";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./footer.css";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);
  const rootRef = useRef(null);
  const closeTimerRef = useRef(null);

  // ✅ Fitty (same behavior)
  useEffect(() => {
    const f = fitty(".orphicText", {
      minSize: 12,
      maxSize: 800,
      multiLine: false,
    });

    setTimeout(() => {
      f.forEach((el) => el.fit());
    }, 100);

    document.fonts?.ready.then(() => {
      f.forEach((el) => el.fit());
    });

    return () => f.forEach((el) => el.unsubscribe());
  }, []);

  // ✅ helper: get mobile items for a section
  const getSectionItems = (name) => {
    if (!rootRef.current) return null;
    const capsule = rootRef.current.querySelector(
      `[data-footer-section="${name}"]`
    );
    if (!capsule) return null;
    return capsule.querySelectorAll(".footerMenuDesc");
  };

  // ✅ mobile open/close with "fade out then collapse"
  const toggleSection = (name) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    // closing current
    if (openSection === name) {
      const items = getSectionItems(name);

      if (items && items.length) {
        gsap.killTweensOf(items);
        gsap.to(items, { y: 8, opacity: 0, duration: 0.14, ease: "power1.in" });
      }

      closeTimerRef.current = setTimeout(() => {
        setOpenSection(null);
        closeTimerRef.current = null;
      }, 170);

      return;
    }

    // switching
    if (openSection) {
      const currentItems = getSectionItems(openSection);

      if (currentItems && currentItems.length) {
        gsap.killTweensOf(currentItems);
        gsap.to(currentItems, {
          y: 8,
          opacity: 0,
          duration: 0.12,
          ease: "power1.in",
        });
      }

      closeTimerRef.current = setTimeout(() => {
        setOpenSection(name);
        closeTimerRef.current = null;
      }, 130);

      return;
    }

    setOpenSection(name);
  };

  // ✅ mobile stagger in when a section opens
  useEffect(() => {
    if (!rootRef.current || !openSection) return;

    const items = getSectionItems(openSection);
    if (!items || !items.length) return;

    gsap.killTweensOf(items);

    gsap.fromTo(
      items,
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.24,
        delay: 0.12,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "transform,opacity",
      }
    );
  }, [openSection]);

  // ✅ DESKTOP: titles fade up, then LINKS animate row-by-row across columns
  useEffect(() => {
    if (!rootRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        // initial states
        gsap.set(".footerMenuDesktopTitle", { y: 16, opacity: 0 });
        gsap.set(".footerMenuDesktopDesc", { y: 14, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        });

        // 1) Titles
        tl.to(".footerMenuDesktopTitle", {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power3.out",
          stagger: 0.12,
        });

        // 2) Row-by-row links (across columns)
        const cols = gsap.utils.toArray(".footerMenuDesktopDescContainer");
        const colItems = cols.map((col) =>
          Array.from(col.querySelectorAll(".footerMenuDesktopDesc"))
        );

        const rowCount = Math.max(...colItems.map((arr) => arr.length));

        for (let r = 0; r < rowCount; r++) {
          const rowEls = colItems
            .map((arr) => arr[r])
            .filter(Boolean); // [Home, Instagram, Documentation] etc.

          tl.to(
            rowEls,
            {
              y: 0,
              opacity: 1,
              duration: 0.1,
              ease: "power3.out",
              stagger: 0.06, // small stagger inside the row
              clearProps: "transform,opacity",
            },
            "-=0.12" // overlap so it feels quick
          );
        }
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // ✅ cleanup timers
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <div className="footerSectionContent" ref={rootRef}>
      <div className="footerSection">
        <div className="orphicType">
          <span className="orphicText">ORPHIC</span>
        </div>

        {/* MOBILE MENU */}
        <div className="footerMenu">
          <div className="footerMenuCapsule" data-footer-section="menu">
            <div className="footerMenuSection" onClick={() => toggleSection("menu")}>
              <div className="footerMenuTitle">Menu</div>
              <div className="footerMenuArrow">
                <Image
                  src="/assets/carrot.svg"
                  alt="Arrow Icon"
                  width={12.67}
                  height={7.53}
                  style={{ objectFit: "contain" }}
                  className={`arrow ${openSection === "menu" ? "arrowOpen" : ""}`}
                />
              </div>
            </div>

            <div className={`footerMenuDescs ${openSection === "menu" ? "open" : ""}`}>
              <div className="footerMenuDesc">Home</div>
              <div className="footerMenuDesc">About</div>
              <div className="footerMenuDesc">Collection</div>
              <div className="footerMenuDesc">Contact</div>
            </div>
          </div>

          <div className="footerMenuCapsule" data-footer-section="socials">
            <div className="footerMenuSection" onClick={() => toggleSection("socials")}>
              <div className="footerMenuTitle">Socials</div>
              <div className="footerMenuArrow">
                <Image
                  src="/assets/carrot.svg"
                  alt="Arrow Icon"
                  width={12.67}
                  height={7.53}
                  style={{ objectFit: "contain" }}
                  className={`arrow ${openSection === "socials" ? "arrowOpen" : ""}`}
                />
              </div>
            </div>

            <div className={`footerMenuDescs ${openSection === "socials" ? "open" : ""}`}>
              <div className="footerMenuDesc">Instagram</div>
              <div className="footerMenuDesc">Twitter</div>
              <div className="footerMenuDesc">Facebook</div>
              <div className="footerMenuDesc">LinkedIn</div>
            </div>
          </div>

          <div className="footerMenuCapsule" data-footer-section="resources">
            <div className="footerMenuSection" onClick={() => toggleSection("resources")}>
              <div className="footerMenuTitle">Resources</div>
              <div className="footerMenuArrow">
                <Image
                  src="/assets/carrot.svg"
                  alt="Arrow Icon"
                  width={12.67}
                  height={7.53}
                  style={{ objectFit: "contain" }}
                  className={`arrow ${openSection === "resources" ? "arrowOpen" : ""}`}
                />
              </div>
            </div>

            <div className={`footerMenuDescs ${openSection === "resources" ? "open" : ""}`}>
              <div className="footerMenuDesc">Documentation</div>
              <div className="footerMenuDesc">Tutorials</div>
              <div className="footerMenuDesc">Support</div>
              <div className="footerMenuDesc">FAQ</div>
            </div>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <div className="footerMenuDesktop">
          <div className="footerMenuDesktopCapsuleOne">
            <div className="footerMenuDesktopTitleContainer">
              <div className="footerMenuDesktopTitle">Menu</div>
            </div>
            <div className="footerMenuDesktopDescContainer">
              <div className="footerMenuDesktopDesc">Home</div>
              <div className="footerMenuDesktopDesc">About</div>
              <div className="footerMenuDesktopDesc">Collection</div>
              <div className="footerMenuDesktopDesc">Contact</div>
            </div>
          </div>

          <div className="footerMenuDesktopCapsuleTwo">
            <div className="footerMenuDesktopTitleContainer">
              <div className="footerMenuDesktopTitle">Socials</div>
            </div>
            <div className="footerMenuDesktopDescContainer">
              <div className="footerMenuDesktopDesc">Instagram</div>
              <div className="footerMenuDesktopDesc">Twitter</div>
              <div className="footerMenuDesktopDesc">Facebook</div>
              <div className="footerMenuDesktopDesc">LinkedIn</div>
            </div>
          </div>

          <div className="footerMenuDesktopCapsuleThree">
            <div className="footerMenuDesktopTitleContainer">
              <div className="footerMenuDesktopTitle">Resources</div>
            </div>
            <div className="footerMenuDesktopDescContainer">
              <div className="footerMenuDesktopDesc">Documentation</div>
              <div className="footerMenuDesktopDesc">Tutorials</div>
              <div className="footerMenuDesktopDesc">Support</div>
              <div className="footerMenuDesktopDesc">FAQ</div>
            </div>
          </div>
        </div>

        <div className="footerRightsContainer">
          <div className="footerRights">
            <span>Designed by Monoscale - All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </div>
  );
}