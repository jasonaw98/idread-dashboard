import { MessageSquare, Users, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { whatsappStats } from "@/app/actions/actions";
import { RealtimeMonthChartClient } from "./RealTimeMonthChart";
import { RealtimeHourChartClient } from "./RealTimeHourChart";
import { DeptChart } from "./DeptChart";

const Dashboard = async () => {
  const stats = await whatsappStats();
  const users = stats?.recipientMessageCountArray || [];
  const totalMessages = stats?.totalMessages;
  const uniqueUsers = stats?.uniqueUsers;
  const messagesByMonth = stats?.messagesByMonth || {};
  const messagesByHour = stats?.messagesByHour || {};

  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartData = [];
  for (let i = 0; i < 5; i++) {
    const monthIndex = (currentMonthIndex - i + 12) % 12;
    chartData.unshift({
      month: monthNames[monthIndex],
      messages: messagesByMonth[monthNames[monthIndex]] || 0,
    });
  }

  const hourChartData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    messages: messagesByHour[i] || 0,
  }));
  
  return (
    <main className="flex-1 p-8 overflow-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>

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
            <div className="text-2xl font-bold">4s</div>
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
            <RealtimeMonthChartClient chartData={chartData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Engagement Hours</CardTitle>
            <CardDescription>Active session time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <RealtimeHourChartClient chartData={hourChartData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Department Query</CardTitle>
            <CardDescription>Total query of Department</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <DeptChart />
          </CardContent>
        </Card>
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
                  <th className="text-left font-semibold">User Id</th>
                  <th className="text-left font-semibold">User Name</th>
                  <th className="text-left font-semibold">Messages</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.slice(0, 10).map((user, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2">
                        {user.key.toString().slice(0, 5) + "*****"}
                      </td>
                      <td className="py-2">
                        {user.name.toString().slice(0, 3) + "*****"}
                      </td>
                      <td className="py-2">{user.value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Dashboard;
