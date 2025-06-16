"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { date: "2024-04-01", spending: 1200, revenue: 1500 },
  { date: "2024-04-04", spending: 1350, revenue: 2050 },
  { date: "2024-04-07", spending: 920, revenue: 1650 },
  { date: "2024-04-10", spending: 1400, revenue: 2150 },
  { date: "2024-04-13", spending: 1250, revenue: 1600 },
  { date: "2024-04-16", spending: 1420, revenue: 2100 },
  { date: "2024-04-19", spending: 980, revenue: 1700 },
  { date: "2024-04-22", spending: 1380, revenue: 2000 },
  { date: "2024-04-25", spending: 1150, revenue: 1550 },
  { date: "2024-04-28", spending: 1300, revenue: 1950 },
  { date: "2024-05-01", spending: 1100, revenue: 1800 },
  { date: "2024-05-04", spending: 1450, revenue: 2200 },
  { date: "2024-05-07", spending: 1200, revenue: 1650 },
  { date: "2024-05-10", spending: 1300, revenue: 1900 },
  { date: "2024-05-13", spending: 1150, revenue: 1750 },
  { date: "2024-05-16", spending: 1400, revenue: 2100 },
  { date: "2024-05-19", spending: 1250, revenue: 1850 },
  { date: "2024-05-22", spending: 1350, revenue: 2000 },
  { date: "2024-05-25", spending: 1100, revenue: 1700 },
  { date: "2024-05-28", spending: 1450, revenue: 2150 },
  { date: "2024-05-31", spending: 1200, revenue: 1800 },
  { date: "2024-06-03", spending: 1350, revenue: 1950 },
  { date: "2024-06-06", spending: 1150, revenue: 1700 },
  { date: "2024-06-09", spending: 1400, revenue: 2050 },
  { date: "2024-06-12", spending: 1250, revenue: 1850 },
  { date: "2024-06-15", spending: 1300, revenue: 1900 },
  { date: "2024-06-18", spending: 1200, revenue: 1750 },
  { date: "2024-06-21", spending: 1450, revenue: 2200 },
  { date: "2024-06-24", spending: 1350, revenue: 2000 },
  { date: "2024-06-27", spending: 1250, revenue: 1850 },
  { date: "2024-06-30", spending: 1400, revenue: 2100 },
];

const chartConfig = {
  financial: {
    label: "Financial Data",
  },
  spending: {
    label: "Total Spending",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "Platform Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function SpendingToRevenueChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Spending vs Revenue Analysis</CardTitle>
          <CardDescription>
            Financial performance overview for the selected period
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSpending" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-spending)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-spending)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              stackId="a"
            />
            <Area
              dataKey="spending"
              type="natural"
              fill="url(#fillSpending)"
              stroke="var(--color-spending)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
