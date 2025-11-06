"use client";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("query");

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-4">Search Results</h1>
      <p className="text-gray-600">You searched for: <strong>{query}</strong></p>
    </div>
  );
}
