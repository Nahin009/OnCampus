"use client";

import POST from "@/server_actions/POST";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Alert, Avatar, Button, Input, Option, Select, Tooltip, Typography } from "@material-tailwind/react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import { useRef } from "react";
import { MultiImageDropzone, FileState } from "@/components/MultiImageDropZoneModified";
import { useEdgeStore } from "@/lib/edgestore";
import { useTransition } from "react";
import { updateProfile, updateRole, updatePassword } from "@/server_actions/updateProfile";

interface customImg {
    url: string;
    key: string;
    name: string;
}



export default function Profile({ params }: { params: { email: string } }) {
    const { data: session, status } = useSession();

    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [requestStatus, setRequestStatus] = useState("loading");

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const editor = useRef(null);

    const [editProfilePic, setEditProfilePic] = useState(false);

    const [imgStates, setImgStates] = useState<FileState[]>([]);
    const { edgestore } = useEdgeStore();
    const [imgUrls, setImgUrls] = useState<customImg[]>();

    const [isPending, startTransition] = useTransition()
    const [submitting, setSubmitting] = useState(false);

    const [prevPassword, setPrevPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [newRole, setNewRole] = useState("");

    const config =
    {
        readonly: false,
        autofocus: false,
        useSearch: false,
        toolbarSticky: false,
        disablePlugins: "speech-recognize,print,preview,image,drag-and-drop,drag-and-drop-element,dtd,file,image-processor,image-properties,media,mobile,video"
    }

    async function getUser() {
        console.log(decodeURIComponent(params.email));
        const user = await POST("user/getUser", { email: decodeURIComponent(params.email) });
        if (!user) {
            setRequestStatus("error");
            return;
        }
        setUser(user);
        setRequestStatus("success");
        console.log(user);
    }

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            signOut({ callbackUrl: "/" });
            return;
        }
        if (session?.error === "RefreshAccessTokenError") {
            signOut({ callbackUrl: "/" });
            return;
        }
        console.log(session);
        if (session?.roles.includes("admin")) {
            setIsAdmin(true);
        }

        if (session.user?.email != decodeURIComponent(params.email)) {
            setRequestStatus("error");
            return;
        }

        if (requestStatus === "loading") {
            getUser();
        }
    }, [session, status]);

    if (status === "loading" || requestStatus === "loading")
        return (
            <>
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-3xl">Loading...</h1>
                </div>
            </>
        );

    if (!session) {
        return (
            <>
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-3xl">You are not logged in</h1>
                </div>
            </>
        );
    }

    if (session.user?.email != decodeURIComponent(params.email)) {
        return (
            <>
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-3xl">Invalid URL</h1>
                </div>
            </>
        );
    }


    if (!user) {
        return (
            <>
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-3xl">User not found</h1>
                </div>
            </>
        );
    }



    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function updatePasswordButton() {
        const res = await updatePassword({
            previousPassword: prevPassword,
            newPassword: newPassword
        });
        if (res) {
            console.log(res);
            setAlertMsg(prev => "Password Updated Successfully");
            setAlertOpen(true);
            scrollToTop();
            return;
        } else {
            console.log("error");
            setAlertMsg(prev => "Password is incorrect!!")
            setAlertOpen(prev => true);
            scrollToTop()
        }
    }

    async function updateRoleButton() {

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

        const res = await updateRole({

            email: user.email,
            prevRole: user.role.toLowerCase(),
            newRole: newRole

        });
        if (res) {
            console.log(res);
            setAlertMsg(prev => "Role Updated Successfully");
            setUser({ ...user, role: newRole.toUpperCase() });
            setAlertOpen(true);
            scrollToTop();
            return;
        } else {
            console.log("error");
            setAlertMsg(prev => "Error happened!!")
            setAlertOpen(prev => true);
            scrollToTop()
        }
    }

    async function UpdateProfile(e) {
        e.preventDefault();
        console.log(user);
        if (!submitting) return;
        setSubmitting(false);

        let { name, session, aboutMe, address, bloodGroup, dateOfBirth, emergencyContact, phoneNumber, section, role } = user;

        if (name === "") {
            setUser({ ...user, name: null });
            name = null;
        }

        if (session === "") {
            setUser({ ...user, session: null });
            session = null;
        }

        if (aboutMe === "") {
            setUser({ ...user, aboutMe: null });
            aboutMe = null;
        }

        if (address === "") {
            setUser({ ...user, address: null });
            address = null;
        }

        if (bloodGroup === "") {
            setUser({ ...user, bloodGroup: null });
            bloodGroup = null;
        }

        if (dateOfBirth === "") {
            setUser({ ...user, dateOfBirth: null });
            dateOfBirth = null;
        }

        if (emergencyContact === "") {
            setUser({ ...user, emergencyContact: null });
            emergencyContact = null;
        }

        if (phoneNumber === "") {
            setUser({ ...user, phoneNumber: null });
            phoneNumber = null;
        }

        if (section === "") {
            setUser({ ...user, section: null });
            section = null;
        }

        if (role === "") {
            setUser({ ...user, role: null });
            role = null;
        }

        const res = await updateProfile({
            data: {
                name: name,
                session: session,
                aboutMe: aboutMe,
                address: address,
                bloodGroup: bloodGroup,
                dateOfBirth: dateOfBirth,
                emergencyContact: emergencyContact,
                phoneNumber: phoneNumber,
                section: section,
            },
            type: "profileUpdate",
        });
        if (res) {
            console.log(res);
            setAlertMsg(prev => "Profile Updated Successfully");
            setAlertOpen(true);
            scrollToTop();
            return;
        } else {
            console.log("error");
            setAlertMsg(prev => "Error happened!!");
            setAlertOpen(prev => true);
            setEditProfilePic(false);
            scrollToTop()
        }
    }

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
                setUser({ ...user, profilePicture: imgList[0].url });
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

    return (
        <div className="mt-10">

            <Alert open={alertOpen} onClose={() => setAlertOpen(false)}>
                {alertMsg}
            </Alert>

            <form onSubmit={UpdateProfile}>
                <div className="flex  mb-10">
                    <div className="flex w-2/3 flex-col gap-6 items-center " style={{ paddingRight: "180px" }}>
                        <div className="w-75 flex flex-col gap-6 ">
                            <Input variant="outlined" color="teal" label="Name" placeholder="" value={user.name || ""} type="text" onChange={(e) => setUser({ ...user, name: e.target.value })} />
                            <Input variant="outlined" color="teal" label="Session" placeholder="" value={user.session || ""} type="text" onChange={(e) => setUser({ ...user, session: e.target.value })} />


                            <Input variant="outlined" color="teal" label="Phone Number" placeholder="" value={user.phoneNumber || ""} type="text" onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
                            <Input variant="outlined" color="teal" label="Address" placeholder="" value={user.address || ""} type="text" onChange={(e) => setUser({ ...user, address: e.target.value })} />
                            <Input variant="outlined" color="teal" label="Section" placeholder="" value={user.section || ""} type="text" onChange={(e) => setUser({ ...user, section: e.target.value })} />

                            <Select variant="outlined" color="teal" label="Select Blood Group" value={user.bloodGroup || ""} onChange={(e) => setUser({ ...user, bloodGroup: e })} >
                                <Option value="A+">A+</Option>
                                <Option value="A-">A-</Option>
                                <Option value="B+">B+</Option>
                                <Option value="B-">B-</Option>
                                <Option value="O+">O+</Option>
                                <Option value="O-">O-</Option>
                                <Option value="AB+">AB+</Option>
                                <Option value="AB-">AB-</Option>
                                <Option value="">None</Option>
                            </Select>
                            <Input variant="outlined" color="teal" label="Emergency Contact" placeholder="" value={user.emergencyContact || ""} type="text" onChange={(e) => setUser({ ...user, emergencyContact: e.target.value })} />
                            <div className="flex w-72 flex-col">
                                <Typography variant="paragraph" color="blue-gray" className="mb-2">Date of Birth</Typography>
                                <Input
                                    value={user.dateOfBirth?.split('T')[0] ?? ""}
                                    onChange={(e) => {
                                        setUser({ ...user, dateOfBirth: e.target.value });
                                    }}
                                    size="md"
                                    placeholder="Date of Birth"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-0"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    // label="Date of Birth"
                                    type="date"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex w-1/3 flex-col items-center">
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
                                    src={user.profilePicture || '/images/defaultProfilePic.webp'}
                                    placeholder='/images/defaultProfilePic.webp'
                                />
                                <Button color="purple" size="sm" className="mt-2" onClick={() => setEditProfilePic(true)}>Change Profile Picture</Button>
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
                    </div>
                </div>

                <div className="flex flex-col gap-1 p-44 pt-0 pb-0" >
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                        About Me
                    </Typography>
                    <JoditEditor
                        ref={editor}
                        value={user.aboutMe || ""}
                        config={config}
                        onBlur={(newContent) => {
                            setUser({ ...user, aboutMe: newContent });
                        }}
                        onChange={(newContent) => { }}

                    />
                </div>



                <div className="flex w-full gap-4 mt-10 pl-44 pr-44 justify-end" >
                    <Button type="submit" color="purple" className="ml-auto" onClick={() => {
                        setSubmitting(prev => true);
                    }} >Update</Button>
                </div>
            </form>

            <div className="flex w-full gap-7 mt-10 pl-44 pr-44 items-center" >
                <div className="flex w-1/3 flex-col items-center gap-2">
                    <Input variant="outlined" color="teal" label="Previous Password" placeholder="" type="text" onChange={(e) => setPrevPassword(e.target.value)} />
                    <Input variant="outlined" color="teal" label="New Password" placeholder="" type="text" onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <Button color="purple" onClick={updatePasswordButton}>Update Password</Button>
            </div>


            {isAdmin && (
                <div className="flex gap-7 mt-10 mb-5 " style={{ maxWidth: "400px", marginLeft: "11rem" }}>
                    <Select variant="outlined" color="teal" label="Select Role" value={user.role.toLowerCase() || ""} onChange={(e) => setNewRole(e)} >
                        <Option value="admin">Admin</Option>
                        <Option value="user">User</Option>
                    </Select>
                    <div>
                        <Button color="purple" style={{ maxHeight: "50px" }} onClick={() => {
                            updateRoleButton()
                        }}>Update Role</Button>
                    </div>
                </div>

            )}



        </div>
    );
}