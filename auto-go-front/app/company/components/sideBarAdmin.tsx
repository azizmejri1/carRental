"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SideBarAdmin({ name }: { name: string }) {
  const [id, setId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/auth/admin", {
        withCredentials: true,
      });
      const id = response.data.sub;
      setId(id);
    };
    fetchData();
  }, []);

  const logout = () => {
    axios
      .post("http://localhost:8080/auth/logout", {}, { withCredentials: true })
      .then((response) => {
        console.log("Logout successful:", response.data);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`sideBar flex flex-col h-screen w-full md:w-full fixed md:relative z-40 bg-white transition-all duration-300 ease-in-out ${
          isOpen ? "left-0" : "-left-full md:left-0"
        }`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-400">AutoGo</h1>
          <ul className="mt-5 space-y-3">
            <li>
              <Link
                href="/company/profile"
                className="block p-2 hover:bg-gray-100 rounded hover:text-blue-900"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/company/dashboard", query: { id: id } }}
                className="block p-2 hover:bg-gray-100 rounded hover:text-blue-900"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/company/car", query: { id: id } }}
                className="block p-2 hover:bg-gray-100 rounded hover:text-blue-900"
              >
                Manage cars
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/company/reservation", query: { id: id } }}
                className="block p-2 hover:bg-gray-100 rounded hover:text-blue-900"
              >
                Reservations
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row items-center p-4 mt-auto border-gray-200">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-12 h-12 md:w-16 md:h-16 rounded-xl mr-2"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-sm md:text-lg font-bold truncate">{name}</h2>
          </div>
          <button
            className="logout-button mr-2 block p-2 hover:bg-gray-100 rounded hover:text-blue-900 hover:cursor-pointer"
            onClick={logout}
          >
            logout
          </button>
        </div>
      </div>
    </>
  );
}
