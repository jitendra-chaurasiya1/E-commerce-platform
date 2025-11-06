"use client";
import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = () => {
    // अगर खाली है
    if (!email.trim()) {
      setMessage("⚠️ Please enter a valid email address.");
      return;
    }

    // LocalStorage से पुराने subscriber list लो
    const subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]");

    // पहले से मौजूद है क्या?
    if (subscribers.includes(email)) {
      setMessage("✅ You are already subscribed!");
      return;
    }

    // नया email add करो
    subscribers.push(email);
    localStorage.setItem("subscribers", JSON.stringify(subscribers));

    // Success message दिखाओ
    setMessage("🎉 Thank you for subscribing!");
    setEmail(""); // input साफ कर दो
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
      <h1 className="md:text-4xl text-2xl font-medium">
        Subscribe now & get 20% off
      </h1>
      <p className="md:text-base text-gray-500/80 pb-8">
        Stay updated with our latest offers and exclusive deals!
      </p>

      {/* Input + Button */}
      <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
        <input
          className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email id"
        />
        <button
          onClick={handleSubscribe}
          className="md:px-12 px-8 h-full text-white bg-orange-600 hover:bg-orange-700 rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </div>

      {/* Message */}
      {message && (
        <p className="text-sm text-gray-700 pt-3">{message}</p>
      )}
    </div>
  );
};

export default NewsLetter;
