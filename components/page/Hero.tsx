import React from "react";
import { Spotlight } from "../ui/Spotlight";
import { TextAnimate } from "../ui/text-animate";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Hero() {
  return (
    <div
      className="min-h-screen w-full rounded-md flex items-center justify-center antialiased bg-grid-white/[0.04] relative overflow-hidden"
      id="home"
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black/70 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="max-w-7xl w-full items-center flex flex-col gap-4">
        <div className="z-10 flex mb-4 items-center justify-center">
          <TooltipProvider delayDuration={0} skipDelayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={cn(
                    "group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer border-white/10 bg-neutral-900 backdrop-blur-xl hover:bg-white/10 hover:border-white/30 hover:text-white/90 hover:shadow-lg hover:shadow-white/30"
                  )}
                >
                  <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 font-semibold transition ease-outhover:duration-300 text-neutral-400">
                    <span>✨ Launching Soon...</span>
                    <TooltipContent side="right" className="bg-transparent">
                      <p className="w-52 text-center text-sm rounded-2xl shadow-2xl border border-white/10 bg-white/5 p-4 font-bold">
                        We will be launching AIDA BETA version on Jan 2025. Stay
                        tuned for the launch!
                      </p>
                    </TooltipContent>
                  </AnimatedShinyText>
                </div>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </div>

        <TextAnimate
          text="Empowering Citizens With"
          type="rollIn"
          className="text-4xl md:text-6xl font-extrabold text-center text-white"
        />
        <span className="text-4xl md:text-7xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-br from-green-300  to-blue-600">
          AI-Powered Government Services
        </span>
        {/* <span className="w-full flex bg-gradient-to-r from-sky-500 to-indigo-600 h-0.5"/> */}
        <p className="text-blue-200 font-semibold text-center max-w-3xl text-lg mt-4">
          Experience seamless interaction with government services through our
          state-of-the-art
          <span className="font-semibold text-center text-yellow-400">
            &nbsp;National LLM.&nbsp;
          </span>
          Get instant answers, guidance, and support 24/7.
        </p>
      </div>
    </div>
  );
}
