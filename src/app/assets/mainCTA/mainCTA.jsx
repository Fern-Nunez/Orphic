import Image from "next/image";
import Link from "next/link";
import "./mainCTA.css";

export default function MainCTA() {
    return (
        <>
            <div className="mainCTAContainer">
                <Image
                    src={"/concept/conceptCTA.webp"}
                    alt="Hero Image"
                    fill
                    priority
                    sizes="100vw"
                    unoptimized
                    style={{ objectFit: "cover" }}
                    className="conceptCTAImage"
                />
                <div className="mainCTAOverlay"></div>
                <div className="mainCTAContent">
                    <div className="mainCTAContentTop">
                        <span className="mainCTATitle">Let&apos;s Build Something Real.</span>
                        <span className="mainCTADesc">If you&apos;re looking for a refined digital presence built with intention and precision, we&apos;d love to work with you.</span>
                        <div className="mainCTAButtonContainer">
                            <Link href={"https://www.monoscale.co/"} target="_blank">
                                <button className="mainCTAButton"> View Work →</button>
                            </Link>
                            <Link href={"https://cal.com/lifebyfern/intro-call?user=lifebyfern&overlayCalendar=true"} target="_blank">
                                <button className="mainCTAButtonHollow"> Book a Call →</button>
                            </Link>   
                        </div>
                        
                    </div>
                    <div className="mainCTAContentBottom">
                        <span className="mainCTAPlace">Monoscale &ndash; Digital Design & Development Studio <br/>Los Angeles, California</span>
                    </div>
                </div>
            </div>
        </>
    )
}