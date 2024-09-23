"use client";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a label";

const chartData = [
  { browser: "MOF", visitors: 15, fill: "rgba(255, 99, 132, 0.7)" },
  { browser: "KDN", visitors: 12, fill: "rgba(54, 162, 235, 0.7)" },
  { browser: "KD", visitors: 13, fill: "rgba(255, 206, 86, 0.7)" },
  { browser: "KESUMA", visitors: 13, fill: "rgba(75, 192, 192, 0.7)" },
  { browser: "KUSKOP", visitors: 1, fill: "rgba(228, 87, 46, 0.7)" },
  { browser: "MITI", visitors: 4, fill: "rgba(213, 191, 134, 0.7)" },
  { browser: "NRES", visitors: 0, fill: "rgba(41, 51, 92, 0.7)" },
  { browser: "PETRA", visitors: 12, fill: "rgba(167, 29, 49, 0.7)" },
  { browser: "KLN", visitors: 4, fill: "rgba(63, 13, 18, 0.7)" },
  { browser: "JPM", visitors: 1, fill: "rgba(60, 79, 118, 0.7)" },
  { browser: "MOTAC", visitors: 1, fill: "rgba(41, 51, 92, 0.5)" },
  { browser: "MOT", visitors: 9, fill: "rgba(171, 159, 157, 0.7)" },
  { browser: "KPWKM", visitors: 3, fill: "rgba(255, 159, 64, 0.7)" },
  { browser: "KPN", visitors: 1, fill: "rgba(243, 167, 18, 0.7)" },
  { browser: "KKM", visitors: 9, fill: "rgba(102, 155, 188, 0.7)" },
  { browser: "KPK", visitors: 0, fill: "rgba(102, 155, 188, 0.5)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "purple",
  },
} satisfies ChartConfig;

export function DeptChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[400px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
      </PieChart>
    </ChartContainer>
  );
}
