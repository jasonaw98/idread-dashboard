
import Link from "next/link";
import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Hero } from "./page/Hero";
import { FloatingNav } from "./ui/floating-navbar";
import KeyFeatures from "./page/KeyFeatures";
import Aida from "./page/Aida";
import Scraping from "./page/Scraping";
import Faq from "./page/Faq";

const navItems = [
  {
    name: "Home",
    link: "#home",
    // icon: <Homesvg/>
  },
  {
    name: "Ministries",
    link: "#ministries",
    // icon: <Projectsvg/>
  },
  {
    name: "Whatsapp",
    link: "https://api.whatsapp.com/send?phone=60142889860",
    target: "blank",
    // icon: <Resumesvg/>
  },
];

const LandingPage = async () => {
  const user = await currentUser();
  const { orgId } = auth();
  const isAdmin = user && (orgId === process.env.NEXT_ORGID_DEMO || orgId === process.env.NEXT_ORGID_INTERNAL);

  return (
    <div className="flex flex-col items-center h-screen w-full text-center">
      <FloatingNav navItems={navItems} member={isAdmin}/>
      <Hero />
      <Aida/>
      <KeyFeatures/>
      <Scraping/>
      <Faq/>

      <footer className="text-white py-8 w-full mt-8">
        <div className="container mx-auto px-4">
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          </div> */}
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
