import { title } from "process";
import { GlareCard } from "../ui/glare-card";
import { Globe, Lightbulb, LockKeyhole, Sparkle } from "lucide-react";

const GlareContent = [
  {
    title: "24/7 Availability",
    description:
      "Access government services and information anytime, anywhere. Our AI chatbot is always ready to assist you.",
    icon: <Globe size={25} />,
  },
  {
    title: "Intelligent Responses",
    description:
      "Get accurate and context-aware answers to your queries, powered by advanced natural language processing.",
    icon: <Lightbulb size={25} />,
  },
  {
    title: "Private LLM",
    description:
      "Complete government-related enquiries securely through our private LLM.",
    icon: <Sparkle size={25} />,
  },
  {
    title: "Blockchain Integrity",
    description:
      "Every communication is stamped via blockchain, ensuring data integrity and transparency.",
    icon: <LockKeyhole size={25} />,
  },
  {
    title: "Digital Counter",
    description:
      "Designed to streamline interactions between users and organizations, providing automated support, information with a focus on security and efficiency.",
    icon: <LockKeyhole size={25} />,
  },
  {
    title: "Digital Twin",
    description:
      "Virtual replica of physical government service processes, designed to simulate, monitor, and enhance real-world operations allowing data-driven management of government services.",
    icon: <LockKeyhole size={25} />,
  },
];

const KeyFeatures = () => {
  return (
    <div className="flex flex-col w-full items-center p-24">
      <div className="flex flex-col items-center text-center gap-4">
        <span className="text-blue-500 font-extrabold text-lg">
          Efficient Governance
        </span>
        <h1 className="text-3xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-bold py-4 max-w-5xl">
          Key Features of Our Government Digital Assistant
        </h1>
        <span className="text-neutral-300 text-lg font-semibold max-w-3xl">
          Discover how our AI-powered chatbot is revolutionizing
          citizen-government interactions with these innovative features.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
        {GlareContent.map((item, index) => (
          <GlareCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
