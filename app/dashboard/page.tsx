import ClerkHeader from "@/components/ClerkHeader";
import Dashboard from "@/components/Dashboard";
import NewMessages from "@/components/NewMessages";
import OldMessages from "@/components/OldMessages";
import UserTable from "@/components/UserTable";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen w-full">
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
      </div>
    </div>
  );
};

export default page;
