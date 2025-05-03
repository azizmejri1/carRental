"use client";
import axios from "axios";
import Link from "next/link";
import {
  PencilIcon,
  TrashIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CarDetails({
  car,
  companyId,
}: {
  car: Car;
  companyId: number | undefined;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteCar = async () => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:8080/car/${car.id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting car:", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative pb-2/3 h-48">
        <img
          className="absolute h-full w-full object-cover"
          src={`http://localhost:8080/${car.imageUrl}`}
          alt={`${car.brand} ${car.model}`}
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{car.brand}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {car.pricePerDay} DT/day
          </span>
        </div>

        <p className="text-gray-600 mb-4">{car.model}</p>

        <div className="flex flex-col space-y-2">
          <Link
            href={{
              pathname: "/company/car/edit/" + car.id,
              query: { companyId: companyId },
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <PencilIcon className="h-4 w-4" />
            Edit
          </Link>

          <button
            onClick={deleteCar}
            disabled={isDeleting}
            className={`flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors ${
              isDeleting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <TrashIcon className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>

          <Link
            href={{
              pathname: "/company/car/reservations/" + car.id,
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
          >
            <CalendarIcon className="h-4 w-4" />
            Reservations
          </Link>
        </div>
      </div>
    </div>
  );
}
