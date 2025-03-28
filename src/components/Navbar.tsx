"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";

import { Text } from "./ui/Text";
import { ThemeToggle } from "./theme/ThemeToggle";

interface NavbarProps {
  progress?: MotionValue<number>;
}

const Navbar = ({ progress }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only render theme-specific elements after component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        opacity: { duration: 0.2 },
        height: { duration: 0.3, delay: 0.1 },
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        opacity: { duration: 0.3 },
        height: { duration: 0.3 },
      },
    },
  };

  const linkVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        opacity: { duration: 0.1 },
        y: { duration: 0.1 },
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        opacity: { duration: 0.2, delay: 0.1 },
        y: { duration: 0.2, delay: 0.1 },
      },
    },
  };

  const staggerChildren = {
    open: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  let opacity1, opacity2;

  if (progress) {
    opacity1 = useTransform(progress, [0, 0.9, 1], [0.5, 0.8, 1]);
    opacity2 = useTransform(progress, [0, 0.9, 1], [0.3, 0.6, 1]);
  }

  return (
    <div className="relative h-16">
      <nav className="bg-background fixed w-full z-10 border-border transition-colors duration-300 h-16">
        <div className="max-w-full mx-auto px-6 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo/ClubName */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex ">
                <Image
                  src="/logo.svg"
                  alt="DSC Logo"
                  width={60}
                  height={60}
                  style={{ height: "auto" }}
                  className="mr-2"
                />
                <span className="hidden md:inline-block">
                  <Text
                    size="h4"
                    font="title"
                    className="py-2.5 transform transition-all duration-200 ease-out hover:text-primary hover:scale-105"
                    style={{
                      transition:
                        "transform 200ms ease-out, color 50ms ease-out",
                    }}
                  >
                    Data Science Club
                  </Text>
                </span>
              </Link>
            </div>

            {/* Menu Button (Mobile) */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* Theme Toggle Button (Mobile) */}
              {mounted && <ThemeToggle />}
              {/* Hamburger Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-secondary hover:bg-accent focus:outline-none transition-colors duration-300"
              >
                {/* Hamburger Icon */}
                <motion.svg
                  animate={isOpen ? "open" : "closed"}
                  className="w-6 h-6 text-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={{
                      closed: { d: "M4 6h16M4 12h16M4 18h16" },
                      open: { d: "M6 18L18 6M6 6l12 12" },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.svg>
              </button>
            </div>

            {/* Normal Desktop Navigation Links */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-baseline space-x-5 text-foreground rounded-md text-lg font-medium transition-colors duration-100 font-[Blanka] tracking-widest">
                {[
                  { href: "/", text: "Home" },
                  { href: "/about", text: "About Us" },
                  { href: "/projects", text: "Data Projects" },
                  { href: "/meet", text: "Meet The Team" },
                  { href: "/join", text: "Join Us" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 hover:scale-110"
                    style={{
                      transition: "transform 200ms ease, color 50ms ease",
                    }}
                  >
                    <Text
                      font="title"
                      size="h5"
                      weight="semibold"
                      className="hover:text-primary transition-colors duration-50"
                    >
                      {link.text}
                    </Text>
                  </Link>
                ))}

                {/* Theme Toggle Button (Desktop) - Only render after mounting */}
                {mounted && <ThemeToggle />}
              </div>
            </div>

            {/* Mobile Navigation Menu (Dropdown) */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                  className="lg:hidden fixed top-16 left-0 right-0 w-full z-10 bg-background bg-opacity-50 backdrop-blur-lg shadow-md overflow-hidden transition-colors duration-300 font-[Blanka] tracking-widest"
                >
                  <motion.div
                    variants={staggerChildren}
                    className="flex flex-col space-y-5 p-4"
                  >
                    {[
                      { href: "/", text: "Home" },
                      { href: "/about", text: "About Us" },
                      { href: "/projects", text: "Data Projects" },
                      { href: "/meet", text: "Meet The Team" },
                      { href: "/join", text: "Join Us" },
                    ].map((link) => (
                      <motion.div key={link.href} variants={linkVariants}>
                        <Link
                          href={link.href}
                          className="block text-text hover:text-text px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 active:bg-accent"
                        >
                          {link.text}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Integrated Progress Bar - Only render if progress is provided */}
        {progress && (
          <motion.div className="absolute bottom-0 left-0 w-full h-1 bg-background">
            <motion.div
              className="h-full bg-primary relative origin-left"
              style={{ scaleX: progress }}
            >
              <motion.div
                className="absolute right-0 top-0 h-full w-8 bg-secondary"
                style={{
                  filter: "blur(8px)",
                  opacity: opacity1,
                }}
              />
              <motion.div
                className="absolute right-0 top-0 h-full w-4 bg-secondary"
                style={{
                  filter: "blur(12px)",
                  opacity: opacity2,
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
