"use client";

import POST from "@/server_actions/POST";
import { createContext, useState } from "react";
import AvatarImageText from "./AvatarImageText";
import AvatarStack from "./AvatarStack";
import BloodPost from "./BloodPost";
import BreadcrumbsDefault from "./BreadCrumbs";
import CommentCount from "./CommentCount";
import DateTime from "./DateTime";
import { DialogueBox } from "./DialogueBox";
import ImageGallery from "./Gallery";
import IntPost from "./IntPost";
import { FileList } from "./PostAttachments";
import PosText from "./Posttext";
import ProductInfo from "./ProductInfo";
import Reaction from "./Reaction";
import CommentBody from "./SingleComment";
import TuitionPost from "./TuitionPost";
import PollList from "./poll";
import Saveicon from "./save";

import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Button } from "antd";
import { boolean } from "zod";
import { Typography } from "@material-tailwind/react";

function processNestedComments(comments: any[]) {
  let groupedComments: any = {};
  comments.forEach((comment) => {
    if (!groupedComments[comment.parentCommentID]) {
      groupedComments[comment.parentCommentID] = [];
    }
    groupedComments[comment.parentCommentID].push(comment);
  });
  return groupedComments;
}

export const ContextProvider = createContext({
  comments: [],
  changeComments: (comments: any) => {},
  pid: "",
  user: { id: "", name: "", email: "", profilePicture: "", role: "" },
  intBy: [],
  changeIntBy: (users: any) => {},
  changeStatus: (status: boolean) => {},
  status: boolean,
  changeCommentStatus: (status: boolean) => {},
  changeDeleted: (status: boolean) => {},
  reportedBy: [],
});

export default function PostBody({ post }: { post: any }) {
  const changeComments = (comments: any) => {
    setComments(comments);
  };
  post = post.post;
  const [comments, setComments] = useState(post.comments);
  post = {
    ...post,
    comments: processNestedComments(comments),
  };
  const d=post.createdAt;
  post.createdAt = new Date(post.createdAt).toLocaleString();
  const anonymous = {
    profilePicture:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    name: "Anonymous",
    id: "546254226564",
    email: "Anonymous@buet.ac.bd",
  };

  const [intBy, setIntBy] = useState(post.intBy);
  const changeIntBy = (users: any[]) => {
    setIntBy(users);
  };
  const [status, setStatus] = useState(post.open);
  const changeStatus = (status: boolean) => {
    setStatus(status);
  };
  const [commentStatus, setCommentStatus] = useState(post.commentAllow);
  const changeCommentStatus = (status: boolean) => {
    setCommentStatus(status);
  };
  const [deleted, setDeleted] = useState(false);
  const changeDeleted = (status: boolean) => {
    setDeleted(status);
  };

  return (
    <ContextProvider.Provider
      value={{
        comments: comments,
        changeComments: changeComments,
        pid: post.id,
        user: post.user,
        intBy: intBy,
        changeIntBy: changeIntBy,
        changeStatus: changeStatus,
        status: status,
        changeCommentStatus: changeCommentStatus,
        changeDeleted: changeDeleted,
        reportedBy: post.reportedBy,
      }}
    >
      {deleted ? (
        <div>Post Deleted</div>
      ) : (
        <div className="flex flex-col w-5/6">
          <div className="flex flex-row gap-4 justify-end my-8 mr-8"></div>
          {!post.anonymous ? (
            <AvatarImageText user={post?.author} />
          ) : (
            <AvatarImageText user={anonymous} />
          )}

          <div className="flex flex-row gap-2">
            <BreadcrumbsDefault type={post.type} tags={post.tags} />
            <DateTime date={post.createdAt} />
            {status ? "" : <LockClosedIcon className="w-7 h-7" />}
            <span className="ml-auto">
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <Saveicon
                    user={post.user}
                    savedBy={post.savedBy}
                    id={post.id}
                  />
                </div>
                {/* <div className="flex flex-col"> */}
                <DialogueBox
                  author={post.author}
                  type={post.tags[0]}
                  pid={post.id}
                  status={post.open}
                  commentStatus={post.commentAllow}
                />
                {/* </div> */}
              </div>
            </span>
          </div>

          {post.bloodInfo ? <BloodPost blood={post.bloodInfo} /> : ""}
          {post.tuitionInfo ? <TuitionPost tuition={post.tuitionInfo} /> : ""}
          {post.productInfo ? <ProductInfo product={post.productInfo} /> : ""}

          <PosText title={post.title} content={post.content} />
          <FileList files={post.attachments} fileNames={post.attachmentNames} />

          <ImageGallery
            images={post.images}
            imageNames={post.imageNames}
            user={post?.author}
          />

          {post.isPoll ? <PollList options={post.options} /> : ""}

          {post.tags[0] == "TUITION" ? (
            <div className="flex flex-row gap-4 justify-end my-8">
              <IntPost users={intBy} />
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-row gap-4 justify-end my-8">
            <AvatarStack users={post.viewedBy} />
          </div>
          <hr className="my-2 border-blue-gray-900" />

          <div className="flex flex-row gap-4">
            <Reaction likedBy={post.likedBy} type="post" id={post.id} />
            {commentStatus && status ? <CommentCount type="post" /> : ""}
          </div>

          <hr className="my-2 border-blue-gray-900" />

          {commentStatus ? (
            <div className="flex flex-col gap-8 w-full">
              {post.comments["null"]?.map((comment: any) => (
                <CommentBody
                  key={comment.id}
                  comment={comment}
                  mapper={post.comments}
                />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </ContextProvider.Provider>
  );
}
