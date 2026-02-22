"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { AlertCircle, CheckSquare, SlidersHorizontal } from 'lucide-react';
import addActivity from '@/src/actions/addActivity';
import { updateActivity } from '@/src/actions/updateActivity';
import { deleteActivity } from '@/src/actions/deleteActivity';

interface ScheduledActivity {
  id: number;
  habitId: number | null;
  time: string | null;
  name: string;
  type: "checkbox" | "amount";
  goal: number | null;
  unit: string | null;
  progress?: number | null;
}

interface Habit {
  id: number;
  name: string;
  type: "checkbox" | "amount";
  goal: number | null;
  unit: string | null;
}

interface SchedulerClientProps {
  today: ScheduledActivity[];
  tomorrow: ScheduledActivity[];
  habits: Habit[];
}

export default function SchedulerClient({
  today,
  tomorrow,
  habits
}: SchedulerClientProps) {

  const [todaySchedule, setTodaySchedule] =
    useState<ScheduledActivity[]>(today ?? []);

  const [tomorrowSchedule, setTomorrowSchedule] =
    useState<ScheduledActivity[]>(tomorrow ?? []);
    
  const [newActivity, setNewActivity] = useState({
    time: '',
    habitId: '' as number | '',
    customName: '',
    type: 'checkbox' as 'checkbox' | 'amount',
    progress: "",
    goal: '',
    unit: '',
  });

  const [warning, setWarning] = useState<string | null>(null);

  const [editingActivity, setEditingActivity] =
    useState<ScheduledActivity | null>(null);

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

  const getHabitById = (id: number | null) =>
    habits.find((h) => h.id === id);

  function resetForm() {
    setEditingActivity(null);
    setNewActivity({
        time: "",
        habitId: null,
        customName: "",
        type: "checkbox",
        progress: "",
        goal: "",
        unit: "",
    });
  }


  const handleAddActivity1 = (day: 'today' | 'tomorrow') => {
    const isHabit = !!newActivity.habitId;
    const activityName = isHabit
      ? getHabitById(Number(newActivity.habitId))?.name
      : newActivity.customName;

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
    }

    const activity: ScheduledActivity = {
      id: Date.now(), 
      habitId: isHabit ? Number(newActivity.habitId) : null,
      name: activityName,
      time: newActivity.time || null,
      type: newActivity.type,
      goal:
        newActivity.type === 'amount'
          ? parseInt(newActivity.goal)
          : null,
      unit:
        newActivity.type === 'amount'
          ? newActivity.unit
          : null,
      progress: newActivity.type === 'amount' ? 0 : null,
    };

    if (day === 'today') {
      setTodaySchedule((prev) => sortActivities([...prev, activity]));
    } else {
      setTomorrowSchedule((prev) => sortActivities([...prev, activity]));
    }

    resetForm();
  };

  async function handleUpdateActivity1() {
    if (!editingActivity) return;

    const isHabit = !!newActivity.habitId;

    const updated: ScheduledActivity = {
      ...editingActivity,
      habitId: isHabit ? Number(newActivity.habitId) : null,
      name: isHabit ? null : newActivity.customName,
      time: newActivity.time || null,
      type: newActivity.type,
      goal:
        newActivity.type === "amount"
          ? parseInt(newActivity.goal)
          : null,
      unit:
        newActivity.type === "amount"
          ? newActivity.unit
          : null,
    };

    await updateActivityInDB(updated);

    setTodaySchedule((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );

    setTomorrowSchedule((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );

    resetForm();
  }

  async function handleDeleteActivity1() {
      if (!editingActivity) return;

      await deleteActivityFromDB(editingActivity.id);

      setTodaySchedule((prev) =>
          prev.filter((a) => a.id !== editingActivity.id)
      );

      setTomorrowSchedule((prev) =>
          prev.filter((a) => a.id !== editingActivity.id)
      );

      resetForm();
  }



  const handleAddActivity = async (day: 'today' | 'tomorrow') => {
    const isHabit = !!newActivity.habitId;

    const activityName = isHabit
      ? getHabitById(Number(newActivity.habitId))?.name
      : newActivity.customName;

    if (!activityName) {
      setWarning('Please select a habit or enter an activity name');
      return;
    }

    if (newActivity.type === 'amount' && (!newActivity.goal || !newActivity.unit)) {
      setWarning('Please enter goal and unit for amount type');
      return;
    }

    try {
      const baseDate = new Date();
      const date =
        day === 'today'
          ? baseDate
          : new Date(baseDate.setDate(baseDate.getDate() + 1));

      // 🔥 INSERT INTO DB FIRST
      const created = await addActivity(
        1, // userId (replace later with auth)
        isHabit ? Number(newActivity.habitId) : null,
        date.toISOString().split('T')[0],
        newActivity.time || null,
        activityName,
        newActivity.type,
        newActivity.type === 'amount' ? parseInt(newActivity.goal) : null,
        newActivity.type === 'amount' ? newActivity.unit : null,
        newActivity.type === 'amount' ? 0 : null
      );

      // 🔥 USE DB RETURNED ROW (REAL ID)
      if (day === 'today') {
        setTodaySchedule(prev => sortActivities([...prev, created]));
      } else {
        setTomorrowSchedule(prev => sortActivities([...prev, created]));
      }

      resetForm();
    } catch (error) {
      console.error("Failed to add activity:", error);
    }
  };

  async function handleUpdateActivity() {
    if (!editingActivity) return;

    const isHabit = !!newActivity.habitId;

    try {
      const updatedFromDB = await updateActivityInDB({
        id: editingActivity.id,
        habitId: isHabit ? Number(newActivity.habitId) : null,
        time: newActivity.time || null,
        name: newActivity.customName,
        type: newActivity.type,
        goal:
          newActivity.type === "amount"
            ? parseInt(newActivity.goal)
            : null,
        unit:
          newActivity.type === "amount"
            ? newActivity.unit
            : null,
      });

      // 🔥 Replace with DB returned object
      setTodaySchedule(prev =>
        prev.map(a => (a.id === updatedFromDB.id ? updatedFromDB : a))
      );

      setTomorrowSchedule(prev =>
        prev.map(a => (a.id === updatedFromDB.id ? updatedFromDB : a))
      );

      resetForm();
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  }

  async function handleDeleteActivity() {
    if (!editingActivity) return;

    try {
      await deleteActivityFromDB(editingActivity.id);

      setTodaySchedule(prev =>
        prev.filter(a => a.id !== editingActivity.id)
      );

      setTomorrowSchedule(prev =>
        prev.filter(a => a.id !== editingActivity.id)
      );

      resetForm();
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  }




  const [hoveredTarget, setHoveredTarget] = 
      useState<"today" | "tomorrow" | null>(null);

  const renderSchedule = (schedule: ScheduledActivity[], title: string, highlighted: boolean) => {
    const sortedSchedule = sortActivities(schedule);
    const getActivityDisplayName = (activity: ScheduledActivity) => {
      if (activity.habitId !== undefined && activity.habitId !== null) {
        const habit = habits.find((h) => h.id === activity.habitId);
        return habit?.name ?? "Deleted habit";
      }
      return activity.name ?? "Unnamed activity";
    };
    
    const startEditing = (activity: ScheduledActivity, hasHabit: boolean) => {
      setEditingActivity(activity);

      setNewActivity({
        time: activity.time ?? "",
        habitId: hasHabit ? Number(activity.habitId) : null,
        customName: hasHabit ? "" : activity.name ?? "",
        type: activity.type,
        progress: activity.progress?.toString() ?? "",
        goal: activity.goal?.toString() ?? "",
        unit: activity.unit ?? "",
      });
    };

    return (
      <Card className={`transition border-1 ${
        highlighted
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-1"
      }`}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-2">
          {sortedSchedule.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No activities scheduled
            </p>
          ) : (
            sortedSchedule.map((activity) => {
              const displayName = getActivityDisplayName(activity);
              const isEditing = editingActivity?.id === activity.id 
                && editingActivity?.time === activity.time;

              return (
                <div
                  key={activity.id}
                  onClick={() => {
                    const hasHabit = 
                      activity.habitId !== null 
                      && activity.habitId !== undefined;
                    startEditing(activity, hasHabit);
                    
                    
                  }}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                    isEditing
                      ? "bg-blue-100 dark:bg-blue-900/40 border border-blue-500"
                      : "bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span
                      className="text-muted-foreground whitespace-nowrap"
                      style={{ minWidth: "3.5rem" }}
                    >
                      {activity.time || "—"}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="truncate">{displayName}</p>

                      {activity.type === "amount" && (
                        <p className="text-sm text-muted-foreground">
                          {activity.progress ?? 0} / {activity.goal}{" "}
                          {activity.unit}
                        </p>
                      )}
                    </div>
                  </div>

                  {activity.type === "checkbox" ? (
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
        {renderSchedule(todaySchedule, "Today's Schedule", hoveredTarget === "today")}
        {renderSchedule(tomorrowSchedule, "Tomorrow's Schedule", hoveredTarget === "tomorrow")}
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
                  value={newActivity.habitId?.toString() ?? "none"}
                  onValueChange={(value) => {
                    if (value === "none") {
                      setNewActivity((prev) => ({
                        ...prev, habitId: null,}));
                      return;
                    }
                    const selected = habits.find(
                      (h) => h.id.toString() === value
                    );
                    if (!selected) return;
                    setNewActivity((prev) => ({
                      ...prev,
                      habitId: selected.id,
                      customName: "",
                      type: selected.type,
                      goal: selected.goal?.toString() || "",
                      unit: selected.unit || "",
                    }));
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select habit..." />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>

                    {habits.map((habit) => (
                      <SelectItem
                        key={habit.id}
                        value={habit.id.toString()}
                      >
                        {habit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-6">
                <label htmlFor="custom-activity">Activity (if habit isn't selected)</label>
                <Input
                  value={newActivity.customName}
                  onChange={(e) =>
                    setNewActivity((prev) => ({
                      ...prev,
                      customName: e.target.value,
                      habitId: null,
                    }))
                  }
                  disabled={newActivity.habitId !== null 
                    && newActivity.habitId !== ""
                    && newActivity.habitId !== undefined}
                  placeholder={newActivity.habitId !== null 
                    && newActivity.habitId !== "" 
                    && newActivity.habitId !== undefined? 
                    "Habit is selected"
                    : "Enter antivity name"
                  }
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

            {editingActivity ? (
  <div className="flex flex-col sm:flex-row gap-2">
    <Button
      onClick={handleUpdateActivity}
      className="flex-1 bg-blue-600 hover:bg-blue-700"
    >
      Update Activity
    </Button>

    <Button
      onClick={handleDeleteActivity}
      variant="destructive"
      className="flex-1"
    >
      Delete
    </Button>

    <Button
      onClick={resetForm}
      variant="outline"
      className="flex-1"
    >
      Cancel
    </Button>
  </div>
) : (
  <div className="flex flex-col sm:flex-row gap-2">
    <Button
      onClick={() => handleAddActivity("today")}
      onMouseEnter={() => setHoveredTarget("today")}
      onMouseLeave={() => setHoveredTarget(null)}
      className="flex-1 bg-blue-600 hover:bg-blue-700"
    >
      Add Activity Today
    </Button>

    <Button
      onClick={() => handleAddActivity("tomorrow")}
      onMouseEnter={() => setHoveredTarget("tomorrow")}
      onMouseLeave={() => setHoveredTarget(null)}
      className="flex-1 bg-blue-600 hover:bg-blue-700"
    >
      Add Activity Tomorrow
    </Button>
  </div>
)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const addActivityToDB = async (
  day: 'today' | 'tomorrow',
  activity: ScheduledActivity
) => {
  try {
    const baseDate = new Date();
    const date =
      day === 'today'
        ? baseDate
        : new Date(baseDate.setDate(baseDate.getDate() + 1));

    const created = await addActivity(
      1,
      activity.habitId ?? null,
      date.toISOString().split('T')[0],
      activity.time ?? null,
      activity.name,
      activity.type,
      activity.goal ?? null,
      activity.unit ?? null,
      activity.progress ?? null
    );

    return created;

  } catch (error) {
    console.error('Failed to add activity to DB:', error);
  }
};

const updateActivityInDB = async (activity: ScheduledActivity) => {
  try {
    const updated = await updateActivity(
      activity.id,
      1, // userId (replace later with auth user)
      activity.habitId ?? null,
      activity.time ?? null,
      activity.name ?? null,
      activity.type,
      activity.goal ?? null,
      activity.unit ?? null
    );
    return updated;
  } catch (error) {
    console.error("Failed to update activity in DB:", error);
  }
};

const deleteActivityFromDB = async (id: number) => {
  try {
    await deleteActivity(1, id);
  } catch (error) {
    console.error("Failed to delete activity from DB:", error);
  }
};
