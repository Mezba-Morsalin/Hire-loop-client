"use client";

import { motion } from "framer-motion";
import { FiSearch, FiMapPin, FiBriefcase } from "react-icons/fi";
import Link from "next/link";

export default function Hero() {
  const trendingPositions = [
    "Product Designer",
    "AI Engineer",
    "DevOps Engineer",
  ];

  return (
    <section className="relative overflow-hidden text-white py-16 md:py-24">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4f46e515_0%,transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-b from-gray-800 to-black border border-slate-700 rounded-full px-4 md:px-6 py-2 text-xs md:text-sm font-medium">
            <FiBriefcase className="text-orange-400" />
            <span>50,000+ NEW JOBS THIS MONTH</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-center leading-tight mb-5"
        >
          Find Your{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
            Dream Job
          </span>
          <br />
          Today
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-400 text-center max-w-3xl mx-auto mb-10"
        >
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role faster.
        </motion.p>

        {/* Search UI */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-[#222222] border border-slate-700 rounded-2xl p-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            {/* Job Search */}
            <div className="flex items-center gap-3 bg-[#222222] rounded-xl px-4 py-4 flex-1 border border-transparent focus-within:border-indigo-500 transition">
              <FiSearch className="text-gray-400 shrink-0 text-lg" />
              <input
                type="text"
                placeholder="Job title, skill or company"
                className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
              />
            </div>

            {/* Mobile Divider */}
            <div className="w-full border-t border-slate-700 lg:hidden"></div>

            {/* Desktop Divider */}
            <div className="hidden lg:block h-8 border-l border-slate-700"></div>

            {/* Location Search */}
            <div className="flex items-center gap-3 bg-[#222222] rounded-xl px-4 py-4 flex-1 border border-transparent focus-within:border-indigo-500 transition">
              <FiMapPin className="text-gray-400 shrink-0 text-lg" />
              <input
                type="text"
                placeholder="Location or Remote"
                className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
              />
            </div>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 transition rounded-xl px-6 py-4 font-semibold flex items-center justify-center min-w-[60px] shadow-lg cursor-pointer"
            >
              <FiSearch className="text-lg" />
            </motion.button>
          </div>
        </motion.div>

        {/* Trending Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-3"
        >
          <span className="text-sm text-gray-400">
            Trending Positions:
          </span>

          {trendingPositions.map((position, index) => (
            <motion.div
              key={position}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Link
                href="#"
                className="px-4 py-2 text-sm rounded-full bg-[#222222] border border-gray-800 hover:text-indigo-400 transition-all duration-300"
              >
                {position}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}