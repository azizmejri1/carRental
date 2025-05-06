import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "outline" | "outline-white" | "danger";
  icon?: ReactNode;
  className?: string;
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  icon,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium flex items-center justify-center";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    "outline-white":
      "border border-white text-white hover:bg-white hover:text-blue-600",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
