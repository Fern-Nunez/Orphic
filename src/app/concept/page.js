
import Image from "next/image";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import MainCTA from "../assets/mainCTA/mainCTA";
import "./concept.css";

export default function ConceptPage() {
    return (
        <>
            <Navbar/>
            <div className="conceptHero">
                <Image
                    src={"/concept/conceptHeroCompress.webp"}
                    alt="Concept Hero Image"
                    fill
                    priority
                    sizes="100vw"
                    unoptimized
                    style={{ objectFit: "cover" }}
                    className="conceptHeroImage"
                />
                <div className="conceptHeroTitle">
                    <h1>Concept <br/> Case Study</h1>
                </div>
            </div>
            <div className="conceptMainContent">
                <div className="conceptContent">
                    <h4>Why This Concept Exists</h4>
                    <p>This website was created as a conceptual build by Monoscale to demonstrate our approach to modern web design, development, and digital brand experiences. Every element was designed and developed as if for a real client &ndash; allowing us to explore creative direction, motion, and performance without limitation while maintaining real-world structure and usability. This project serves as a live example of the standard we bring to every brand we work with.</p>
                </div>
                <div className="conceptContent">
                    <h4>What This Project Demonstrates</h4>
                    <p>This conceptual build highlights the core areas we focus on when designing and developing modern digital experiences.</p>
                    <div className="conceptBulletPoints">
                        <div className="conceptBulletPointsRight">
                            <div className="bulletPoint">
                                <p className="bulletPointTitle">Brand Direction</p>
                                <p>Visual identity, layout structure, and overall tone.</p>
                            </div>
                            <div className="bulletPoint">
                                <p className="bulletPointTitle">Frontend Development</p>
                                <p>Built using modern web technologies and responsive design principles.</p>
                            </div>
                        </div>
                        <div className="conceptBulletPointsLeft">
                            <div className="bulletPoint">
                                <p className="bulletPointTitle">Motion & Interaction</p>
                                <p>Subtle animation and transitions to enhance user experience.</p>
                            </div>
                            <div className="bulletPoint">
                                <p className="bulletPointTitle">Performance & Optimization</p>
                                <p>Fast-loading, responsive, and structured for real-world deployment.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="conceptContent">
                    <h4>Our Approach to Digital Experiences</h4>
                    <p>At Monoscale, we believe websites should do more than exist — they should communicate, convert, and represent a brand at its highest level. Every project we create is approached with a focus on clarity, visual refinement, and technical precision. From initial layout exploration to final interaction design, our goal is to craft digital experiences that feel intentional and timeless.</p>
                </div>
                 <div className="conceptContent">
                    <h4>Built for Brands That Want More</h4>
                    <p>We partner with businesses, creators, and brands looking for a refined digital presence built with intention. If you&apos;re looking for a website that feels elevated, modern, and strategically designed &ndash; we&apos;d love to collaborate.</p>
                </div>
                <MainCTA/>
            </div>
            <Footer/>
        </>
    );
}