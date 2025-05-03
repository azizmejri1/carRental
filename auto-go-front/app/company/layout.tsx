"use client";
import SideBarAdmin from "@/app/company/components/sideBarAdmin";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("");
  const [logged, setLogged] = useState(false);
  const router = useRouter();
  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/admin", {
        withCredentials: true,
      })
      .then((response) => {
        const name = response.data.name;
        setName(name);
        setLogged(true);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        router.push("/login");
      });
  }, [router]);
  return (
    <div className="flex flex-row w-full h-screen">
      <SideBarAdmin name={name} />
      {children}
    </div>
  );
}
