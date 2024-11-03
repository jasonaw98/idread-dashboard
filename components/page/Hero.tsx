import React from "react";
import { Spotlight } from "../ui/Spotlight";
import { TextAnimate } from "../ui/text-animate";
import Link from "next/link";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { cn } from "@/lib/utils";

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
          <Link href={"#aida"}>
            <div
              className={cn(
                "group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer border-white/10 bg-neutral-900 backdrop-blur-xl hover:bg-white/10 hover:border-white/30 hover:text-white/90 hover:shadow-lg hover:shadow-white/30"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 font-semibold transition ease-outhover:duration-300 text-neutral-400">
                <span>✨ Introducing AIDA</span>
              </AnimatedShinyText>
            </div>
          </Link>
        </div>

        <TextAnimate
          text="Empowering Citizens With"
          type="rollIn"
          className="text-4xl md:text-6xl font-extrabold text-center text-white"
        />
        <span className="text-4xl md:text-7xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-br from-green-300  to-blue-600">
          AI-Powered Government Services
        </span>
        <p className="text-blue-200 font-semibold text-center max-w-3xl text-lg mt-4">
          Experience seamless interaction with government services through our
          state-of-the-art AI chatbot. Get instant answers, guidance, and
          support 24/7.
        </p>
      </div>
    </div>
  );
}
