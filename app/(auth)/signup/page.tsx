"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/API/axiosinstance";


const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "succeeded" | "failed">("idle");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !username || !email || !password || !phone) {
      setError("Please fill in all fields.");
    }

    setStatus("loading");
    setError(null);

    try {
      const response = await axiosInstance.post("/users/signup", { name, username, email, password, phone });
      console.log(response.data);
      setStatus("succeeded");
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Signup failed");
      setStatus("failed");
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      router.push("login");
    }
  }, [status, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="register-comp w-full sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 mt-5 bg-transparent p-6 rounded-lg shadow-lg">
        <h3 className="text-center text-lg font-semibold mb-4 text-black">
          Register with your Instagram account
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className="bg-[#201d1d] rounded-xl w-full px-3 py-3 placeholder-white text-white"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#201d1d] rounded-xl w-full px-3 py-3 placeholder-white text-white"
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-[#201d1d] rounded-xl w-full px-3 py-3 placeholder-white text-white"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#201d1d] rounded-xl w-full px-3 py-3 placeholder-white text-white"
            />
          </div>

          <div className="mb-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="bg-[#201d1d] rounded-xl w-full px-3 py-3 placeholder-white text-white"
            />
          </div>

          <button
            className="bg-white rounded-xl w-full px-3 py-3 mt-2 text-black"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <div className="flex justify-center gap-2">
                <div className="w-4 h-4 rounded-full bg-black animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {status === "failed" && (
          <div className="text-center text-red-500 mt-4">{error}</div>
        )}

        <div className="footer text-center mt-6">
          <p>© 2024</p>
          <p>Threads Terms</p>
          <p>Privacy Policy</p>
          <p>Cookies Policy</p>
          <p>Report a problem</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
