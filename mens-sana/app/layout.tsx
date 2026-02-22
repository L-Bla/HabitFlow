"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "./components/ui/button";
import "./globals.css";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Analytics", href: "/analytics" },
  { label: "Scheduler", href: "/scheduler" },
  { label: "Habits", href: "/habits" },
  { label: "Blog", href: "/blog" },
  { label: "Options", href: "/options" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-white font-semibold">
              mens-sana
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex space-x-4">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/" // special case for home
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      isActive
                        ? "px-3 py-2 rounded-md hover:bg-blue-500 border border-solid border-white transition"
                        : "px-3 py-2 rounded-md hover:bg-blue-500 transition"
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop dark mode */}
            <div className="hidden md:block">

            </div>

            {/* Mobile buttons */}
            <div className="md:hidden flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun /> : <Moon />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-blue-700 px-2 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md hover:bg-blue-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* Page content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
