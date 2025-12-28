"use client";

import { DailySchedule } from './components/DailySchedule';
import { MoodTracker } from './components/MoodTracker';
import { MiniAnalytics } from './components/MiniAnalytics';

interface HomeProps {
  darkMode: boolean;
}

export default function Home({ darkMode }: HomeProps) {
  return (
    <div className="space-y-6">
      {/* Daily Schedule and Mood Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DailySchedule />
        </div>
        <div className="lg:col-span-1">
          <MoodTracker />
        </div>
      </div>

      {/* Most Important Graphs from Analytics */}
      <div>
        <h2 className="mb-4">Key Insights</h2>
        <MiniAnalytics />
      </div>
    </div>
  );
}
