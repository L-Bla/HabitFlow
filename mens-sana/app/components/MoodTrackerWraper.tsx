// MoodTrackerWrapper.tsx
import { Suspense } from "react";
import { getDefaultMoods, getScheduleForDate } from "@/src/actions/homeActions";
import { MoodTracker } from "./MoodTracker";
import { MoodTrackerSkeleton } from "./MoodTrackerSkeleton";

const query = `
  query GetAllMoods {
  moodCollection {
    items {
      name
      energy
      pleasantness
      emoji
    }
  }
}
`

interface Emotion {
  emoji: string;
  name: string;
}

interface MoodItem {
  name: string;
  energy: number;
  pleasantness: number;
  emoji: string;
}

async function fetchMoodsFromContentful(): Promise<MoodItem[]> {
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 }, // optional ISR caching
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch moods from Contentful");
  }

  const json = await res.json();
  return json.data.moodCollection.items;
}

async function MoodTrackerContent() {
  const data = await fetchMoodsFromContentful();

  // 1️⃣ Sort by:
  // - energy DESC (high → low)
  // - pleasantness ASC (low → high) inside same energy
  const sorted = [...data].sort((a, b) => {
    if (b.energy !== a.energy) {
      return b.energy - a.energy;
    }
    return a.pleasantness - b.pleasantness;
    
  });

  // 2️⃣ Group by energy (already ordered correctly)
  const grouped: Record<number, Emotion[]> = {};

  sorted.forEach((mood) => {
    if (!grouped[mood.energy]) {
      grouped[mood.energy] = [];
    }

    grouped[mood.energy].push({
      emoji: mood.emoji,
      name: mood.name,
    });
  });

  // 3️⃣ Convert to 2D array (order preserved)
  const grid = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a) // ⬅️ ASC (low energy first)
    .map((energy) => grouped[energy]);

  return <MoodTracker emotions={grid} />;
}

export function MoodTrackerWrapper() {
  return (
    <Suspense fallback={<MoodTrackerSkeleton />}>
      <MoodTrackerContent />
    </Suspense>
  );
}