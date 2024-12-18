import Link from "next/link";

import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
} from "@material-tailwind/react";
import useDownloader from "react-use-downloader"; 

export function FileList({
  files,
  fileNames,
}: {
  files: string[];
  fileNames: string[];
}) {

  const { download } = useDownloader();
  return (
    
      <List placeholder={undefined}>
        {files.map((file, index) => (
          <a key={index} href={files[index]} target="_blank">
          <ListItem
            ripple={false}
            className="py-1 pr-1 pl-4 border-2 m-2 w-auto"
            placeholder={undefined}
          >
            {fileNames[index]}
            <ListItemSuffix placeholder={undefined}>
              <IconButton
                variant="text"
                color="blue-gray"
                placeholder={undefined}
                onClick={() => {
                    download(file, fileNames[index]);
                  }
                }
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
            </ListItemSuffix>
          </ListItem>
        </a>
        ))}
      </List>

  );
}
