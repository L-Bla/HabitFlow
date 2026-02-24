"use server"

import { db } from "@/src/index";
import { schedule, habitTracker, moodTracker } from "@/src/db/schema";
import { and, asc, desc, eq } from "drizzle-orm";

export async function getScheduleForDate(userId: string, selectedDate: string) {
  return await db
    .select()
    .from(schedule)
    .where(
      and(
        eq(schedule.user_id, userId),
        eq(schedule.date, selectedDate)
      )
    )
    .orderBy(schedule.time);
}

export async function saveEntry({
  userId,
  energy,
  pleasantness,
}: {
  userId: string;
  energy: number;
  pleasantness: number;
}) {
  const today = new Date().toISOString().split("T")[0];

  // Check if entry for today exists
  const existing = await db
    .select()
    .from(moodTracker)
    .where(
      and(
        eq(moodTracker.user_id, userId),
        eq(moodTracker.date, today)
      )
    );

  if (existing.length > 0) {
    // Append to arrays
    const current = existing[0];

    await db
      .update(moodTracker)
      .set({
        energy: [...(current.energy ?? []), energy],
        pleasantness: [...(current.pleasantness ?? []), pleasantness],
      })
      .where(
        and(
          eq(moodTracker.user_id, userId),
          eq(moodTracker.date, today)
        )
      );
  } else {
    // Create new row
    await db.insert(moodTracker).values({
      user_id: userId,
      date: today,
      energy: [energy],
      pleasantness: [pleasantness],
    });
  }

  return { success: true };
}

export async function saveScheduleProgress(
  userId: string,
  updates: {
    id: number;
    progress: number;
  }[]
) {

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  await db.transaction(async (tx) => {
    for (const item of updates) {
      await tx
        .update(schedule)
        .set({ progress: item.progress })
        .where(
          and(
            eq(schedule.user_id, userId),
            eq(schedule.id, item.id)
          )
        );

      const scheduleRow = await tx.query.schedule.findFirst({
        where: and(
          eq(schedule.user_id, userId),
          eq(schedule.id, item.id)
        ),
        columns: {
          habit_id: true,
          date: true,
        },
      });

        console.log(scheduleRow)
      // 3️⃣ If schedule row has a habit_id → update habitTracker
      if (scheduleRow?.habit_id) {
        await tx
          .insert(habitTracker)
          .values({
            user_id: userId,
            habit_id: scheduleRow.habit_id,
            date: scheduleRow.date,
            value: item.progress,
          })
          .onConflictDoUpdate({
            target: [
              habitTracker.user_id,
              habitTracker.habit_id,
              habitTracker.date,
            ],
            set: {
              value: item.progress,
            },
          });
      }
    
    }
  })
  

  return { success: true };
}

export const getLastEntry = async (userId: string) => {
  return await db
    .select({ date: moodTracker.date })
    .from(moodTracker)
    .where(eq(moodTracker.user_id, userId))
    .orderBy(desc(moodTracker.date))
    .limit(1)
}