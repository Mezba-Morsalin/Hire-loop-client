"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import navImg from "../../public/images/navbar.png";
import { Button } from "@heroui/react";
import NavLink from "./shared/NavLink";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { PuffLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user ?? null;

  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const dropdownRef = useRef(null);

  const avatarSrc =
    user?.image?.trim() ? user.image : "/images/default-user.png";

  const handleSignOut = async () => {
    await authClient.signOut();
    setShowMenu(false);
    setOpen(false);
    router.push('/')
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowMenu(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const dashboardLink =
  user?.role === "recruiter"
    ? "/dashboard/recruiter"
    : "/dashboard/seeker";

const MainLinks = [
  <li key="browse" onClick={() => setOpen(false)}>
    <NavLink href="/browse-jobs">Browse Jobs</NavLink>
  </li>,

  <li key="company" onClick={() => setOpen(false)}>
    <NavLink href="/company">Company</NavLink>
  </li>,

  <li key="pricing" onClick={() => setOpen(false)}>
    <NavLink href="/pricing">Pricing</NavLink>
  </li>,
];

if (user) {
  MainLinks.push(
    <li key="dashboard" onClick={() => setOpen(false)}>
      <NavLink href={dashboardLink}>Dashboard</NavLink>
    </li>
  );
}

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#222222]/95 border-b border-white/10">
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <Image
              src={navImg}
              alt="Logo"
              width={150}
              height={150}
              priority
              className="w-[120px] sm:w-[140px] lg:w-[150px]"
            />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-5 text-sm lg:text-base">
              {MainLinks}
            </ul>

            <div className="h-5 border-l border-gray-600" />

            <div className="flex items-center gap-3">

              {isPending ? (
                <PuffLoader color="#6366f1" size={30} />
              ) : user ? (
                <div ref={dropdownRef} className="relative">

                  {/* Profile Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center gap-3 border border-gray-600 hover:bg-black/20 p-3 rounded-full cursor-pointer"
                  >
                    <Image
                      src={avatarSrc}
                      alt="User"
                      width={42}
                      height={42}
                      className="rounded-full border border-indigo-500"
                    />

                    <div className="hidden lg:flex flex-col">
                      <span className="text-white text-sm font-medium">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {user.email}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: showMenu ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronDown className="text-gray-400" />
                    </motion.div>
                  </motion.div>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {showMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 top-20 w-56 bg-[#1b1b1b] border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-md"
                      >

                        <Button
                          onClick={handleSignOut}
                          className="mt-4 w-full border border-indigo-500 bg-transparent text-white"
                        >
                          Sign Out
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/signin">
                  <Button className="border border-indigo-500 bg-transparent text-white rounded-xl">
                    Sign In
                  </Button>
                </Link>
              )}

              <Link href="/">
                <Button className="bg-linear-to-r from-indigo-500 to-indigo-600 text-white rounded-xl px-5 shadow-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4"
            >
              <div className="bg-[#1b1b1b] rounded-2xl border border-white/10 p-5 space-y-5">

                <ul className="flex flex-col gap-4">
                  {MainLinks}
                </ul>

                <div className="border-t border-white/10" />

                {isPending ? (
                  <div className="flex justify-center">
                    <PuffLoader color="#6366f1" size={30} />
                  </div>
                ) : user ? (
                  <div className="space-y-4">

                    <div className="flex items-center gap-3">
                      <Image
                        src={avatarSrc}
                        alt="User"
                        width={50}
                        height={50}
                        className="rounded-full border border-indigo-500"
                      />

                      <div>
                        <h4 className="text-white font-medium">
                          {user.name}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={handleSignOut}
                      className="w-full bg-red-500 text-white"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link href="/signin" onClick={() => setOpen(false)}>
                    <Button className="w-full border border-indigo-500 bg-transparent text-white">
                      Sign In
                    </Button>
                  </Link>
                )}

                <Link href="/" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-linear-to-r from-indigo-500 to-indigo-600 text-white mt-5">
                    Get Started
                  </Button>
                </Link>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </header>
  );
};

export default Navbar;