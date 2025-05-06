"use client";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteAccountSection({
  userId,
}: {
  userId: number | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setError("");

    try {
      const response = await axios.delete(
        `http://localhost:8080/user/${userId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Redirect to home page after successful deletion
        axios.post(
          "http://localhost:8080/auth/logout",
          {},
          { withCredentials: true }
        );
        router.push("/");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex-1 ml-0 lg:ml-6 border border-red-100 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center hover:text-red-700 transition-colors duration-300">
        <TrashIcon className="h-5 w-5 text-red-600 mr-2" />
        Delete Account
      </h3>
      <p className="text-sm text-gray-500 mb-4 hover:text-gray-700 transition-colors duration-300">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 hover:cursor-pointer border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-300"
      >
        Delete Account
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-medium text-gray-900 mb-4 hover:text-red-700 transition-colors duration-300">
              Are you sure?
            </h3>
            <p className="text-sm text-gray-500 mb-6 hover:text-gray-700 transition-colors duration-300">
              This action cannot be undone. All your data will be permanently
              removed.
            </p>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setError("");
                }}
                disabled={isDeleting}
                className="px-4 py-2 hover:cursor-pointer border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
