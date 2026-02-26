"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { saveScheduleProgress } from '@/src/actions/homeActions';
import { Button } from './ui/button';

interface ScheduledActivity {
  id: number;
  habit_id: number | null;
  time: string | null;
  name: string;
  type: "checkbox" | "amount";
  goal: number | null;
  unit: string | null;
  progress?: number | null;
}

export function DailySchedule({userId, userName, initialActivities}: {userId: string; userName: string; initialActivities: ScheduledActivity[]}) {
  const [activities, setActivities] = useState<ScheduledActivity[]>(initialActivities ?? []);
  const [savedProgress, setSavedProgress] = useState<boolean>(false);
  const [isSavingProgress, setIsSavingProgress] = useState(false);

  const handleCheckboxChange = (id: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id.toString() === id ? { ...activity, progress: activity.progress === 1 ? 0 :1} : activity
      )
    );
  };

  const handleValueChange = (id: string, newValue: number) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id.toString() === id ? { ...activity, progress: newValue } : activity
      )
    );
  };

  const handleSave = async () => {
    if (isSavingProgress) return;

    const today = new Date().toISOString().split("T")[0];

    const updates = activities.map((activity) => ({
      id: activity.id,
      progress:
        activity.type === "checkbox"
          ? activity.progress === 1
            ? 1
            : 0
          : activity.progress || 0,
    }));

    try {
      setIsSavingProgress(true);
      await saveScheduleProgress(userId, updates); // replace 1 with real userId

      setSavedProgress(true);
      setTimeout(() => {
        setSavedProgress(false)
      }, 3000)
    } finally {
      setIsSavingProgress(false);
    }

  };

  const sortActivities = (activities: ScheduledActivity[]): ScheduledActivity[] => {
    return [...activities].sort((a, b) => {
      // Activities without time come first
      if (!a.time && b.time) return -1;
      if (a.time && !b.time) return 1;
      if (!a.time && !b.time) return 0;
      // Then sort by time
      return a.time!.localeCompare(b.time!);
    });
  };
  const sortedActivities = sortActivities(activities);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{userName}'s Daily Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedActivities.length > 0 ? sortedActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              style={activity.habit_id ? { borderLeftWidth: '4px'} : {}}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-muted-foreground whitespace-nowrap">{activity.time}</span>
                <span className="flex-1 min-w-0 break-words">{activity.name}</span>
              </div>

              {activity.type === 'checkbox' ? (
                <div className="flex items-center justify-end sm:justify-start">
                  <Checkbox
                    checked={activity.progress === 1}
                    onCheckedChange={() => handleCheckboxChange(activity.id.toString())}
                    id={activity.id.toString()}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                  <div className="flex-1 min-w-[120px] sm:min-w-[200px]">
                    <Slider
                      value={[activity.progress || 0]}
                      onValueChange={(value) => handleValueChange(activity.id.toString(), value[0])}
                      max={activity.goal!}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="text-muted-foreground whitespace-nowrap">
                    {activity.progress} / {activity.goal} {activity.unit}
                  </div>
                </div>
              )}
            </div>
          )) : <div className="text-muted-foreground">No activities scheduled for today.</div>}
        </div>
        <div className="flex flex-col sm:flex-row justify-end items-center gap-2 m-4 mr-0">
          <Button 
            onClick={handleSave}
            disabled={isSavingProgress || activities.length === 0}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
            {isSavingProgress ? "Saving..." : !savedProgress ? "Save Progress" : "Progress saved!"}
          </Button>
          <div
            hidden={!savedProgress}
            className="text-3xl">
            ✓
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
