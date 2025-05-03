import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function SearchForm() {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickUpDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = "http://localhost:8080/car/findCarsByDate";
    const data = { location, pickUpDate: pickupDate, returnDate };
    const options = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(url, data, options)
      .then((response) => {
        localStorage.setItem("searchResults", JSON.stringify(response.data));
        router.push("/search");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="w-full max-w-5xl bg-white rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Location Field */}
        <div className="w-full md:w-2/5 p-4 border-b md:border-b-0 md:border-r border-gray-200">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
          >
            <FaMapMarkerAlt className="mr-2 text-blue-500" />
            Pick-up Location
          </label>
          <div className="relative">
            <input
              type="text"
              id="location"
              name="location"
              placeholder="City, airport, or address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        {/* Date Fields */}
        <div className="w-full md:w-2/5 flex flex-col sm:flex-row">
          {/* Pickup Date */}
          <div className="w-full sm:w-1/2 p-4 border-b sm:border-b-0 sm:border-r border-gray-200">
            <label
              htmlFor="pickup"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <FaCalendarAlt className="mr-2 text-blue-500" />
              Pick-up Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="pickup"
                name="pickup"
                value={pickupDate}
                onChange={(e) => setPickUpDate(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Return Date */}
          <div className="w-full sm:w-1/2 p-4">
            <label
              htmlFor="return"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <FaCalendarAlt className="mr-2 text-blue-500" />
              Return Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="return"
                name="return"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Search Button - Now properly sized */}
        <div className="w-full md:w-1/5 flex items-center justify-center p-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full h-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
          >
            <FaSearch className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
