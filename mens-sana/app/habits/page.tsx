import { db } from "@/src/index"
import { habits } from "@/src/db/schema"
import HabitsClient from "./HabitsClient";

export default async function Habits(){
  const userHabits = await db.select().from(habits)
  return(
    <HabitsClient userHabits={userHabits}/>
  )
}


