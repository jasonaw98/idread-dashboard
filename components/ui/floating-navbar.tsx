"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

interface Props {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
    target?: string;
  }[];
  className?: string;
  member?: boolean | null;
  children?: React.ReactNode;
}

export const FloatingNav = ({
  navItems,
  className,
  children,
  member,
}: Props) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-8 inset-x-0 mx-auto border border-slate-700 rounded-full bg-white/10 backdrop-blur-md saturate-150 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-9 py-5  items-center justify-center space-x-1 md:space-x-8",
          className
        )}
      >
        <Link href="/">
          <Image
            src={"/chatbot.jpeg"}
            width={40}
            height={20}
            className="scale-125 rounded-full"
            alt="logo"
          />
        </Link>
        {navItems.map((navItem: any, idx: number) => (
          <Link
            data-umami-event={navItem.name}
            key={`link=${idx}`}
            href={navItem.link}
            target={navItem.target}
            className={cn(
              "relativetext-neutral-50 items-center flex space-x-1 font-semibold dark:hover:text-neutral-300 hover:text-neutral-400 text-white"
            )}
          >
            {/* <span className="block sm:hidden">{navItem.icon}</span> */}
            <span className="hidden sm:block text-md">{navItem.name}</span>
          </Link>
        ))}
        {member && (
          <div className="flex space-x-3 md:space-x-8 items-center text-white font-bold">
            <Link
              href="/dashboard"
              className="hover:underline"
              data-umami-event="Dashboard button"
            >
              Dashboard
            </Link>
            <Link
              href="https://aida.zygy.com"
              target="_blank"
              className="hover:underline"
              data-umami-event="Dashboard button"
              prefetch
            >
              Digital Twin
            </Link>
          </div>
        )}
        <div className="text-white font-bold hover:text-neutral-400 flex pl-2">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
