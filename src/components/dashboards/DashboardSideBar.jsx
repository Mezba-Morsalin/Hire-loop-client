"use client";

import React, { useState } from "react";
import { Button, Drawer } from "@heroui/react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineViewCompactAlt } from "react-icons/md";
import { PiSuitcaseFill } from "react-icons/pi";
import { FaRegEnvelope } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import Link from "next/link";

const navItems = [
  { icon: LuLayoutDashboard, href: "/dashboard/recruiter", label: "Dashboard" },
  { icon: MdOutlineViewCompactAlt, href: "/dashboard/recruiter/my-company", label: "My Company" },
  { icon: PiSuitcaseFill, href: "/dashboard/recruiter/jobs", label: "Jobs" },
  { icon: FaRegEnvelope, href: "#", label: "Messages" },
  { icon: IoPersonOutline, href: "#", label: "Profile" },
  { icon: GoGear, href: "#", label: "Settings" },
];

const DashboardLinks = () => (
  <nav className="flex flex-col gap-1">
    {navItems.map((item) => (
      <Link
        key={item.label}
        href={item.href}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
      >
        <item.icon className="size-5 text-muted" />
        {item.label}
      </Link>
    ))}
  </nav>
);

const DashboardSideBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        <DashboardLinks />
      </aside>

      {/* Mobile drawer */}
      <div className="lg:hidden mt-5">
        <Button className='border border-gray-400 rounded-xl' variant="ghost" onPress={() => setOpen(true)}>
          See Dashboard
        </Button>

        <Drawer isOpen={open} onOpenChange={setOpen}>
          <Drawer.Backdrop />
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>
                <DashboardLinks />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer>
      </div>
    </>
  );
};

export default DashboardSideBar;