// MoodTrackerSkeleton.tsx
import { Card, CardContent, CardHeader } from "./ui/card";

export function MoodTrackerSkeleton() {
  return (
    <Card className="min-h-[420px] animate-pulse">
      <CardHeader>
        <div className="h-6 w-32 bg-muted rounded" />
        <div className="h-8 w-48 bg-muted rounded mt-2" />
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-muted"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}