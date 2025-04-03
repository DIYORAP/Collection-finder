"use client";
import { useState } from "react";
import AddressList from "@/components/AddressList";
import CollectionDetails from "@/components/CollectionDetails";

export default function Home() {
  const [selectedUprn, setSelectedUprn] = useState(null);
  return (
    <div className="mr-11 mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Find out your rubbish collection day
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Check when your rubbish is collected.
      </p>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <AddressList setSelectedUprn={setSelectedUprn} />
      </div>

      
        <div className="mt-6">
          <CollectionDetails uprn={selectedUprn} />
        </div>
    
    </div>
  );
}
