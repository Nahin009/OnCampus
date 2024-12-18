"use client";

import { Typography } from "@material-tailwind/react";
import AvatarImageText from "./AvatarImageText";
import CommentCount from "./CommentCount";
import DateTime from "./DateTime";
import Reaction from "./Reaction";
import { useContext, useState } from "react";
import Parser from "html-react-parser";
import { ContextProvider } from "./SinglePost";
import { DialogueBoxComment } from "./DialogueBoxComment";
import { createContext } from "react";
import { boolean } from "zod";
import CommentUpdate from "./CommentUpdate";

export const CommentProvider = createContext({
  updateStatus: boolean,
  changeUpdateStatus: (status: boolean) => {},
});

export default function CommentBody({
  comment,
  mapper,
}: {
  comment: any;
  mapper: any;
}) {
  comment.createdAt = new Date(comment.createdAt).toLocaleString();
  const [thisComment, setThisComment] = useState(comment);
  const { status } = useContext(ContextProvider);
  const [updateStatus, setUpdateStatus] = useState(false);
  const changeUpdateStatus = (status: boolean) => {
    setUpdateStatus(status);
  };
  return (
    <>
      <CommentProvider.Provider
        value={{
          updateStatus: updateStatus,
          changeUpdateStatus: changeUpdateStatus,
        }}
      >
        <div className="w-full my-4">
          <AvatarImageText user={comment.author} />

          <div className="flex flex-row gap-2">
            <DateTime date={comment.createdAt} />
            <DialogueBoxComment comment={comment} />
          </div>

          <div className="pt-2">
            {comment.content && !updateStatus ? <div dangerouslySetInnerHTML={{ __html: comment.content }}></div> : ""}
            {updateStatus ? (
              <CommentUpdate
                type="comment"
                cid={comment.id}
                prevContent={comment.content}
              />
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-row gap-4">
            <Reaction
              likedBy={comment.likedBy}
              type="comment"
              id={comment.id}
            />
            {status ? (updateStatus?"":<CommentCount type="comment" cid={comment.id} />) : ""}
          </div>
        </div>
        {mapper[comment.id] ? (
          <div className="flex flex-row gap-10 group relative">
            <div className="before:absolute before:content-[''] before:w-[0.05rem] before:bg-blue-gray-100 before:left-0 before:top-0 before:bottom-0 before:h-full group-hover:h-auto"></div>
            <div>
              {mapper[comment.id].map((comment: any) => (
                <CommentBody
                  key={comment.id}
                  comment={comment}
                  mapper={mapper}
                />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </CommentProvider.Provider>
    </>
  );
}
