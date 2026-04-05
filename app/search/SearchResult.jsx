"use client";
import { useSearchParams } from "next/navigation";

export default function SearchResults() {
  const params = useSearchParams();
  const query = params.get("query");

  return (
    <p className="text-gray-600">
      You searched for: <strong>{query}</strong>
    </p>
  );
}
