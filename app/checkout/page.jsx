"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Checkout() {
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);

    // 🧠 LocalStorage में orders save करना
    const orders = JSON.parse(localStorage.getItem("userOrders") || "[]");

    const newOrder = {
      id: Date.now(),
      date: new Date(),
      amount: 999,
      address: {
        fullName: "Demo User",
        area: "Sample Street, City",
        city: "Meerut",
        state: "Uttar Pradesh",
        phoneNumber: "9999999999",
      },
      items: [
        {
          product: { name: "Demo Product" },
          quantity: 1,
        },
      ],
    };

    orders.push(newOrder);
    localStorage.setItem("userOrders", JSON.stringify(orders));

    alert("✅ Order placed successfully!");

    // ✅ Redirect to My Orders page
    router.push("/my-orders");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
        <h1 className="text-2xl font-bold mb-4">Checkout Page</h1>
        <p className="text-gray-600 mb-6">
          Review your order and place it when ready.
        </p>
        <button
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"
        >
          {isPlacingOrder ? "Placing Order..." : "Place Order"}
        </button>
      </div>
      <Footer />
    </>
  );
}
