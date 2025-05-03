"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ShowCars from "../components/showCars";
import AddCar from "../components/addCar";

export default function CarPage() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="w-full p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div>
        {showAddForm ? (
          <AddCar id={id} showAvailable={() => setShowAddForm(false)} />
        ) : (
          <ShowCars id={id} addCar={() => setShowAddForm(true)} />
        )}
      </div>
    </div>
  );
}
