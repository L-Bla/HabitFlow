"use server"

import { db } from "@/src/index"
import { habits } from "@/src/db/schema"

export default async function addHabit(
    userId: string, name: string, 
    description: string, type: string, 
    goal: string, unit: string
){
    let newHabit = await db.insert(habits).values({
        user_id: userId, name: name, 
        description: description, type: type, 
        goal: goal, unit: unit
    }).returning()

    return newHabit[0];
}