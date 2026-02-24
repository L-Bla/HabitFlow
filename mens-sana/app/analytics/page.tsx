import { db } from "@/src/index"
import { charts, habits } from "@/src/db/schema"
import AnalyticsClient from "./AnalyticsClient"
import { eq } from "drizzle-orm"
import { auth } from "@/src/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Analytics(){
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if (!session) redirect('/signin')
    const initialCharts = await db.select().from(charts)
    const userHabits = await db.select({name: habits.name}).from(habits)//.where(eq(habits.user_id, 1))
    
    return(
        <AnalyticsClient initialCharts={initialCharts} userHabits={userHabits} session={session}/>
    )
}