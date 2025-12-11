"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentPage?: string;
}

// Icon Components - exact paths from the SVG design
function HomeIcon({ className, active }: { className?: string; active?: boolean }) {
  const fillColor = active ? "#4d3ee0" : "#464F5E";
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.46875 0.1875L17.7188 7.1875C18.0312 7.46875 18.0625 7.9375 17.8125 8.25C17.5312 8.5625 17.0625 8.59375 16.75 8.34375L16 7.6875V13.5C16 14.9062 14.875 16 13.5 16H4.5C3.09375 16 2 14.9062 2 13.5V7.6875L1.21875 8.34375C0.90625 8.59375 0.4375 8.5625 0.15625 8.25C-0.09375 7.9375 -0.0625 7.46875 0.25 7.1875L8.5 0.1875C8.78125 -0.03125 9.1875 -0.03125 9.46875 0.1875ZM3.5 13.5C3.5 14.0625 3.9375 14.5 4.5 14.5H6V9.75C6 9.0625 6.53125 8.5 7.25 8.5H10.75C11.4375 8.5 12 9.0625 12 9.75V14.5H13.5C14.0312 14.5 14.5 14.0625 14.5 13.5V6.40625L9 1.75L3.5 6.40625V13.5ZM7.5 14.5H10.5V10H7.5V14.5Z" fill={fillColor} />
    </svg>
  );
}

function UsersIcon({ className, active }: { className?: string; active?: boolean }) {
  const fillColor = active ? "#4d3ee0" : "#464F5E";
  return (
    <svg className={className} viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 1C3.59375 1 2.78125 1.46875 2.3125 2.25C1.875 3 1.875 3.96875 2.3125 4.75C2.78125 5.5 3.59375 6 4.5 6C5.375 6 6.1875 5.5 6.65625 4.75C7.09375 3.96875 7.09375 3 6.65625 2.25C6.1875 1.46875 5.375 1 4.5 1ZM16 1C15.0938 1 14.2812 1.46875 13.8125 2.25C13.375 3 13.375 3.96875 13.8125 4.75C14.2812 5.5 15.0938 6 16 6C16.875 6 17.6875 5.5 18.1562 4.75C18.5938 3.96875 18.5938 3 18.1562 2.25C17.6875 1.46875 16.875 1 16 1ZM0 5.34375C0 3.5 1.46875 2 3.3125 2H4.65625C5.15625 2 5.625 2.125 6.03125 2.3125C6 2.53125 6 2.78125 6 3C6 4.21875 6.5 5.28125 7.34375 6H7.3125H0.65625C0.28125 6 0 5.71875 0 5.34375ZM12.6562 6H12.625C13.4688 5.28125 13.9688 4.21875 13.9688 3C13.9688 2.78125 13.9688 2.53125 13.9375 2.3125C14.3438 2.125 14.8125 2 15.3125 2H16.6562C18.5 2 20 3.5 19.9688 5.34375C19.9688 5.71875 19.6875 6 19.3125 6H12.6562ZM10 1.5C9.4375 1.5 8.96875 1.8125 8.6875 2.25C8.40625 2.71875 8.40625 3.3125 8.6875 3.75C8.96875 4.21875 9.4375 4.5 10 4.5C10.5312 4.5 11 4.21875 11.2812 3.75C11.5625 3.3125 11.5625 2.71875 11.2812 2.25C11 1.8125 10.5312 1.5 10 1.5ZM10 6C8.90625 6 7.9375 5.4375 7.375 4.5C6.84375 3.59375 6.84375 2.4375 7.375 1.5C7.9375 0.59375 8.90625 0 10 0C11.0625 0 12.0312 0.59375 12.5938 1.5C13.125 2.4375 13.125 3.59375 12.5938 4.5C12.0312 5.4375 11.0625 6 10 6ZM8.15625 8.5C6.90625 8.5 5.875 9.375 5.5625 10.5H14.4062C14.0938 9.375 13.0625 8.5 11.8125 8.5H8.15625ZM8.15625 7H11.8125C14.125 7 16 8.875 16 11.1875C16 11.6562 15.625 12 15.1562 12H4.8125C4.34375 12 4 11.625 4 11.1875C4 8.875 5.84375 7 8.15625 7Z" fill={fillColor} transform="translate(0, 2)" />
    </svg>
  );
}

function ListIcon({ className, active }: { className?: string; active?: boolean }) {
  const fillColor = active ? "#4d3ee0" : "#464F5E";
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 0.5C0.71875 0.5 0.5 0.75 0.5 1V11C0.5 11.2812 0.71875 11.5 1 11.5H11C11.25 11.5 11.5 11.2812 11.5 11V1C11.5 0.75 11.25 0.5 11 0.5H1ZM-1 1C-1 -0.09375 -0.125 -1 1 -1H11C12.0938 -1 13 -0.09375 13 1V11C13 12.125 12.0938 13 11 13H1C-0.125 13 -1 12.125 -1 11V1ZM2 3C2 2.46875 2.4375 2 3 2C3.53125 2 4 2.46875 4 3C4 3.5625 3.53125 4 3 4C2.4375 4 2 3.5625 2 3ZM5.25 3C5.25 2.59375 5.5625 2.25 6 2.25H9C9.40625 2.25 9.75 2.59375 9.75 3C9.75 3.4375 9.40625 3.75 9 3.75H6C5.5625 3.75 5.25 3.4375 5.25 3ZM5.25 6C5.25 5.59375 5.5625 5.25 6 5.25H9C9.40625 5.25 9.75 5.59375 9.75 6C9.75 6.4375 9.40625 6.75 9 6.75H6C5.5625 6.75 5.25 6.4375 5.25 6ZM5.25 9C5.25 8.59375 5.5625 8.25 6 8.25H9C9.40625 8.25 9.75 8.59375 9.75 9C9.75 9.4375 9.40625 9.75 9 9.75H6C5.5625 9.75 5.25 9.4375 5.25 9ZM3 7C2.4375 7 2 6.5625 2 6C2 5.46875 2.4375 5 3 5C3.53125 5 4 5.46875 4 6C4 6.5625 3.53125 7 3 7ZM2 9C2 8.46875 2.4375 8 3 8C3.53125 8 4 8.46875 4 9C4 9.5625 3.53125 10 3 10C2.4375 10 2 9.5625 2 9Z" fill={fillColor} transform="translate(2, 2)" />
    </svg>
  );
}

function ClipboardIcon({ className, active }: { className?: string; active?: boolean }) {
  const fillColor = active ? "#4d3ee0" : "#464F5E";
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 1.5C15.7305 1.5 16.75 2.51953 16.75 3.75V15C16.75 16.2656 15.7305 17.25 14.5 17.25H5.5C4.23438 17.25 3.25 16.2656 3.25 15V3.75C3.25 2.51953 4.23438 1.5 5.5 1.5H6.90625H7.22266C7.50391 0.234375 8.62891 -0.75 10 -0.75C11.3359 -0.75 12.4961 0.234375 12.7422 1.5H13.0938H14.5ZM6.0625 3.1875H5.5C5.18359 3.1875 4.9375 3.46875 4.9375 3.75V15C4.9375 15.3164 5.18359 15.5625 5.5 15.5625H14.5C14.7812 15.5625 15.0625 15.3164 15.0625 15V3.75C15.0625 3.46875 14.7812 3.1875 14.5 3.1875H13.9375V4.03125C13.9375 4.52344 13.5508 4.875 13.0938 4.875H10H6.90625C6.41406 4.875 6.0625 4.52344 6.0625 4.03125V3.1875ZM9.15625 2.0625C9.15625 2.55469 9.50781 2.90625 10 2.90625C10.457 2.90625 10.8438 2.55469 10.8438 2.0625C10.8438 1.60547 10.457 1.21875 10 1.21875C9.50781 1.21875 9.15625 1.60547 9.15625 2.0625ZM13.4102 8.67188L9.64844 12.4336C9.47266 12.5742 9.26172 12.6797 9.05078 12.6797C8.83984 12.6797 8.59375 12.5742 8.45312 12.4336L6.58984 10.5352C6.23828 10.2188 6.23828 9.69141 6.58984 9.33984C6.90625 9.02344 7.43359 9.02344 7.78516 9.33984L9.05078 10.6406L12.2148 7.47656C12.5312 7.16016 13.0586 7.16016 13.4102 7.47656C13.7266 7.79297 13.7266 8.35547 13.4102 8.67188Z" fill={fillColor} transform="translate(-3, 2)" />
    </svg>
  );
}

function PlayIcon({ className, active }: { className?: string; active?: boolean }) {
  const fillColor = active ? "#4d3ee0" : "#464F5E";
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 14.5V5.5L14 10L8 14.5Z" fill={fillColor} />
    </svg>
  );
}

const navItems = [
  { href: "/", icon: HomeIcon, label: "Dashboard" },
  { href: "/workforce-planning", icon: UsersIcon, label: "Workforce Planning" },
  { href: "#", icon: ListIcon, label: "Playbooks" },
  { href: "/action-center", icon: ClipboardIcon, label: "Action Center" },
  { href: "/walkthrough", icon: PlayIcon, label: "Walkthrough" },
];

export function Sidebar({ currentPage }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-white border-r border-slate-200 flex flex-col items-center py-4 z-40">
      {/* Light gray vertical strip on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-100" />
      
      {/* Logo / Home Button */}
      <div className="mb-4 flex items-center justify-center">
        <Link
          href="/"
          className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 hover:bg-slate-50"
          aria-label="Go to home"
        >
          <img
            src="/logo.svg"
            alt="Home"
            className="w-6 h-6"
            style={{ width: '24px', height: '24px', display: 'block' }}
          />
        </Link>
      </div>

      <nav className="flex flex-col gap-1 w-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 relative group",
                isActive
                  ? "bg-[#EAE8FB]"
                  : "text-slate-600 hover:bg-slate-50"
              )}
              aria-label={item.label}
            >
              <Icon
                className="w-5 h-5"
                active={isActive}
              />
              
              {/* Tooltip on hover */}
              <span
                className={cn(
                  "absolute left-full ml-3 px-2 py-1 text-xs font-medium text-white bg-slate-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50",
                  "before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-slate-900"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
