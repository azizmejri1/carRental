"use client";
import LoginImage from "@/components/loginImage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompanyRegisterPage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLButtonElement>): void {
    event.preventDefault();
    const url = "http://localhost:8080/rental-company/create";
    const data = { name, location, email, password };
    const options = {
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    axios
      .post(url, data, options)
      .then((response) => {
        router.push("/company/dashboard");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  }

  return (
    <div className="flex flex-row w-full h-screen">
      <LoginImage />
      <form className="flex flex-col justify-center items-center h-screen w-1/2 bg-white text-black ">
        <div className="flex flex-col w-1/2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
            className="input"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            placeholder="Location"
            id="location"
            value={location}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLocation(event.target.value);
            }}
            className="input"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            className="input"
          />
        </div>

        <div className="flex flex-col w-1/2 ">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            className="input"
          />
        </div>

        <button
          className="bg-blue-500 text-white w-1/2 h-10 rounded-md"
          type="submit"
          onClick={handleSubmit}
        >
          Sing Up
        </button>

        <div className="flex flex-row w-1/2">
          <p className="m-2">Already have an account?</p>
          <a href="/login" className="text-blue-500 m-2">
            Login here
          </a>
        </div>
      </form>
    </div>
  );
}
