"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    name: string;
    scrape: boolean | null;
    date: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card status={item.scrape}>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.date}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  status,
}: {
  className?: string;
  status: boolean | null;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-gray-900 border border-white/[0.2] group-hover:border-slate-700 relative z-20 shadow-inner shadow-white/30",
        className
      )}
    >
      <div className="relative z-50">
        <div className="w-full flex justify-end">
          <span
            className={cn(
              "w-3 h-3 rounded-full",
              status ? "bg-emerald-400 shadow-[0_0px_20px_3px_rgba(56,211,153.1)]" : "bg-red-400 shadow-[0_0px_20px_3px_rgba(248,114,113.1)]",
              status === null && "bg-yellow-400 shadow-[0_0px_20px_3px_rgba(251,204,22.1)]"
            )}
          ></span>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-zinc-100 font-bold tracking-wide mt-4 rounded-full text-xs",
        className
      )}
    >
      <button className="px-8 py-2 rounded-full relative bg-slate-800 text-white text-xs hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600 cursor-default">
        <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
        <span className="relative z-20">{children}</span>
      </button>
    </h4>
  );
};
