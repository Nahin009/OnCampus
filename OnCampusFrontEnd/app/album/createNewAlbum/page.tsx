"use client";
import React, {
    ReactEventHandler,
    createContext,
    useMemo,
    useTransition,
} from "react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

import { useEffect, useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import writeAlbum from "../../../server_actions/writeAlbum";

import {
    CardHeader,
    CardBody,
    Tooltip,
} from "@material-tailwind/react";

import {
    Textarea,
    Button,
    IconButton,
    Card,
    Input,
    Checkbox,
    Typography,
    Select,
    Option,
    Alert,
    Radio,
} from "@material-tailwind/react";

import {
    MultiImageDropzone,
    type FileState,
} from "../../../components/MultiImageDropzone";

import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";
import { set } from "zod";
import { Avatar } from "antd";
import Image from "next/image";

interface customImg {
    url: string;
    key: string;
    name: string;
}

interface Image_360 {
    panaroma: string;
    thumbnail: string;
    name: string;
    caption: string;
    gps_lat: string;
    gps_long: string;
    gps_alt: string;
    links: string[];
    imgUrls: customImg[];
    imgStates: FileState[];
    imgList: customImg[];

}


const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
}



const WriteAlbum = () => {


    const [isPending, startTransition] = useTransition();

    const [open, setOpen] = React.useState(0);
    const { data: session, status } = useSession();

    const [submit, setSubmit] = useState(false);

    const { edgestore } = useEdgeStore();

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");

    const [albumName, setAlbumName] = useState("");
    const [albumDescription, setAlbumDescription] = useState("");
    const [images, setImages] = useState([] as Image_360[]);
    const [newImage, setNewImage] = useState({
        panaroma: "",
        thumbnail: "",
        name: "",
        caption: "",
        gps_lat: "",
        gps_long: "",
        gps_alt: "",
        links: [],
        imgUrls: [],
        imgStates: [],
        imgList: [],
    } as Image_360);

    const [newLink, setNewLink] = useState('');

    const formHandler = async () => {
        //errror handling
        if (!submit) {
            return;
        }
        setSubmit(false);

        if (albumName === "" || albumDescription === "") {
            setAlertMsg("Gallery Name and Description are required");
            setAlertOpen(true);
            scrollToTop();
            return;
        }

        for (const image of images) {

            if (image.imgStates?.length < 1) {
                setAlertMsg("At least one image is required");
                setAlertOpen(true);
                scrollToTop();
                return;
            }
            if (image.imgStates?.length > 1) {
                setAlertMsg("Maximum 1 image is allowed");
                setAlertOpen(true);
                scrollToTop();
                return;
            }

            if (image.imgStates?.length > 0) {
                if (image.imgStates?.some((imgState) => imgState.progress !== "COMPLETE")) {
                    setAlertMsg("Images are still uploading");
                    setAlertOpen(true);
                    scrollToTop();
                    return;
                }
            }

            image.imgStates?.map((imgState) => {
                image.imgList.push(
                    image.imgUrls?.find((url) => url.key === imgState.key) ?? {
                        url: "",
                        key: "",
                        name: "",
                    }
                );
            });

            image.panaroma = image.imgList[0].url;
            image.thumbnail = image.imgList[0].url;

        }

        const newImgs = images.map((image) => {
            return {
                panaroma: image.panaroma,
                thumbnail: image.thumbnail,
                name: image.name,
                caption: image.caption,
                gps_lat: image.gps_lat,
                gps_long: image.gps_long,
                gps_alt: image.gps_alt,
                links: image.links,
            };
        });

        const data = {
            albumName: albumName,
            albumDescription: albumDescription,
            images: newImgs,
        };
        console.log(data);

        startTransition(async () => {
            const res = await writeAlbum(data);
            if (res) {
                console.log(res);
                for (const image of images) {
                    image.imgStates?.map(async (imgState) => {
                        try {
                            const res = await edgestore.myPublicFiles.confirmUpload({
                                url: image.imgUrls?.find((url) => url.key === imgState.key)?.url ?? "",
                            });
                        } catch (err) {
                            console.log(err);
                        }
                    });
                }


                setAlertMsg((prev) => "Gallery created successfully");
                setAlertOpen(true);

                setAlbumName("");
                setAlbumDescription("");
                setImages([]);
                setNewImage({
                    panaroma: "",
                    thumbnail: "",
                    name: "",
                    caption: "",
                    gps_lat: "",
                    gps_long: "",
                    gps_alt: "",
                    links: [],
                    imgUrls: [],
                    imgStates: [],
                    imgList: [],
                });
                setNewLink('');

                scrollToTop();
                return;
            } else {
                console.log("error");
            }
        });
        setAlertMsg((prev) => "Error happened!!");
        setAlertOpen((prev) => true);
        scrollToTop();
    };

    function updateImgProgress(key: string, progress: FileState["progress"]) {
        const newFileStates = structuredClone(newImage.imgStates);
        const imgState = newFileStates.find((imgState) => imgState.key === key);
        if (imgState) {
            imgState.progress = progress;
        }

        setNewImage((prev) => ({
            ...prev,
            imgStates: newFileStates,
        }));

    }


    const router = useRouter();

    const config = {
        readonly: false,
        autofocus: false,
        useSearch: false,
        toolbarSticky: false,
        disablePlugins:
            "speech-recognize,print,preview,image,drag-and-drop,drag-and-drop-element,dtd,file,image-processor,image-properties,media,mobile,video",
    };

    useEffect(() => {
        if (
            status != "loading" &&
            session &&
            session?.error === "RefreshAccessTokenError"
        ) {
            signOut({ callbackUrl: "/" });
        }
    }, [session, status]);

    if (!session) {
        return <></>;
    }

    const addNewImage = () => {
        if (newImage.imgStates.length < 1) {
            setAlertMsg("At least one image is required");
            setAlertOpen(true);
            scrollToTop();
            return;
        }

        if (newImage.imgStates.length > 1) {
            setAlertMsg("Maximum 1 image is allowed");
            setAlertOpen(true);
            scrollToTop();
            return;
        }

        if (newImage.imgStates.some((imgState) => imgState.progress !== "COMPLETE")) {
            setAlertMsg("Images are still uploading");
            setAlertOpen(true);
            scrollToTop();
            return;
        }

        if (newImage.name === "" || newImage.caption === "") {
            setAlertMsg("Name and Caption are required");
            setAlertOpen(true);
            scrollToTop();
            return;
        }

        if (newImage.gps_lat === "" || newImage.gps_long === "" || newImage.gps_alt === "") {
            setAlertMsg("GPS Latitude, Longitude and Altitude are required");
            setAlertOpen(true);
            scrollToTop();
            return;
        }

        if (newImage.links.length < 1) {
            setAlertMsg("At least one link is required");
            setAlertOpen(true);
            scrollToTop();
            return;
        }

        setImages([...images, newImage]);
        setNewImage({
            panaroma: "",
            thumbnail: "",
            name: "",
            caption: "",
            gps_lat: "",
            gps_long: "",
            gps_alt: "",
            links: [],
            imgUrls: [],
            imgStates: [],
            imgList: [],
        });
    }


    return (
        <>
            <Alert open={alertOpen} onClose={() => setAlertOpen(false)}>
                {alertMsg}
            </Alert>
            <div className="grid justify-center w-full">
                <div>
                    <Typography variant="h4" color="blue-gray">
                        Create a new Gallery
                    </Typography>
                </div>
                <div>
                    <form
                        action={formHandler}
                        className="mt-8 mb-2 max-w-screen-xl sm:w-200"
                    >
                        <div className="flex flex-col gap-4">
                            <div style={{ maxWidth: "300px" }}>
                                <Input variant="outlined" color="teal" label="Gallery Name" placeholder="" type="text" onChange={(e) => setAlbumName(e.target.value)} value={albumName} />
                            </div>
                            <Textarea
                                color="teal"
                                label="Gallery Description"
                                // placeholder="Gallery Description"
                                onChange={(e) => setAlbumDescription(e.target.value)}
                                value={albumDescription}
                            />
                        </div>
                        {images.map((image, index) => {
                            return (
                                <Card className="" style={{ minHeight: "400px", minWidth: "600px" }} key={index}>
                                    <CardHeader floated={false} shadow={false} className="rounded-none">
                                        <div className="mb-2 flex items-center justify-between gap-4">
                                            <div className="w-max" style={{ minWidth: "300px" }}>
                                                <Typography variant="h5" color="blue-gray" className="mt-5">
                                                    Image {index + 1} :
                                                </Typography>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="px-0">
                                        <div className="flex flex-row gap-5 w-full">
                                            <img
                                                className="h-200 w-200 object-cover object-center"
                                                src={image.imgUrls[0].url}
                                                alt="nature image"
                                                style={{ height: "200px", width: "200px" }}
                                            />
                                            <div className="flex flex-col gap-3">
                                                <Typography variant="lead" color="blue-gray" >
                                                    Image Name : {image.name}
                                                </Typography>
                                                <Typography variant="lead" color="blue-gray" >
                                                    Caption : {image.caption}
                                                </Typography>

                                                <Typography variant="lead" color="blue-gray" >
                                                    GPS Latitude : {image.gps_lat}
                                                </Typography>
                                                <Typography variant="lead" color="blue-gray" >
                                                    GPS Longitude : {image.gps_long}
                                                </Typography>
                                                <Typography variant="lead" color="blue-gray" >
                                                    GPS Altitude : {image.gps_alt}
                                                </Typography>
                                                <Typography variant="h5" color="blue-gray" >
                                                    Links : {image.links.map((link, index) => {
                                                        if (index === image.links.length - 1) {
                                                            return (
                                                                <span>
                                                                    {link}
                                                                </span>)
                                                        }

                                                        return (
                                                            <span>
                                                                {link},
                                                            </span>)
                                                    })}
                                                </Typography>
                                            </div>


                                        </div>
                                    </CardBody>
                                </Card>)
                        }
                        )}

                        <Card className="pl-3" style={{ minHeight: "400px", minWidth: "600px" }}>
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="mb-4 flex items-center justify-between gap-8">
                                    <div className="w-max" style={{ minWidth: "300px" }}>
                                        <Typography variant="h5" color="blue-gray" className="mt-5">
                                            Add New Image
                                        </Typography>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-0">
                                <div className="flex flex-row gap-2 w-full">
                                    <div className="flex flex-col gap-2 w-1/3" style={{ maxWidth: "300px" }} >
                                        <Input variant="outlined" color="teal" label="Image Name" placeholder="" type="text"
                                            onChange={(e) => setNewImage({ ...newImage, name: e.target.value })} value={newImage.name} />
                                        <Input style={{ maxWidth: "300px" }} variant="outlined" color="teal" label="Caption" placeholder="" type="text"
                                            onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })} value={newImage.caption} />
                                        <Input style={{ maxWidth: "300px" }} variant="outlined" color="teal" label="GPS Latitude" placeholder="" type="number"
                                            onChange={(e) => setNewImage({ ...newImage, gps_lat: e.target.value })} value={newImage.gps_lat} />
                                        <Input style={{ maxWidth: "300px" }} variant="outlined" color="teal" label="GPS Longitude" placeholder="" type="number"
                                            onChange={(e) => setNewImage({ ...newImage, gps_long: e.target.value })} value={newImage.gps_long} />
                                        <Input style={{ maxWidth: "300px" }} variant="outlined" color="teal" label="GPS Altitude" placeholder="" type="number"
                                            onChange={(e) => setNewImage({ ...newImage, gps_alt: e.target.value })} value={newImage.gps_alt} />
                                    </div>
                                    <div className="w-2/3" style={{ marginLeft: "50px" }} >
                                        <MultiImageDropzone
                                            value={newImage.imgStates}
                                            dropzoneOptions={{
                                                maxFiles: 1,
                                            }}
                                            onChange={(files) => {
                                                setNewImage({ ...newImage, imgStates: files });
                                            }}
                                            onFilesAdded={async (addedFiles) => {
                                                const prevFiles = newImage.imgStates;
                                                prevFiles.push(...addedFiles);
                                                setNewImage((prev) => ({
                                                    ...prev,
                                                    imgStates: prevFiles,
                                                }));
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
                                                                        updateImgProgress(
                                                                            addedFileState.key,
                                                                            "COMPLETE"
                                                                        );
                                                                    }
                                                                },
                                                            });
                                                            setNewImage((prev) => ({
                                                                ...prev,
                                                                imgUrls: [
                                                                    ...(prev.imgUrls ?? []),
                                                                    {
                                                                        url: res.url,
                                                                        key: addedFileState.key,
                                                                        name: addedFileState.file.name,
                                                                    },
                                                                ],
                                                            }));
                                                        } catch (err) {
                                                            updateImgProgress(addedFileState.key, "ERROR");
                                                        }
                                                    })
                                                );
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Typography variant="h5" color="blue-gray" className="mt-5">
                                        Add Link
                                    </Typography>
                                    {newImage.links.map((link, index) => {
                                        return (
                                            <div key={index} className="flex gap-5 mb-3">
                                                <Typography variant="h5" color="blue-gray" className="mt-1">
                                                    Link : {link}
                                                </Typography>
                                                <div>
                                                    <Tooltip content="Remove Link">
                                                        <IconButton variant="text" onClick={() => {
                                                            const newLinks = newImage.links.filter((_, i) => i !== index);
                                                            setNewImage({ ...newImage, links: newLinks });
                                                        }}>
                                                            <MinusCircleIcon className="h-5 w-5" color="red" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        )
                                    }
                                    )}

                                </div>

                                <div className="flex flex-row w-1/3" style={{ maxWidth: "300px" }}>
                                    <Input variant="outlined" color="teal" label="Link" placeholder="" type="number"
                                        onChange={(e) => setNewLink(e.target.value)} value={newLink} />
                                    <div >
                                        <Tooltip content="Add Link" >
                                            <IconButton variant="text"
                                                onClick={() => {
                                                    if (newLink === '') {
                                                        return;
                                                    }
                                                    setNewImage({ ...newImage, links: [...newImage.links, newLink] })
                                                    setNewLink('')

                                                }
                                                }>
                                                <PlusCircleIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>

                                <div className="mt-4 ml-6">
                                    <Button
                                        onClick={() => addNewImage()}
                                        className="rounded-md"
                                        color="green"
                                    >
                                        Add Image
                                    </Button>
                                </div>


                            </CardBody>
                        </Card >


                        <div className="flex items-center justify-center">
                            <div className="flex gap-2 mt-3">
                                <Button
                                    size="md"
                                    onClick={() => setSubmit(true)}
                                    type="submit"
                                    className="rounded-md"
                                    color="purple"
                                >
                                    {isPending ? "Creating..." : "Create the gallery"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </>
    );
};

export default WriteAlbum;
