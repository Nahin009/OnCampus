import Link from "next/link";

import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Button,
} from "@material-tailwind/react";
import useDownloader from "react-use-downloader";

import PdfComp from "./PdfComp";
import { useState } from "react";
export function FileList({
  files,
  fileNames,
}: {
  files: string[];
  fileNames: string[];
}) {
  const { download } = useDownloader();
  const [showPdfs, setShowPdfs] = useState<boolean[]>(
    Array(files.length).fill(false)
  );
  const handleShowPdf = (index: number) => {
    let newShowPdfs = [...showPdfs];
    newShowPdfs[index] = !newShowPdfs[index];
    setShowPdfs(newShowPdfs);
  };

  return (
    <>
      <List placeholder={undefined}>
        {files.map((file, index) => (
          <ListItem
            ripple={false}
            className="py-1 pr-1 pl-4 border-2 m-2 w-auto"
            placeholder={undefined}
          >
            {fileNames[index]}

            <ListItemSuffix placeholder={undefined}>
              <div className="flex items-center justify-center space-x-4">
                <a key={index} href={files[index]} target="_blank">
                  <Button>Link to file</Button>
                </a>
                {files[index].toLowerCase().endsWith(".pdf") ? (
                  <Button onClick={() => handleShowPdf(index)}>
                    {showPdfs[index] ? "Hide pdf" : "Show pdf"}
                  </Button>
                ) : (
                  ""
                )}
                <div>
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    placeholder={undefined}
                    onClick={() => {
                      download(file, fileNames[index]);
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13 11.1V4a1 1 0 1 0-2 0v7.1L8.8 8.4a1 1 0 1 0-1.6 1.2l4 5a1 1 0 0 0 1.6 0l4-5a1 1 0 1 0-1.6-1.2L13 11Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M9.7 15.9 7.4 13H5a2 2 0 0 0-2 2v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.4l-2.3 2.9a3 3 0 0 1-4.6 0Zm7.3.1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </IconButton>
                </div>
              </div>
            </ListItemSuffix>
          </ListItem>
        ))}
      </List>

      <div>
        {showPdfs.map((showPdf, index) => {
          return (showPdf ? <><div className="flex items-center justify-center">{fileNames[index]}</div><PdfComp pdfFile={files[index]} /></> : "");
        })}
      </div>
    </>
  );
}
