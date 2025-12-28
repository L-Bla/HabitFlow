"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: '12/08', energy: 3, pleasantness: 3, mood: 10 },
  { date: '12/09', energy: 2, pleasantness: 2, mood: 6 },
  { date: '12/10', energy: 3, pleasantness: 4, mood: 12 },
  { date: '12/11', energy: 4, pleasantness: 3, mood: 11 },
  { date: '12/12', energy: 3, pleasantness: 4, mood: 13 },
  { date: '12/13', energy: 4, pleasantness: 4, mood: 16 },
  { date: '12/14', energy: 3, pleasantness: 3, mood: 10 },
];

const habitData = [
  { date: '12/08', meditation: 1, exercise: 25 },
  { date: '12/09', meditation: 1, exercise: 30 },
  { date: '12/10', meditation: 1, exercise: 0 },
  { date: '12/11', meditation: 0, exercise: 45 },
  { date: '12/12', meditation: 1, exercise: 30 },
  { date: '12/13', meditation: 1, exercise: 40 },
  { date: '12/14', meditation: 1, exercise: 30 },
];

export function MiniAnalytics() {
  const axisColor = getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim() || '#000';
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Energy & Pleasantness</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="currentColor" className="text-foreground" />
              <YAxis yAxisId="left" domain={[1, 4]} ticks={[1, 2, 3, 4]} stroke="currentColor" className="text-foreground" />
              <YAxis yAxisId="right" orientation="right" domain={[1, 4]} ticks={[1, 2, 3, 4]} stroke="currentColor" className="text-foreground" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem'
                }} 
              />
              <Line yAxisId="left" type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} name="Energy" />
              <Line yAxisId="right" type="monotone" dataKey="pleasantness" stroke="#10b981" strokeWidth={2} name="Pleasantness" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Habits Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={habitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="currentColor" className="text-foreground" />
              <YAxis stroke="currentColor" className="text-foreground" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem'
                }} 
              />
              <Line type="monotone" dataKey="meditation" stroke="#8b5cf6" strokeWidth={2} name="Meditation" />
              <Line type="monotone" dataKey="exercise" stroke="#f59e0b" strokeWidth={2} name="Exercise (min)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}