import { redirect } from 'next/navigation';
import { DailyScheduleWrapper } from './components/DailyScheduleWrapper';
import { MoodTrackerWrapper } from './components/MoodTrackerWraper';
import { auth } from '@/src/auth';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

 
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
          <Suspense
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>{session.user.name}'s Daily Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground">Waiting for activities...</div>
                </CardContent>
              </Card>
            }
          >
            <DailyScheduleWrapper userId={session.user.id} userName={session.user.name}/>
          </Suspense>
        </div>
        <div className="lg:col-span-1">
          <MoodTrackerWrapper userId={session.user.id}/>
        </div>
      </div>
    </div>
  );
}
