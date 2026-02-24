import { Button } from "@/app/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 px-8 py-20 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZjMC0xLjEuOS0yIDItMnMyIC45IDIgMi0uOSAyLTIgMi0yLS45LTItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative">
            <h2 className="mb-6 text-4xl font-extrabold text-white sm:text-5xl">
              Ready to Transform Your Life?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90">
              Start building better habits today. Join thousands of people who have already transformed their lives with our habit tracker.
            </p>
            
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="group bg-white text-lg text-blue-600 hover:bg-gray-100"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent text-lg text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-white/80">
              No credit card required • Free forever • Cancel anytime
            </p>
          </div>
          
          <div className="absolute -left-20 -top-20 size-64 rounded-full bg-white opacity-10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 size-64 rounded-full bg-white opacity-10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}