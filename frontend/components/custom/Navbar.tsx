"use client";

import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";
import LogoFull from "./LogoFull";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <nav className="navbar">
      <div className="hidden lg:block">
        <LogoFull />
      </div>
      <div className="block lg:hidden">
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" width={46} height={44} />
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <NavItems />
        <SignedOut>
          <SignInButton>
            <button className="btn-signin">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
