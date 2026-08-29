import { useState } from "react";
import userImage from "../assets/user.png";
import {
  ArrowLeftCircleIcon,
  Cog6ToothIcon,
  DocumentCheckIcon,
  RectangleGroupIcon,
  ArrowRightStartOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { cn, getImageUrl } from "../utils/utils";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  avatar: string;
}

// 1. Define explicit type for navigation items
interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  link?: string | "";
  action?: () => void;
}

export default function Sidebar({
  mobileOpen = false,
  onMobileClose,
  avatar,
}: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { signOut } = useAuth();

  // 2. Wrap signOut in an arrow function so no MouseEvent is passed to Supabase
  const navItems: NavItem[] = [
    { label: "Dashboard", icon: RectangleGroupIcon, link: "/admin" },
    { label: "Vital Tasks", icon: DocumentCheckIcon, link: "/admin/tasks" },
    { label: "Settings", icon: Cog6ToothIcon, link: "/admin/settings" },
    {
      label: "Logout",
      icon: ArrowRightStartOnRectangleIcon,

      action: () => signOut(),
    },
  ];

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onMobileClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 shrink-0 translate-x-0 transition-transform duration-300 ease-in-out lg:relative lg:z-auto lg:translate-x-0 lg:transition-[width]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          sidebarOpen ? "lg:w-60" : "lg:w-16",
        )}
      >
        <div className="h-full pt-0 lg:pt-2 relative overflow-visible">
          <div
            className={cn(
              "h-full w-full overflow-hidden bg-todo-primary p-4 transition-[padding] duration-300 ease-in-out lg:rounded-tr-lg",
              sidebarOpen ? "" : "lg:px-3",
            )}
          >
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15 text-white"
                onClick={onMobileClose}
                aria-label="Close menu"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* PROFILE IMAGE */}
            <div
              className={cn(
                "transition-all duration-300 ease-in-out lg:absolute",
                sidebarOpen ? "lg:-top-5 lg:left-1/3" : "lg:-top-4 lg:left-2",
              )}
            >
              <img
                src={(avatar && getImageUrl(avatar, 0, 0)) || userImage}
                alt="User Profile"
                className={cn(
                  "rounded-full bg-white object-cover shadow-lg transition-all duration-300 ease-in-out",
                  sidebarOpen ? "h-14 w-14" : "h-10 w-10 lg:h-10 lg:w-10",
                )}
              />
            </div>

            {/* Navigation Links */}
            <div className="pt-6 space-y-2">
              {navItems.map(({ label, icon: Icon, link = "", action }) => (
                <NavLink
                  to={link}
                  key={label}
                  className="flex items-center gap-4 px-2 py-2 rounded hover:bg-slate-800 text-slate-300 whitespace-nowrap cursor-pointer select-none"
                  onClick={() => action?.()} // 3. Invoke optional action safely without event arguments
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span
                    className={cn(
                      "transition-all duration-200 ease-in-out",
                      sidebarOpen
                        ? "opacity-100 translate-x-0"
                        : "lg:opacity-0 lg:-translate-x-2 lg:pointer-events-none",
                    )}
                  >
                    {label}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Desktop toggle button */}
          <div className="absolute top-1/2 -right-3.5 hidden bg-todo-primary rounded-full cursor-pointer z-20 shadow-md lg:block">
            <ArrowLeftCircleIcon
              className={`w-7 h-7 text-white transition-transform duration-300 ease-in-out ${
                sidebarOpen ? "" : "rotate-180"
              }`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
