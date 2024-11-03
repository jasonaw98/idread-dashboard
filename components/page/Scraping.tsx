import { HoverEffect } from "../ui/card-hover-effect";
import { mouData } from "@/data/output";

const Scraping = () => {
  return (
    <div className="flex flex-col w-full items-center p-24" id="ministries">
      <div className="flex flex-col items-center text-center gap-4">
        <span className="text-blue-500 font-extrabold text-lg">
          Vast Knowledge
        </span>
        <h1 className="text-3xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-bold py-4 max-w-5xl">
          Multiple Ministry Coverage
        </h1>
        <span className="text-neutral-300 text-lg font-semibold max-w-3xl">
          AIDA is trained and tested on a variety of government ministries and
          data sources. We focus on getting the latest info and up to date
          knowledge.
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-16">
        <HoverEffect items={mouData} />
      </div>
    </div>
  );
};

export default Scraping;
