import { redirect } from 'next/navigation';
import { DailySchedule } from './components/DailySchedule';
import { MoodTrackerWrapper } from './components/MoodTrackerWraper';
import { auth } from '@/src/auth';
import { headers } from 'next/headers';

 
export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) redirect('/welcome')

  return (
    <div className="space-y-6">
      {/* Daily Schedule and Mood Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DailySchedule userId={session.user.id} userName={session.user.name}/>
        </div>
        <div className="lg:col-span-1">
          <MoodTrackerWrapper userId={session.user.id}/>
        </div>
      </div>
    </div>
  );
}
