"use server"

import { db } from "@/src/index"
import { habits } from "@/src/db/schema"

export default async function addHabit(
    userId: string, name: string, 
    description: string, type: string, 
    goal: number | null, unit: string | null
){
    let newHabit = await db.insert(habits).values({
        user_id: userId, name: name, 
        description: description, type: type as "amount" | "checkbox", 
        goal: goal, unit: unit
    }).returning()

    return newHabit[0];
}