"use server"

import { and, eq } from "drizzle-orm";
import { db } from "..";
import { schedule } from "../db/schema";

/**
 * Delete activity
 */
export default async function deleteActivity(userId: string, id: number) {
  try {
    await db
      .delete(schedule)
      .where(
        and(
            eq(schedule.id, id),
            eq(schedule.user_id, userId)
        )
        )

    return { success: true };
  } catch (error) {
    console.error("Failed to delete activity:", error);
    throw error;
  }
}