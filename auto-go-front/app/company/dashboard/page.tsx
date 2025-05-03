"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [statistics, setStatistics] = useState<Stistics | null>(null);
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  useEffect(() => {
    const url = "http://localhost:8080/rental-company/statistics/" + id;
    axios.get(url, { withCredentials: true }).then((response) => {
      setStatistics(response.data);
    });
  }, [id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Company Dashboard
      </h1>

      {statistics ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reservations Card - Full width on mobile, half on desktop */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-blue-100 rounded-xl">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-lg">Total Reservations</p>
                <p className="text-4xl font-bold text-gray-800">
                  {statistics.numberOfReservations}
                </p>
              </div>
            </div>
          </div>

          {/* Cars Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-green-100 rounded-xl">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 11l7-7 7 7M5 19l7-7 7 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-lg">Cars in Fleet</p>
                <p className="text-4xl font-bold text-gray-800">
                  {statistics.numberOfCars}
                </p>
              </div>
            </div>
          </div>

          {/* Clients Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-purple-100 rounded-xl">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-lg">Active Clients</p>
                <p className="text-4xl font-bold text-gray-800">
                  {statistics.numberOfClients}
                </p>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-orange-100 rounded-xl">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-lg">Total Revenue</p>
                <p className="text-4xl font-bold text-gray-800">
                  {formatCurrency(statistics.totalRevenue)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}
