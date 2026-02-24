"use client"

import { Button } from "@/app/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={40} />
            <span className="text-xl font-bold text-blue-600">
              HabitFlow
            </span>
          </div>
          
          <div className="hidden gap-8 md:flex">
            <a href="#features" className="transition-colors hover:text-blue-600">Features</a>
            <a href="#pricing" className="transition-colors hover:text-blue-600">Pricing</a>
            <a href="#testimonials" className="transition-colors hover:text-blue-600">Testimonials</a>
            <a href="#blog" className="transition-colors hover:text-blue-600">Blog</a>
          </div>
          
          <div className="hidden gap-4 md:flex">
            <Button variant="ghost">Sign In</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </div>
          
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="size-6" />
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="mt-4 flex flex-col gap-4 border-t pt-4 md:hidden">
            <a href="#features" className="transition-colors hover:text-blue-600">Features</a>
            <a href="#pricing" className="transition-colors hover:text-blue-600">Pricing</a>
            <a href="#testimonials" className="transition-colors hover:text-blue-600">Testimonials</a>
            <a href="#blog" className="transition-colors hover:text-blue-600">Blog</a>
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="w-full">Sign In</Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}