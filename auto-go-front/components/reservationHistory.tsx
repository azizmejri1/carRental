"use client";
import { useEffect, useState } from "react";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function ReservationHistory({
  userId,
}: {
  userId: number | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [reservations, setReservations] = useState<Reservations[]>([]);
  // Mock data - replace with actual data from your API
  useEffect(() => {
    if (userId === null) return;

    axios
      .get(
        `http://localhost:8080/reservation/getReservationsByUser/${userId}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const responseReservations: Reservation[] = response.data;
        const reservations: Reservations[] = responseReservations.map(
          (r: any) => ({
            id: r.id,
            date: r.startDate,
            location: r.location,
            totalPrice: r.totalPrice,
          })
        );
        setReservations(reservations);
      })
      .catch((error) => {
        console.error("Failed to fetch reservations:", error);
      });
  }, [userId]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 flex-1 hover:shadow-lg transition-shadow duration-300">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full hover:cursor-pointer text-lg font-medium text-gray-900 mb-4 flex items-center hover:text-indigo-700 transition-colors duration-300"
        >
          <ClockIcon className="h-5 w-5 text-indigo-600 mr-2" />
          View Reservation History
        </button>
        <p className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300">
          Click to view your past and upcoming reservations
        </p>
      </div>

      {/* Reservation Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-between items-center border-b border-gray-200 p-4 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <ClockIcon className="h-6 w-6 text-indigo-600 mr-2" />
                Reservation History
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors duration-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors duration-300">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors duration-300">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors duration-300">
                        total price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reservations.map((reservation) => (
                      <tr
                        key={reservation.id}
                        className="hover:bg-gray-50 transition-colors duration-300"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reservation.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reservation.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reservation.totalPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-3 sm:px-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex hover:cursor-pointer justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none transition-colors duration-300 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
