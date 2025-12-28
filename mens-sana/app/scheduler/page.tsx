"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { AlertCircle, CheckSquare, SlidersHorizontal } from 'lucide-react';

interface ScheduledActivity {
  id: string;
  time: string;
  name: string;
  type: 'checkbox' | 'amount';
  goal?: number;
  unit?: string;
}

interface SchedulerProps {
  darkMode: boolean;
}

const mockHabits = [
  { name: 'Morning Meditation', color: '#8b5cf6' },
  { name: 'Exercise', color: '#f59e0b' },
  { name: 'Reading', color: '#10b981' },
  { name: 'Water Intake', color: '#3b82f6' },
  { name: 'Journaling', color: '#ec4899' },
];

export default function Scheduler({ darkMode }: SchedulerProps) {
  const [todaySchedule, setTodaySchedule] = useState<ScheduledActivity[]>([
    { id: '1', time: '07:00', name: 'Morning Meditation', type: 'checkbox' },
    { id: '2', time: '08:00', name: 'Water Intake', type: 'amount', goal: 8, unit: 'glasses' },
    { id: '3', time: '', name: 'Journaling', type: 'checkbox' },
    { id: '4', time: '12:00', name: 'Exercise', type: 'amount', goal: 30, unit: 'minutes' },
  ]);

  const [tomorrowSchedule, setTomorrowSchedule] = useState<ScheduledActivity[]>([
    { id: '5', time: '', name: 'Reading', type: 'amount', goal: 20, unit: 'pages' },
    { id: '6', time: '07:00', name: 'Morning Meditation', type: 'checkbox' },
    { id: '7', time: '09:00', name: 'Project Work', type: 'amount', goal: 60, unit: 'minutes' },
  ]);

  const [newActivity, setNewActivity] = useState({
    time: '',
    selectedHabit: '',
    customName: '',
    type: 'checkbox' as 'checkbox' | 'amount',
    goal: '',
    unit: '',
  });

  const [warning, setWarning] = useState<string | null>(null);

  const checkOverlap = (schedule: ScheduledActivity[], time: string): boolean => {
    if (!time) return false; // No overlap if no time set
    return schedule.some((activity) => activity.time === time);
  };

  const sortActivities = (activities: ScheduledActivity[]): ScheduledActivity[] => {
    return [...activities].sort((a, b) => {
      // Activities without time come first
      if (!a.time && b.time) return -1;
      if (a.time && !b.time) return 1;
      if (!a.time && !b.time) return 0;
      // Then sort by time
      return a.time.localeCompare(b.time);
    });
  };

  const getHabitColor = (activityName: string): string | null => {
    const habit = mockHabits.find((h) => h.name === activityName);
    return habit ? habit.color : null;
  };

  const handleAddActivity = (day: 'today' | 'tomorrow') => {
    const activityName = newActivity.selectedHabit || newActivity.customName;
    if (!activityName) {
      setWarning('Please select a habit or enter an activity name');
      return;
    }

    if (newActivity.type === 'amount' && (!newActivity.goal || !newActivity.unit)) {
      setWarning('Please enter goal and unit for amount type');
      return;
    }

    const targetSchedule = day === 'today' ? todaySchedule : tomorrowSchedule;
    if (newActivity.time && checkOverlap(targetSchedule, newActivity.time)) {
      setWarning(`Warning: There is already an activity at ${newActivity.time} for ${day}`);
      // Still allow adding, just show warning
    }

    const activity: ScheduledActivity = {
      id: Date.now().toString(),
      time: newActivity.time,
      name: activityName,
      type: newActivity.type,
      ...(newActivity.type === 'amount' && {
        goal: parseInt(newActivity.goal),
        unit: newActivity.unit,
      }),
    };

    if (day === 'today') {
      setTodaySchedule((prev) => sortActivities([...prev, activity]));
    } else {
      setTomorrowSchedule((prev) => sortActivities([...prev, activity]));
    }

    // Reset form
    setNewActivity({
      time: '',
      selectedHabit: '',
      customName: '',
      type: 'checkbox',
      goal: '',
      unit: '',
    });
    
    // Clear warning after 3 seconds
    if (warning) {
      setTimeout(() => setWarning(null), 3000);
    }
  };

  const renderSchedule = (schedule: ScheduledActivity[], title: string) => {
    const sortedSchedule = sortActivities(schedule);
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sortedSchedule.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No activities scheduled</p>
            ) : (
              sortedSchedule.map((activity) => {
                const habitColor = getHabitColor(activity.name);
                return (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    style={habitColor ? { 
                      borderLeft: `4px solid ${habitColor}`,
                      backgroundColor: darkMode 
                        ? `${habitColor}15` 
                        : `${habitColor}10`
                    } : {}}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-muted-foreground whitespace-nowrap" style={{ minWidth: '3.5rem' }}>
                        {activity.time || '—'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="truncate" style={habitColor ? { fontWeight: 500 } : {}}>
                          {activity.name}
                        </p>
                        {activity.type === 'amount' && (
                          <p className="text-sm text-muted-foreground">
                            Goal: {activity.goal} {activity.unit}
                          </p>
                        )}
                      </div>
                    </div>
                    {activity.type === 'checkbox' ? (
                      <CheckSquare className="h-5 w-5 text-blue-600" />
                    ) : (
                      <SlidersHorizontal className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Warning */}
      {warning && (
        <div className="flex items-center gap-2 p-3 bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 rounded-lg">
          <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
          <p className="text-orange-800 dark:text-orange-200">{warning}</p>
        </div>
      )}

      {/* Schedules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderSchedule(todaySchedule, "Today's Schedule")}
        {renderSchedule(tomorrowSchedule, "Tomorrow's Schedule")}
      </div>

      {/* Add New Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-2">
                <label htmlFor="activity-time">Time (optional)</label>
                <Input
                  id="activity-time"
                  type="time"
                  value={newActivity.time}
                  onChange={(e) => setNewActivity((prev) => ({ ...prev, time: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <div className="lg:col-span-4">
                <label htmlFor="select-habit">Choose From Habits (optional)</label>
                <Select
                  value={newActivity.selectedHabit}
                  onValueChange={(value) =>
                    setNewActivity((prev) => ({ ...prev, selectedHabit: value === 'none' ? '' : value, customName: '' }))
                  }
                >
                  <SelectTrigger id="select-habit" className="mt-1">
                    <SelectValue placeholder="Select habit..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {mockHabits.map((habit) => (
                      <SelectItem key={habit.name} value={habit.name}>
                        {habit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-6">
                <label htmlFor="custom-activity">Activity (if habit isn't selected)</label>
                <Input
                  id="custom-activity"
                  value={newActivity.customName}
                  onChange={(e) =>
                    setNewActivity((prev) => ({ ...prev, customName: e.target.value, selectedHabit: '' }))
                  }
                  placeholder="Enter activity name..."
                  disabled={!!newActivity.selectedHabit}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label>Type</label>
              <div className="mt-1 flex gap-2">
                <Button
                  type="button"
                  variant={newActivity.type === 'checkbox' ? 'default' : 'outline'}
                  onClick={() => setNewActivity((prev) => ({ ...prev, type: 'checkbox' }))}
                  className={newActivity.type === 'checkbox' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Checkbox
                </Button>
                <Button
                  type="button"
                  variant={newActivity.type === 'amount' ? 'default' : 'outline'}
                  onClick={() => setNewActivity((prev) => ({ ...prev, type: 'amount' }))}
                  className={newActivity.type === 'amount' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Amount
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="goal">Goal</label>
                <Input
                  id="goal"
                  type="number"
                  value={newActivity.goal}
                  onChange={(e) => setNewActivity((prev) => ({ ...prev, goal: e.target.value }))}
                  placeholder="e.g., 30"
                  className="mt-1"
                  disabled={newActivity.type === 'checkbox'}
                />
              </div>

              <div>
                <label htmlFor="unit">Unit</label>
                <Input
                  id="unit"
                  value={newActivity.unit}
                  onChange={(e) => setNewActivity((prev) => ({ ...prev, unit: e.target.value }))}
                  placeholder="e.g., minutes"
                  className="mt-1"
                  disabled={newActivity.type === 'checkbox'}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => handleAddActivity('today')}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Add Activity Today
              </Button>
              <Button
                onClick={() => handleAddActivity('tomorrow')}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Add Activity Tomorrow
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}