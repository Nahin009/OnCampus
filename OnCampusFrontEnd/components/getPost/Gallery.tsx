"use client";

import {
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";

import Image from "next/image";

import AvatarImageText from "./AvatarImageText";
import CaroiuselImage from "./Carousel";

export default function ImageGallery({images,imageNames, user}: {images: string[], imageNames: string[], user: any}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  if (!images || images.length === 0) {
    return (<></>);
  }

  return (
    <>
      <Card
        className="h-3/6 w-full my-4 cursor-pointer overflow-hidden"
        onClick={handleOpen}
        placeholder={"undefined"}
      >
        <div className="flex flex-row gap-4 absolute inset-0 items-center justify-center bg-black text-white opacity-0 hover:bg-opacity-50 hover:opacity-90 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
          </svg>

          <p>Click to see all Images</p>
        </div>
        <Image
          alt="nature"
          height={100}
          width={200}
          unoptimized={true}
          className="w-full h-auto"
          src={images[0]}
        />
      </Card>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        placeholder={undefined}
      >
        <DialogHeader className="justify-between" placeholder={undefined}>
          <AvatarImageText user={user}/>
        </DialogHeader>
        <DialogBody placeholder={undefined}>
          <CaroiuselImage images={images} imageNames={imageNames}/>
        </DialogBody>

        {/* <DialogFooter className="justify-between"  placeholder={undefined}>
        </DialogFooter> */}
      </Dialog>
    </>
  );
}
