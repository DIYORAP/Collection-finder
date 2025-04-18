"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function AddressList({ setSelectedUprn }) {
    const [postcode, setPostcode] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        if (postcode.length > 5) fetchAddresses();
        else setAddresses([]);
        setAddresses([]);
        setSelectedUprn("");
        setSelectedAddress(null);
        setError(null);
    }, [postcode]);

    const fetchAddresses = async () => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post(
                "https://iweb.itouchvision.com/portal/itouchvision/kmbd_demo/address",
                null,
                {
                    headers: {
                        Method: "POST",
                        P_GUID: "FF93E12280E5471FE053A000A8C08BEB",
                        P_POSTCODE: postcode,
                    },
                }
            );
            setLoading(false);
            setAddresses(response.data.ADDRESS || []);
        } catch (err) {
            setError("Failed to fetch addresses.");
            setLoading(false);
        }
    };

    const clearData = () => {
        setPostcode("");
        setAddresses([]);
        setSelectedUprn("");
        setSelectedAddress(null);
        setError(null);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Enter a postcode</label>
            <label className="block text-sm font-medium text-gray-400 mb-2">For Example NP20 3BQ</label>
            <Input
                type="text"
                placeholder="For example SW1A 2AA"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="mt-2 border-gray-600 shadow-sm rounded-lg px-4 py-2 max-w-xs"
            />

            {loading && <Loader2 className="animate-spin text-gray-600 mx-auto mt-3" size={24} />}

            {error && (
                <Alert className="bg-red-100 border border-red-500 text-red-800 p-3 rounded-lg mt-3">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="mt-4 w-96">
                <label className="block text-sm  font-medium text-gray-700">Select an address</label>
                <Select
                    options={addresses.map((addr) => ({
                        value: addr.UPRN,
                        label: addr.FULL_ADDRESS,
                    }))}
                    value={selectedAddress}
                    onChange={(selected) => {
                        setSelectedAddress(selected);
                        setSelectedUprn(selected?.value || "");
                    }}
                    placeholder="Choose an address"
                    isSearchable
                    className="mt-2"
                />
            </div>

            {postcode && (
                <p className="mt-4">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            clearData();
                        }}
                        className="text-blue-600 underline cursor-pointer"
                    >
                        Clear address and start again
                    </a>
                </p>
            )}
        </div>
    );
}
