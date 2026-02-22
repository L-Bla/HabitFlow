// app/scheduler/page.tsx

import { db } from "@/src/index";
import { schedule, habits } from "@/src/db/schema";
import { eq, and } from "drizzle-orm";
import SchedulerClient from "./SchedulerClient";

export default async function SchedulerPage() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Format to YYYY-MM-DD (important for Postgres date comparison)
  const formatDate = (date: Date) =>
    date.toISOString().split("T")[0];

  const todayString = formatDate(today);
  const tomorrowString = formatDate(tomorrow);

  const todayActivities = await db
    .select()
    .from(schedule)
    .where(eq(schedule.date, todayString));

  const tomorrowActivities = await db
    .select()
    .from(schedule)
    .where(eq(schedule.date, tomorrowString));

  const userHabits = await db.select().from(habits);
  console.log(todayActivities)
  return (
    <SchedulerClient
      today={todayActivities}
      tomorrow={tomorrowActivities}
      habits={userHabits}
    />
  );
}