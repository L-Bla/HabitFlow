"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';

interface Activity {
  id: string;
  time: string;
  name: string;
  type: 'checkbox' | 'amount';
  completed: boolean;
  value?: number;
  goal?: number;
  unit?: string;
}

const defaultActivities: Activity[] = [
  { id: '1', time: '07:00', name: 'Morning Meditation', type: 'checkbox', completed: false },
  { id: '2', time: '08:00', name: 'Water Intake', type: 'amount', completed: false, value: 0, goal: 8, unit: 'glasses' },
  { id: '3', time: '09:00', name: 'Work Session', type: 'checkbox', completed: false },
  { id: '4', time: '12:00', name: 'Exercise', type: 'amount', completed: false, value: 0, goal: 30, unit: 'minutes' },
  { id: '5', time: '18:00', name: 'Reading', type: 'amount', completed: false, value: 0, goal: 20, unit: 'pages' },
  { id: '6', time: '22:00', name: 'Sleep Preparation', type: 'checkbox', completed: false },
];

export function DailySchedule() {
  const [activities, setActivities] = useState<Activity[]>(defaultActivities);

  const handleCheckboxChange = (id: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, completed: !activity.completed } : activity
      )
    );
  };

  const handleValueChange = (id: string, newValue: number) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, value: newValue } : activity
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-muted-foreground whitespace-nowrap">{activity.time}</span>
                <span className="flex-1 min-w-0 break-words">{activity.name}</span>
              </div>

              {activity.type === 'checkbox' ? (
                <div className="flex items-center justify-end sm:justify-start">
                  <Checkbox
                    checked={activity.completed}
                    onCheckedChange={() => handleCheckboxChange(activity.id)}
                    id={activity.id}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                  <div className="flex-1 min-w-[120px] sm:min-w-[200px]">
                    <Slider
                      value={[activity.value || 0]}
                      onValueChange={(value) => handleValueChange(activity.id, value[0])}
                      max={activity.goal}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="text-muted-foreground whitespace-nowrap">
                    {activity.value} / {activity.goal} {activity.unit}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
