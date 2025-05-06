"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar({
  logged,
  name,
  role,
}: {
  logged: boolean;
  name: string;
  role?: string | null;
}) {
  const logout = () => {
    axios
      .post("http://localhost:8080/auth/logout", {}, { withCredentials: true })
      .then((response) => {
        console.log("Logout successful:", response.data);
        window.location.href = "/"; // Redirect to login page after logout
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-blue-400">AutoGo</h1>
            </Link>
          </div>

          <div className="hidden md:block">
            {logged ? (
              <div className="ml-4 flex items-center space-x-4">
                <span className="text-gray-300 font-medium">
                  Welcome, {name}
                </span>

                {role == "user" ? (
                  <Link
                    href="/profile"
                    className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150 ease-in-out"
                    title="Profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </Link>
                ) : (
                  <></>
                )}

                <button
                  onClick={logout}
                  className="p-2 rounded-full hover:cursor-pointer text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150 ease-in-out"
                  title="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="ml-4 flex items-center space-x-4">
                <Link
                  href="/company/register"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150 ease-in-out"
                >
                  Become a partner
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 hover:cursor-pointer rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {logged ? (
            <>
              <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-300">
                Welcome, {name}
              </div>

              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Profile
              </Link>

              <button
                onClick={logout}
                className="flex hover:cursor-pointer items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/company/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Become a partner
              </Link>
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
