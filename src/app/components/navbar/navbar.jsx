"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Button from "../../assets/buttons/button";
import HingeOverlay from "../../assets/hingeOverlay/hingeOverlay";
import "./navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // ✅ NEW: keep navbar transparent briefly after closing menu
  const [delayNavGlass, setDelayNavGlass] = useState(false);
  const closeTimerRef = useRef(null);

  const scrollYRef = useRef(0);

  // lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.classList.add("menu-open");
      document.body.classList.add("menu-open");
      setHidden(false);
      setDelayNavGlass(true);
    } else {
      document.documentElement.classList.remove("menu-open");
      document.body.classList.remove("menu-open");

      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(() => {
        setDelayNavGlass(false);
      }, 1100);
    }

    return () => {
      document.documentElement.classList.remove("menu-open");
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  // scroll behavior
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;

      setScrolled(y > 10);

      if (!menuOpen) {
        const goingDown = y > lastY;
        const pastThreshold = y > 80;
        setHidden(goingDown && pastThreshold);
      }

      lastY = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`navbarContainer
          ${scrolled ? "navbarScrolled" : ""}
          ${hidden ? "navbarHidden" : ""}
          ${delayNavGlass ? "navbarDelayGlass" : ""}
          ${menuOpen ? "navbarMenuOpen" : ""}`}
      >
        <div className="navbarCapsule">
          <Link className="logo" href="/">
            ORPHIC
          </Link>

          <div className="hamburgerMenu" onClick={() => setMenuOpen((v) => !v)}>
            <div className="hamburgerLineTop"></div>
            <div className="hamburgerLineMid"></div>
            <div className="hamburgerLineBottom"></div>
          </div>

          <div className="desktopNav">
            <Link href="/concept">About Us</Link>
            <Link href="/concept">Portfolio</Link>
            <Button
              text="Work with Us"
              onClick={() => {}}
              size="small"
              href={"/concept"}
              className="workWithUsButton"
              variant={scrolled ? "black" : "white"}
            />
          </div>
        </div>
      </nav>

      <div
        className={`menuBackdrop ${menuOpen ? "menuBackdropOpen" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <HingeOverlay open={menuOpen}>
        <div className="mobileMenuInner">
          <Button text="About Us" size="large" className="mobileMenuButtonText" href={"/concept"}/>
          <Button text="Portfolio" size="large" className="mobileMenuButtonText" href={"/concept"}/>
          <Button text="Experience" size="large" className="mobileMenuButtonText" href={"/concept"}/>
          <Button text="Contact" size="large" className="mobileMenuButtonText" href={"/concept"}/>
        </div>
      </HingeOverlay>
    </>
  );
}