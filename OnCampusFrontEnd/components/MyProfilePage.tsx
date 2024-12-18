"use client";
import {
    Avatar, Tooltip, IconButton, Button, Alert
} from "@material-tailwind/react";

import { PencilSquareIcon } from "@heroicons/react/24/outline";

import { useState, useTransition } from "react";

import ClubRoles from "./ClubRoles";
import Parser from "html-react-parser";

import {
    MultiImageDropzone,
    type FileState,
} from "./MultiImageDropZoneModified";

import { useEdgeStore } from "@/lib/edgestore";
import { updateProfile } from "@/server_actions/updateProfile";
import AllPosts from "./AllPosts";
import Link from "next/link";

interface customImg {
    url: string;
    key: string;
    name: string;
}

export default function MyProfilePage({ user }: { user: any }) {

    const [selectedButton, setSelectedButton] = useState("About Me");
    const [editProfilePic, setEditProfilePic] = useState(false);

    const [imgStates, setImgStates] = useState<FileState[]>([]);
    const { edgestore } = useEdgeStore();
    const [imgUrls, setImgUrls] = useState<customImg[]>();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const [isPending, startTransition] = useTransition()
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);



    function updateImgProgress(key: string, progress: FileState["progress"]) {
        setImgStates((imgStates) => {
            const newFileStates = structuredClone(imgStates);
            const imgState = newFileStates.find((imgState) => imgState.key === key);
            if (imgState) {
                imgState.progress = progress;
            }
            return newFileStates;
        });
    }
    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const uploadProfilePic = () => {

        if (imgStates.length < 1) {
            setAlertMsg("Please select an image");
            setAlertOpen(true);
            scrollToTop();
            return;
        }

        if (imgStates.length > 1) {
            setAlertMsg("Please select only one image");
            setAlertOpen(true);
            scrollToTop();
            return;
        }

        if (imgStates?.length > 0) {
            if (imgStates?.some((imgState) => imgState.progress !== "COMPLETE")) {
                setAlertMsg("Image is still loading");
                setAlertOpen(true);
                scrollToTop();
                return;
            }
        }

        var imgList: customImg[] = [];
        imgStates?.map((imgState) => {
            imgList.push(
                imgUrls?.find((url) => url.key === imgState.key) ?? {
                    url: "",
                    key: "",
                    name: "",
                }
            );
        });

        console.log(imgList);

        startTransition(async () => {
            const res = await updateProfile({
                data: {
                    profilePicture: imgList,
                },
                type: "profilePicUpdate",
            });
            if (res) {
                console.log(res);
                imgStates?.map(async (imgState) => {
                    try {
                        const res = await edgestore.myPublicFiles.confirmUpload({
                            url: imgUrls?.find((url) => url.key === imgState.key)?.url ?? "",
                        });
                    } catch (err) {
                        console.log(err);
                    }
                });
                setAlertMsg(prev => "Profile Picture Updated");
                setAlertOpen(true);
                setImgStates([]);
                setImgUrls([]);
                setEditProfilePic(false);
                setProfilePicture(imgList[0].url);
                user.profilePicture = imgList[0].url;
                scrollToTop();
                return;
            } else {
                console.log("error");
                setAlertMsg(prev => "Error happened!!");
                setAlertOpen(prev => true);
                setEditProfilePic(false);
                scrollToTop()
            }
        });


    }

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
                        {!editProfilePic && (
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
                                <Tooltip content="Change Profile Pic" >
                                    <IconButton variant="text"
                                        onClick={() => setEditProfilePic(true)} style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}>
                                        <PencilSquareIcon className="h-5 w-5" color="purple" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        )}
                        {editProfilePic && (
                            <div className="mb-3 mt-2 flex flex-col items-center">

                                <MultiImageDropzone
                                    className="rounded-full"
                                    value={imgStates}
                                    dropzoneOptions={{
                                        maxFiles: 1,
                                    }}
                                    onChange={(files) => {
                                        setImgStates(files);
                                    }}
                                    onFilesAdded={async (addedFiles) => {
                                        setImgStates([...imgStates, ...addedFiles]);
                                        await Promise.all(
                                            addedFiles.map(async (addedFileState) => {
                                                try {
                                                    const res = await edgestore.myPublicFiles.upload({
                                                        file: addedFileState.file,
                                                        options: {
                                                            temporary: true,
                                                        },
                                                        onProgressChange: async (progress) => {
                                                            updateImgProgress(addedFileState.key, progress);
                                                            if (progress === 100) {
                                                                await new Promise((resolve) =>
                                                                    setTimeout(resolve, 1000)
                                                                );
                                                                updateImgProgress(addedFileState.key, "COMPLETE");
                                                            }
                                                        },
                                                    });
                                                    setImgUrls((prevurls) => [
                                                        ...(prevurls ?? []),
                                                        {
                                                            url: res.url,
                                                            key: addedFileState.key,
                                                            name: addedFileState.file.name,
                                                        },
                                                    ]);
                                                } catch (err) {
                                                    updateImgProgress(addedFileState.key, "ERROR");
                                                }
                                            })
                                        );
                                    }}
                                />
                                <div className="flex pl-10 pr-10" >
                                    <Button color="green" size="sm" className="mr-2" onClick={uploadProfilePic}>Save</Button>
                                    <Button color="red" size="sm"
                                        onClick={() => {
                                            setImgStates([]);
                                            setImgUrls([]);
                                            setEditProfilePic(false);
                                        }
                                        }>
                                        Cancel
                                    </Button>
                                </div>
                            </div>)
                        }

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

                    <div className="flex justify-end mt-auto">
                        <Link href={"/profile/edit/" + user.email}>
                            <Button color="purple" className="mr-5 mb-5">Edit Profile</Button>
                        </Link>

                    </div>
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
                    <button className="text-md font-semibold transition duration-150 border-b-4 border-transparent hover:border-purple-500 mr-6 pb-1"
                        onClick={() => setSelectedButton("Saved Posts")}
                        style={{ borderColor: selectedButton === 'Saved Posts' ? 'purple' : 'transparent' }}>
                        Saved Posts
                    </button>
                    <button className="text-md font-semibold transition duration-150 border-b-4 border-transparent hover:border-purple-500 mr-6 pb-1"
                        onClick={() => setSelectedButton("Liked Posts")}
                        style={{ borderColor: selectedButton === 'Liked Posts' ? 'purple' : 'transparent' }}>
                        Liked Posts
                    </button>

                </div>

                {/* Content based on the selected button */}
                <div>
                    {/* Content based on the selected button */}
                    {selectedButton === "About Me" && (
                        <div className="content" style={{ display: 'block' }}>
                            {user.aboutMe ? <div dangerouslySetInnerHTML={{ __html: user.aboutMe }}></div>: <p>No Information Available</p>}
                        </div>
                    )}
                    {selectedButton === "My Club Roles" && (
                        <ClubRoles clubRoles={user.ClubMember} />
                    )}
                    {selectedButton === "My Posts" && (
                        <AllPosts posts={user.posts} user={null} type="all" />
                    )}
                    {selectedButton === "Saved Posts" && (
                        <AllPosts posts={user.savedPosts} user={null} type="all" />
                    )}
                    {selectedButton === "Liked Posts" && (
                        <AllPosts posts={user.likedPosts} user={null} type="all" />
                    )}
                </div>
            </div>
        </div >
    );
}