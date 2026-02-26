"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { CheckSquare, SlidersHorizontal, Trash2 } from 'lucide-react';
import addHabit from '@/src/actions/addHabit';
import editHabit from '@/src/actions/editHabit';
import deleteHabit from '@/src/actions/deleteHabit';

interface Habit {
  id: number;
  name: string;
  type: 'checkbox' | 'amount' | null;
  description: string | null;
  goal: number | null;
  unit: string | null;
}

export default function Habits({userHabits, userId}: {userHabits: Habit[]; userId: string}) {
  const [habits, setHabits] = useState<Habit[]>(userHabits ?? []);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [pendingAction, setPendingAction] = useState<"adding" | "updating" | "deleting" | null>(null);
  const [newHabit, setNewHabit] = useState({
    id: 0,
    name: '',
    type: 'checkbox' as 'checkbox' | 'amount',
    description: '',
    goal: "",
    unit: ""
  });
  const isAmount = newHabit.type === "amount";

  async function handleAddHabit(){
    if (!newHabit.name || pendingAction) return;

    setPendingAction("adding");

    try {
      let habit = await addHabit(
          userId, newHabit.name,
          newHabit.description, newHabit.type,
          newHabit.type === "amount" ? Number(newHabit.goal) : null,
          newHabit.type === "amount" ? newHabit.unit : null ) 

      setHabits((prev) => [...prev, habit as Habit]);

      setNewHabit({
          id: 0,
        name: '',
        type: 'checkbox',
        description: '',
        goal: "",
        unit: ""
      });
    } finally {
      setPendingAction(null);
    }
  };

  const handleSelectHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setNewHabit({
      id: habit.id,
      name: habit.name,
      type: habit.type!,
      goal: habit.goal !== undefined ? String(habit.goal) : "",
      unit: habit.unit ?? "",
      description: habit.description!,
    });
  };

  async function handleUpdateHabit(){
    if (!editingHabit || !newHabit.name || pendingAction) return;

    setPendingAction("updating");

    try {
      let habit = await editHabit(
          userId, newHabit.id, newHabit.name,
          newHabit.description, newHabit.type,
          newHabit.type === "amount" ? Number(newHabit.goal).toString() : null,
          newHabit.type === "amount" ? newHabit.unit : null)  

      setHabits((prev) =>
        prev.map((h) =>
          h.id === editingHabit.id
            ? {
                ...h,
                name: newHabit.name,
                type: newHabit.type,
                description: newHabit.description,
                goal: newHabit.type === "amount" ? Number(newHabit.goal) : null,
                unit: newHabit.type === "amount" ? newHabit.unit : null,
              }
            : h
        )
      );

      setEditingHabit(null);
      setNewHabit({
          id: 0,
        name: '',
        type: 'checkbox',
        description: '',
        goal: "",
        unit: ""
      });
    } finally {
      setPendingAction(null);
    }
  };

  async function handleDeleteHabit(){
    if (!editingHabit || pendingAction) return;

    setPendingAction("deleting");

    try {
      let deletedHabit = await deleteHabit(userId, newHabit.id)

      setHabits((prev) => prev.filter((h) => h.id !== editingHabit.id));
      setEditingHabit(null);
      setNewHabit({
          id: 0,
        name: '',
        type: 'checkbox',
        description: '',
        goal: "",
        unit: ""
      });
    } finally {
      setPendingAction(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingHabit(null);
    setNewHabit({
        id: 0,
      name: '',
      type: 'checkbox',
      description: '',
      goal: "",
      unit: ""
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* My Habits List */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>My Habits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {habits.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No habits yet. Add your first habit!</p>
              ) : (
                habits.map((habit) => (
                  <div
                    key={habit.id}
                    onClick={() => handleSelectHabit(habit)}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer ${
                      editingHabit?.id === habit.id ? 'bg-muted/50 border-blue-600' : ''
                    }`}
                    style={{ borderLeftWidth: '4px'}}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3>{habit.name}</h3>
                        {habit.type === 'checkbox' ? (
                          <CheckSquare className="h-4 w-4 text-blue-600" />
                        ) : (
                          <SlidersHorizontal className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <p className="text-muted-foreground break-words">{habit.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Habit Form */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>{editingHabit ? 'Edit Habit' : 'Add New Habit'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="habit-name">Name</label>
                <Input
                  id="habit-name"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Morning Jog"
                  className="mt-1"
                />
              </div>

              <div>
                <label>Type</label>
                <div className="mt-1 flex gap-2">
                  <Button
                    type="button"
                    variant={newHabit.type === 'checkbox' ? 'default' : 'outline'}
                    onClick={() => setNewHabit((prev) => ({ ...prev, type: 'checkbox', goal: "", unit:"" }))}
                    className={newHabit.type === 'checkbox' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  >
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Checkbox
                  </Button>
                  <Button
                    type="button"
                    variant={newHabit.type === 'amount' ? 'default' : 'outline'}
                    onClick={() => setNewHabit((prev) => ({ ...prev, type: 'amount' }))}
                    className={newHabit.type === 'amount' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Amount
                  </Button>
                </div>
              </div>

              {/* Goal */}
              <div>
                <label htmlFor="habit-goal">Goal</label>
                <Input
                  id="habit-goal"
                  type="number"
                  value={newHabit.goal}
                  onChange={(e) =>
                    setNewHabit((prev) => ({ ...prev, goal: e.target.value }))
                  }
                  disabled={!isAmount}
                  placeholder="e.g., 5"
                  className={`mt-1 ${!isAmount ? "bg-gray-100 cursor-not-allowed opacity-60" : ""}`}
                />
              </div>

              {/* Unit */}
              <div>
                <label htmlFor="habit-unit">Unit</label>
                <Input
                  id="habit-unit"
                  value={newHabit.unit}
                  onChange={(e) =>
                    setNewHabit((prev) => ({ ...prev, unit: e.target.value }))
                  }
                  disabled={!isAmount}
                  placeholder="e.g., km, pages, glasses"
                  className={`mt-1 ${!isAmount ? "bg-gray-100 cursor-not-allowed opacity-60" : ""}`}
                />
              </div>

              <div>
                <label htmlFor="habit-description">Description</label>
                <Textarea
                  id="habit-description"
                  value={newHabit.description}
                  onChange={(e) => setNewHabit((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Why is this habit important to you?"
                  className="mt-1"
                  rows={4}
                />
              </div>

              {editingHabit ? (
                <div className="space-y-2">
                  <Button onClick={handleUpdateHabit} disabled={pendingAction !== null || !newHabit.name} className="w-full bg-blue-600 hover:bg-blue-700">
                    {pendingAction === "updating" ? "Updating..." : "Update Habit"}
                  </Button>
                  <div className="flex gap-2">
                    <Button onClick={handleDeleteHabit} disabled={pendingAction !== null} variant="destructive" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-2" />
                      {pendingAction === "deleting" ? "Deleting..." : "Delete"}
                    </Button>
                    <Button onClick={handleCancelEdit} disabled={pendingAction !== null} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={handleAddHabit} disabled={pendingAction !== null || !newHabit.name} className="w-full bg-blue-600 hover:bg-blue-700">
                  {pendingAction === "adding" ? "Adding..." : "Add Habit"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
