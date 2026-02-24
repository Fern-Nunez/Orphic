import "./button.css";
import Link from "next/link";

export default function Button({ 
  text, 
  onClick, 
  href,
  size = "medium",
  variant = "white" 
}) {

  const className = `customButton customButton--${size} customButton--${variant}`;

  // If href exists → use Link
  if (href) {
    return (
      <Link href={href} className={className}>
        {text} <span className="customButtonArrow">→</span>
      </Link>
    );
  }

  // Otherwise normal button
  return (
    <button className={className} onClick={onClick}>
      {text} <span className="customButtonArrow">→</span>
    </button>
  );
}