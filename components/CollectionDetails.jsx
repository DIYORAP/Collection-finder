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
        if (uprn) {
            fetchCollectionData();
        }
    }, [uprn]);

    const fetchCollectionData = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                "https://iweb.itouchvision.com/portal/itouchvision/kmbd_demo/collectionDay", null,
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

            if (response.data.collectionDay && response.data.collectionDay.length) {
                setCollectionData(response.data.collectionDay);
            } else {
                setError("No collection available.");
            }
        } catch (err) {
            setError("Failed to fetch collection data.");
            setLoading(false);
        }
    };

    if (!uprn) {
        return <p className="text-gray-500 text-xl">Select an address to see details.</p>;
    }

    return (
        <div>
            {error && (
                <Alert className=" border border-red-500 text-red-800 m-5 rounded-lg">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {loading && <p>Loading collection data...</p>}

            {collectionData && (
                <div className="grid grid-cols-1 gap-4 ">
                    {collectionData.map((bin, index) => (
                        <Card key={index} className="shadow-lg rounded-md">
                            <CardContent
                                className="p-4 text-white"
                                style={{ backgroundColor: bin.binColor }}
                            >
                                <p className="text-lg font-bold">{bin.binType}</p>
                                <p className="text-sm">Next: {bin.collectionDay}</p>
                                <p className="text-sm">Following: {bin.followingDay}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
