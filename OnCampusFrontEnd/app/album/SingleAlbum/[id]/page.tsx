"use client";
import React, { useEffect } from "react";

import { useState } from 'react';

import GET from "@/server_actions/GET";

import { Typography, Alert } from "@material-tailwind/react";

import PhotoViewer360 from "@/components/PhotoViewer360";

export default function ShowAlbum({ params }: { params: { id: string } }) {

    interface Node {
        id: string;
        panorama: string;
        thumbnail: string;
        name: string;
        caption: string;
        links: { nodeId: string }[];
        gps: number[];
    }

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [nodes, setNodes] = useState<Node[]>([]);
    const [loading, setLoading] = useState(true);
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        const fetchData = async (path: string) => {
            try {
                // Your asynchronous code here
                const result = await GET(path);
                if (result === null) {
                    throw new Error("Error fetching data");
                }
                return {
                    data: result,
                    success: true
                };
            } catch (error) {
                console.error('Error fetching data:', error);
                setAlertMsg("Error fetching data");
                setAlertOpen(true);
                return {
                    data: [],
                    success: false
                };
            }
        };
        console.log(decodeURIComponent(params.id));
        fetchData('user/getAlbum/' + params.id).then(res => {
            if (!res.success) {
                return;
            }

            console.log(res.data);

            const album = res.data;
            const nodes_temp = [] as Node[];

            for (let i = 0; i < album.images.length; i++) {
                const links = []
                for (const link of album.images[i].links) {
                    links.push({
                        nodeId: link,
                    });
                }

                const gps = [parseFloat(album.images[i].gps_lat),
                parseFloat(album.images[i].gps_long),
                parseFloat(album.images[i].gps_alt)]

                nodes_temp.push({
                    id: album.images[i].id,
                    panorama: album.images[i].panorama,
                    thumbnail: album.images[i].thumbnail,
                    name: album.images[i].name,
                    caption: album.images[i].caption,
                    links: links,
                    gps: gps,
                });
            }

            setNodes(nodes_temp);
            setAlbum(album);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl">Loading...</h1>
            </div>
        );
    }

    if (!nodes) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl">Error fetching data</h1>
            </div>
        );
    }

    if (nodes.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl">No images found</h1>
            </div>
        );
    }


    return (
        <>
            <Alert open={alertOpen} onClose={() => setAlertOpen(false)}>
                {alertMsg}
            </Alert>
            <div>
                <div className="flex flex-col items-center justify-center">
                    <Typography variant="lead" color="blue-gray" className="mt-3">
                        Location Name: {album.name}
                    </Typography>
                    <Typography variant="lead" color="blue-gray" className="mt-3">
                        Description: {album.description}
                    </Typography>
                </div>
                <PhotoViewer360 src={nodes[0].panorama} nodes={nodes} />
            </div>
        </>
    )
}




