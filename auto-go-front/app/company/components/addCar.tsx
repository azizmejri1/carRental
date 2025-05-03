"use client";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function AddCar({
  id,
  showAvailable,
}: {
  id: number;
  showAvailable: () => void;
}) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("model", model);
    formData.append("brand", brand);
    formData.append("pricePerDay", pricePerDay.toString());
    formData.append("rentalCompanyId", id.toString());
    if (image) formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8080/car/create", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        showAvailable();
      } else {
        console.error("Error adding car");
      }
    } catch (error) {
      console.error("Error adding car:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={showAvailable}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Back to available cars
      </button>

      <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Car</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Brand
            </label>
            <input
              value={brand}
              type="text"
              id="brand"
              name="brand"
              placeholder="e.g. Toyota"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Model
            </label>
            <input
              value={model}
              type="text"
              id="model"
              name="model"
              placeholder="e.g. Corolla"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="pricePerDay"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price per day (DT)
            </label>
            <input
              value={pricePerDay || ""}
              type="number"
              id="pricePerDay"
              name="pricePerDay"
              placeholder="e.g. 100"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setPricePerDay(Number(e.target.value))}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Car Image
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Adding..." : "Add Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
