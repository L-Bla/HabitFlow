import { db } from "@/src";
import { habits, habitTracker } from "@/src/db/schema";
import { eq } from "drizzle-orm";

type ChartType = "habit" | "energy" | "pleasantness";

export async function generateChartTitle(input: {
  type1: ChartType;
  type2?: ChartType | null;
  tracks1: number[];
  tracks2?: number[] | null;
}) {
  async function resolve(type: ChartType, tracks?: number[] | null) {
    if (type === "habit" && tracks?.length) {
      const [row] = await db
        .select({ name: habits.name })
        .from(habitTracker)
        .innerJoin(habits, eq(habitTracker.habit_id, habits.id))
        .where(eq(habitTracker.id, tracks[0]))
        .limit(1);

      return row?.name ?? "Habit";
    }

    return type[0].toUpperCase() + type.slice(1);
  }

  const parts = [await resolve(input.type1, input.tracks1)];

  if (input.type2) {
    parts.push(await resolve(input.type2, input.tracks2));
  }

  return parts.join(" & ");
}
