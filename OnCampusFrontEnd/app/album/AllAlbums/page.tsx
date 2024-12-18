"use client";
import React, { useEffect } from "react";

import { useState } from 'react';

import GET from "@/server_actions/GET";

import { Typography, Alert, Carousel, Button } from "@material-tailwind/react";
import Link from "next/link";

export default function ShowAlbum() {



    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState(null);

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
        fetchData('user/getAlbums/').then(res => {
            if (!res.success) {
                return;
            }

            console.log(res.data);

            const albums = res.data;

            setAlbums(albums);
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

    if (!albums) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl">No Locations to show</h1>
            </div>
        );
    }

    if (albums.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl">No Locations to show</h1>
            </div>
        );
    }


    return (
        <>
            <Alert open={alertOpen} onClose={() => setAlertOpen(false)}>
                {alertMsg}
            </Alert>

            <Carousel className="rounded-xl">
                {albums.map((album, index) => {
                    return (
                        <div className="relative h-full w-full" key={index} >
                            <img
                                src={album.images[0]?.thumbnail}
                                alt={album.name}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                                <div className="w-3/4 text-center md:w-2/4">
                                    <Typography
                                        variant="h1"
                                        color="white"
                                        className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                                    >
                                        {album.name}
                                    </Typography>
                                    <Typography
                                        variant="lead"
                                        color="white"
                                        className="mb-12 opacity-80"
                                    >
                                        {album.description}
                                    </Typography>
                                    <div className="flex justify-center gap-2">
                                        <Link href={"/album/SingleAlbum/" + album.id}>

                                            <Button size="lg" color="white">
                                                Explore
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

            </Carousel>

        </>
    )
}




