'use client';

import {
  MultiImageDropzone,
  type FileState,
} from '../components/MultiImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';

interface customFile{
  url: string;
  key: string;
}
interface InputProps {
  getList?: (urls: string[]) => void;
}

export function MultiImage({ getList }: InputProps) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [urls, seturls] = useState<customFile[]>();

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <div>
      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 6,
        }}
        onChange={(files) => {
          setFileStates(files);
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
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });
                seturls(prevurls => [...(prevurls ?? []), {url:res.url, key:addedFileState.key}]);
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
          console.log(urls);
        }}
      />
      <button
        className="flex flex-col items-center mx-12 gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          console.log(fileStates);
          console.log(urls);
          fileStates?.map(async (fileState) => {
              const res = await edgestore.myPublicFiles.confirmUpload({
                url: urls?.find((url) => url.key === fileState.key)?.url??'',
            });
          });
          var list:string[] = [];
          fileStates?.map((fileState) => {
            list.push(urls?.find((url) => url.key === fileState.key)?.url??'')
          });
          getList?.(list);
          setFileStates([]);
          seturls([]);
        }}
        >
        Upload
        </button>
    </div>
  );
}