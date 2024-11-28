import { MessageSquare, Users, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { processChartData, whatsappStats } from "@/app/actions/actions";
import { RealtimeMonthChartClient } from "./RealTimeMonthChart";
import { RealtimeHourChartClient } from "./RealTimeHourChart";
import { DeptChart } from "./DeptChart";

export default async function Dashboard() {
  const stats = await whatsappStats();
  const users = stats?.recipientMessageCountArray || [];
  const { chartData, hourChartData } = await processChartData(stats);

  return (
    <main className="flex-1 p-8 overflow-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Messages"
          value={stats?.totalMessages || 0}
          icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Unique Users"
          value={stats?.uniqueUsers || 0}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Avg. Response Time"
          value="4s"
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Message Volume</CardTitle>
            <CardDescription>Number of messages over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {chartData.length > 0 ? (
              <RealtimeMonthChartClient chartData={chartData} />
            ) : (
              <div className="h-full animate-pulse bg-gray-200 rounded-lg" />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Engagement Hours</CardTitle>
            <CardDescription>Active session time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {hourChartData.length > 0 ? (
              <RealtimeHourChartClient chartData={hourChartData} />
            ) : (
              <div className="h-full animate-pulse bg-gray-200 rounded-lg" />
            )}
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
              {users ? (
                <tbody>
                  {users.slice(0, 10).map((user, index) => (
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
              ) : (
                <tbody>
                  <tr>
                    <td>
                      <div className="h-4 w-40 animate-pulse bg-gray-200 rounded-full"></div>
                    </td>
                    <td>
                      <div className="h-4 w-40 animate-pulse bg-gray-200 rounded-full"></div>
                    </td>
                    <td>
                      <div className="h-4 w-40 animate-pulse bg-gray-200 rounded-full"></div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="h-4 w-40 animate-pulse bg-gray-200 rounded-full"></div>
                    </td>
                    <td>
                      <div className="h-4 w-40 animate-pulse bg-gray-200 rounded-full"></div>
                    </td>
                    <td>
                      <div className="h-4 w-40 animate-pulse bg-gray-200 rounded-full"></div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="h-4 w-40 animate-pulse bg-gray-200 rounded-full"></div>
                    </td>
                    <td>
                      <div className="h-4 w-40 animate-pulse bg-gray-200 rounded-full"></div>
                    </td>
                    <td>
                      <div className="h-4 w-40 animate-pulse bg-gray-200 rounded-full"></div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

function MetricCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
