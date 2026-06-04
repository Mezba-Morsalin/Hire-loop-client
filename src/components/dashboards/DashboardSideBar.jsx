"use client"

import { Button, Drawer } from '@heroui/react';
import React from 'react';
import { BsFillHouseDoorFill } from "react-icons/bs";
import { SlMagnifier } from "react-icons/sl";
import { LuBell } from "react-icons/lu";
import { FaRegEnvelope } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
 const navItems = [
    {icon: BsFillHouseDoorFill, label: "Home"},
    {icon: SlMagnifier, label: "Search"},
    {icon: LuBell, label: "Notifications"},
    {icon: FaRegEnvelope, label: "Messages"},
    {icon: IoPersonOutline, label: "Profile"},
    {icon: GoGear, label: "Settings"},
  ];

  const dashboardLinks = <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                ))}
              </nav>
  
const DashboardSideBar = () => {
    return (
        <>
        <aside className='hidden w-64 shrink-0 border-r border-default p-4 lg:block'>
            {
                dashboardLinks
            }
        </aside>
        <Drawer>
      <Button className='lg:hidden' variant="secondary">
        Menu
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              {dashboardLinks}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
        </>
    );
};

export default DashboardSideBar;