import { Button } from "@/app/components/ui/button";
import { auth } from "@/src/auth";
import { ArrowRight, Sparkles } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function Hero() {

  const session = await auth.api.getSession({
      headers: await headers()
  })
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 px-6 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Q0EzQUYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
            <Sparkles className="size-4" />
            <span>Transform Your Daily Routine</span>
          </div>
          
          <h1 className="mb-6 max-w-4xl text-5xl font-extrabold leading-tight text-blue-900 sm:text-7xl">
            Build Better Habits, Track Your Progress
          </h1>
          
          <p className="mb-10 max-w-2xl text-lg text-gray-600 sm:text-xl">
            A complete habit tracking solution that helps you understand your patterns, 
            track your mood, and achieve your goals with data-driven insights.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href={session ? "/" : "/signup"}>
            <Button size="lg" className="group bg-blue-600 text-base hover:bg-blue-700">
              Get Started Free<ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
            </Button>
            </Link>
          </div>
          
          <div className="mt-16 w-full max-w-5xl">
            <div className="overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1771499930542-1dae489be167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZpdHklMjBkYWlseSUyMHBsYW5uZXIlMjBub3RlYm9va3xlbnwxfHx8fDE3NzE4Njk5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Habit Tracker Dashboard"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}