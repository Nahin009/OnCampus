"use client";
import React, {
  ReactEventHandler,
  createContext,
  useMemo,
  useTransition,
} from "react";
import { useEffect, useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
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
import { redirect } from "next/navigation";
import { Replace } from "lucide-react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import {
  MultiImageDropzone,
  type FileState,
} from "@/components/MultiImageDropzone";
import { MultiFileDropzone } from "@/components/MultiFileDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";
import POST from "@/server_actions/POST";

interface customImg {
  url: string;
  key: string;
  name: string;
}
interface customFile {
  url: string;
  key: string;
  name: string;
}

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const page = () => {

    const formHandler = async () => {
        //errror handling
        if (!submit) {
          return;
        }
        setSubmit(false);
    
        if (title === "") {
          setAlertMsg("Title is required");
          setAlertOpen(true);
          scrollToTop();
          return;
        }
    
        if (content === "") {
          setAlertMsg("Content is required");
          setAlertOpen(true);
          scrollToTop();
          return;
        }
    
        if (content == "<p><br></p>") {
          setAlertMsg("Content is required");
          setAlertOpen(true);
          scrollToTop();
          return;
        }
    
        if (imgStates?.length > 6) {
          setAlertMsg("Maximum 6 images are allowed");
          setAlertOpen(true);
          scrollToTop();
          return;
        }
    
        if (fileStates?.length > 6) {
          setAlertMsg("Maximum 6 files are allowed");
          setAlertOpen(true);
          scrollToTop();
          return;
        }
    
        if (imgStates?.length > 0) {
          if (imgStates?.some((imgState) => imgState.progress !== "COMPLETE")) {
            setAlertMsg("Images are still uploading");
            setAlertOpen(true);
            scrollToTop();
            return;
          }
        }
    
        if (fileStates?.length > 0) {
          if (fileStates?.some((fileState) => fileState.progress !== "COMPLETE")) {
            setAlertMsg("Files are still uploading");
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
    
        var list: customFile[] = [];
        fileStates?.map((fileState) => {
          list.push(
            urls?.find((url) => url.key === fileState.key) ?? {
              url: "",
              key: "",
              name: "",
            }
          );
        });
        const data = {
          title,
          content,
          imgList,
          list,
        };
        startTransition(async () => {
          const res = await POST("event/notice/addNotice",data);
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
    
            fileStates?.map(async (fileState) => {
              try {
                const res = await edgestore.myPublicFiles.confirmUpload({
                  url: urls?.find((url) => url.key === fileState.key)?.url ?? "",
                });
              } catch (err) {
                console.log(err);
              }
            });
    
            setAlertMsg((prev) => "Notice added successfully");
            setAlertOpen(true);
            setTitle("");
            setContent("");
            setImgStates([]);
            setImgUrls([]);
            setFileStates([]);
            seturls([]);
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
      
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();

  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");
  const [submit, setSubmit] = useState(false);

  const [imgStates, setImgStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [imgUrls, setImgUrls] = useState<customImg[]>();

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

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [urls, seturls] = useState<customFile[]>();
  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");

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
  return (
    <>
    <Alert open={alertOpen} onClose={() => setAlertOpen(false)}>
          {alertMsg}
        </Alert>
        <div className="grid justify-center w-full">
          <div>
            <Typography variant="h4" color="blue-gray">
              Add a notice
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Share your notices
            </Typography>
          </div>
          <div>
            <form
              action={formHandler}
              className="mt-8 mb-2 max-w-screen-xl sm:w-200"
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Title
                </Typography>
                <Input
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle((prev) => e.target.value);
                  }}
                  size="lg"
                  placeholder="Write a title"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Post content
                </Typography>
                <JoditEditor
                  ref={null}
                  value={content}
                  config={config}
                  onBlur={(newContent) => {
                    setContent((prev) => newContent);
                  }}
                  onChange={(newContent) => {}}
                />
                
                <MultiImageDropzone
                  value={imgStates}
                  dropzoneOptions={{
                    maxFiles: 6,
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
                                updateImgProgress(
                                  addedFileState.key,
                                  "COMPLETE"
                                );
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

                <MultiFileDropzone
                  value={fileStates}
                  onChange={(files) => {
                    setFileStates(files);
                  }}
                  dropzoneOptions={{
                    maxFiles: 6,
                  }}
                  onFilesAdded={async (addedFiles) => {
                    setFileStates([...fileStates, ...addedFiles]);
                    await Promise.all(
                      addedFiles.map(async (addedFileState) => {
                        try {
                          const res = await edgestore.myPublicFiles.upload({
                            file: addedFileState.file,
                            options: {
                              temporary: true,
                            },
                            onProgressChange: async (progress) => {
                              updateFileProgress(addedFileState.key, progress);
                              if (progress === 100) {
                                await new Promise((resolve) =>
                                  setTimeout(resolve, 1000)
                                );
                                updateFileProgress(
                                  addedFileState.key,
                                  "COMPLETE"
                                );
                              }
                            },
                          });
                          seturls((prevurls) => [
                            ...(prevurls ?? []),
                            {
                              url: res.url,
                              key: addedFileState.key,
                              name: addedFileState.file.name,
                            },
                          ]);
                        } catch (err) {
                          updateFileProgress(addedFileState.key, "ERROR");
                        }
                      })
                    );
                  }}
                />

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="red"
                    variant="text"
                    className="rounded-md"
                    onClick={() => router.push("/../../")}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setSubmit(true)}
                    type="submit"
                    className="rounded-md"
                  >
                    {isPending ? "Adding..." : "Add notice"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
    </>
  )
};

export default page;
