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
import deleteChart from "@/src/actions/deleteChart";

interface HabitName {
  name: string
}

interface Props {
  initialCharts: ChartUI[],
  userHabits: HabitName[],
  session
}

export default function AnalyticsClient(props: Props){
  const [charts, setCharts] = useState<ChartUI[]>(props.initialCharts);
  const [habits, setHabits] = useState<HabitName[]>(props.userHabits);
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [timespan, setTimespan] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [chartToDelete, setChartToDelete] = useState(null);

  const onDelete = (id, title) => {
    setChartToDelete({ id, title });
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!chartToDelete) return;

    await deleteChart(chartToDelete.id);

    setCharts(prev =>
      prev.filter(c => c.id !== chartToDelete.id)
    );

    setShowConfirm(false);
    setChartToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setChartToDelete(null);
  };

  async function handleDrawNewGraph(){
    let chart = await createChart(props.session.user.id, param1, param2)
    setCharts(prev => ([...prev, chart]))
    return
  }

  return(
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {charts.map((chart, index) => (
            <DraggableChart
                key={chart.id}
                chart={chart}
                index={index}
                onDelete={onDelete}
            />
            ))}
        </div>

        <Card className="mt-6">
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

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl border border-gray-200 p-6">
            
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Chart
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">
                "{chartToDelete?.title}"
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </DndProvider>

  )
  }