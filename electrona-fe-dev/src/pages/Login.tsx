import React, { useState } from "react";
import axios from "axios";
import { PageTab } from "../types";

import { auth, googleProvider, signInWithGoogle, sendPasswordReset } from "../firebase";

interface LoginProps {
  setActiveTab: (tab: PageTab) => void;
}

export default function Login({ setActiveTab }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const [error, setError] = useState("");

  // ==========================
  // Email Password Login
  // ==========================

  const handleLogin = async () => {
    if (loading) return;

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      localStorage.setItem("idToken", response.data.idToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("uid", response.data.uid);
      localStorage.setItem("email", response.data.email);

      setEmail("");
      setPassword("");

      alert("Login Successful");

      setActiveTab("PROFILE");
    } catch (err: any) {
      console.error(err);

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Google Login
  // ==========================

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();

      if (!result) {
        alert("Google login is not available in this environment.");
        return;
      }

      const user = result.user;

      const token = await user.getIdToken();

      localStorage.setItem("idToken", token);
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("email", user.email || "");

      alert("Google Login Successful");

      setActiveTab("PROFILE");
    } catch (error: any) {
      console.error(error);
      if (error?.message?.includes("Firebase not configured")) {
        alert("Google Login unavailable — Firebase not configured for local dev.");
      } else {
        alert("Google Login Failed");
      }
    }
  };

  // ==========================
  // Forgot Password
  // ==========================

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      alert("Please enter your email first.");
      return;
    }

    try {
      setResetLoading(true);

      await sendPasswordReset(email);

      alert("Password reset email sent successfully.");
    } catch (error: any) {
      console.error(error);
      if (error?.message?.includes("Firebase not configured")) {
        alert("Password reset unavailable — Firebase not configured for local dev.");
      } else {
        alert("Unable to send reset email.");
      }
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-xl w-[430px]">

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded mb-4 focus:ring-2 focus:ring-orange-500 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-2 focus:ring-2 focus:ring-orange-500 outline-none"
        />

        <div className="flex justify-end mb-5">

          <button
            type="button"
            disabled={resetLoading}
            onClick={handleForgotPassword}
            className="text-orange-500 hover:underline text-sm"
          >
            {resetLoading
              ? "Sending..."
              : "Forgot Password?"}
          </button>

        </div>

        {error && (
          <p className="text-red-500 mb-4 text-sm">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold p-3 rounded transition disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 border p-3 rounded hover:bg-gray-100 transition"
        >
          Continue with Google
        </button>

        <p className="text-center mt-6 text-gray-600">
          New User?
        </p>

        <button
          onClick={() => setActiveTab("REGISTER")}
          className="w-full mt-3 bg-black text-white p-3 rounded hover:bg-gray-800 transition"
        >
          Create Account
        </button>

      </div>

    </div>
  );
}