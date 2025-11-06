"use client";
import React, { useState, useEffect, useRef } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?query=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    alert("Logged out successfully!");
    router.push("/");
  };

  const handleLoginDemo = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    alert("Demo Login Successful ✅");
  };

  return (
    <nav className="flex flex-wrap items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 relative">
      {/* Logo */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      {/* Links */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        <Link href="/">Home</Link>
        <Link href="/all-products">Shop</Link>
        <Link href="/">About Us</Link>
        <Link href="/">Contact</Link>
      

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex items-center border rounded-full px-3 py-1.5 bg-gray-50 w-64 focus-within:ring-1 focus-within:ring-orange-500"
      >
        <Image
          src={assets.search_icon}
          alt="search"
          className="w-4 h-4 opacity-70"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="ml-2 w-full bg-transparent outline-none text-sm"
        />
      </form>

      {/* Account Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsAccountOpen(!isAccountOpen)}
          className="flex items-center gap-2 hover:text-gray-900 transition"
        >
          <Image src={assets.user_icon} alt="user icon" />
          <span className="hidden md:inline">Account</span>
        </button>

        {isAccountOpen && (
          <div className="absolute right-0 top-10 bg-white shadow-lg border rounded-md py-2 w-44 z-20">
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Register
                </Link>
                <button
                  onClick={handleLoginDemo}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600"
                >
                  Demo Login
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
