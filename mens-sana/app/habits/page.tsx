"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { CheckSquare, SlidersHorizontal, Trash2 } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  color: string;
  type: 'checkbox' | 'amount';
  description: string;
}

interface HabitsProps {
  darkMode: boolean;
}

const defaultHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    color: '#8b5cf6',
    type: 'checkbox',
    description: 'Daily mindfulness practice',
  },
  {
    id: '2',
    name: 'Exercise',
    color: '#f59e0b',
    type: 'amount',
    description: 'Physical activity to stay healthy',
  },
  {
    id: '3',
    name: 'Reading',
    color: '#10b981',
    type: 'amount',
    description: 'Reading books for personal growth',
  },
  {
    id: '4',
    name: 'Water Intake',
    color: '#3b82f6',
    type: 'amount',
    description: 'Stay hydrated throughout the day',
  },
];

export default function Habits({ darkMode }: HabitsProps) {
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [newHabit, setNewHabit] = useState({
    name: '',
    color: '#3b82f6',
    type: 'checkbox' as 'checkbox' | 'amount',
    description: '',
  });

  const handleAddHabit = () => {
    if (!newHabit.name) return;

    const habit: Habit = {
      id: Date.now().toString(),
      ...newHabit,
    };

    setHabits((prev) => [...prev, habit]);
    setNewHabit({
      name: '',
      color: '#3b82f6',
      type: 'checkbox',
      description: '',
    });
  };

  const handleSelectHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setNewHabit({
      name: habit.name,
      color: habit.color,
      type: habit.type,
      description: habit.description,
    });
  };

  const handleUpdateHabit = () => {
    if (!editingHabit || !newHabit.name) return;

    setHabits((prev) =>
      prev.map((h) =>
        h.id === editingHabit.id
          ? { ...h, ...newHabit }
          : h
      )
    );

    setEditingHabit(null);
    setNewHabit({
      name: '',
      color: '#3b82f6',
      type: 'checkbox',
      description: '',
    });
  };

  const handleDeleteHabit = () => {
    if (!editingHabit) return;

    setHabits((prev) => prev.filter((h) => h.id !== editingHabit.id));
    setEditingHabit(null);
    setNewHabit({
      name: '',
      color: '#3b82f6',
      type: 'checkbox',
      description: '',
    });
  };

  const handleCancelEdit = () => {
    setEditingHabit(null);
    setNewHabit({
      name: '',
      color: '#3b82f6',
      type: 'checkbox',
      description: '',
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
                    style={{ borderLeftWidth: '4px', borderLeftColor: habit.color }}
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
                <label htmlFor="habit-color">Color</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="habit-color"
                    type="color"
                    value={newHabit.color}
                    onChange={(e) => setNewHabit((prev) => ({ ...prev, color: e.target.value }))}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={newHabit.color}
                    onChange={(e) => setNewHabit((prev) => ({ ...prev, color: e.target.value }))}
                    placeholder="#3b82f6"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label>Type</label>
                <div className="mt-1 flex gap-2">
                  <Button
                    type="button"
                    variant={newHabit.type === 'checkbox' ? 'default' : 'outline'}
                    onClick={() => setNewHabit((prev) => ({ ...prev, type: 'checkbox' }))}
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
                  <Button onClick={handleUpdateHabit} className="w-full bg-blue-600 hover:bg-blue-700">
                    Update Habit
                  </Button>
                  <div className="flex gap-2">
                    <Button onClick={handleDeleteHabit} variant="destructive" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={handleAddHabit} className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Habit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
