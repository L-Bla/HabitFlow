"use client";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { GripVertical, Home, Trash2 } from "lucide-react";
import { ChartUI } from "@/src/db/schema";
import { Button } from "./ui/button";
import deleteChart from "@/src/actions/deleteChart";

interface Props {
  chart: ChartUI;
  onDelete;
  index: number;
  moveChart: (from: number, to: number) => void;
}



function getMinMaxDate(chartData: ChartUI) {
  if (!chartData.data.length) {
    return { min: null, max: null };
  }

  const dates = chartData.data.map(d => d.x);

  return {
    min: new Date(dates.reduce((a, b) => (a < b ? a : b))),
    max: new Date(dates.reduce((a, b) => (a > b ? a : b))),
  };
}


/* ---------------------------------- */
/* Axis helper */
/* ---------------------------------- */

function getYAxisConfig(
  param: "energy" | "pleasantness" | "habit",
  data: any[] | undefined,
  key: string
): {
  domain: [number, number];
  ticks?: number[];
} {
  if (param === "energy") {
    return { domain: [1, 4], ticks: [1, 2, 3, 4] };
  }

  if (param === "pleasantness") {
    return { domain: [-4, 4], ticks: [-4, -2, 2, 4] };
  }

  // HABIT
  if (!data || data.length===0) {
    return { domain: [0, 1], ticks: [0, 1] };
  }

  const max = Math.max(...data.map((d) => d[key] ?? 0));
  const upper = Math.max(1, Math.ceil(max * 1.1));

  const steps = 4;
  const stepSize = Math.ceil(upper / steps);

  const ticks = Array.from(
    { length: steps + 1 },
    (_, i) => i * stepSize
  );

  return {
    domain: [0, ticks[ticks.length - 1]],
    ticks,
  };
}

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */

export default function DraggableChart({
  chart,
  onDelete,
  index
}) {
  const ref = useRef<HTMLDivElement>(null);

  const leftAxis = getYAxisConfig(
    chart.param1,
    chart.data,
    chart.param1
  );

  const rightAxis = chart.param2
    ? getYAxisConfig(chart.param2, chart.data, chart.param2)
    : null;

  async function handleDeleteChart(){
    await deleteChart(chart.id)
    return 
  }

  return (
    <div ref={ref}>
      <Card className="">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
            <CardTitle className="text-base">
              {chart.title}
            </CardTitle>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button variant="ghost" size="icon" title="Delete"
                onClick={() => onDelete(chart.id, chart.title)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="x" 
                type="category"
                allowDuplicatedCategory={false}
              />

              <YAxis
                yAxisId="left"
                domain={leftAxis.domain}
                ticks={leftAxis.ticks}
                allowDecimals={false}
              />

              {rightAxis && (
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={rightAxis.domain}
                  ticks={rightAxis.ticks}
                  allowDecimals={false}
                />
              )}

              <Tooltip />

              {/* PARAM 1 */}
              <Line
                type="monotone"
                dataKey={chart.param1}
                yAxisId="left"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                connectNulls={false}
              />

              <Line
                type="monotone"
                dataKey={chart.param1}
                stroke="#8884d8"
                strokeDasharray="5 5"
                strokeWidth={1}
                yAxisId="left"
                dot={false}
                activeDot={false}
                connectNulls={true}
                tooltipType="none"
              />

              {/* PARAM 2 */}
              {chart.param2 && (
                <Line
                  type="monotone"
                  dataKey={chart.param2}
                  yAxisId="right"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                  connectNulls={false}
                />
              )}

              {chart.param2 && (
                <Line
                  type="monotone"
                  dataKey={chart.param2}
                  yAxisId="right"
                  stroke="#8884d8"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                  activeDot={false}
                  connectNulls={true}
                  tooltipType="none"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
