
"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Search } from "lucide-react";

export default function AddressList({ setSelectedUprn }) {
    const [postcode, setPostcode] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const addressesPerPage = 7;

    const fetchAddresses = async () => {
        setError(null);
        setAddresses([]);
        setLoading(true);
        setCurrentPage(1);
        try {
            const response = await axios.post("https://iweb.itouchvision.com/portal/itouchvision/kmbd_demo/address", null,
                {
                    headers: {
                        "Method": "POST",
                        "P_GUID": "FF93E12280E5471FE053A000A8C08BEB",
                        "P_POSTCODE": postcode,
                    },
                }
            );

            setLoading(false);

            if (response.data.ADDRESS && response.data.ADDRESS.length > 0) {
                setAddresses(response.data.ADDRESS);
            } else {
                setError("No addresses found.");
            }
        } catch (err) {
            setError("Failed to fetch addresses.");
            setLoading(false);
        }
    };

    const indexLast = currentPage * addressesPerPage;
    const indexFirst = indexLast - addressesPerPage;
    const currentAddresses = addresses.slice(indexFirst, indexLast);
    const totalPages = Math.ceil(addresses.length / addressesPerPage);

    return (
        <Card className="shadow-xl border border-gray-300 rounded-lg p-6 bg-white">
            <CardHeader className="text-xl font-semibold text-gray-800">Find Your Address</CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 mb-6">
                    <Input
                        type="text"
                        placeholder="Enter postcode"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        className="flex-1 border-gray-300 shadow-sm rounded-lg px-4 py-2 text-lg"
                    />
                    <Button
                        onClick={fetchAddresses}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 flex items-center gap-2 text-lg rounded-lg shadow-md transition"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                        {loading ? "Searching..." : "Search"}
                    </Button>
                </div>

                {error && (
                    <Alert className="bg-red-100 border border-red-500 text-red-800 p-4 rounded-lg mb-6">
                        <AlertDescription className="text-lg font-medium">{error}</AlertDescription>
                    </Alert>
                )}

                {currentAddresses.length > 0 && (
                    <>
                        <ul className="divide-y divide-gray-200 bg-gray-50 rounded-lg shadow-md">
                            {currentAddresses.map((addr, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer p-4 hover:bg-blue-100 transition duration-200 rounded-lg border last:border-none"
                                    onClick={() => setSelectedUprn(addr.UPRN)}
                                >
                                    <span className="text-lg text-gray-700 font-medium">{addr.FULL_ADDRESS}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-between items-center mt-6">
                            <Button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md transition disabled:opacity-50"
                            >
                                previous
                            </Button>
                            <span className="text-lg font-semibold text-gray-700">
                                page {currentPage} / {totalPages}
                            </span>
                            <Button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md transition disabled:opacity-50"
                            >
                                next
                            </Button>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
