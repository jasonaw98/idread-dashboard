"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Calendar, MessageSquare, Users } from "lucide-react";
import { calculateMessageStats } from "@/hooks/useCalUnique";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cleanedData } from "@/data/output";
import { MonthChart } from "./MonthChart";
import { HourChart } from "./HourChart";

interface Message {
  Account: string;
  Incoming: string;
  IncomingTime: string;
  Outgoing: string;
  OutgoingTime: string;
}

export function ChatDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [loading, setLoading] = useState(false);
  const { uniqueUsers, totalMessages, recipientMessageCountArray } =
    calculateMessageStats();

  const [selectedItems, setSelectedItems] = useState<Message[]>([]);

  const handleCheckboxChange = useCallback(
    (message: Message, isChecked: boolean) => {
      setSelectedItems((prevSelected) => {
        const updatedSelected = isChecked
          ? [...prevSelected, message]
          : prevSelected.filter((item) => item !== message);

        return updatedSelected;
      });
    },
    []
  );

  const ExportXlsx = async (title?: string, worksheetname?: string) => {
    try {
      setLoading(true);
      // Check if the action result contains data and if it's an array
      if (selectedItems && Array.isArray(selectedItems)) {
        const dataToExport = selectedItems.map((pro: any) => ({
          User: pro.Account,
          TimeSent: pro.IncomingTime,
          MessageSent: pro.Incoming,
          MessageReceived: pro.Outgoing,
          TimeReceived: pro.OutgoingTime,
        }));
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("#==================Export Error");
      }
    } catch (error: any) {
      setLoading(false);
      console.log("#==================Export Error", error.message);
    }
  };

  const sortedData = [...cleanedData].sort((a, b) => {
    return (
      new Date(b.IncomingTime).getTime() - new Date(a.IncomingTime).getTime()
    );
  });

  const refPagination = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to show per page

  // Calculate the indices of the items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    refPagination.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  return (
    <Tabs defaultValue="dashboard">
      <div className="flex h-full bg-gray-100 dark:bg-gray-900 w-full">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 p-4">
          <div className="flex justify-between items-center flex-col">
            {/* <img
              src="/idread.jpg"
              alt="logo"
              className="w-10 h-10 rounded"
            /> */}
            <h2 className="text-2xl font-bold mb-4">Chat Analytics</h2>
          </div>
          <nav>
            <TabsList className="flex flex-col bg-transparent w-full h-full gap-2">
              <TabsTrigger
                value="dashboard"
                className="w-full hover:bg-gray-100"
                asChild
              >
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="w-full hover:bg-gray-100"
                asChild
              >
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </Button>
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className="w-full hover:bg-gray-100"
                asChild
              >
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </TabsTrigger>
            </TabsList>
          </nav>
        </aside>

        {/* Main content */}
        <TabsContent value="dashboard" className="w-full h-full">
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
                  <CardTitle className="text-sm font-medium">
                    Unique Users
                  </CardTitle>
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
                  <CardDescription>
                    Number of messages over time
                  </CardDescription>
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
                    {recipientMessageCountArray
                      .slice(1, 10)
                      .map((user, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-2">{user.key}</td>
                          <td className="py-2">{user.value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </main>
        </TabsContent>
        <TabsContent value="messages" className="w-full h-full">
          <div className="flex flex-1 flex-col p-8 overflow-auto w-full">
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Messages</h1>
              <button
                onClick={() => ExportXlsx("Messages", "MessageExport")}
                className="group relative h-12 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition hover:bg-blue-600 font-semibold"
              >
                <span className="relative">
                  {loading ? "Loading..." : "Export"}
                </span>
              </button>
            </header>
            <div className="bg-white rounded-xl p-4 shadow w-full flex flex-col">
              <div className="grid grid-cols-[0.3fr_1fr_1fr_2fr_2fr_1fr] gap-4 px-4">
                <h1 className="font-semibold">{''}</h1>
                <h1 className="font-semibold">Users</h1>
                <h1 className="font-semibold">Time Sent</h1>
                <h1 className="font-semibold">Message Sent</h1>
                <h1 className="font-semibold">Message Received</h1>
                <h1 className="font-semibold  text-right">Time Received</h1>
              </div>
              <div className="space-y-2 mt-4 font-semibold">
                {currentItems.map((message, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg grid grid-cols- grid-cols-[0.3fr_1fr_1fr_2fr_2fr_1fr] gap-2 border border-border"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      onChange={(e) =>
                        handleCheckboxChange(message, e.target.checked)
                      }
                    />
                    <p className="text-gray-700 ">{message.Account}</p>
                    <p className="text-gray-700 ">
                      {new Date(message.IncomingTime).toLocaleString()}
                    </p>
                    <p className="text-gray-700 ">{message.Incoming}</p>
                    <p className="text-gray-700 text-justify">
                      {message.Outgoing}
                    </p>
                    <p className="text-gray-700 text-right">
                      {new Date(message.OutgoingTime).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="flex justify-center space-x-2 mt-4"
                ref={refPagination}
              >
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-gray-200 rounded">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="users" className="w-full h-full">
          <div className="flex flex-1 flex-col p-8 overflow-auto w-full">
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Total Users</h1>
            </header>
            <div className="bg-white rounded-xl p-4 shadow w-full flex flex-col">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">User</th>
                    <th className="text-left font-semibold">Messages</th>
                  </tr>
                </thead>
                <tbody>
                  {recipientMessageCountArray.map((user, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2">{user.key}</td>
                      <td className="py-2">{user.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
