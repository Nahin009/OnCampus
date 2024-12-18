"use client";

import { SingleImageDropzone } from "./SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";
import { useState } from "react";

interface InputProps {
  getUrl: (urls: string) => void;
}

export function SingleImage({ getUrl }: InputProps) {
    const [file, setFile] = useState<File>();
    const { edgestore, reset } = useEdgeStore();

    async function runAfterAuthChange() {
      await reset(); // this will re-run the createContext function
    }

    const [urls, seturls] = useState<{
        url: string;
    }>();
    const [progress, setProgress] = useState<number>(0);

  return (
    <div>
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
        dropzoneOptions={
            {
                multiple: false,
                onDropRejected: (files) => {
                    console.log(files);
                },
                onDropAccepted: (files) => {
                    console.log(files);
                },
                maxSize: 1000*1000*1,//1MB
                //aro options ache
            }
        }
      />
      <button
        className="flex flex-col items-center mx-12 gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          if (file) {
            const res = await edgestore.myPublicFiles.upload({
              file,
              onProgressChange: (progress) => {
                setProgress(progress);
                console.log(progress);
              },
            });
            getUrl(res.url);
          }
        }}
      >
        Upload
      </button>
      <div className="h-[6px] w-44 border rounded overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-150"
          style={{ width: progress + "%" }}
        />
      </div>
      <div className="flex flex-auto">
        {urls != undefined ? (
          <>
            <Link href={urls?.url}>Click me to get url</Link>
            <img src={urls.url} alt="" />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
