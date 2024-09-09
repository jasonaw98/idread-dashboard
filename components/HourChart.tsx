"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { calculateMessagesByMonth } from "@/hooks/useCalUnique";

export const description = "A bar chart with a label";

const { messagesByHour } = calculateMessagesByMonth();

const chartData = [
  { time: "12", messages: messagesByHour["0"] || 0 },
  { time: "1", messages: messagesByHour["1"] || 0 },
  { time: "2", messages: messagesByHour["2"] || 0 },
  { time: "3", messages: messagesByHour["3"] || 0 },
  { time: "4", messages: messagesByHour["4"] || 0 || 0 },
  { time: "5", messages: messagesByHour["5"] || 0 },
  { time: "6", messages: messagesByHour["6"] || 0 },
  { time: "7", messages: messagesByHour["7"] || 0 },
  { time: "8", messages: messagesByHour["8"] || 0 },
  { time: "9", messages: messagesByHour["9"] || 0 },
  { time: "10", messages: messagesByHour["10"] || 0 },
  { time: "11", messages: messagesByHour["11"] || 0 },
  { time: "12", messages: messagesByHour["12"] || 0 },
  { time: "1", messages: messagesByHour["13"] || 0 },
  { time: "2", messages: messagesByHour["14"] || 0 },
  { time: "3", messages: messagesByHour["15"] || 0 },
  { time: "4", messages: messagesByHour["16"] || 0 },
  { time: "5", messages: messagesByHour["17"] || 0 },
  { time: "6", messages: messagesByHour["18"] || 0 },
  { time: "7", messages: messagesByHour["19"] || 0 },
  { time: "8", messages: messagesByHour["20"] || 0 },
  { time: "9", messages: messagesByHour["21"] || 0 },
  { time: "10", messages: messagesByHour["22"] || 0 },
  { time: "11", messages: messagesByHour["23"] || 0 },
];

const chartConfig = {
  desktop: {
    label: "Messages",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function HourChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 10,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="messages"
          type="linear"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
