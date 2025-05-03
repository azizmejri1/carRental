"use client";
import axios from "axios";
import { error } from "console";
import { use, useEffect, useState } from "react";
import UpdateForm from "../components/updateForm";

export default function ProfilePage() {
  const [id, setId] = useState<number | null>(null);
  const [company, setCompany] = useState<Partial<RentalCompany>>({});

  useEffect(() => {
    const url = "http://localhost:8080/rental-company/current";
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        const company = response.data;
        setCompany(company);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen overflow-y-auto">
      <UpdateForm company={company} setCompany={setCompany}></UpdateForm>
    </div>
  );
}
