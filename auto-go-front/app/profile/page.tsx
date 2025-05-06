"use client";
import Navbar from "@/components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sideBar";
import ProfileCard from "@/components/profileCard";
import ReservationHistory from "@/components/reservationHistory";
import DeleteAccountSection from "@/components/deleteAccountSection";

interface Profile {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Profile() {
  const [logged, setLogged] = useState(false);
  const [activated, setActivated] = useState(false);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/profile", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Profile data:", response.data);
        const { sub, username, name } = response.data;
        setName(name), setLogged(true);
        setUserId(sub);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    if (userId !== null) {
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
  }, [userId]);

  useEffect(() => {
    if (userId) {
      axios
        .get("http://localhost:8080/user/" + userId, {
          withCredentials: true,
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user : ", error);
        });
    }
  }, [userId]);

  return (
    <>
      <Navbar logged={logged} name={name} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar />

          {/* Main Content */}
          <div className="md:w-3/4">
            <ProfileCard
              user={user}
              activated={activated}
              onUpdate={(updatedUser) => setUser(updatedUser)}
            />

            <div className="flex flex-col lg:flex-row">
              <ReservationHistory userId={userId} />
              <DeleteAccountSection userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
