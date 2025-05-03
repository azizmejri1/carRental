import Image from "next/image";

export default function LoginImage() {
  return (
    <div className="w-full lg:w-1/2 h-64 lg:h-full relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/loginpic.jpg"
        alt="Login"
        fill
        className="object-cover"
        quality={75}
        priority
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Welcome Back
        </h1>
        <p className="text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
          Connect to your account and discover endless opportunities waiting for
          you.
        </p>
      </div>
    </div>
  );
}
