"use client";

import {
  OrganizationSwitcher,
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import React from "react";

const ClerkHeader = () => {
  return (
    <header className="flex bg-transparent absolute top-8 right-8 gap-8">
      <OrganizationSwitcher
        hidePersonal={true}
        appearance={{
          elements: {
            userButtonAvatarBox: {
              width: "2rem",
              height: "2rem",
            },
          },
          variables: {
            fontSize: "1rem",
          },
        }}
      >
        <OrganizationSwitcher.OrganizationProfilePage label="members" />
        <OrganizationSwitcher.OrganizationProfilePage label="general" />
      </OrganizationSwitcher>
      <SignedIn>
        <UserButton
          showName
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "2rem",
                height: "2rem",
              },
            },
            variables: {
              fontSize: "1rem",
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
};

export default ClerkHeader;
