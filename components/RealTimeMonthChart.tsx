"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a label";

interface ChartDataItem {
  month: string;
  messages: number;
}

interface RealtimeMonthChartClientProps {
  chartData: ChartDataItem[];
}

const chartConfig = {
  desktop: {
    label: "Messages",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function RealtimeMonthChartClient({
  chartData,
}: RealtimeMonthChartClientProps) {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 25,
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
