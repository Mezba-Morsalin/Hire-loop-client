"use client";

import React, { useState } from "react";
import { Button, Drawer } from "@heroui/react";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineCreditCard,
  MdOutlinePeopleAlt,
  MdOutlineSearch,
  MdOutlineViewCompactAlt,
} from "react-icons/md";
import { PiSuitcaseFill } from "react-icons/pi";
import {
  IoBookmarkOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { IoMdApps } from "react-icons/io";
import { BiNews } from "react-icons/bi";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const DashboardSideBar = () => {
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);

  const user = session?.user ?? null;

  const recruiterNavLinks = [
    {
      icon: LuLayoutDashboard,
      href: "/dashboard/recruiter",
      label: "Dashboard",
    },
    {
      icon: MdOutlineViewCompactAlt,
      href: "/dashboard/recruiter/my-company",
      label: "My Company",
    },
    {
      icon: PiSuitcaseFill,
      href: "/dashboard/recruiter/jobs",
      label: "Jobs",
    },
    {
      icon: IoMdApps,
      href: "/dashboard/recruiter/applications",
      label: "Applications",
    },
    {
      icon: IoSettingsOutline,
      href: "/dashboard/recruiter/settings",
      label: "Settings",
    },
  ];

  
 const adminNavLinks = [
  {
    icon: LuLayoutDashboard,
    href: "/dashboard/admin",
    label: "Dashboard",
  },
  {
    icon: PiSuitcaseFill,
    href: "/dashboard/admin/jobs",
    label: "Jobs",
  },
  {
    icon: MdOutlinePeopleAlt,
    href: "/dashboard/admin/users",
    label: "Users",
  },
  {
    icon: HiOutlineBuildingOffice2,
    href: "/dashboard/admin/companies",
    label: "Companies",
  },
  {
    icon: MdOutlineCreditCard,
    href: "/dashboard/admin/billing",
    label: "Billing",
  },
  {
    icon: IoSettingsOutline,
    href: "/dashboard/admin/settings",
    label: "Settings",
  },
];
const seekerNavLinks = [ { icon: LuLayoutDashboard, href: "/dashboard/seeker", label: "Dashboard", }, { icon: MdOutlineSearch, href: "/dashboard/seeker/jobs", label: "Jobs", }, { icon: IoBookmarkOutline, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs", }, { icon: BiNews, href: "/dashboard/seeker/applications", label: "Applications", }, { icon: MdOutlineCreditCard, href: "/dashboard/seeker/billing", label: "Billing", }, { icon: IoSettingsOutline, href: "/dashboard/seeker/settings", label: "Settings", }, ];

  const navLinkMap = {
    seeker: seekerNavLinks,
    recruiter: recruiterNavLinks,
    admin : adminNavLinks,
  };

  const navItems = navLinkMap[user?.role] || [];

  if (isPending) {
    return (
      <div className="p-4">
        <p>Loading...</p>
      </div>
    );
  }

  

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        <DashboardLinks navItems={navItems}/>
      </aside>

      {/* Mobile Drawer */}
      <div className="mt-5 lg:hidden">
        <Button
          className="border border-gray-400 rounded-xl"
          variant="ghost"
          onPress={() => setOpen(true)}
        >
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

 const DashboardLinks = ({navItems}) => (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-default"
        >
          <item.icon className="size-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );