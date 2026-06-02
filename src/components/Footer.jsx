import Link from 'next/link';
import { 
  FiFacebook, 
  FiInstagram, 
  FiLinkedin 
} from 'react-icons/fi';
import footerImg from "../../public/images/navbar.png";
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#222222] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Logo & Tagline */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-1">
              <Image src={footerImg} height={0} width={250} alt='Footer-image'></Image>
            </Link>
            <p className="text-lg leading-relaxed max-w-md">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Product */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/jobs" className="hover:text-white transition">Job discovery</Link></li>
              <li><Link href="#" className="hover:text-white transition">Worker AI</Link></li>
              <li><Link href="/companies" className="hover:text-white transition">Companies</Link></li>
              <li><Link href="#" className="hover:text-white transition">Salary data</Link></li>
            </ul>
          </div>

          {/* Navigations */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4">Navigations</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition">Help center</Link></li>
              <li><Link href="#" className="hover:text-white transition">Career library</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition">Brand Guideline</Link></li>
              <li><Link href="#" className="hover:text-white transition">Newsroom</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-12">
          <a href="#" className="hover:text-white transition">
            <FiFacebook className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition">
            <FiInstagram className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition">
            <FiLinkedin className="w-6 h-6" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>Copyright © 2026 — Hireloop. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition">Terms &amp; Policy</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Guideline</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}