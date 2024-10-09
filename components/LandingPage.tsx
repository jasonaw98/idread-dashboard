import { mouData } from "@/data/output";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface StickyHoverImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

function StickyHoverImage({ src, alt, width, height }: StickyHoverImageProps) {
  return (
    <div className="fixed right-10 lg:right-20 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ease-in-out hover:scale-110 scale-50">
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

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-full text-center">
      <header className="bg-gray-800 text-white w-full">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">AIDA</span>
          </div>
          <nav className="flex space-x-4 font-bold">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link
              href="https://api.whatsapp.com/send?phone=60142889860"
              target="_blank"
              className="hover:underline"
            >
              Whatsapp
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex w-full py-20 bg-gray-50 justify-between px-20 items-center">
        <div className="flex flex-col w-full max-w-5xl gap-8">
          <div className="text-2xl lg:text-5xl font-bold">
            JABATAN DIGITAL NEGARA
          </div>
          <div className="text-2xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 py-2">
            INTRODUCING AIDA
          </div>
          <div className="text-2xl lg:text-5xl font-bold text-neutral-800">
            Artificial Intelligence Digital Assistant
          </div>
          <div className="text-xl lg:text-4xl font-bold">
            Your Digital Counter
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

      <div className="flex flex-col items-center w-full mt-8 max-w-7xl">
        <div className="text-xl lg:text-3xl font-bold">
          Model trained on Data from{" "}
        </div>
        <div className="flex flex-wrap p-4 gap-4 justify-center font-semibold">
          {mouData.map((mou, index) => (
            <div key={index} className="even:hover:rotate-3 duration-300 ease-in-out hover:-rotate-3 transform hover:-translate-y-1 hover:scale-110">
              <div
                className={cn(
                  "bg-white border border-border rounded-xl p-4 w-48 h-40 flex justify-center items-center text-center shadow-lg",
                  mou.scrape ? "bg-emerald-300" : "bg-blue-300"
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
