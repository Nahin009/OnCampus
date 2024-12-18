"use client";
import React, { createContext } from "react";
import PosText from "../getPost/Posttext";
import ImageGallery from "./Gallery";
import { FileList } from "./PostAttachments";
import DialogueBox from "./DialogueBox";
// import dynamic from "next/dynamic";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

export const ContextProvider = createContext({
  user: "",
  changeDeleted: (status: boolean) => {},
});

const SingleNotice = ({ notice }: { notice: any }) => {
  notice = notice.notice;
  const [deleted, changeDeleted] = React.useState(false);
  const handleChangeDeleted = () => {
    changeDeleted(true);
  };
  return (
    <>
      {deleted ? (
        <div>Notice deleted</div>
      ) : (
        <>
          <ContextProvider.Provider
            value={{
              user: notice.user,
              changeDeleted: changeDeleted,
            }}
          >
            <div className="flex flex-row-reverse pr-20">
              <DialogueBox author={notice.author} nid={notice.id} />
            </div>
            <PosText title={notice.title} content={notice.description} />
            
            <ImageGallery
              images={notice.images}
              imageNames={notice.imageNames}
            />
            <FileList
              files={notice.attachments}
              fileNames={notice.attachmentNames}
            />
            
            {/* <iframe src="/1.pdf" className="ustom-iframe-style"></iframe> */}
          </ContextProvider.Provider>
        </>
      )}
    </>
  );
};

export default SingleNotice;
