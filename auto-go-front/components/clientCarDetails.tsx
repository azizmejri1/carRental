"use client";
import { useState } from "react";
import ReservationModal from "./ReservationModal";

export default function ClientCarDetails({
  car,
  userId,
}: {
  car: Car;
  userId: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center bg-white rounded-3xl shadow-xl p-6 m-6 w-72 hover:scale-105 transition-transform duration-300 ease-in-out">
        <img
          className="w-full h-[200px] object-cover rounded-2xl mb-4 border border-gray-200"
          src={"http://localhost:8080/" + car.imageUrl}
          alt="carPicture"
        />

        <h1 className="text-xl font-bold text-gray-800 mb-1 text-center">
          {car.brand} | {car.model}
        </h1>

        <span className="text-lg text-blue-600 font-semibold mb-4">
          {car.pricePerDay} dt{" "}
          <span className="text-sm text-gray-500">/ day</span>
        </span>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
        >
          Make a reservation
        </button>
      </div>

      {isModalOpen && (
        <ReservationModal
          car={car}
          userId={userId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
