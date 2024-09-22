import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTable from "./UserTable";
import OldMessages from "./OldMessages";
import NewMessages from "./NewMessages";
import OldData from "./OldData";
import Dashboard from "./Dashboard";
import ClerkHeader from "./ClerkHeader";

export function ChatDashboard() {
  return (
    <main className="bg-gray-100">
      <ClerkHeader />

      <div className="flex min-h-screen h-full bg-gray-100 dark:bg-gray-900 w-full">
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
    </main>
  );
}
