import { Card } from "@/app/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1758522488987-ad5f0bb86077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMG1vcm5pbmclMjByb3V0aW5lfGVufDF8fHx8MTc3MTg2OTk5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    content: "This app completely changed how I approach my daily routine. The mood-habit correlation feature helped me realize that my morning workout directly improves my productivity!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    content: "The analytics are incredible. I finally understand which habits actually make a difference. The blog feature is perfect for reflecting on my progress.",
    rating: 5,
  },
  {
    name: "Emma Davis",
    role: "Content Creator",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    content: "I've tried many habit trackers, but this one stands out. The mood tracking combined with habit insights is exactly what I needed to stay motivated.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-extrabold sm:text-5xl">
            Loved by Thousands
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Join our community of people building better habits and living happier lives.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8">
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="mb-6 text-gray-700">{testimonial.content}</p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
