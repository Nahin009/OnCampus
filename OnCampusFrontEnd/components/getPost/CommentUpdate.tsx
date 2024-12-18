"use client";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  IconButton,
  Textarea,
} from "@material-tailwind/react";
import React, { useRef } from "react";
import { useContext } from "react";
import { ContextProvider } from "./SinglePost";
import POST from "@/server_actions/POST";
import { set } from "zod";
import dynamic from "next/dynamic";
import {CommentProvider} from "./SingleComment";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export default function CommentUpdate({
  type,
  cid = "",
  prevContent
}: {
  type: string;
  cid?: string;
  prevContent: string;
}) {
  const { comments, changeComments, pid } = useContext(ContextProvider);
  const [content, setContent] = React.useState(prevContent);
  const editor = useRef(null);
  const [warning, setWarning] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const {updateStatus, changeUpdateStatus} = useContext(CommentProvider);

  const config = {
    readonly: false,
    autofocus: false,
    useSearch: false,
    toolbarSticky: false,
    toolbarAdaptive: false,
    disablePlugins:
      "speech-recognize,print,preview,image,drag-and-drop,drag-and-drop-element,dtd,file,image-processor,image-properties,media,mobile,video",
  };

  const handleComment = async () => {
    console.log(content);
    if (content == "<p><br></p>") {
      setWarning("Comment cannot be empty");
      return;
    }
    if (!content) {
      setWarning("Comment cannot be empty");
      return;
    }
    if (content === "") {
      setWarning("Comment cannot be empty");
      return;
    }
    setWarning("");
    startTransition(async () => {
      const res = await POST("post/updateComment/", {
        pid: pid,
        content: content,
        cid: cid,
      });
      console.log(res);
      if (res) {
        changeComments([res.comment, ...comments.filter((c) => c.id != cid)]);
        setContent("");
        changeUpdateStatus(false);
      }
    });
  };

  return (
    <div className="pl-10 ml-10">
      <div className="relative w-[32rem]">
        <div>
          <JoditEditor
            ref={null}
            value={content}
            config={config}
            onBlur={(newContent) => {
              setContent(newContent);
            }}
          />
        </div>

        <div className="text-red-500">{warning}</div>
        <div className="flex justify-between py-1.5">
          <div className="flex gap-2">
            <Button
              placeholder={""}
              color="red"
              variant="text"
              className="rounded-md"
              onClick={() => changeUpdateStatus(false)}
            >
              Cancel
            </Button>
            <Button
              placeholder={""}
              className="rounded-md"
              onClick={() => {
                handleComment();
              }}
            >
              {isPending ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
