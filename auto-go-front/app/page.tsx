"use client";
import Activation from "@/components/activation";
import MainPage from "@/components/mainPage";
import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [logged, setLogged] = useState(false);
  const [activated, setActivated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/profile", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Profile data:", response.data);
        const { sub, username, name, role } = response.data;
        setUsername(username);
        setName(name);
        setLogged(true);
        setUserId(sub);
        setRole(role);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    if (userId !== null) {
      console.log("Fetching activation status for userId:", userId);
      let url = "http://localhost:8080/user/activated/" + userId;
      if (role == "admin") {
        url = "http://localhost:8080/rental-company/accountActivated/" + userId;
      }
      axios
        .get(url, {
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
  }, [userId]);

  if (!activated && logged) {
    return (
      <Activation
        setActivated={setActivated}
        userId={userId}
        setUserId={setUserId}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logged={logged} name={name} role={role} />
      <main className="flex-grow">
        <MainPage />
      </main>
    </div>
  );
}
