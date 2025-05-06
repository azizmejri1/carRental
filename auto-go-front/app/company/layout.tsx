"use client";
import SideBarAdmin from "@/app/company/components/sideBarAdmin";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("");
  const [logged, setLogged] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
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

        if (pathname != "/company/register") {
          router.push("/login");
        }
      });
  }, [router]);
  return (
    <div className="flex flex-row w-full h-screen">
      {pathname !== "/company/register" && <SideBarAdmin name={name} />}
      {children}
    </div>
  );
}
