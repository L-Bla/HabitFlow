// app/scheduler/page.tsx

import { db } from "@/src/index";
import { schedule, habits } from "@/src/db/schema";
import { eq, and } from "drizzle-orm";
import SchedulerClient from "./SchedulerClient";
import { auth } from "@/src/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SchedulerPage() {
  const session = await auth.api.getSession({
      headers: await headers(),
  })
  if (!session) redirect('/signin')
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
    .where(and(
      eq(schedule.date, todayString),
      eq(schedule.user_id, session.user.id)
    ))

  const tomorrowActivities = await db
    .select()
    .from(schedule)
    .where(and(
      eq(schedule.date, tomorrowString),
      eq(schedule.user_id, session.user.id)
    ))

  const userHabits = await db.select()
    .from(habits)
    .where(eq(habits.user_id, session.user.id))
  
  const validHabits = userHabits.filter((habit): habit is typeof userHabits[number] & { type: "amount" | "checkbox" } => habit.type !== null);
  
  return (
    <SchedulerClient
      today={todayActivities}
      tomorrow={tomorrowActivities}
      habits={validHabits}
      userId={session.user.id}
    />
  );
}