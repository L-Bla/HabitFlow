//"use client";

import { DailySchedule } from './components/DailySchedule';
import { MoodTracker } from './components/MoodTracker';
import { MiniAnalytics } from './components/MiniAnalytics';
import { eq } from 'drizzle-orm';
import { db } from '../src/index';
import { users } from '../src/db/schema';
import { MoodTrackerWrapper } from './components/MoodTrackerWraper';
 
export default async function Home() {
  //const allUsers = await db.select().from(users)  
  //console.log(allUsers)
  return (
    <div className="space-y-6">
      {/* Daily Schedule and Mood Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DailySchedule />
        </div>
        <div className="lg:col-span-1">
          <MoodTrackerWrapper />
        </div>
      </div>
    </div>
  );
}
