"use client";

import {
  IconButton,
  Input,
  Switch,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Button, DatePicker } from "antd";

import SelectLocation from "./SelectLocations";

import type { DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import dynamic from "next/dynamic";
import { useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const config = {
  readonly: false,
  placeholder: "Start typings...",
  autofocus: true,
  iframe: true,
  spellcheck: true,
  disablePlugins:
    "about,drag-and-drop,drag-and-drop-element,file,image,image-processor,image-properties,media,video,speech-recognize",

  buttons:
    "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,lineHeight,superscript,subscript,classSpan,spellcheck,cut,copy,paste,selectall,copyformat,hr,table,link,symbols,indent,outdent,left,brush,undo,redo,find,source,fullsize,preview,print",

  showPlaceholder: true,
  height: 300,
  allowResizeY: false,
  width: 800,
};

const configReg = {
  readonly: false,
  placeholder: "Type rules here...",
  iframe: true,
  toolbarButtonSize: "small",
  disablePlugins:
    "about,class-span,clean-html,color,copyformat,delete-command,drag-and-drop,drag-and-drop-element,dtd,file,format-block,hotkeys,hr,image,image-processor,image-properties,indent,inline-popup,justify,key-arrow-outside,limit,line-height,media,powered-by-jodit,print,redo-undo,search,select,select-cells,size,source,speech-recognize,spellcheck,stat,sticky,symbols,tab,table,table-keyboard-navigation,video,wrap-nodes,xpath",
  buttons:
    "bold,italic,underline,strikethrough,ul,ol,font,fontsize,cut,copy,paste,link,hr,fullsize,preview,",

  height: 100,
};

const configRules = {
  readonly: false,
  placeholder: "Type rules here...",
  iframe: true,
  toolbarButtonSize: "small",
  disablePlugins:
    "about,class-span,clean-html,color,copyformat,delete-command,drag-and-drop,drag-and-drop-element,dtd,file,format-block,fullsize,hotkeys,hr,image,image-processor,image-properties,indent,inline-popup,justify,key-arrow-outside,limit,line-height,link,media,mobile,paste,paste-from-word,paste-storage,powered-by-jodit,preview,print,redo-undo,search,select,select-cells,size,source,speech-recognize,spellcheck,stat,sticky,symbols,tab,table,table-keyboard-navigation,video,wrap-nodes,xpath",
  buttons:
    "bold,italic,underline,strikethrough,ul,ol,font,fontsize,cut,copy,paste",

  height: 100,
};

const onChange: DatePickerProps<Dayjs[]>["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

export default function Sports() {
  const [locationOption, setLocationOpton] = useState<string | undefined>("");
  const handleChange = (selected: string | undefined) => {
    setLocationOpton(selected);
    console.log(selected);
  };

  const [registration, setRegistration] = useState<boolean>(false);
  const [rules, setRules] = useState<boolean>(false);
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [content3, setContent3] = useState("");

  const [inputCount, setInputCount] = useState<number>(0);
  const [inputs, setInputs] = useState<string[]>([]);

  const handleAddInput = () => {
    setInputCount(inputCount + 1);
    setInputs([...inputs, `input-${inputCount}`]);
  };

  const handleRemoveInput = (input: string) => {
    setInputs(inputs.filter((item) => item !== input));
  };

  const onChange: DatePickerProps<Dayjs[]>["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        <Input label="Name of the Event*" crossOrigin={undefined} />
        <Typography
          variant="small"
          className="text-blue-gray-500"
          placeholder={""}
        >
          Give short description*
        </Typography>
        <div>
          <JoditEditor
            value={content1}
            config={config}
            onBlur={(newContent) => setContent1(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
        </div>
        <div className="flex flex-row gap-8 w-auto">
          <div className="flex flex-col gap-1">
            <Typography
              className="text-blue-gray-600"
              variant="small"
              placeholder={""}
            >
              Start Date
            </Typography>
            <DatePicker
              onChange={onChange}
              showTime
              needConfirm={false}
              placeholder="YYYY-MM-DD HH:mm:ss*"
            />
          </div>
          <div className="flex flex-col gap-1 mx-auto   ">
            <Typography
              className="text-blue-gray-600"
              variant="small"
              placeholder={""}
            >
              End Date
            </Typography>
            <DatePicker
              onChange={onChange}
              showTime
              needConfirm={false}
              placeholder="YYYY-MM-DD HH:mm:ss"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 w-3/4">
          <Typography
            placeholder={""}
            variant="small"
            className="text-blue-gray-600"
          >
            Organized By*
          </Typography>
          <Input
            crossOrigin={""}
            label="..."
            placeholder="any of people, batch, batch-dept, club or organization..."
          />
        </div>

        <div className="flex flex-col gap-1 w-3/4">
          <Typography
            placeholder={""}
            variant="small"
            className="text-blue-gray-600"
          >
            Sponsored by
          </Typography>
          <Input
            crossOrigin={""}
            label="..."
            placeholder="put comma between multiple"
          />
        </div>

        <Switch
          crossOrigin={""}
          onClick={(e) => setRegistration(!registration)}
          label={
            <div>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="font-medium"
              >
                Regestration
              </Typography>
            </div>
          }
        />

        {registration && (
          <div className="flex flex-col gap-4">
            <Typography
              variant="small"
              className="text-blue-gray-500"
              placeholder={""}
            >
              Give registration details with Link
            </Typography>
            <div className="w-5/6">
              <JoditEditor
                value={content2}
                config={{ ...configReg, toolbarButtonSize: "small" }}
                onBlur={(newContent) => setContent2(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </div>
          </div>
        )}

        <div className="bg-gray-200 w-5/6 border-0 rounded-xl">
          <Typography variant="h5" className="px-4 pt-4" placeholder={""}>
            Add Sports Schedule
          </Typography>
          <div className="p-4">
            {inputs.map((input) => (
              <div className="" key={input}>
                <div className="mt-2 flex flex-row gap-2">
                  <div className="flex w-5/6 flex-col gap-2">
                    <div className="">
                      <Textarea
                        rows={5}
                        className="bg-white"
                        label="Timeline Title ( with/without short description )"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 fill-blue-800 ml-1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
                          <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
                        </svg>
                        <Typography
                          placeholder={""}
                          variant="small"
                          className="text-blue-gray-600"
                        >
                          Location
                        </Typography>
                      </div>
                      <DatePicker
                        onChange={onChange}
                        showTime
                        needConfirm={false}
                        placeholder="YYYY-MM-DD HH:mm:ss*"
                        className="w-3/5"
                      />

                      <div className="flex flex-row gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          className="w-5 h-5 fill-red-800 ml-1"
                        >
                          <path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                        </svg>
                        <Typography
                          placeholder={""}
                          variant="small"
                          className="text-blue-gray-600"
                        >
                          Location
                        </Typography>
                      </div>

                      <SelectLocation />
                    </div>
                  </div>

                  <IconButton
                    placeholder={""}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleRemoveInput(input)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </IconButton>
                </div>
                <hr className="my-4 border-blue-gray-200 " />
              </div>
            ))}
            <Button
              className="bg-blue-500 text-white rounded mt-2 flex items-center gap-3"
              onClick={handleAddInput}
            >
              Add More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-black"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5zM8 8a.5.5 0 0 1 .5.5V10H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V11H6a.5.5 0 0 1 0-1h1.5V8.5A.5.5 0 0 1 8 8" />
              </svg>
            </Button>
          </div>
        </div>

        <Switch
          crossOrigin={""}
          onClick={(e) => setRules(!rules)}
          label={
            <div>
              <Typography placeholder={""} color="red" className="font-medium">
                Rules
              </Typography>
            </div>
          }
        />

        {rules && (
          <div className="flex flex-col gap-4">
            <Typography
              variant="small"
              className="text-blue-gray-500"
              placeholder={""}
            >
              provide rules
            </Typography>
            <div className="w-3/4">
              <JoditEditor
                value={content3}
                config={{ ...configRules, toolbarButtonSize: "small" }} // change the toolbarButtonSize to one of the valid values
                onBlur={(newContent) => setContent3(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
