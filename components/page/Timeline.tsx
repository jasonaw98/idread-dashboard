import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

export function TimelineDemo() {
  const data = [
    {
      title: "Q3 2024",
      content: (
        <div className="flex flex-col items-center">
          <p className="text-neutral-200 text-xs md:text-2xl font-bold mb-8">
            Initial Planning Phase and Gethering Insights
          </p>
          <div className="mb-8 text-start">
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              ✅ First batch of raw data scraping from government websites
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              ✅ First batch of dataset cleaning
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              ✅ Initialise LLM
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              ✅ First batch of data analysis and training
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Q4 2024",
      content: (
        <div className="flex flex-col items-center">
          <p className="text-neutral-200 text-xs md:text-2xl font-bold mb-8">
            WhatsApp Integration and Data Analysis
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              ✅ Integrate WhatsApp
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              ✅ Prepare software for data analysis of response
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              ✅ Gather insights on how WhatsApp bot is used
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              ✅ Gather insights on how the LLM is performing
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              🥳 Add support for multiple languages. 
            </div>
          </div>
          <div>
            <Image
              src="/chat.jpeg"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-44 lg:h-80 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Q1 2025",
      content: (
        <div className="flex flex-col items-center">
          <p className="text-neutral-200 text-xs md:text-2xl font-bold mb-8">
            Public BETA Launch 🎉
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              🤔 Gather insights on how the LLM is performing
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              🤔 Gather insights on the target audience
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              🤔 Gather User Feedback
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              🤔 Prepare new Dataset and train LLM
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Q2 2025",
      content: (
        <div className="flex flex-col items-center">
          <p className="text-neutral-200 text-xs md:text-2xl font-bold mb-8">
           Stay Tuned ....
          </p>
          {/* <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              🤔 Gather insights on how the LLM is performing
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              🤔 Gather insights on the target audience
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              🤔 Gather User Feedback
            </div>
            <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-lg">
              🤔 Prepare new Dataset and train LLM
            </div>
          </div> */}
        </div>
      ),
    },
  ];
  return (
    <div className="w-full px-2 py-12" id="timeline">
      <Timeline data={data} />
    </div>
  );
}
