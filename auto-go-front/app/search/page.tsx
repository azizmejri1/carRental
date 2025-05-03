"use client";
import ClientCarDetails from "@/components/clientCarDetails";
import FilterSideBar from "@/components/filterSideBar";
import Navbar from "@/components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Search() {
  const [availableOptions, setAvailableOptions] = useState<Filter>({
    model: [],
    brand: [],
    pricePerDay: [0, 1000], // Default range
    company: [],
  });

  const [filter, setFilter] = useState<Filter>({
    model: [],
    brand: [],
    pricePerDay: [0, 1000], // Default range
    company: [],
  });

  const [allCars, setAllCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(0);

  // Fetch user profile
  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/profile", {
        withCredentials: true,
      })
      .then((response) => {
        const { sub, username, name } = response.data;
        setUsername(username);
        setName(name);
        setLogged(true);
        setUserId(sub);
      })
      .catch(console.error);
  }, []);

  // Load and initialize cars
  useEffect(() => {
    const loadCars = () => {
      try {
        const result = localStorage.getItem("searchResults");
        if (!result) {
          setLoading(false);
          return;
        }

        const cars: Car[] = JSON.parse(result);
        if (!Array.isArray(cars)) {
          console.error("Invalid car data format");
          setLoading(false);
          return;
        }

        // Set all cars first
        setAllCars(cars);
        setFilteredCars(cars);

        // Then calculate available options
        const brands = new Set<string>();
        const models = new Set<string>();
        const companies = new Set<string>();
        const prices: number[] = [];

        cars.forEach((car) => {
          if (car?.brand) brands.add(car.brand);
          if (car?.model) models.add(car.model);
          if (car?.company?.name) companies.add(car.company.name);
          if (typeof car?.pricePerDay === "number")
            prices.push(car.pricePerDay);
        });

        const minPrice = prices.length ? Math.min(...prices) : 0;
        const maxPrice = prices.length ? Math.max(...prices) : 1000;

        setAvailableOptions({
          model: Array.from(models),
          brand: Array.from(brands),
          pricePerDay: [minPrice, maxPrice],
          company: Array.from(companies),
        });

        setFilter((prev) => ({
          ...prev,
          pricePerDay: [minPrice, maxPrice],
        }));
      } catch (error) {
        console.error("Error loading cars:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!allCars.length) return;

    const filtered = allCars.filter((car) => {
      if (!car) return false;

      // Brand filter
      if (filter.brand.length && !filter.brand.includes(car.brand)) {
        return false;
      }

      // Model filter
      if (filter.model.length && !filter.model.includes(car.model)) {
        return false;
      }

      // Company filter
      if (
        filter.company.length &&
        (!car.company || !filter.company.includes(car.company.name))
      ) {
        return false;
      }

      // Price filter
      if (
        typeof car.pricePerDay !== "number" ||
        car.pricePerDay < filter.pricePerDay[0] ||
        car.pricePerDay > filter.pricePerDay[1]
      ) {
        return false;
      }

      return true;
    });

    setFilteredCars(filtered);
  }, [filter, allCars]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar logged={logged} name={name} />
      <div className="flex">
        <FilterSideBar
          availableOptions={availableOptions}
          filter={filter}
          setFilter={setFilter}
        />

        <div className="flex-1 p-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"}{" "}
              found
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <ClientCarDetails key={car.id} car={car} userId={userId} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">
                  {allCars.length === 0
                    ? "No cars available"
                    : "No cars match your filters"}
                </p>
                {allCars.length > 0 && (
                  <button
                    onClick={() =>
                      setFilter({
                        model: [],
                        brand: [],
                        pricePerDay: availableOptions.pricePerDay,
                        company: [],
                      })
                    }
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
