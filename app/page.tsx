import AIChatBot from "@/components/AIchat";
import LandingPage from "@/components/LandingPage";

// Revalidate page every 60 seconds
export const revalidate = 60;

export default function Home() {
  return (
    <main className="h-screen">
      <LandingPage />
      {/* <AIChatBot /> */}
    </main>
  );
}
