import { Calendar, TrendingUp, Heart, BarChart3, BookOpen } from "lucide-react";
import { Card } from "@/app/components/ui/card";

const features = [
  {
    icon: Calendar,
    title: "Daily Schedule",
    description: "Plan and organize your day with an intuitive daily schedule. Set up your habits and track them as you complete your daily goals.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Visualize your journey with beautiful progress charts. See your streaks, completion rates, and celebrate your wins.",
    color: "from-blue-600 to-blue-700",
  },
  {
    icon: Heart,
    title: "Mood Tracking",
    description: "Log your daily mood and emotions. Understand how you feel and identify patterns that impact your well-being.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: BarChart3,
    title: "Mood-Habit Correlation",
    description: "Discover powerful insights with data visualization. See how your habits influence your mood and make informed decisions.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: BookOpen,
    title: "Personal Blog",
    description: "Reflect on your journey with a built-in blog. Document your thoughts, achievements, and lessons learned along the way.",
    color: "from-sky-500 to-blue-600",
  },
];

export function Features() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-extrabold sm:text-5xl">
            Everything You Need to Succeed
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Powerful features designed to help you build lasting habits and understand yourself better.
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 p-8 transition-all hover:shadow-xl"
              >
                <div className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${feature.color} p-4`}>
                  <Icon className="size-8 text-white" />
                </div>
                
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                
                <div
                  className={`absolute -right-6 -top-6 size-32 rounded-full bg-gradient-to-br ${feature.color} opacity-0 blur-3xl transition-opacity group-hover:opacity-20`}
                />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}