"use client";
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

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/profile", {
        withCredentials: true,
      })
      .then((response) => {
        const { username, name } = response.data;
        setUsername(username);
        setName(name);
        setLogged(true);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logged={logged} name={name} />
      <main className="flex-grow">
        <MainPage />
      </main>
      {/* You could add a footer here */}
    </div>
  );
}
