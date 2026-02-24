"use server"

import { db } from "@/src/index"
import { charts, moodTracker, habitTracker, habits } from "@/src/db/schema"
import { and, eq, gte, lte, asc } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "../auth";

const average = (array: number[]) => Number(array.reduce((a, b) => Number(a) + Number(b), 0)/array.length).toFixed(2);

type MetricKey = "energy" | "pleasantness" | "value";

type Row<K1 extends MetricKey, K2 extends MetricKey | undefined = undefined> =
  K2 extends MetricKey
    ? { x: string } & Record<K1 | K2, number>
    : { x: string } & Record<K1, number>;

function fillData<
  K1 extends MetricKey,
  K2 extends MetricKey | undefined = undefined
>(
  rows: Row<K1, K2>[],
  key1: K1,
  key2?: K2
) {
  if (!rows.length) return rows;

  const result: ({ x: string } & Partial<Record<MetricKey, number | null>>)[] =
    [];

  for (let i = 0; i < rows.length - 1; i++) {
    const current = new Date(rows[i].x);
    const next = new Date(rows[i + 1].x);

    result.push(rows[i]);

    const temp = new Date(current);
    temp.setDate(temp.getDate() + 1);

    while (temp < next) {
      const newRow: any = {
        x: temp.toISOString().slice(0, 10),
        [key1]: null,
      };

      if (key2) {
        newRow[key2] = null;
      }

      result.push(newRow);
      temp.setDate(temp.getDate() + 1);
    }
  }

  result.push(rows[rows.length - 1]);

  return result;
}

function mergeByDate<
  K1 extends MetricKey,
  K2 extends MetricKey
>(
  rows1: Row<K1>[],
  rows2: Row<K2>[]
) {
  const map = new Map<
    string,
    { x: string } & Partial<Record<K1 | K2, number>>
  >();

  for (const row of rows1) {
    map.set(row.x, { ...row } as any);
  }

  for (const row of rows2) {
    const existing = map.get(row.x);

    if (existing) {
      Object.assign(existing, row);
    } else {
      map.set(row.x, { ...row } as any);
    }
  }

  return Array.from(map.values()) as ({ x: string } & Partial<Record<K1 | K2, number>>)[];
}


async function fetchRows(user_id: string, param: string){
  let rows;
  let tempRows;

  if (param==="energy"){
    tempRows = await db
      .select({ x: moodTracker.date, energy: moodTracker.energy })
      .from(moodTracker)
      .orderBy(asc(moodTracker.date))
      .where(eq(moodTracker.user_id, user_id))

    rows = tempRows.map(e => {
      return {x: e.x, energy: Number(average(e.energy || []))}
    });
    rows = fillData(rows, "energy")

  }else if (param==="pleasantness"){
    tempRows = await db
      .select({ x: moodTracker.date, pleasantness: moodTracker.pleasantness })
      .from(moodTracker)
      .orderBy(asc(moodTracker.date))
      .where(eq(moodTracker.user_id, user_id))

    rows = tempRows.map(e => {
      return {x: e.x, pleasantness: Number(average(e.pleasantness || []))}
    });
    rows = fillData(rows, "pleasantness")

  }else{
    rows = await db
      .select({
        x: habitTracker.date,
        value: habitTracker.value,
      })
      .from(habitTracker)
      .innerJoin(
        habits,
        eq(habitTracker.habit_id, habits.id)
      )
      .where(
        and(
          eq(habitTracker.user_id, user_id),
          eq(habits.name, param)
        )
      )
      .orderBy(asc(habitTracker.date));

     rows = fillData(rows, "value")
  }

  return rows;
}

async function genTitle(user_id: string, param1: string, param2: string | null){
  let title = "";
  let part;
  if (param1==="energy" || param1==="pleasantness"){
    title += param1
  }else{
    part = await db
      .select({name: habits.name})
      .from(habits)
      .where(and(
        eq(habits.user_id, user_id),
        eq(habits.name, param1)
      ))
      title += part[0].name
  }
  if (param2 != "none" && param2 != null){
    title += " & "
    if (param2==="energy" || param2==="pleasantness"){
      title += param2
    }else{
      part = await db
        .select({name: habits.name})
        .from(habits)
        .where(and(
          eq(habits.user_id, user_id),
          eq(habits.name, param2)
        ))
      title += part[0].name
    }
  }

  return title;
}

function genTitleTemp(){
  return "test chart"
}

export default async function createChart(userId: string, param1: string, param2: string){
  
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session){
    throw new Error("Not logged in")
  }
  
  let rows = await fetchRows(session.user.id, param1);
  let data;
  if (param2){
    let rows2 = await fetchRows(session.user.id, param2)
    data = mergeByDate(rows as Row<MetricKey>[], rows2 as Row<MetricKey>[])
  }else{
    data = rows;
  }
  const title = await genTitle(userId, param1, param2)

  let [newChart] = await db.insert(charts).values({
    user_id: userId,
    param1: param1,
    param2: param2,
    title: title,
    data: data
  }).returning()

  return newChart
}