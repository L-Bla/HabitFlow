import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-blue-600">
              HabitFlow
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Building better habits, one day at a time. Track, analyze, and improve your daily routines.
            </p>
            <div className="flex gap-3">
              <a href="#" className="rounded-lg bg-gray-200 p-2 transition-colors hover:bg-blue-100">
                <Facebook className="size-5 text-gray-700" />
              </a>
              <a href="#" className="rounded-lg bg-gray-200 p-2 transition-colors hover:bg-blue-100">
                <Twitter className="size-5 text-gray-700" />
              </a>
              <a href="#" className="rounded-lg bg-gray-200 p-2 transition-colors hover:bg-blue-100">
                <Instagram className="size-5 text-gray-700" />
              </a>
              <a href="#" className="rounded-lg bg-gray-200 p-2 transition-colors hover:bg-blue-100">
                <Linkedin className="size-5 text-gray-700" />
              </a>
              <a href="#" className="rounded-lg bg-gray-200 p-2 transition-colors hover:bg-blue-100">
                <Github className="size-5 text-gray-700" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="transition-colors hover:text-blue-600">Features</a></li>
              <li><a href="#" className="transition-colors hover:text-blue-600">Pricing</a></li>
              <li><a href="#" className="transition-colors hover:text-blue-600">Integrations</a></li>
              <li><a href="#" className="transition-colors hover:text-blue-600">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="transition-colors hover:text-blue-600">About</a></li>
              <li><a href="#" className="transition-colors hover:text-blue-600">Blog</a></li>
              <li><a href="#" className="transition-colors hover:text-blue-600">Careers</a></li>
              <li><a href="#" className="transition-colors hover:text-blue-600">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="transition-colors hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="transition-colors hover:text-blue-600">Terms of Service</a></li>
              <li><a href="#" className="transition-colors hover:text-blue-600">Cookie Policy</a></li>
              <li><a href="#" className="transition-colors hover:text-blue-600">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} HabitFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}