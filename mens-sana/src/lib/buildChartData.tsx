import { db } from "@/src";
import { habitTracker, moodTracker } from "@/src/db/schema";
import { inArray } from "drizzle-orm";

type ChartType = "habit" | "energy" | "pleasantness";

export async function buildChartData(input: {
  type1: ChartType;
  type2?: ChartType | null;
  tracks1: number[];
  tracks2?: number[] | null;
}) {
  const points = new Map<string, Record<string, any>>();

  async function load(type: ChartType, ids: number[], key: string) {
  if (type === "habit") {
    if (!ids.length) return; // habits still need IDs
    const rows = await db
      .select({
        date: habitTracker.date,
        value: habitTracker.value,
      })
      .from(habitTracker)
      .where(inArray(habitTracker.id, ids));

    for (const r of rows) {
      const x = r.date.toString();
      points.set(x, { ...(points.get(x) ?? { x }), [key]: r.value });
    }
    return;
  }

  // energy / pleasantness: ignore ids, always load all
  const rows = await db
    .select({
      date: moodTracker.date,
      energy: moodTracker.energy,
      pleasantness: moodTracker.pleasantness,
    })
    .from(moodTracker);

  for (const r of rows) {
    const x = r.date.toString();
    points.set(x, {
      ...(points.get(x) ?? { x }),
      [key]: type === "energy" ? r.energy?.[0] ?? null : r.pleasantness?.[0] ?? null,
    });
  }
}



  await load(input.type1, input.tracks1, "param1");

  if (input.type2 && input.tracks2) {
    await load(input.type2, input.tracks2, "param2");
  }

  return Array.from(points.values()).sort((a, b) =>
    a.x.localeCompare(b.x)
  );
}
