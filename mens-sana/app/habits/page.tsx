import { db } from "@/src/index"
import { habits } from "@/src/db/schema"
import HabitsClient from "./HabitsClient";
import { auth } from "@/src/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm"

export default async function Habits(){
  const session = await auth.api.getSession({
      headers: await headers(),
  })
  if (!session) redirect('/signin')
  const userHabits = await db.select()
    .from(habits)
    .where(eq(habits.user_id, session.user.id))
  
  return(
    <HabitsClient userHabits={userHabits} userId={session.user.id}/>
  )
}


