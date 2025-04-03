"use client";
import { useState } from "react";
import AddressList from "@/components/AddressList";
import CollectionDetails from "@/components/CollectionDetails";

export default function CollectionPage() {
    const [selectedUprn, setSelectedUprn] = useState(null);

    return (
        <div className=" mx-auto min-h-screen p-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 border  rounded-lg bg-white">
                <AddressList setSelectedUprn={setSelectedUprn} />
            </div>

            <div className="w-full md:w-2/3">
                <CollectionDetails uprn={selectedUprn} />
            </div>
        </div>
    );
}
