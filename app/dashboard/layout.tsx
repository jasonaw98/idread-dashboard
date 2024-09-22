import { ReactNode } from "react";
import { RequireActiveOrganization } from "@/components/RequireActiveOrganization";
import { Tabs } from "@radix-ui/react-tabs";
import DashboardNavigation from "@/components/DashboardNavigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <RequireActiveOrganization>
      <Tabs defaultValue="dashboard">
        <main className="bg-gray-100 min-h-screen flex h-full">
          <DashboardNavigation />
          {children}
        </main>
      </Tabs>
    </RequireActiveOrganization>
  );
};

export default Layout;
