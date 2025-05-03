"use client";
import { useEffect, useState } from "react";
import CarDetails from "./carDetails";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function ShowCars({
  id,
  addCar,
}: {
  id: number | undefined;
  addCar: () => void;
}) {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/car/findByCompany/${id}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Fleet</h1>
        <button
          onClick={addCar}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          Add New Car
        </button>
      </div>

      {cars.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No cars available in your fleet yet.</p>
          <button
            onClick={addCar}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Your First Car
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarDetails key={car.id} car={car} companyId={id} />
          ))}
        </div>
      )}
    </div>
  );
}
