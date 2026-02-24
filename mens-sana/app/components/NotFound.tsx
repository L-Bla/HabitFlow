"use client"

import { Button } from "./ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { Logo } from "@/app/welcome/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      {/* Simple header with logo */}
      <header className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <Logo size={40} />
            <span className="text-xl font-bold text-blue-600">HabitFlow</span>
          </div>
        </div>
      </header>

      {/* Main 404 content */}
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-6">
        <div className="mx-auto max-w-2xl text-center">
          {/* Simple 404 */}
          <div className="mb-8">
            <div className="mb-6 text-[140px] font-extrabold leading-none text-blue-600 sm:text-[200px]">
              404
            </div>
          </div>

          {/* Error message */}
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mb-10 text-lg text-gray-600">
            Looks like this page doesn't exist. Let's get you back on track!
          </p>

          {/* Action buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = '/'}
            >
              <Home className="mr-2 size-5" />
              Back to Home
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 size-5" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}