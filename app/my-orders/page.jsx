"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userOrders") || "[]");
    setOrders(saved);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <div className="w-full max-w-2xl space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border p-4 bg-white rounded-lg shadow"
              >
                <p>
                  <b>Order ID:</b> {order.id}
                </p>
                <p>
                  <b>Date:</b> {new Date(order.date).toLocaleDateString()}
                </p>
                <p>
                  <b>Amount:</b> ₹{order.amount}
                </p>
                <p>
                  <b>Items:</b> {order.items.length}
                </p>
                <p>
                  <b>Address:</b> {order.address.city}, {order.address.state}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
