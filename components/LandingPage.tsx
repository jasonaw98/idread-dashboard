import { mouData } from "@/data/output";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { AnimatedBeamMultipleOutputDemo } from "./AnimatedBream";
import { Bot, ShieldEllipsis, Sparkle, TvMinimal } from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import SpotlightCard from "../components/ui/Spotlightcard";

interface StickyHoverImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const cardData = [
  {
    title: "AIDA",
    description:
      "AIDA is an AI Digital Assistant designed to streamline interactions between users and organizations, providing automated support, information, and task completion with a focus on security and efficiency.",
    icon: <Bot size={40} />,
    className: "bg-[#e9c46a]",
  },
  {
    title: "Digital Counter",
    description:
      "TThe Digital Counter by AIDA is a virtual service point where users can access government services, make inquiries, submit documents, and complete tasks online with AI support, reducing the need for in-person visits.",
    icon: <TvMinimal size={40} />,
    className: "bg-[#f4a261]",
  },
  {
    title: "Digital Twin",
    description:
      "The Digital Twin by AIDA is a virtual replica of physical government service processes, designed to simulate, monitor, and enhance real-world operations. By using AI and real-time data, it mirrors activities, analyzes performance, and anticipates service needs, allowing for more efficient and data-driven management of government services.",
    icon: <Sparkle size={40} />,
    className: "bg-[#2a9d8f]",
  },
  {
    title: "Security",
    description:
      "AIDA secures all inputs and outputs on blockchain, displaying information with a blockchain-verified QR code for easy authentication and an invisible blockchain watermark on every output, ensuring data integrity and transparency.",
    icon: <ShieldEllipsis size={40} />,
    className: "bg-[#ffca3a]",
  },
];

function StickyHoverImage({ src, alt, width, height }: StickyHoverImageProps) {
  return (
    <div className="fixed left-10 top-1/4 transform -translate-y-1/2 z-50 transition-all duration-300 ease-in-out hover:scale-110 scale-50">
      <div className="flex justify-center font-bold text-lg">
        Chat on
        <p className="text-green-400"> &nbsp;WhatsApp</p>
      </div>
      <Link
        href={"https://api.whatsapp.com/send?phone=60142889860"}
        target="_blank"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="shadow-lg rounded-lg"
        />
      </Link>
    </div>
  );
}

const LandingPage = async () => {
  const user = await currentUser();
  const { orgId } = auth();
  return (
    <div className="flex flex-col items-center h-screen w-full text-center">
      <header className="bg-gray-800 text-white w-full">
        <div className="container mx-auto px-12 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot size={40} />
            <span className="text-2xl font-bold tracking-widest">AIDA</span>
          </div>
          <nav className="flex space-x-4 font-bold items-center">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link
              href="https://api.whatsapp.com/send?phone=60142889860"
              target="_blank"
              className="hover:underline"
              data-umami-event="whatsapp button"
            >
              Whatsapp
            </Link>
            {(user && orgId === process.env.NEXT_ORGID_DEMO) ||
            orgId === process.env.NEXT_ORGID_INTERNAL ? (
              <div className="flex gap-4 items-center">
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
                >
                  DIGITAL TWIN
                </Link>
              </div>
            ) : null}
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>
        </div>
      </header>

      <div className="flex w-full py-20 bg-gray-50 justify-between px-20 items-center gap-8">
        <div className="flex flex-col w-full max-w-5xl gap-8">
          {/* <div className="text-2xl lg:text-4xl font-bold">
            JABATAN DIGITAL NEGARA
          </div> */}
          <div className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 py-2">
            INTRODUCING AIDA
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-neutral-800">
            <span className="text-pink-500 text-4xl">A</span>rtificial{" "}
            <span className="text-pink-500 text-4xl">I</span>ntelligence{" "}
            <span className="text-pink-500 text-4xl">D</span>igital{" "}
            <span className="text-pink-500 text-4xl">A</span>ssistant
          </div>
        </div>

        <div className="w-[38rem]">
          <Image
            src="/chat.jpeg"
            alt="Hero"
            width={360}
            height={200}
            className="rounded-lg shadow-xl -rotate-1 drop-shadow-2xl hover:rotate-2 duration-300"
          />
        </div>
      </div>

      <StickyHoverImage
        src="/whatsappaida.png"
        alt="User"
        width={200}
        height={200}
      />

      <div className="w-full mt-10 px-8">
        <SpotlightCard cards={cardData} />
      </div>

      <div className="w-full">
        <AnimatedBeamMultipleOutputDemo />
      </div>

      <div className="flex flex-col items-center w-full mt-8 max-w-7xl">
        <div className="text-xl lg:text-3xl font-bold">
          Model trained on Data from Ministers{" "}
        </div>
        <div className="flex flex-wrap p-4 gap-4 justify-center font-semibold">
          {mouData.map((mou, index) => (
            <div
              key={index}
              className="even:hover:rotate-3 duration-300 ease-in-out hover:-rotate-3 transform hover:-translate-y-1 hover:scale-110"
            >
              <div
                className={cn(
                  "bg-white border border-border rounded-xl p-4 w-48 h-40 flex justify-center items-center text-center shadow-lg",
                  mou.scrape ? "bg-emerald-300" : "bg-blue-300",
                  mou.scrape === null && "bg-yellow-300"
                )}
              >
                {mou.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8 w-full mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Departments
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Contact Information
              </h3>
              <p>VENUS ADVANCE TECHNOLOGY SDN. BHD.</p>
              <p>Sunway Nexis Biz Suite Block,</p>
              <p>C-16-05,Jln Pju 5/1, Kota Damansara,</p>
              <p>47810, Petaling Jaya,</p>
              <p>Selangor, Malaysia.</p>
              <p>Email: yow@venus.my</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
