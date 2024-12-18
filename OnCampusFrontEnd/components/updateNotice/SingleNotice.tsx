"use client";
import React, {
  ReactEventHandler,
  createContext,
  useMemo,
  useTransition,
} from "react";
import { FileIcon, X } from "lucide-react";
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

const variants = {
  base: "relative rounded-md p-4 w-96 max-w-[calc(100vw-1rem)] flex justify-center items-center flex-col cursor-pointer border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out",
  active: "border-2",
  disabled:
    "bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700 dark:border-gray-600",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
};
const imgVariants = {
  base: "relative rounded-md aspect-square flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out",
  image:
    "border-0 p-0 w-full h-full relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md",
  active: "border-2",
  disabled:
    "bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const page = ({notice}:{notice:any}) => {

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
    
        if (imgStates?.length + images.length > 6) {
          setAlertMsg("Maximum 6 images are allowed");
          setAlertOpen(true);
          scrollToTop();
          return;
        }
    
        if (fileStates?.length + attachments.length > 6) {
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

        const prevImg: customFile[] = [];

    images?.map((img, i) => {
      prevImg.push({
        url: img,
        name: imagNames[i],
        key: "",
      });
    });

    const prevFile: customFile[] = [];
    attachments.map((file, i) => {
      prevFile.push({
        url: file,
        name: attachmentNames[i],
        key: "",
      });
    });

    imgList = prevImg.concat(imgList);
    list = prevFile.concat(list);
    console.log(notice);
    const nid = notice.id;
        const data = {
          title,
          content,
          imgList,
          list,
          nid,
        };
        startTransition(async () => {
          const res = await POST("event/notice/updateNotice",data);
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
    
            setAlertMsg((prev) => "Notice updated successfully");
            setAlertOpen(true);
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

  const [content, setContent] = useState(notice.description);

  const [title, setTitle] = useState(notice.title);
  const [submit, setSubmit] = useState(false);

  const [imgStates, setImgStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [imgUrls, setImgUrls] = useState<customImg[]>();

  const [images, setImages] = useState(notice.images);
  const [imagNames, setImageNames] = useState(notice.imageNames);
  const [attachmentNames, setAttachmentNames] = useState(notice.attachmentNames);
  const [attachments, setAttachments] = useState(notice.attachments);

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
              Update a notice
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
                
                <div className="grid grid-cols-[repeat(1,1fr)] gap-2 sm:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] xl:grid-cols-[repeat(4,1fr)]">
                  {images?.map((img, index) => (
                    <div
                      key={index}
                      className={imgVariants.image + " aspect-square h-full"}
                    >
                      <img
                        className="h-full w-full rounded-md object-cover"
                        src={img}
                        alt={imagNames[index]}
                      />
                      {/* Remove Image Icon */}
                      {
                        <div
                          className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
                          onClick={(e) => {
                            setImages((prev) => prev.filter((e) => e != img));
                            setImageNames((prev) =>
                              prev.filter((e) => e != imagNames[index])
                            );
                          }}
                        >
                          <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black">
                            <X
                              className="text-gray-500 dark:text-gray-400"
                              width={16}
                              height={16}
                            />
                          </div>
                        </div>
                      }
                    </div>
                  ))}
                </div>

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

                {attachments?.map((fileUrl, i) => (
                  <div
                    key={i}
                    className="flex h-16 w-96 max-w-[100vw] flex-col justify-center rounded border border-gray-300 px-4 py-2"
                  >
                    <div className="flex items-center gap-2 text-gray-500 dark:text-white">
                      <FileIcon size="30" className="shrink-0" />
                      <div className="min-w-0 text-sm">
                        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {attachmentNames[i]}
                        </div>
                      </div>
                      <div className="grow" />
                      <div className="flex w-12 justify-end text-xs">
                        {/* Remove Image Icon */}
                        <div
                          className="group right-0 top-1 -translate-y-1/4 translate-x-1/4 transform"
                          onClick={(e) => {
                            setAttachments((prev) =>
                              prev.filter((e) => e != fileUrl)
                            );
                            setAttachmentNames((prev) =>
                              prev.filter((e) => e != attachmentNames[i])
                            );
                          }}
                        >
                          <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black">
                            <X
                              className="text-gray-500 dark:text-gray-400"
                              width={16}
                              height={16}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

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
                    {isPending ? "Updating..." : "Update notice"}
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
