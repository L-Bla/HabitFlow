export function Showcase() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
              Intelligent Insights
            </div>
            <h2 className="mb-6 text-4xl font-extrabold sm:text-5xl">
              Understand What Drives Your Success
            </h2>
            <p className="mb-6 text-lg text-gray-600">
              Our advanced correlation engine analyzes your habits and mood patterns 
              to reveal what truly makes you happier and more productive.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-600">
                  <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Visual Analytics</p>
                  <p className="text-gray-600">Beautiful charts that make your data easy to understand</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-600">
                  <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Pattern Recognition</p>
                  <p className="text-gray-600">Discover hidden connections between your habits and feelings</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjaGFydHN8ZW58MXx8fHwxNzcxODQyMjQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Analytics Dashboard"
                className="w-full"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 size-32 rounded-full bg-blue-600 opacity-20 blur-3xl" />
            <div className="absolute -right-6 -top-6 size-32 rounded-full bg-cyan-600 opacity-20 blur-3xl" />
          </div>
        </div>
        
        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1656877280226-ebf9ea8b1303?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb3VybmFsJTIwd3JpdGluZyUyMGNvZmZlZXxlbnwxfHx8fDE3NzE4Njk5OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Journal and Reflection"
                className="w-full"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="mb-4 inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm text-cyan-700">
              Reflect & Grow
            </div>
            <h2 className="mb-6 text-4xl font-extrabold sm:text-5xl">
              Document Your Journey
            </h2>
            <p className="mb-6 text-lg text-gray-600">
              Your personal blog space to reflect on your progress, share insights, 
              and celebrate milestones. Writing helps solidify learning and track growth over time.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-cyan-600">
                  <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Private by Default</p>
                  <p className="text-gray-600">Your blog entries are completely private and secure</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}