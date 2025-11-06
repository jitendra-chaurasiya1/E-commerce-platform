"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🧠 Example: user data store (localStorage)
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const newUser = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // ✅ Success message
    alert("🎉 Registration Successful!");

    // 2 सेकंड बाद redirect to login page
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-xl w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
