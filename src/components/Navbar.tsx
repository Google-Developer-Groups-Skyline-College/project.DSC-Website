"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="relative">
      <nav className="bg-white fixed w-full z-10">
        <div className="max-w-full mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo/ClubName */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-3xl font-bold text-gray-800">
                Made an OOPS
              </Link>
            </div>

            {/* Menu Button (Mobile) */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
              >
                {/* Hamburger Icon */}
                <motion.svg
                  animate={isOpen ? "open" : "closed"}
                  className="w-6 h-6 text-gray-800"
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
            <div className="hidden lg:block">
              <div className="flex items-baseline space-x-5 text-gray-600 rounded-md text-lg font-medium">
                {[
                  { href: "/", text: "Home" },
                  { href: "/about", text: "About Us" },
                  { href: "/projects", text: "Data Projects" },
                  { href: "/teams", text: "Meet The Teams" },
                  { href: "/join", text: "Join Us" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-gray-900 px-3 py-2 transition-all duration-200 hover:scale-110"
                  >
                    {link.text}
                  </Link>
                ))}
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
                  className="lg:hidden fixed top-16 left-0 right-0 w-full z-10 bg-white bg-opacity-50 backdrop-blur-lg shadow-md overflow-hidden"
                >
                  <motion.div
                    variants={staggerChildren}
                    className="flex flex-col space-y-5 p-4"
                  >
                    {[
                      { href: "/", text: "Home" },
                      { href: "/about", text: "About Us" },
                      { href: "/projects", text: "Data Projects" },
                      { href: "/teams", text: "Meet The Teams" },
                      { href: "/join", text: "Join Us" },
                    ].map((link) => (
                      <motion.div key={link.href} variants={linkVariants}>
                        <Link
                          href={link.href}
                          className="block text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 active:bg-white"
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
      </nav>
    </div>
  );
};

export default Navbar;
