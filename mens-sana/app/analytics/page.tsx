"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Archive, Trash2, Home, GripVertical } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface ChartData {
id: string;
title: string;
param1: string;
param2?: string;
data: any[];
onHome: boolean;
}

const mockMoodData = [
{ date: '12/08', energy: 3, pleasantness: 3, mood: 10, meditation: 1, exercise: 25, water: 6 },
{ date: '12/09', energy: 2, pleasantness: 2, mood: 6, meditation: 1, exercise: 30, water: 7 },
{ date: '12/10', energy: 3, pleasantness: 4, mood: 12, meditation: 1, exercise: 0, water: 5 },
{ date: '12/11', energy: 4, pleasantness: 3, mood: 11, meditation: 0, exercise: 45, water: 8 },
{ date: '12/12', energy: 3, pleasantness: 4, mood: 13, meditation: 1, exercise: 30, water: 7 },
{ date: '12/13', energy: 4, pleasantness: 4, mood: 16, meditation: 1, exercise: 40, water: 8 },
{ date: '12/14', energy: 3, pleasantness: 3, mood: 10, meditation: 1, exercise: 30, water: 6 },
];

const defaultCharts: ChartData[] = [
{ id: '1', title: 'Energy & Pleasantness', param1: 'energy', param2: 'pleasantness', data: mockMoodData, onHome: true },
{ id: '2', title: 'Mood Over Time', param1: 'mood', data: mockMoodData, onHome: true },
{ id: '3', title: 'Exercise & Energy', param1: 'exercise', param2: 'energy', data: mockMoodData, onHome: false },
{ id: '4', title: 'Water Intake', param1: 'water', data: mockMoodData, onHome: false },
];

interface AnalyticsProps {
darkMode: boolean;
}

const DraggableChart = ({ chart, index, moveChart, onArchive, onDelete, onToggleHome }: any) => {
const [{ isDragging }, drag] = useDrag({
  type: 'chart',
  item: { id: chart.id, index },
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
  }),
});

const [, drop] = useDrop({
  accept: 'chart',
  hover: (item: { id: string; index: number }) => {
    if (item.index !== index) {
      moveChart(item.index, index);
      item.index = index;
    }
  },
});

const getYDomain = (param: string) => {
  if (param === 'energy' || param === 'pleasantness') return [1, 4];
  if (param === 'mood') return [1, 16];
  return undefined;
};

const getYTicks = (param: string) => {
  if (param === 'energy' || param === 'pleasantness') return [1, 2, 3, 4];
  if (param === 'mood') return [1, 4, 8, 12, 16];
  return undefined;
};

const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

return (
  <div
    ref={(node) => drag(drop(node))}
    className={`${isDragging ? 'opacity-50' : 'opacity-100'}`}
  >
    <Card className="cursor-move">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <CardTitle className="text-base truncate">{chart.title}</CardTitle>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <Button variant="ghost" size="icon" onClick={() => onArchive(chart.id)} title="Archive">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(chart.id)} title="Delete">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            <Button 
              variant={chart.onHome ? "default" : "ghost"} 
              size="icon" 
              onClick={() => onToggleHome(chart.id)}
              title={chart.onHome ? "Remove from Home" : "Add to Home"}
              className={chart.onHome ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <Home className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="currentColor" className="text-foreground" />
            <YAxis 
              yAxisId="left"
              domain={getYDomain(chart.param1)} 
              ticks={getYTicks(chart.param1)}
              stroke="currentColor" 
              className="text-foreground"
            />
            {chart.param2 && (
              <YAxis 
                yAxisId="right"
                orientation="right"
                domain={getYDomain(chart.param2)} 
                ticks={getYTicks(chart.param2)}
                stroke="currentColor" 
                className="text-foreground"
              />
            )}
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem'
              }} 
            />
            <Line yAxisId="left" type="monotone" dataKey={chart.param1} stroke={colors[0]} strokeWidth={2} name={chart.param1} />
            {chart.param2 && (
              <Line yAxisId="right" type="monotone" dataKey={chart.param2} stroke={colors[1]} strokeWidth={2} name={chart.param2} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);
};

export default function Analytics({ darkMode }: AnalyticsProps) {
  const [charts, setCharts] = useState<ChartData[]>(defaultCharts);
  const [archivedCharts, setArchivedCharts] = useState<ChartData[]>([]);
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [timespan, setTimespan] = useState('7');

  const moveChart = (fromIndex: number, toIndex: number) => {
    const updatedCharts = [...charts];
    const [movedChart] = updatedCharts.splice(fromIndex, 1);
    updatedCharts.splice(toIndex, 0, movedChart);
    setCharts(updatedCharts);
  };

  const handleArchive = (id: string) => {
    const chart = charts.find((c) => c.id === id);
    if (chart) {
      setCharts((prev) => prev.filter((c) => c.id !== id));
      setArchivedCharts((prev) => [...prev, chart]);
    }
  };

  const handleDelete = (id: string) => {
    setCharts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleHome = (id: string) => {
    setCharts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, onHome: !c.onHome } : c))
    );
  };

  const handleDrawNewGraph = () => {
    if (!param1) return;

    const newChart: ChartData = {
      id: Date.now().toString(),
      title: param2 && param2 !== 'none' ? `${param1} & ${param2}` : param1,
      param1,
      param2: param2 && param2 !== 'none' ? param2 : undefined,
      data: mockMoodData.slice(0, parseInt(timespan) || 7),
      onHome: false,
    };

    setCharts((prev) => [...prev, newChart]);
    setParam1('');
    setParam2('');
    setTimespan('7');
  };

  const restoreFromArchive = (id: string) => {
    const chart = archivedCharts.find((c) => c.id === id);
    if (chart) {
      setArchivedCharts((prev) => prev.filter((c) => c.id !== id));
      setCharts((prev) => [...prev, chart]);
    }
  };

  const deleteFromArchive = (id: string) => {
    setArchivedCharts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          onClick={() => {}} 
          disabled={archivedCharts.length === 0}
        >
          <Archive className="h-4 w-4 mr-2" />
          Archive ({archivedCharts.length})
        </Button>
      </div>

      {/* Archived Charts (expandable) */}
      {archivedCharts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Archived Charts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {archivedCharts.map((chart) => (
                <div key={chart.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span>{chart.title}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => restoreFromArchive(chart.id)}>
                      Restore
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteFromArchive(chart.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Graphs */}
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {charts.map((chart, index) => (
            <DraggableChart
              key={chart.id}
              chart={chart}
              index={index}
              moveChart={moveChart}
              onArchive={handleArchive}
              onDelete={handleDelete}
              onToggleHome={handleToggleHome}
            />
          ))}
        </div>
      </DndProvider>

      {/* Draw New Graph */}
      <Card>
        <CardHeader>
          <CardTitle>Draw New Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="param1">Parameter 1</label>
              <Select value={param1} onValueChange={setParam1}>
                <SelectTrigger id="param1" className="mt-1">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mood">Mood</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="pleasantness">Pleasantness</SelectItem>
                  <SelectItem value="meditation">Meditation</SelectItem>
                  <SelectItem value="exercise">Exercise</SelectItem>
                  <SelectItem value="water">Water Intake</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="param2">Parameter 2 (optional)</label>
              <Select value={param2} onValueChange={setParam2}>
                <SelectTrigger id="param2" className="mt-1">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="mood">Mood</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="pleasantness">Pleasantness</SelectItem>
                  <SelectItem value="meditation">Meditation</SelectItem>
                  <SelectItem value="exercise">Exercise</SelectItem>
                  <SelectItem value="water">Water Intake</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="timespan">Timespan (days)</label>
              <Input
                id="timespan"
                type="number"
                value={timespan}
                onChange={(e) => setTimespan(e.target.value)}
                min="1"
                max="30"
                className="mt-1"
              />
            </div>

            <div className="flex items-end">
              <Button onClick={handleDrawNewGraph} disabled={!param1} className="w-full bg-blue-600 hover:bg-blue-700">
                Draw
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}