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
import {ContextProvider} from "./SinglePost";
import POST from "@/server_actions/POST";
import { set } from "zod";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export default function CommentCount({type,cid=""}: {type: string,cid?:string}) {
  const [open, setOpen] = React.useState(0);
  const {comments,changeComments,pid} = useContext(ContextProvider)
  const [content, setContent] = React.useState("");
  const editor = useRef(null);
  const [warning, setWarning] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const config =
  {
    readonly: false,
    autofocus: false,
    useSearch: false,
    toolbarSticky: false,
    toolbarAdaptive: false,
    disablePlugins: "speech-recognize,print,preview,image,drag-and-drop,drag-and-drop-element,dtd,file,image-processor,image-properties,media,mobile,video"
  }

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const handleComment = async() => {
    console.log(content);
    if(content=="<p><br></p>"){
      setWarning("Comment cannot be empty")
      return
    }
    if(!content){
      setWarning("Comment cannot be empty")
      return
    }
    if(content===""){
      setWarning("Comment cannot be empty")
      return
    }
    setWarning("")
    startTransition(async() => {
      const res = await POST("post/createComment/"+type,{
        pid: pid,
        content: content,
        cid: cid
      })
      console.log(res);
      if(res){
        changeComments([res.comment,...comments])
        handleOpen(1)
        setContent("")
      }
    })
  }

  return (
    <div className="pl-10 ml-10">
      <Accordion placeholder={""} open={open === 1} animate={CUSTOM_ANIMATION}>
        <AccordionHeader
          placeholder={""}
          onClick={() => handleOpen(1)}
          className="border-b-0 p-0"
        >
          <div className="flex flex-row gap-2">
          <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M3.505 2.365A41.369 41.369 0 0 1 9 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 0 0-.577-.069 43.141 43.141 0 0 0-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 0 1 5 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914Z" />
                <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 0 0 1.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0 0 14 6Z" />
              </svg>
            <span className="text-sm font-light mt-2">Reply</span>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <div className="relative w-[32rem]">
            <div >
            <JoditEditor
                ref={null}
                value={content}
                config={config}
                onBlur={(newContent) => {
                  setContent(newContent);
                }}
              />

            </div>
            
            <div className="text-red-500">
              {warning}
            </div>
            <div className="flex justify-between py-1.5">
              <div className="flex gap-2">
                <Button
                  placeholder={""}
                  color="red"
                  variant="text"
                  className="rounded-md"
                  onClick={() => handleOpen(1)}
                >
                  Cancel
                </Button>
                <Button placeholder={""} className="rounded-md"
                onClick={()=>{handleComment()}}
                >
                  {isPending?"Posting...":"Post Comment"}
                </Button>
              </div>
            </div>
          </div>
          {/* <hr className="w-[32rem] border-1 border-black" /> */}
        </AccordionBody>
      </Accordion>
    </div>
  );
}
