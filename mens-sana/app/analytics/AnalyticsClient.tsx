"use client";

import { charts, ChartUI } from "@/src/db/schema";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import DraggableChart from "../components/DraggableChart";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import { GripVertical, Archive, Trash2, Home, LineChart } from "lucide-react";
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import createChart from "@/src/actions/createChart"

interface ChartData {
  id: string;
  position: number;
  title: string;
  param1: string;
  param2?: string;
  data: {
    x: string;
    values: {v1: number, v2: number}[];
  }[];
  onHome: boolean;
}

interface HabitName {
  name: string
}

interface Props {
  initialCharts: ChartUI[],
  userHabits: HabitName[]
}

export default function AnalyticsClient(props: Props){
  const [charts, setCharts] = useState<ChartUI[]>(props.initialCharts);
  const [habits, setHabits] = useState<HabitName[]>(props.userHabits);
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [timespan, setTimespan] = useState('');

  const moveChart = (fromIndex: number, toIndex: number) => {
      const updatedCharts = [...charts];
      const [movedChart] = updatedCharts.splice(fromIndex, 1);
      updatedCharts.splice(toIndex, 0, movedChart);
      setCharts(updatedCharts);
  };

  const handleDelete = (id: string) => {
      setCharts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleHome = (id: string) => {
      setCharts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, onHome: !c.onHome } : c))
      );
  };

  async function handleDrawNewGraph(id: string){
    let chart = await createChart(1, param1, param2)
    return
  }

  return(
    <DndProvider backend={HTML5Backend}>
    <Card>
    <CardHeader>
      <CardTitle>Draw New Graph</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="param1">Parameter 1</label>
          <Select value={param1} onValueChange={setParam1}>
            <SelectTrigger id="param1" className="mt-1">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="energy">Energy</SelectItem>
              <SelectItem value="pleasantness">Pleasantness</SelectItem>
              {habits.map((habit) => 
                <SelectItem value={habit.name}>{habit.name}</SelectItem>
              )}
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
              <SelectItem value="energy">Energy</SelectItem>
              <SelectItem value="pleasantness">Pleasantness</SelectItem>
              {habits.map((habit) => 
                <SelectItem value={habit.name}>{habit.name}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button onClick={handleDrawNewGraph} disabled={!param1} className="w-full bg-blue-600 hover:bg-blue-700">
            Draw
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart, index) => (
        <DraggableChart
            key={chart.id}
            chart={chart}
            index={index}
            moveChart={moveChart}
            onDelete={handleDelete}
            onToggleHome={handleToggleHome}
        />
        ))}
    </div>
    </DndProvider>

      
  )
  }