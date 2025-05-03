"use client";

import { Slider } from "@mui/material"; // You can use other UI libraries or custom components
import { useEffect, useState } from "react";

type FilterSideBarProps = {
  availableOptions: Filter;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export default function FilterSideBar({
  availableOptions,
  filter,
  setFilter,
}: FilterSideBarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>(
    availableOptions.pricePerDay
  );

  // Update price range when available options change
  useEffect(() => {
    setPriceRange(availableOptions.pricePerDay);
    setFilter({
      ...filter,
      pricePerDay: availableOptions.pricePerDay,
    });
  }, [availableOptions.pricePerDay]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    setFilter({
      ...filter,
      brand: checked
        ? [...filter.brand, brand]
        : filter.brand.filter((b) => b !== brand),
    });
  };

  const handleModelChange = (model: string, checked: boolean) => {
    setFilter({
      ...filter,
      model: checked
        ? [...filter.model, model]
        : filter.model.filter((m) => m !== model),
    });
  };

  const handleCompanyChange = (company: string, checked: boolean) => {
    setFilter({
      ...filter,
      company: checked
        ? [...filter.company, company]
        : filter.company.filter((c) => c !== company),
    });
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const newRange = newValue as [number, number];
    setPriceRange(newRange);
  };

  const handlePriceCommit = (event: any, newValue: number | number[]) => {
    const newRange = newValue as [number, number];
    setFilter({
      ...filter,
      pricePerDay: newRange,
    });
  };

  return (
    <div className="w-64 p-4 bg-white shadow-md">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price per day</h3>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          onChangeCommitted={handlePriceCommit}
          valueLabelDisplay="auto"
          min={availableOptions.pricePerDay[0]}
          max={availableOptions.pricePerDay[1]}
          step={10}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Brand</h3>
        <div className="space-y-2">
          {availableOptions.brand.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={filter.brand.includes(brand)}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={`brand-${brand}`}>{brand}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Model Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Model</h3>
        <div className="space-y-2">
          {availableOptions.model.map((model) => (
            <div key={model} className="flex items-center">
              <input
                type="checkbox"
                id={`model-${model}`}
                checked={filter.model.includes(model)}
                onChange={(e) => handleModelChange(model, e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={`model-${model}`}>{model}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Company Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Company</h3>
        <div className="space-y-2">
          {availableOptions.company.map((company) => (
            <div key={company} className="flex items-center">
              <input
                type="checkbox"
                id={`company-${company}`}
                checked={filter.company.includes(company)}
                onChange={(e) => handleCompanyChange(company, e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={`company-${company}`}>{company}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
