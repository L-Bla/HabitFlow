"use server";

import { db } from "@/src/index";
import { schedule } from "@/src/db/schema";
import { and, eq } from "drizzle-orm";

/**
 * Update activity
 */
export default async function updateActivity(
  id: number,
  userId: string,
  habitId: number | null,
  time: string | null,
  name: string | null,
  type: "checkbox" | "amount",
  goal: number | null,
  unit: string | null
) {
  try {
    const updated = await db
      .update(schedule)
      .set({
        habit_id: habitId,
        time,
        name,
        type,
        goal,
        unit,
      })
      .where(
        and(
            eq(schedule.id, id),
            eq(schedule.user_id, userId)
        )
        )
      .returning();

    return updated[0];
  } catch (error) {
    console.error("Failed to update activity:", error);
    throw error;
  }
}