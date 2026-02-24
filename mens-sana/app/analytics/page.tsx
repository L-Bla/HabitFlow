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
    const chartsData = await db.select().from(charts)
        .where(eq(charts.user_id, session.user.id));
    const initialCharts = chartsData.map(chart => ({
        ...chart,
        id: String(chart.id),
        param2: chart.param2 ?? undefined,
        onHome: chart.onHome ?? false,
        data: chart.data as { x: string; values: { v1: number; v2: number; }[] }[]
    }))
    const userHabits = await db.select({name: habits.name}).from(habits).where(eq(habits.user_id, session.user.id));
    
    return(
        <AnalyticsClient initialCharts={initialCharts} userHabits={userHabits} session={session}/>
    )
}