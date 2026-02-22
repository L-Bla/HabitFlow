"use server"

import { db } from "@/src/index"
import { habits } from "@/src/db/schema"
import { and, eq } from "drizzle-orm";

export default async function deleteHabit(
    userId: number, id: number
){
    let deletedHabit = await db.delete(habits)
        .where(and(
            eq(habits.user_id, userId), 
            eq(habits.id, id)))

    return deletedHabit[0];
}