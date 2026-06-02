"use client";

import Link from "next/link";
import React, { useState } from "react";
import navImg from "../../public/images/navbar.png";
import Image from "next/image";
import { Button } from "@heroui/react";
import NavLink from "./shared/NavLink";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const MainLinks = (
    <>
      <li>
        <NavLink href={"/browse-jobs"}>Browse Jobs</NavLink>
      </li>
      <li>
        <NavLink href={"/company"}>Company</NavLink>
      </li>
      <li>
        <NavLink href={"/pricing"}>Pricing</NavLink>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 bg-[#222222] lg:mt-5 lg:rounded-2xl">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href={"/"}>
            <Image src={navImg} alt="navbar-image" width={150} height={150} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-5 text-sm lg:text-base">
              {MainLinks}
            </ul>

            <div className="h-5 border-l border-gray-300" />

            <div className="flex items-center gap-3">
              <Link href={"/signin"}>
                <Button className="hover:scale-105 transition bg-linear-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent font-semibold">
                  Sign In
                </Button>
              </Link>

              <Link href={"/"}>
                <Button className="bg-linear-to-b from-indigo-500 to-indigo-600 text-white rounded-xl py-2 px-4 lg:py-3 lg:px-5 hover:scale-105 transition font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-4 flex flex-col gap-4 bg-[#222222] rounded-xl p-4">
            <ul className="flex flex-col gap-3 text-sm">
              {MainLinks}
            </ul>

            <div className="border-t border-gray-200" />

            <Link href={"/signin"} onClick={() => setOpen(false)}>
              <Button className="w-full">Sign In</Button>
            </Link>

            <Link href={"/"} onClick={() => setOpen(false)}>
              <Button className="w-full bg-indigo-600 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;