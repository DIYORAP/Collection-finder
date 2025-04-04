"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CollectionDetails({ uprn }) {
    const [collectionData, setCollectionData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (uprn) fetchCollectionData();
    }, [uprn]);

    const fetchCollectionData = async () => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post(
                "https://iweb.itouchvision.com/portal/itouchvision/kmbd_demo/collectionDay",
                null,
                {
                    headers: {
                        Method: "POST",
                        P_GUID: "FF93E12280E5471FE053A000A8C08BEB",
                        P_UPRN: uprn,
                        P_CLIENT_ID: 130,
                        P_COUNCIL_ID: 260,
                    },
                }
            );
            setLoading(false);
            if (response.data.collectionDay?.length) {
                setCollectionData(response.data.collectionDay);
            } else {
                setError("No collection available.");
                setCollectionData(null);
            }
        } catch (err) {
            setError("Failed to fetch collection data.");
            setLoading(false);
            setCollectionData(null);
        }
    };

    if (!uprn) return <p className="text-gray-500 text-lg">Select an address to see details.</p>;

    return (
        <div>
            {error && (
                <Alert className="bg-red-200 border border-red-500 text-red-800 p-3 rounded-lg mb-3">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {loading && <p>Loading collection data...</p>}

            {collectionData && (
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Your next collection
                    </label>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {collectionData.map((bin, index) => (
                            <Card key={index} className="shadow-lg rounded-md">
                                <CardContent
                                    className="p-4 text-white font-semibold"
                                    style={{ backgroundColor: bin.binColor }}
                                >
                                    <p className="text-xl">{bin.binType}</p>
                                    <p className="text-sm">Next: {bin.collectionDay}</p>
                                    <p className="text-sm">Following: {bin.followingDay}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
