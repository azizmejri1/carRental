import LoginImage from "@/components/loginImage";
import RegisterForm from "@/components/registerForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="flex flex-row w-full h-screen">
      <LoginImage />
      <RegisterForm />
    </div>
  );
}
