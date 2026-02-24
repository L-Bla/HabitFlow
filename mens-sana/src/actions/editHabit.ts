"use server"

import { db } from "@/src/index"
import { habits } from "@/src/db/schema"
import { and, eq } from "drizzle-orm";
import { auth } from "../auth";
import { headers } from "next/headers";

export default async function editHabit(
    userId: string, id: number, name: string, 
    description: string, type: "amount" | "checkbox", 
    goal: string | null, unit: string | null
){
    
    let editedHabit = await db.update(habits)
        .set({user_id: userId, name: name, description: description, type: type,
            goal: goal ? parseInt(goal) : null, unit: unit})
        .where(and(
            eq(habits.user_id, userId), 
            eq(habits.id, id)))

    return editedHabit[0];
}