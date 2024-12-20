import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { BarChart, MessageSquare, Users, HomeIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const DashboardNavigation = () => {
  return (
    <aside className="bg-white dark:bg-slate-800 p-4">
      <div className="flex justify-between items-center flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">Analytics</h2>
      </div>
      <nav className="flex flex-col">
        <TabsList className="flex flex-col bg-transparent h-full gap-2">
          <TabsTrigger
            value="dashboard"
            className="w-full hover:bg-slate-100 justify-start data-[state=active]:bg-slate-100"
            asChild
          >
            <Button variant="ghost" className="w-full justify-start">
              <BarChart className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </TabsTrigger>
          <TabsTrigger
            value="messages"
            className="w-full hover:bg-slate-100 justify-start data-[state=active]:bg-slate-100"
            asChild
          >
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="w-full hover:bg-slate-100 justify-start data-[state=active]:bg-slate-100"
            asChild
          >
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
          </TabsTrigger>
          <Link
            href="/"
            className="w-full hover:bg-slate-100 justify-start rounded-xl"
            prefetch
          >
            <Button variant="ghost" className="w-full justify-start hover:bg-slate-100">
              <HomeIcon className="mr-2 h-4 w-4" />
              Landing Page
            </Button>
          </Link>
        </TabsList>
      </nav>
    </aside>
  );
};

export default DashboardNavigation;
