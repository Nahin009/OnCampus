"use client";
import React from "react";

import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Alert,
} from "@material-tailwind/react";

import { LinkIcon } from "@heroicons/react/24/outline";

import { useEffect } from "react";
import { useState } from 'react';

import GET from "@/server_actions/GET";
import Link from "next/link";


export default function UsersPage() {

    const TABLE_HEAD = ["Email", "Department", "Batch", "Role", ""];

    const [users, setUsers] = useState([])

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

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
                setAlertMsg("Error fetching Users");
                setAlertOpen(true);
                return {
                    data: [],
                    success: false
                };
            }
        };

        fetchData('user/admin/getUsers').then(res => {
            if (!res.success) {
                return;
            }
            setUsers(res.data);
        });

    }, []);

    return (
        <>
            <Card className="" style={{ minHeight: "400px", minWidth: "600px" }}>
                <Alert open={alertOpen} onClose={() => setAlertOpen(false)}>
                    {alertMsg}
                </Alert>

                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex items-center justify-between gap-8">
                        <div className="w-max" style={{ minWidth: "300px" }}>
                            <Typography variant="h5" color="blue-gray" className="mt-5">
                                All Users
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-0">
                    <table className="mt-3 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(
                                ({ email, department, batch, role }, index) => {
                                    const classes = "p-4";
                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {email}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {department.replace(/_/g, " ")}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {batch}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {role}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Link href={`/profile/${email}`}>
                                                        <LinkIcon className="h-5 w-5" />
                                                    </Link>
                                                </div>
                                            </td>


                                        </tr>

                                    );
                                },
                            )}

                        </tbody>
                    </table>
                </CardBody>
            </Card >
        </>
    );

}