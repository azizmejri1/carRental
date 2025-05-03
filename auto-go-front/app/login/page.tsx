"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import LoginImage from "@/components/loginImage";
import LoginForm from "@/components/loginForm";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/profile", { withCredentials: true })
      .then((response) => {
        const { role } = response.data;
        if (role === "company") {
          router.push("/company/dashboard");
        } else {
          router.push("/");
        }
      })
      .catch(() => {
        console.log("Not logged in");
      });
  }, [router]);

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      <LoginImage />
      <LoginForm />
    </div>
  );
}
