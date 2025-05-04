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

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/profile", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Profile data:", response.data);
        const { sub, username, name } = response.data;
        setUsername(username);
        setName(name);
        setLogged(true);
        setUserId(sub); // Set userId after profile data is fetched
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []); // Only run on initial render

  useEffect(() => {
    // Only make the second request once userId is available
    if (userId !== null) {
      console.log("Fetching activation status for userId:", userId);
      axios
        .get("http://localhost:8080/user/activated/" + userId, {
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
  }, [userId]); // Run when userId changes

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
      <Navbar logged={logged} name={name} />
      <main className="flex-grow">
        <MainPage />
      </main>
      {/* You could add a footer here */}
    </div>
  );
}
