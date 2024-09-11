import { Button } from "@/components/ui/button";
import { BarChart, Calendar, MessageSquare, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTable from "./UserTable";
import OldMessages from "./OldMessages";
import NewMessages from "./NewMessages";
import OldData from "./OldData";
import Dashboard from "./Dashboard";

export function ChatDashboard() {
  return (
    <Tabs defaultValue="messages">
      <div className="flex min-h-screen h-full bg-gray-100 dark:bg-gray-900 w-full">
        <aside className="w-64 bg-white dark:bg-gray-800 p-4">
          <div className="flex justify-between items-center flex-col">
            <h2 className="text-2xl font-bold mb-4">Chat Analytics</h2>
          </div>
          <nav className="flex flex-col">
            <TabsList className="flex flex-col bg-transparent h-full gap-2">
              <TabsTrigger
                value="dashboard"
                className="w-full hover:bg-gray-100 justify-start"
                asChild
              >
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className="w-full hover:bg-gray-100 justify-start"
                asChild
              >
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="w-full hover:bg-gray-100 justify-start"
                asChild
              >
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </Button>
              </TabsTrigger>
              <TabsTrigger
                value="olddata"
                className="w-full hover:bg-gray-100 justify-start"
                asChild
              >
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Old Data
                </Button>
              </TabsTrigger>
              <TabsTrigger
                value="archives"
                className="w-full hover:bg-gray-100 justify-start"
                asChild
              >
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Archives
                </Button>
              </TabsTrigger>
            </TabsList>
          </nav>
        </aside>

        <TabsContent value="dashboard" className="w-full h-full">
          <Dashboard />
        </TabsContent>

        <TabsContent value="messages" className="w-full h-full">
          <NewMessages />
        </TabsContent>

        <TabsContent value="users" className="w-full h-full">
          <UserTable />
        </TabsContent>

        <TabsContent value="olddata" className="w-full h-full">
          <OldData />
        </TabsContent>

        <TabsContent value="archives" className="w-full h-full">
          <OldMessages />
        </TabsContent>
      </div>
    </Tabs>
  );
}
