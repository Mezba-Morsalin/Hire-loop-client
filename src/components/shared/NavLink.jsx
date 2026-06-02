"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="group relative px-3 font-semibold py-2 text-white/80 transition-all duration-300 hover:bg-linear-to-r from-indigo-500 to-indigo-600 hover:bg-clip-text hover:text-transparent"
    >
      {children}

      <span
        className={`absolute left-0 -bottom-1 h-1 w-full rounded-full bg-linear-to-r from-indigo-500 to-indigo-600 transition-all duration-300
        ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      />
    </Link>
  );
};

export default NavLink;