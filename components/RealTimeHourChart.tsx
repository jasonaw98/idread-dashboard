// RealtimeHourChartClient.tsx
'use client';


import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart showing messages by hour";

interface ChartDataItem {
  hour: number;
  messages: number;
}

interface RealtimeHourChartClientProps {
  chartData: ChartDataItem[];
}

const chartConfig = {
  desktop: {
    label: "Messages",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function RealtimeHourChartClient({ chartData }: RealtimeHourChartClientProps) {
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
          dataKey="hour"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
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