"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white">
      <div className="max-w-full mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo?ClubName? */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-bold text-gray-800">
              Made an OOPS
            </Link>
          </div>

          {/* Menu Button (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
              {/* Hamburger Icon */}
              <svg
                className={`w-6 h-6 text-gray-800 transition-transform duration-300 ease-out ${
                  isOpen ? "rotate-90" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {isOpen ? (
                  /* Close (X) Icon */
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  /* Three-Line Hamburger */
                  <>
                    <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round" />
                    <line
                      x1="4"
                      y1="12"
                      x2="20"
                      y2="12"
                      strokeLinecap="round"
                    />
                    <line
                      x1="4"
                      y1="18"
                      x2="20"
                      y2="18"
                      strokeLinecap="round"
                    />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Normal Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-5 text-gray-600 rounded-md text-lg font-medium">
              <Link href="/" className="hover:text-gray-900 px-3 py-2">
                Home
              </Link>
              <Link href="/about" className="hover:text-gray-900 px-3 py-2">
                About
              </Link>
              <Link href="/teams" className="hover:text-gray-900 px-3 py-2">
                Teams
              </Link>
              <Link href="/contact" className="hover:text-gray-900 px-3 py-2">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu (Dropdown) */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 w-full h-full z-10 flex flex-col space-y-5 bg-white p-4 shadow-md ">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/teams"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Teams
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
