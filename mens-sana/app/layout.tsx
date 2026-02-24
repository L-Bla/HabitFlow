"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./components/ui/button";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Logo } from "./welcome/components/Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Analytics", href: "/analytics" },
  { label: "Scheduler", href: "/scheduler" },
  { label: "Habits", href: "/habits" },
  { label: "Blog", href: "/blog" },
  { label: "Account", href: "/account"}
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
              <div className="mx-auto max-w-7xl px-6 py-4">
                <div className="flex items-center justify-between">
                  <Link href="/welcome">
                    <div className="flex items-center gap-2">
                      <Logo size={40} />
                        <span className="text-xl font-bold text-blue-600">
                          HabitFlow
                        </span>
                    </div>
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
                        ? "px-3 py-2 rounded-md hover:bg-blue-300 border border-solid border-black transition"
                        : "px-3 py-2 rounded-md hover:bg-blue-300 transition"
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop dark mode */}
            <div className="md:block">
              
            </div>

            {/* Mobile buttons */}
            <div className="md:hidden flex space-x-2">
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
            <div className="md:hidden bg-white/80 backdrop-blur-md px-2 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md bg-white/80 backdrop-blur-md hover:bg-blue-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          </div>
        </nav>

        {/* Page content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
