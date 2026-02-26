import { getScheduleForDate } from '@/src/actions/homeActions';
import { DailySchedule } from './DailySchedule';

export async function DailyScheduleWrapper({ userId, userName }: { userId: string; userName: string }) {
  const today = new Date().toISOString().split('T')[0];
  const activities = await getScheduleForDate(userId, today);

  return (
    <DailySchedule
      userId={userId}
      userName={userName}
      initialActivities={activities as any}
    />
  );
}
