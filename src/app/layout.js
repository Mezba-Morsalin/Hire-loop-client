import { Manrope} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const manropeSans = Manrope({
  variable : "poppins",
  subsets : ["latin"],
  weight : ["400", "500", "600", "700", "800"]
});

export const metadata = {
  title: "Hire Loop",
  description: "The Modern Job Hunting Portal",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en" data-theme="dark"
      className={`${manropeSans.className} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
