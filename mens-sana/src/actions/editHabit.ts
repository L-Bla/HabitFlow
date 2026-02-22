"use server"

import { db } from "@/src/index"
import { habits } from "@/src/db/schema"
import { and, eq } from "drizzle-orm";

export default async function addHabit(
    userId: number, id: number, name: string, 
    description: string, type: string, 
    goal: string, unit: string
){
    let editedHabit = await db.update(habits)
        .set({name: name, description: description, type: type, 
            goal: goal, unit: unit})
        .where(and(
            eq(habits.user_id, userId), 
            eq(habits.id, id)))

    return editedHabit[0];
}