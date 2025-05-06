import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  danger?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  danger = false,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-md ${
          danger ? "border-l-4 border-red-500" : ""
        }`}
      >
        <div
          className={`px-6 py-4 border-b ${
            danger ? "border-red-100" : "border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-medium ${
              danger ? "text-red-600" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
