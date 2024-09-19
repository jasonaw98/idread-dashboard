import { MessageSquare, Users, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";
import { HourChart } from "./HourChart";
import { MonthChart } from "./MonthChart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { calculateMessageStats } from "@/hooks/useCalUnique";

const OldData = () => {
  const { uniqueUsers, totalMessages, recipientMessageCountArray } =
    calculateMessageStats();

  return (
    <main className="flex-1 p-8 overflow-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search..."
            className="w-64"
            // icon={<Search className="h-4 w-4 text-gray-400" />}
          />
          {/* <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button> */}
          {/* <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar> */}
        </div>
      </header>

      {/* Time range selector */}
      {/* <div className="mb-8">
              <Select
                value={selectedTimeRange}
                onValueChange={setSelectedTimeRange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Response Time
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20s</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Message Volume</CardTitle>
            <CardDescription>Number of messages over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <MonthChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Engagement Hours</CardTitle>
            <CardDescription>Active session time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <HourChart />
          </CardContent>
        </Card>
      </div>

      {/* Top Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Active Users</CardTitle>
          <CardDescription>
            Users with the most messages in the selected time range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left font-semibold">User</th>
                <th className="text-left font-semibold">Messages</th>
              </tr>
            </thead>
            <tbody>
              {recipientMessageCountArray.slice(1, 10).map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">
                    {user.key.toString().slice(0, 5) + "*****"}
                  </td>
                  <td className="py-2">{user.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
};

export default OldData;
