import { db } from "@/src/index"
import { charts, habits } from "@/src/db/schema"
import AnalyticsClient from "./AnalyticsClient"
import { eq } from "drizzle-orm"
import createChart from "@/src/actions/createChart"

export default async function Analytics(){
    const initialCharts = await db.select().from(charts)
    const userHabits = await db.select({name: habits.name}).from(habits)//.where(eq(habits.user_id, 1))
    return(
        <AnalyticsClient initialCharts={initialCharts} userHabits={userHabits}/>
    )
}