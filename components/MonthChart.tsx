"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { calculateMessagesByMonth } from "@/hooks/useCalUnique";

export const description = "A bar chart with a label";

const { messagesByMonth } = calculateMessagesByMonth();

const chartData = [
  { month: "May", messages: null },
  { month: "June", messages: null },
  { month: "July", messages: null },
  { month: "Aug", messages: messagesByMonth.August },
  { month: "Sept", messages: messagesByMonth.September },
];

const chartConfig = {
  desktop: {
    label: "Messages",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function MonthChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="messages" fill="var(--color-desktop)" radius={8}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
