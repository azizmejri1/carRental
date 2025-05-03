"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Edit() {
  const params = useParams();
  const router = useRouter();
  const [carId, setCarId] = useState(params.id);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [rentalCompanyId, setRentalCompanyId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminRes, carRes] = await Promise.all([
          axios.get("http://localhost:8080/auth/admin", {
            withCredentials: true,
          }),
          axios.get(`http://localhost:8080/car/findByCarId/${Number(carId)}`, {
            withCredentials: true,
          }),
        ]);

        setRentalCompanyId(adminRes.data.sub);

        const car: Car = carRes.data;
        setBrand(car.brand);
        setModel(car.model);
        setPricePerDay(car.pricePerDay);
        setCurrentImage(`http://localhost:8080/${car.imageUrl}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [carId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("model", model);
    formData.append("brand", brand);
    formData.append("pricePerDay", pricePerDay.toString());
    if (image) formData.append("image", image);

    try {
      await axios.put(`http://localhost:8080/car/${carId}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push(`/company/car?id=${rentalCompanyId}`);
    } catch (error) {
      console.error("Error updating car:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push(`/company/car?id=${rentalCompanyId}`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Cars
        </button>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              Edit Car Details
            </h2>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                  {currentImage && (
                    <div className="mb-3">
                      <img
                        src={currentImage}
                        alt="Current car"
                        className="h-32 w-full object-contain mb-2 rounded"
                      />
                      <p className="text-xs text-gray-500">Current image</p>
                    </div>
                  )}
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
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Upload a new image to replace the current one
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
