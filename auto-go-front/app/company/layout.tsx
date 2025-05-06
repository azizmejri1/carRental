"use client";
import SideBarAdmin from "@/app/company/components/sideBarAdmin";
import Activation from "@/components/activation";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("");
  const [logged, setLogged] = useState(false);
  const [activated, setActivated] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/admin", {
        withCredentials: true,
      })
      .then((response) => {
        const { sub, name } = response.data;

        setName(name);
        setLogged(true);
        setId(sub);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);

        if (pathname != "/company/register") {
          router.push("/login");
        }
      });
  }, []);
  useEffect(() => {
    if (id !== null) {
      axios
        .get("http://localhost:8080/rental-company/accountActivated/" + id, {
          withCredentials: true,
        })
        .then((response) => {
          const activated: boolean = JSON.parse(response.data);
          setActivated(activated);
        })
        .catch((error) => {
          console.error("Error fetching activation status:", error);
        });
    }
  }, [id]);
  if (!activated && logged) {
    return (
      <Activation setActivated={setActivated} userId={id} setUserId={setId} />
    );
  }
  return (
    <div className="flex flex-row w-full h-screen">
      {pathname !== "/company/register" && <SideBarAdmin name={name} />}
      {children}
    </div>
  );
}
