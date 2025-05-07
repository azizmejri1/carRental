"use client";
import { ProfileInfoProps } from "@/app/types";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  CheckBadgeIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function ProfileInfo({
  user,
  activated,
  onEditClick,
  onChangePasswordClick,
}: ProfileInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-indigo-100 p-3 rounded-full hover:bg-indigo-200 transition-colors duration-300">
          <UserIcon className="h-10 w-10 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 hover:text-indigo-700 transition-colors duration-300">
            {user.name}
          </h2>
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                activated
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              } transition-colors duration-300`}
            >
              {activated ? (
                <>
                  <CheckBadgeIcon className="h-4 w-4 mr-1" />
                  Verified
                </>
              ) : (
                <>
                  <XCircleIcon className="h-4 w-4 mr-1" />
                  Not Verified
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center hover:bg-gray-50 p-2 rounded transition-colors duration-300">
          <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-gray-700">{user.email}</span>
        </div>
        <div className="flex items-center hover:bg-gray-50 p-2 rounded transition-colors duration-300">
          <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-gray-700">
            {user.firstName} {user.lastName}
          </span>
        </div>
        <div className="flex items-center hover:bg-gray-50 p-2 rounded transition-colors duration-300">
          <LockClosedIcon className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-gray-700">••••••••</span>
          <button
            onClick={onChangePasswordClick}
            className="ml-4 text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-300 hover:cursor-pointer"
          >
            Change Password
          </button>
        </div>
      </div>

      <button
        onClick={onEditClick}
        className="mt-6 w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer transition-colors duration-300"
      >
        Edit Profile
      </button>
    </div>
  );
}
