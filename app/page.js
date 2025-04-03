
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Collection Checker</h1>
      <Link href="/collection">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg">
          Check Collection Schedule
        </Button>
      </Link>
    </div>
  );
}
