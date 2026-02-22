import "./button.css";

export default function Button({ 
  text, 
  onClick, 
  size = "medium",
  variant = "white" 
}) {
  return (
    <button 
      className={`customButton customButton--${size} customButton--${variant}`} 
      onClick={onClick}
    >
      {text} <span className="customButtonArrow">→</span>
    </button>
  );
}
