"use client";

import {
  Input,
  Option,
  Select,
  Switch,
  Typography,
} from "@material-tailwind/react";
import { DatePicker } from "antd";

import SelectLocation from "./SelectLocations";
import Timeline from "./TimelineDayTime";

import type { DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import dynamic from "next/dynamic";
import { useState } from "react";
import Resources from "./Resources";

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

const locationTypes = [
  {
    id: 1,
    name: "Online",
  },
  {
    id: 2,
    name: "Offline",
  },
  {
    id: 3,
    name: "Both",
  },
];

export default function Competition() {
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

        <div className="border-blue-gray-500 rounded-md flex flex-col gap-4">
          <div className="w-1/3 p-4 flex flex-col gap-2">
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
                Event Location
              </Typography>
            </div>
            <Select
              size="md"
              label="Select Location Type"
              className="bg-white"
              placeholder={undefined}
              value={locationOption}
              onChange={handleChange}
            >
              {/* <Option value="">Nothing</Option> */}
              {locationTypes.map((type) => (
                <Option key={type.id} value={type.name}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="">
            {locationOption && (
              <div className="w-full p-4">
                {locationOption === "Online" ? (
                  <div className="flex flex-col gap-1">
                    <Typography
                      placeholder={""}
                      variant="small"
                      className="text-blue-gray-600"
                    >
                      Online Link
                    </Typography>
                    <Input
                      crossOrigin={""}
                      label="Meeting Link*"
                      placeholder="to be announced..."
                    />
                  </div>
                ) : locationOption === "Offline" ? (
                  <div className="flex flex-col gap-1">
                    <Typography
                      placeholder={""}
                      variant="small"
                      className="text-blue-gray-600"
                    >
                      Offline venue
                    </Typography>
                    <SelectLocation />
                  </div>
                ) : locationOption === "Both" ? (
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-1 w-1/3">
                      <Typography
                        placeholder={""}
                        variant="small"
                        className="text-blue-gray-600"
                      >
                        Online Link
                      </Typography>
                      <Input
                        crossOrigin={""}
                        label="Meeting Link*"
                        placeholder="to be announced..."
                      />
                    </div>
                    <div className="flex flex-col gap-1 mx-auto w-1/3">
                      <Typography
                        placeholder={""}
                        variant="small"
                        className="text-blue-gray-600"
                      >
                        Offline venue
                      </Typography>
                      <SelectLocation />
                    </div>
                  </div>
                ) : (
                  <h1>Nothing</h1>
                )}
              </div>
            )}
          </div>
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

        <Timeline timeline="Day" />
        <Resources />

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
