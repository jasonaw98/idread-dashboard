import { ChatDashboard } from "@/components/chat-dashboard";
import Image from "next/image";
import { calculateMessageStats } from "@/hooks/useCalUnique";

export default function Home() {
  return (
    <main>
      <ChatDashboard />
    </main>
  );
}
