"use server"

import { db } from "@/src/index"
import { schedule } from "@/src/db/schema"

export default async function addActivity(
    userId: string, habitId:number | null,
    date: string, time: string | null, name: string, 
    type: "checkbox" | "amount", 
    goal: number | null, unit: string | null, 
    progress?: number | null
){
    let newActivity = await db.insert(schedule).values({
        user_id: userId, habit_id: habitId,
        date: date, time: time, name: name, 
        type: type, progress: progress,
        goal: goal, unit: unit
    }).returning()

    return newActivity[0];
}