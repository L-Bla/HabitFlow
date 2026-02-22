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
    const data = await getDefaultMoods();
    const grouped: Record<number, Emotion[]> = {};

    data.forEach((mood) => {
        if (!grouped[mood.energy]) {
            grouped[mood.energy] = [];
        }
        grouped[mood.energy].push({
            emoji: mood.emoji,
            name: mood.name,
        });
        });

    // Convert to sorted 2D array
    const grid = Object.keys(grouped)
        .sort((a, b) => Number(b) - Number(a))
        .map((key) =>
        grouped[Number(key)].sort((a, b) => 0) // optional pleasantness sort if needed
        );
    
  return <MoodTracker emotions={grid} />;
}

export function MoodTrackerWrapper() {
  return (
    <Suspense fallback={<MoodTrackerSkeleton />}>
      <MoodTrackerContent />
    </Suspense>
  );
}