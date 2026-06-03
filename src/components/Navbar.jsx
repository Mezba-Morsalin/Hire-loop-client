"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import navImg from "../../public/images/navbar.png";
import { Button } from "@heroui/react";
import NavLink from "./shared/NavLink";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { PuffLoader } from "react-spinners";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user ?? null;

  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    setShowMenu(false);
    setOpen(false);
  };

  const MainLinks = (
    <>
      <li>
        <NavLink href="/browse-jobs">Browse Jobs</NavLink>
      </li>
      <li>
        <NavLink href="/company">Company</NavLink>
      </li>
      <li>
        <NavLink href="/pricing">Pricing</NavLink>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-[#222222]/95 backdrop-blur-sm border-b border-white/10 lg:border lg:rounded-2xl lg:mt-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              src={navImg}
              alt="HireLoop Logo"
              width={150}
              height={150}
              priority
              className="w-[120px] sm:w-[140px] lg:w-[150px] h-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-5 text-sm lg:text-base">
              {MainLinks}
            </ul>

            <div className="h-5 border-l border-gray-600" />

            <div className="flex items-center gap-3">
              {isPending ? (
                <PuffLoader color="#6366f1" size={30} />
              ) : user ? (
                <div className="relative">
                  <div
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center gap-3 border border-gray-600 hover:bg-black/20 transition duration-300 p-3 rounded-full cursor-pointer"
                  >
                    <Image
                      src={user.image || "/images/default-user.png"}
                      alt={user.name || "User"}
                      width={42}
                      height={42}
                      className="rounded-full object-cover border border-indigo-500"
                    />

                    <div className="hidden lg:flex flex-col items-start">
                      <span className="text-white text-sm font-medium">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {user.email}
                      </span>
                    </div>

                    {showMenu ? (
                      <FaChevronUp className="text-gray-400" />
                    ) : (
                      <FaChevronDown className="text-gray-400" />
                    )}
                  </div>

                  {/* Desktop Dropdown */}
                  {showMenu && (
                    <div className="absolute right-0 top-18 w-54 bg-[#1b1b1b] border border-white/10 rounded-2xl p-4 shadow-xl z-50">
                      <Link href={'/profile'}><Button className={"bg-linear-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent font-bold hover:text-indigo-700 transition-transform duration-200 hover:scale-105"}>Profile</Button></Link>

                      <Button
                        onClick={handleSignOut}
                        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white"
                      >
                        Sign Out
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/signin">
                  <Button className="bg-linear-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent font-bold transition-transform duration-200 hover:scale-105">
                    Sign In
                  </Button>
                </Link>
              )}

              <Link href="/">
                <Button className="bg-linear-to-r from-indigo-500 to-indigo-600 text-white rounded-xl px-5 py-2 shadow-lg shadow-indigo-500/20 transition-transform duration-200 hover:scale-105">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Toggle Menu"
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-[600px] mt-4" : "max-h-0"
          }`}
        >
          <div className="bg-[#1b1b1b] rounded-2xl border border-white/10 p-5 space-y-5">
            <ul className="flex flex-col gap-4">{MainLinks}</ul>

            <div className="border-t border-white/10" />

            {isPending ? (
              <div className="flex justify-center">
                <PuffLoader color="#6366f1" size={30} />
              </div>
            ) : user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={user.image || "/images/default-user.png"}
                    alt={user.name || "User"}
                    width={50}
                    height={50}
                    className="rounded-full object-cover border border-indigo-500"
                  />

                  <div className="min-w-0">
                    <h4 className="text-white font-medium truncate">
                      {user.name}
                    </h4>
                    <p className="text-xs text-gray-400 break-all">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleSignOut}
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
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
              <Button className="w-full bg-linear-to-r from-indigo-500 to-indigo-600 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;