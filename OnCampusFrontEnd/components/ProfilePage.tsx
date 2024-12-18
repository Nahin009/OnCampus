"use client";
import {
    Avatar, Alert, Button
} from "@material-tailwind/react";


import { useState, useTransition } from "react";
import Parser from "html-react-parser";


import ClubRoles from "./ClubRoles";

import AllPosts from "./AllPosts";
import Link from "next/link";

interface customImg {
    url: string;
    key: string;
    name: string;
}

export default function MyProfilePage({ user, admin }: { user: any, admin: boolean }) {

    const [selectedButton, setSelectedButton] = useState("About Me");

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const [profilePicture, setProfilePicture] = useState(user.profilePicture);

    function formatDate(date: string) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString(undefined, options);
        return formattedDate.replace(/(\d)(st|nd|rd|th)/, '$1');
    }

    return (
        <div className=" min-h-screen p-10">
            <Alert open={alertOpen} onClose={() => setAlertOpen(false)}>
                {alertMsg}
            </Alert>
            {/* Top Div */}
            <div className="flex"
                style={{ borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem', backgroundColor: '#F9F0F0' }}>
                {/* Left Div in Top Div */}
                <div className="w-1/3 ">
                    <div className="flex flex-col items-center p-2">
                        {/* Profile Picture */}
                        <div className="mb-3 mt-2 flex flex-col items-center">
                            <Avatar
                                withBorder={true}
                                color="purple"
                                variant="circular"
                                alt={user.name}
                                className="cursor-pointer m-0 p-0"
                                style={{ width: '13rem', height: '13rem' }}
                                src={profilePicture ? profilePicture : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"}
                                placeholder='/images/defaultProfilePic.webp'
                            />
                        </div>
                        <p>Email : {user.email}</p>
                        {user.address && <p>Address : {user.address}</p>}
                    </div>
                </div>

                {/* Right Div in Top Div */}
                <div className="w-2/3 pt-2 flex flex-col">
                    <div className="mb-2 mt-4">
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                    </div>

                    {/* Additional Information */}
                    <div className="flex flex-col">
                        <p className="mb-1">Department: {user.department.replace(/_/g, ' ')}</p>
                        <p className="mb-1">Batch: {user.batch}</p>
                        {user.session && <p className="mb-1">Session: {user.session}</p>}
                        {user.phoneNumber && <p className="mb-1">Phone : {user.phoneNumber}</p>}
                        {user.dateOfBirth && <p className="mb-1">Date of Birth : {formatDate(user.dateOfBirth)}</p>}
                        {user.bloodGroup && <p className="mb-1">Blood Group : {user.bloodGroup}</p>}
                        {user.emergencyContact && <p className="mb-1">Emergency Contact : {user.emergencyContact}</p>}

                        {/* Add more information as needed */}
                    </div>
                    {admin && (
                        <div className="flex justify-end mt-auto">
                            <Link href={"/admin/profile/edit/" + user.email}>
                                <Button color="purple" className="mr-5 mb-5">Edit User's Access & Roles</Button>
                            </Link>
                        </div>
                    )}


                </div>
            </div>

            {/* Bottom Div */}
            <div className="bg-grey p-4">
                {/* Button Headers */}
                <div className="flex mb-4">
                    <button className="text-md font-semibold transition duration-150 border-b-4 border-transparent hover:border-purple-500 mr-6 pb-1"
                        onClick={() => setSelectedButton("About Me")}
                        style={{ borderColor: selectedButton === 'About Me' ? 'purple' : 'transparent' }} >
                        About Me
                    </button>
                    <button className="text-md font-semibold transition duration-150 border-b-4 border-transparent hover:border-purple-500 mr-6 pb-1"
                        onClick={() => setSelectedButton("My Club Roles")}
                        style={{ borderColor: selectedButton === 'My Club Roles' ? 'purple' : 'transparent' }}>
                        My Club Roles
                    </button>
                    <button className="text-md font-semibold transition duration-150 border-b-4 border-transparent hover:border-purple-500 mr-6 pb-1"
                        onClick={() => setSelectedButton("My Posts")}
                        style={{ borderColor: selectedButton === 'My Posts' ? 'purple' : 'transparent' }}>
                        My Posts
                    </button>

                </div>

                {/* Content based on the selected button */}
                <div>
                    {/* Content based on the selected button */}
                    {selectedButton === "About Me" && (
                        <div className="content" style={{ display: 'block' }}>
                            {user.aboutMe ? <div dangerouslySetInnerHTML={{ __html: user.aboutMe }}></div> : <p>No Information Available</p>}
                        </div>
                    )}
                    {selectedButton === "My Club Roles" && (
                        <ClubRoles clubRoles={user.ClubMember} />
                    )}
                    {selectedButton === "My Posts" && (
                        <AllPosts posts={user.posts} user={null} type="all" />
                    )}
                </div>
            </div>
        </div >
    );
}