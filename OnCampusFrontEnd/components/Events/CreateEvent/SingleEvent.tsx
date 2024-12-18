"use client";

import { Button, Input, Switch, Typography } from "@material-tailwind/react";
import { DatePicker } from "antd";

import type { DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import dynamic from "next/dynamic";
import { useState } from "react";
import LocationSelector from "./LocationSelector";
import Resources from "./Resources";
import Timeline from "./Timeline";

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

interface TimeLine {
  name: string;
  description: string;
  startDate: string;
  finishDate: string;
  meetingType: string;
  location: string;
  onlineLink: string;
}

interface Resource {
  description: string;
  link: string;
}

interface Event {
  title: string;
  description: string;
  startDate: string;
  finishDate: string;
  eventType: string;
  location: string;
  onlineLink: string;
  organizers: string;
  sponsors: string;
  registration: string;
  rules: string;
  prizes: string;
  eventTag: string;
  timeline: TimeLine[];
  resources: Resources[];
}

export default function SingleEvent({
  selectedType,
  hasTimeline = false,
  hasResources = false,
  hasRules = false,
  hasRegistration = false,
  hasPrize = false,
}: {
  selectedType: string;
  hasTimeline?: boolean;
  hasResources?: boolean;
  hasRules?: boolean;
  hasRegistration?: boolean;
  hasPrize?: boolean;
}) {
  const [registrationIn, setRegistrationIn] = useState<boolean>(
    hasRegistration || false
  );
  const [rulesIn, setRulesIn] = useState<boolean>(hasRules || false);
  const [timelineIn, setTimelineIn] = useState<boolean>(hasTimeline || false);
  const [resourcesIn, setResourcesIn] = useState<boolean>(
    hasResources || false
  );
  const [prizeIn, setPrizeIn] = useState<boolean>(hasPrize || false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [finishDate, setFinishDate] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [onlineLink, setOnlineLink] = useState<string>("");
  const [organizers, setOrganizers] = useState<string>("");
  const [sponsors, setSponsors] = useState<string>("");
  const [registration, setRegistration] = useState<string>("");
  const [rules, setRules] = useState<string>("");
  const [prizes, setPrizes] = useState<string>("");
  const [eventTag, setEventTag] = useState<string>(selectedType);
  const [timeline, setTimeline] = useState<TimeLine[]>([]);
  const [resources, setResources] = useState<Resources[]>([]);

  const startdateChange: DatePickerProps<Dayjs[]>["onChange"] = (
    date,
    dateString
  ) => {
    console.log(date, dateString);
    console.log("datedtring" + dateString.toString());
    console.log("ds1" + dateString[0]);
    console.log("ds2" + dateString[1]);
    setStartDate(dateString.toString());
    console.log("start date" + startDate);
  };

  const finishDateChange: DatePickerProps<Dayjs[]>["onChange"] = (
    date,
    dateString
  ) => {
    console.log(date, dateString);
    console.log("datedtring" + dateString.toString());
    console.log("ds1" + dateString[0]);
    console.log("ds2" + dateString[1]);
    setFinishDate(dateString.toString());
    console.log("start date" + startDate);
  };



  const onResourcesChange = (index: number, resource: Resource) => {
    

  }



  const handleSubmit = () => {
    const mainData: Event = {
      title: title,
      description: description,
      startDate: startDate,
      finishDate: finishDate,
      eventType: eventType,
      location: location,
      onlineLink: onlineLink,
      organizers: organizers,
      sponsors: sponsors,
      registration: registration,
      rules: rules,
      prizes: prizes,
      eventTag: eventTag,
      timeline: timeline,
      resources: resources,
    };
    // Log the combined data
    console.log(mainData);
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        <Input
          className="bg-white"
          label="Name of the Event*"
          crossOrigin={undefined}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Typography
          variant="small"
          className="text-blue-gray-500"
          placeholder={""}
        >
          Give short description*
        </Typography>
        <div>
          <JoditEditor
            value={description}
            config={config}
            onBlur={(newContent) => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
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
              Start Date*
            </Typography>
            <DatePicker
              onChange={startdateChange}
              showTime
              needConfirm={false}
              placeholder="YYYY-MM-DD HH:mm:ss"
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
              onChange={finishDateChange}
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
            className="bg-white"
            crossOrigin={""}
            label="..."
            placeholder="any of people, batch, batch-dept, club or organization..."
            onChange={(e) => setOrganizers(e.target.value)}
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
            className="bg-white"
            crossOrigin={""}
            label="..."
            placeholder="put comma between multiple"
            onChange={(e) => setSponsors(e.target.value)}
          />
        </div>

        <div className="border-blue-gray-500 rounded-md flex flex-col gap-1 mt-4">
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

          <LocationSelector />
        </div>

        <Switch
          defaultChecked={registrationIn}
          crossOrigin={""}
          onClick={(e) => setRegistrationIn(!registrationIn)}
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

        {registrationIn && (
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
                value={registration}
                config={{ ...configReg, toolbarButtonSize: "small" }}
                onBlur={(newContent) => setRegistration(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </div>
          </div>
        )}

        <Switch
          defaultChecked={timelineIn}
          crossOrigin={""}
          onClick={(e) => setTimelineIn(!timelineIn)}
          label={
            <div>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="font-medium"
              >
                Add Timelines
              </Typography>
            </div>
          }
        />

        {timelineIn && <Timeline />}

        <Switch
          defaultChecked={resourcesIn}
          crossOrigin={""}
          onClick={(e) => setResourcesIn(!resourcesIn)}
          label={
            <div>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="font-medium"
              >
                Add Resources
              </Typography>
            </div>
          }
        />

        {resourcesIn && <Resources />}

        <Switch
          defaultChecked={prizeIn}
          crossOrigin={""}
          onClick={(e) => setPrizeIn(!prizeIn)}
          label={
            <div>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="font-medium"
              >
                Prize Pool
              </Typography>
            </div>
          }
        />

        {prizeIn && (
          <div className="flex flex-col gap-4">
            <Typography
              variant="small"
              className="text-blue-gray-500"
              placeholder={""}
            >
              Give PrizePool details
            </Typography>
            <div className="w-5/6">
              <JoditEditor
                value={prizes}
                config={{ ...configReg, toolbarButtonSize: "small" }}
                onBlur={(newContent) => setPrizes(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </div>
          </div>
        )}

        <Switch
          defaultChecked={rulesIn}
          crossOrigin={""}
          onClick={(e) => setRulesIn(!rulesIn)}
          label={
            <div>
              <Typography placeholder={""} color="red" className="font-medium">
                Rules
              </Typography>
            </div>
          }
        />

        {rulesIn && (
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
                value={rules}
                config={{ ...configRules, toolbarButtonSize: "small" }} // change the toolbarButtonSize to one of the valid values
                onBlur={(newContent) => setRules(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </div>
          </div>
        )}

        <Button onClick={handleSubmit}>Create Event</Button>
      </div>
    </div>
  );
}
