"use server"

import { db } from "@/src/index"
import { charts, moodTracker, habitTracker, habits } from "@/src/db/schema"
import { and, eq, gte, lte } from "drizzle-orm";

const average = array => +parseFloat(Number(array.reduce((a, b) => Number(a) + Number(b), 0)/array.length)).toFixed(2);

/*function getDates(timespan: number){
  let endDate = new Date()
  let startDate = new Date()
  startDate.setUTCDate(endDate.getUTCDate() - timespan)
  return {"startDate": startDate.toISOString().slice(0, 10), 
    "endDate": endDate.toISOString().slice(0, 10)}
}*/

function fillEnergy(rows: { x: string; energy: number }[]) {
  if (!rows.length) return rows;

  const result: { x: string; energy: number | null }[] = [];

  for (let i = 0; i < rows.length - 1; i++) {
    const current = new Date(rows[i].x);
    const next = new Date(rows[i + 1].x);

    result.push(rows[i]);

    // Move to next day after current
    const temp = new Date(current);
    temp.setDate(temp.getDate() + 1);

    // Fill all missing days
    while (temp < next) {
      result.push({
        x: temp.toISOString().slice(0, 10),
        energy: null, // or null if you prefer
      });

      temp.setDate(temp.getDate() + 1);
    }
  }

  // Push last item
  result.push(rows[rows.length - 1]);

  return result;
}

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
    map.set(row.x, { ...row });
  }

  for (const row of rows2) {
    const existing = map.get(row.x);

    if (existing) {
      Object.assign(existing, row);
    } else {
      map.set(row.x, { ...row });
    }
  }

  return Array.from(map.values()) as {
    x: string;
  } & Record<K1 | K2, number>[];
}


async function fetchRows(param: string){
  let rows;
  let tempRows;
  
  if (param==="energy"){
    tempRows = await db
      .select({ x: moodTracker.date, energy: moodTracker.energy })
      .from(moodTracker)
      /*.where(and(
        gte(moodTracker.date, startDate), 
        lte(moodTracker.date, endDate)
      ))*/
    rows = tempRows.map(e => {
      return {x: e.x, energy: average(e.energy)}
    });
    rows = fillData(rows, "energy")

  }else if (param==="pleasantness"){
    tempRows = await db
      .select({ x: moodTracker.date, pleasantness: moodTracker.pleasantness })
      .from(moodTracker)
      /*.where(and(
        gte(moodTracker.date, startDate), 
        lte(moodTracker.date, endDate)
      ))*/
    rows = tempRows.map(e => {
      return {x: e.x, pleasantness: average(e.pleasantness)}
    });
    rows = fillData(rows, "pleasantness")

  }else{
    rows = await db
      .select({ x: habitTracker.date, [param]: habitTracker.value })
      .from(habitTracker)
      /*.where(and(
        gte(habitTracker.date, startDate), 
        lte(habitTracker.date, endDate)
      ))*/
     rows = fillData(rows, "value")
  }

  return rows;
}

async function genTitle(param1: string, param2: string | null, id1: number, id2: number | null){
  let title = "";
  if (param1==="habit"){
    title += (await db.select({ name: habits.name }).from(habits).where(eq(habits.id, id1)))[0].name
  }else{
    title += param1
  }
  title += " & "
  if (param2==="habit"){
    title += (await db.select({ name: habits.name }).from(habits).where(eq(habits.id, id2)))[0].name
  }else if (param2){
    title += param2
  }

  return title;
}

function genTitleTemp(){
  return "test chart"
}

export default async function createChart(userId: number, param1: string, param2: string){
  let rows = await fetchRows(param1);
  let data;
  if (param2){
    let rows2 = await fetchRows(param2)
    /*const map = new Map<number, any>();
    for (const r of rows) {
      map.set(+r.x, { ...r });
    }
    for (const r of rows2) {
      const key = +r.x;
      map.set(key, {
        ...(map.get(key) ?? { x: r.x }),
        ...r,
      });
    }
    data = Array.from(map.values()).sort((a, b) => +a.x - +b.x);*/
    data = mergeByDate(rows, rows2)
  }else{
    data = rows;
  }
  const title = genTitleTemp()

  let newChart = db.insert(charts).values({
    user_id: userId,
    param1: param1,
    param2: param2,
    title: title,
    data: data
  }).returning()

  return newChart
}