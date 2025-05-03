"use client";
import axios from "axios";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReservationModal({
  car,
  onClose,
  userId,
}: {
  car: Car;
  onClose: () => void;
  userId: number;
}) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [totalPrice, setTotalPrice] = useState<number>(car.pricePerDay);
  const router = useRouter();

  const calculateTotal = (start: Date | null, end: Date | null) => {
    if (!start || !end) return car.pricePerDay;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * car.pricePerDay;
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setTotalPrice(calculateTotal(start, end));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = "http://localhost:8080/reservation/create";
    const data = {
      carId: car.id,
      userId: userId,
      startDate: startDate,
      endDate: endDate,
      totalPrice: totalPrice,
    };
    console.log("Reservation submitted:", data);
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Reserve {car.brand} {car.model}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <img
              src={"http://localhost:8080/" + car.imageUrl}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">
                  {car.brand} {car.model}
                </h3>
                <p className="text-gray-600">{car.company?.name}</p>
              </div>
              <span className="text-xl font-bold text-blue-600">
                {car.pricePerDay} dt/day
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rental Period</label>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                minDate={new Date()}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-medium">{totalPrice} dt</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">{totalPrice} dt</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition duration-200"
            >
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
