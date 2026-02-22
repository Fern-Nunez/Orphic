import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});
  
export const metadata = {
  title: "Orphic Photography",
  description: "Capturing Moments, Creating Memories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        {children}
      </body>
    </html>
  );
}
