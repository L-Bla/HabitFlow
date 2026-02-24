"use server"

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "..";
import { auth } from "../auth";
import { charts } from "../db";


export default async function deleteChart(chart_id: string){
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session){
        throw new Error("Not logged in.")
    }

    try{
        await db.delete(charts)
            .where(and(
                eq(charts.user_id, session.user.id),
                eq(charts.id, parseInt(chart_id))
            ))

        return { success: true}
    }catch(error){
        console.error("Failed to delete chart:", error);
    throw error;
    }

}