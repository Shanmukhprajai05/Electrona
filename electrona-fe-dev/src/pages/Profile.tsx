import React from "react";
import { PageTab } from "../types";

interface ProfileProps {
  setActiveTab: (tab: PageTab) => void;
}

export default function Profile({ setActiveTab }: ProfileProps) {
  const email = localStorage.getItem("email");
  const uid = localStorage.getItem("uid");

  const logout = () => {
    localStorage.clear();
    alert("Logged out successfully");
    setActiveTab("LOGIN");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-32">
      <div className="bg-white shadow-xl rounded-xl p-8 w-[500px]">

        <h1 className="text-3xl font-bold text-center mb-8">
          My Profile
        </h1>

        <div className="space-y-6">

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-lg font-semibold">
              {email}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">User ID</p>
            <p className="text-sm break-all">
              {uid}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <span className="text-green-600 font-semibold">
              Logged In
            </span>
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}