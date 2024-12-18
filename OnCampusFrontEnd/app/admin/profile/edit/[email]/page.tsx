"use client";
import React from "react";

import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Alert,
    Select,
    Option,
    Button,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";

import { LinkIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

import { useEffect } from "react";
import { useState } from 'react';

import Link from "next/link";
import POST from "@/server_actions/POST";
import GET from "@/server_actions/GET";
import { updateRole } from "@/server_actions/updateProfile";
import { set } from "zod";


export default function EditProfileAdminPage({ params }: { params: { email: string } }) {

    const TABLE_HEAD_CHANNEL = ["Channel", "Access"];
    const TABLE_HEAD_CLUB = ["Club Name", "Role", ""];


    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const [availableClubRoles, setAvailableClubRoles] = useState([]);
    const [availableClubs, setAvailableClubs] = useState([]);

    const [selectedClub, setSelectedClub] = React.useState("");
    const [selectedRole, setSelectedRole] = React.useState("");

    const [newRole, setNewRole] = React.useState("");

    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const className = "p-4"

    useEffect(() => {
        const fetchData = async (path: string) => {
            try {
                // Your asynchronous code here
                const result = await POST("user/getUser", { email: decodeURIComponent(params.email) });
                if (result === null) {
                    throw new Error("Error fetching data");
                }
                return {
                    data: result,
                    success: true
                };
            } catch (error) {
                console.error('Error fetching data:', error);
                setAlertMsg("Error fetching User");
                setAlertOpen(true);
                scrollToTop();
                return {
                    data: [],
                    success: false
                };
            }
        };

        const fetchData2 = async (path: string) => {
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
                // console.error('Error fetching data:', error);
                setAlertMsg("Error fetching data");
                setAlertOpen(true);
                scrollToTop();
                return {
                    data: [],
                    success: false
                };
            }
        };

        fetchData('user/getUser').then(res => {
            if (!res.success) {
                setLoading(false);
                return;
            }
            setUser(res.data);
            fetchData2('user/admin/getClubRoles').then(res => {
                if (!res.success) {
                    return;
                }
                setAvailableClubRoles(res.data);
                console.log(res.data);
                fetchData2('user/admin/getClubs').then(res => {
                    if (!res.success) {
                        return;
                    }
                    setAvailableClubs(res.data);
                    setLoading(false);

                })
            });

        });


    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
        )
    }

    if (user === null) {
        return (
            <div className="flex items-center justify-center h-full">
                <Typography variant="h5" color="blue-gray" className="mt-5">
                    User Not Found
                </Typography>
            </div>
        )
    }

    const updateChannelAccess = async () => {
        const data = {
            email: user.email,
            accessGeneral: user.accessGeneral,
            accessBatch: user.accessBatch,
            accessDept: user.accessDept,
            accessDeptBatch: user.accessDeptBatch
        }

        console.log(data);
        try {
            const result = await POST("user/admin/updateChannelAccess", data);

            if (result === null) {
                throw new Error("Error updating User Channel Access");
            }
            setAlertMsg("User Channel Access Updated");
            setAlertOpen(true);
            scrollToTop();
        } catch (error) {
            // console.error('Error fetching data:', error);
            setAlertMsg("Error updating User Channel Access");
            setAlertOpen(true);
            scrollToTop();
        }
    }

    const deleteClubRole = (index: number) => {
        const newClubRoles = user.ClubMember.filter((_, i) => i !== index);
        setUser({ ...user, ClubMember: newClubRoles });
    }

    const addNewClubRole = () => {
        console.log(selectedClub, selectedRole);
        if (selectedClub === "" || selectedRole === "") {
            return;
        }
        setUser({ ...user, ClubMember: [...user.ClubMember, { club: { name: selectedClub }, role: selectedRole }] });
        setSelectedClub("");
        setSelectedRole("");
    }

    const updateClubRoles = async () => {
        const data = {
            email: user.email,
            ClubMember: user.ClubMember
        }

        console.log(data);
        try {
            const result = await POST("user/admin/updateClubRoles", data);

            if (result === null) {
                throw new Error("Error updating User Club Roles");
            }
            setAlertMsg("User Club Roles Updated");
            setAlertOpen(true);
            scrollToTop();
        } catch (error) {
            // console.error('Error fetching data:', error);
            setAlertMsg("Error updating User Club Roles");
            setAlertOpen(true);
            scrollToTop();
        }
    }

    const updateRoleButton = async () => {

        if (newRole === "") {
            setAlertMsg("You did not change the role");
            setAlertOpen(true);
            scrollToTop();
            return;
        }

        if (newRole.toLowerCase() === user.role.toLowerCase()) {
            setAlertMsg("You did not change the role");
            setAlertOpen(true);
            scrollToTop();
            return;
        }


        const data = {
            email: user.email,
            prevRole: user.role.toLowerCase(),
            newRole: newRole
        }

        console.log(data);
        try {
            const result = await updateRole(data);

            if (result === null) {
                throw new Error("Error updating User Role");
            }
            setAlertMsg("User Role Updated");
            setUser({ ...user, role: newRole.toUpperCase() });
            setAlertOpen(true);
            scrollToTop();
        } catch (error) {
            // console.error('Error fetching data:', error);
            setAlertMsg("Error updating User Role");
            setAlertOpen(true);
            scrollToTop();
        }
    }

    return (
        <div className="ml-5 mt-5">
            <div className="flex flex-col gap-3 w-2/5">
                <Typography variant="h5" color="blue-gray" >
                    User Name : {user.name}
                </Typography>
                <Typography variant="paragraph" color="blue-gray" >
                    User Email : {user.email}
                </Typography>
                <Typography variant="paragraph" color="blue-gray" >
                    User Department : {user.department.replace(/_/g, " ")}
                </Typography>
                <Typography variant="paragraph" color="blue-gray" >
                    User Batch : {user.batch}
                </Typography>
                <div style={{ maxWidth: "200px" }} className="flex gap-3">
                    <Select variant="outlined" color="teal" label="Select Role" value={user.role.toLowerCase()} onChange={(e) => { setNewRole(e) }} >
                        <Option value="user">USER</Option>
                        <Option value="admin">ADMIN</Option>
                        <Option value="cr">CR</Option>
                        <Option value="br">BR</Option>

                    </Select>
                    <div>
                        <Button color="green" onClick={updateRoleButton}>Update Role</Button>

                    </div>
                </div>
            </div>
            <Card className="mt-4 w-3/5" style={{}}>
                <Alert open={alertOpen} onClose={() => setAlertOpen(false)}>
                    {alertMsg}
                </Alert>
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex items-center justify-between gap-8">
                        <div className="w-max" style={{ minWidth: "300px" }}>
                            <Typography variant="h5" color="blue-gray" className="mt-5">
                                User Channel Access
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-0">
                    <table className="mt-2 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD_CHANNEL.map((head) => (
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
                            <tr key={"General"}>
                                <td className={className}>
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                General
                                            </Typography>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50" >
                                    <div className="flex flex-col" style={{ maxWidth: "150px" }}>
                                        <Select variant="outlined" color="teal" label="Select Access"
                                            value={user.accessGeneral}
                                            onChange={(e) => {
                                                setUser({ ...user, accessGeneral: e })
                                                console.log(e)
                                            }
                                            } >
                                            <Option value="UNBANNED">UNBANNED</Option>
                                            <Option value="BANNED">BANNED</Option>

                                        </Select>
                                    </div>
                                </td>
                            </tr>
                            <tr key={"Batch"}>
                                <td className={className}>
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                Batch
                                            </Typography>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50" >
                                    <div className="flex flex-col" style={{ maxWidth: "150px" }}>
                                        <Select variant="outlined" color="teal" label="Select Access" value={user.accessBatch} onChange={(e) => setUser({ ...user, accessBatch: e })} >
                                            <Option value="UNBANNED">UNBANNED</Option>
                                            <Option value="BANNED">BANNED</Option>

                                        </Select>
                                    </div>
                                </td>
                            </tr>
                            <tr key={"Dept"}>
                                <td className={className}>
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                Dept
                                            </Typography>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50" >
                                    <div className="flex flex-col" style={{ maxWidth: "150px" }}>
                                        <Select variant="outlined" color="teal" label="Select Access" value={user.accessDept} onChange={(e) => setUser({ ...user, accessDept: e })} >
                                            <Option value="UNBANNED">UNBANNED</Option>
                                            <Option value="BANNED">BANNED</Option>

                                        </Select>
                                    </div>
                                </td>
                            </tr>
                            <tr key={"DeptBatch"}>
                                <td className={className}>
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                DeptBatch
                                            </Typography>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50" >
                                    <div className="flex flex-col" style={{ maxWidth: "150px" }}>
                                        <Select variant="outlined" color="teal" label="Select Access" value={user.accessDeptBatch} onChange={(e) => setUser({ ...user, accessDeptBatch: e })} >
                                            <Option value="UNBANNED">UNBANNED</Option>
                                            <Option value="BANNED">BANNED</Option>

                                        </Select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex w-full mt-10" style={{ paddingRight: "16rem" }} >
                        <Button className="ml-auto" color="green" onClick={updateChannelAccess}>Save</Button>
                    </div>
                </CardBody>
            </Card >
            <Card className="mt-2 w-3/5">

                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex items-center justify-between gap-8">
                        <div className="w-max" style={{ minWidth: "300px" }}>
                            <Typography variant="h5" color="blue-gray" className="mt-5">
                                User Club Roles
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-0">
                    <table className="mt-2 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD_CLUB.map((head) => (
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
                            {user.ClubMember.map(
                                (clubRole, index) => {
                                    const isLast = index === user.ClubMember.length - 1;
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
                                                            {clubRole.club.name}
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
                                                        {clubRole.role}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div onClick={() => { deleteClubRole(index) }}>
                                                    <Tooltip content="Edit User">
                                                        <IconButton variant="text">
                                                            <MinusCircleIcon className="h-5 w-5" color="red" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                            <tr key={"addNewClubRole"}>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="flex flex-col">
                                        <Select variant="outlined" color="teal" label="Select Club" onChange={(e) => setSelectedClub(e)} >
                                            {availableClubs.map((club, index) => {
                                                return (<Option key={index} value={club.name}>{club.name}</Option>)
                                            })}

                                        </Select>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="flex flex-col">
                                        <Select variant="outlined" color="teal" label="Select Role" onChange={(e) => setSelectedRole(e)} >
                                            {availableClubRoles.map((role, index) => {
                                                return (<Option key={index} value={role}>{role.replace(/_/g, ' ')}</Option>)
                                            })}
                                        </Select>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Tooltip content="Add User">
                                        <IconButton variant="text" onClick={addNewClubRole} >
                                            <PlusCircleIcon className="h-5 w-5" />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>



                        </tbody>
                    </table>
                    <div className="flex w-full mt-10" style={{ paddingRight: "6rem" }} >
                        <Button className="ml-auto" color="green" onClick={updateClubRoles}>Save</Button>
                    </div>
                </CardBody>
            </Card >
        </div>
    );

}



