"use client";
import Link from "next/link";
import { useState } from "react";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: "Team", href: "/admin/team" },
    { name: "Services", href: "/admin/services" },
    { name: "Projects", href: "/admin/projects" },
    { name: "Contact", href: "/admin/contact" },
    { name: "Clients", href: "/admin/clients" },
    { name: "Queries", href: "/admin/queries" },
    { name: "Quotes", href: "/admin/quotes" },
    
  ];

  return (
    <div className="fixed left-0 top-0 h-screen bg-gray-800 text-white shadow-lg z-40 transition-all duration-300">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className={`text-lg font-bold ${isCollapsed ? "hidden" : "block"}`}>
          Admin Panel
        </h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-700 rounded-md focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isCollapsed ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            )}
          </svg>
        </button>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-orange-400 rounded-md transition-colors duration-200 ${
                  isCollapsed ? "justify-center" : "pl-4"
                }`}
              >
                <span className={isCollapsed ? "hidden" : "block"}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}