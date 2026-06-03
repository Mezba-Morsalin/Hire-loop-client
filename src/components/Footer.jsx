"use client";

import Link from "next/link";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import footerImg from "../../public/images/navbar.png";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-[#222222] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Top Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10"
        >
          {/* Logo & Tagline */}
          <motion.div variants={item} className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src={footerImg}
                height={0}
                width={250}
                alt="Footer-image"
              />
            </Link>

            <p className="text-lg leading-relaxed max-w-md mt-4">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </motion.div>

          {/* Product */}
          <motion.div variants={item} className="lg:col-span-2">
            <h3 className="bg-linear-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent font-semibold mb-4">
              Product
            </h3>

            <ul className="space-y-3">
              {[
                ["Job discovery", "/jobs"],
                ["Worker AI", "#"],
                ["Companies", "/companies"],
                ["Salary data", "#"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-indigo-400 transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={item} className="lg:col-span-2">
            <h3 className="bg-linear-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent font-semibold mb-4">
              Navigations
            </h3>

            <ul className="space-y-3">
              {[
                ["Help center", "#"],
                ["Career library", "#"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-indigo-400 transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={item} className="lg:col-span-3">
            <h3 className="bg-linear-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent font-semibold mb-4">
              Resources
            </h3>

            <ul className="space-y-3">
              {[
                ["Brand Guideline", "#"],
                ["Newsroom", "#"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-indigo-400 transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex gap-4 mt-12"
        >
          {[
            FiFacebook,
            FiInstagram,
            FiLinkedin,
          ].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.15 }}
              className="hover:text-white transition"
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
        >
          <p>Copyright © 2026 — Hireloop. All rights reserved.</p>

          <div className="flex gap-6">
            {[
              ["Terms & Policy", "/terms"],
              ["Privacy Guideline", "/privacy"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="hover:text-indigo-400 transition"
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}