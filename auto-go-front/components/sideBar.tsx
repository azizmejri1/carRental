"use client";
import {
  HomeIcon,
  ShieldCheckIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import SidebarItem from "./sideBarItem";

export default function Sidebar() {
  return (
    <div className="md:w-1/4">
      <div className="bg-white rounded-lg shadow-md p-4 sticky top-8 hover:shadow-lg transition-shadow duration-300">
        <ul>
          <SidebarItem
            icon={<HomeIcon className="h-5 w-5" />}
            text="Home"
            href="#"
          />
          <SidebarItem
            icon={<ShieldCheckIcon className="h-5 w-5" />}
            text="Security"
            href="#"
          />
          <SidebarItem
            icon={<LinkIcon className="h-5 w-5" />}
            text="Connected Accounts"
            href="#"
          />
        </ul>
      </div>
    </div>
  );
}
