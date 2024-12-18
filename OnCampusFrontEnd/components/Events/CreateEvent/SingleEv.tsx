"use client";

import {
  Button,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
  Switch,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { DatePicker } from "antd";

import type { DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import dynamic from "next/dynamic";
import { useState } from "react";
import Locations from "../DummyLocations";
import Resources from "./Resources";

import POST from "@/server_actions/POST";
import { set } from "zod";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

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
  {
    id: 4,
    name: "None",
  },
];

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

export default function SingleEv({
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


  const [allinput, setAllinput] = useState<Event>({
    title: "",
    description: "",
    startDate: "",
    finishDate: "",
    eventType: "",
    location: "",
    onlineLink: "",
    organizers: "",
    sponsors: "",
    registration: "",
    rules: "",
    prizes: "",
    eventTag: "",
    timeline: [],
    resources: [],
  });

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
    const newResources = [...resources];
    newResources[index] = resource;
    setResources(newResources);
  };

  const onResourcesRemove = (index: number) => {
    const newResources = resources.filter((_, i) => i !== index);
    setResources(newResources);
  };

  const handleSubmit =async () => {
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

    const response = await POST("event/createEvent", mainData);

    if(response){
        setStartDate("");
        setFinishDate("");
        setTitle("");
        setDescription("");
        setEventType("");
        setLocation("");
        setOnlineLink("");
        setOrganizers("");
        setSponsors("");
        setRegistration("");
        setRules("");
        setPrizes("");
        setEventTag("");
        setTimeline([]);
        setResources([]);
        console.log("Event created successfully");
    }
    else{
        console.log("Error in creating event");
    }
  };

  const [locationOption, setLocationOpton] = useState<string | undefined>("");
  const handleChange = (selected: string | undefined) => {
    setLocationOpton(selected);
    if(selected) setEventType(selected);
    console.log(selected);
  };

  const [inputCount, setInputCount] = useState<number>(0);
  const [inputs, setInputs] = useState<string[]>([]);

  const handleAddInput = () => {
    setInputCount(inputCount + 1);
    setInputs([...inputs, `input-${inputCount}`]);
    setResources([...resources, { description: "", link: "" }]);
  };

  const handleRemoveInput = (input: number) => {
    setInputs(inputs.filter((item, i) => i !== input));
    setResources(resources.filter((item, i) => i !== input));
  };

  const [inputCount1, setInputCount1] = useState<number>(0);
  const [inputs1, setInputs1] = useState<string[]>([]);

  const handleAddInputTimeLine = () => {
    setInputCount1(inputCount1 + 1);
    setInputs1([...inputs1, `input-${inputCount1}`]);
    setTimeline([
      ...timeline,
      {
        name: "",
        description: "",
        startDate: "",
        finishDate: "",
        meetingType: "",
        location: "",
        onlineLink: "",
      },
    ]);
  };

  const handleRemoveInputTimeLine = (input: number) => {
    setInputs1(inputs1.filter((item, i) => i !== input));
    setTimeline(timeline.filter((item, i) => i !== input));
  };

  type CustomOnChange = (
    date: Dayjs | null,
    dateString: string | string[],
    index: number
  ) => void;

  const onChange1: CustomOnChange = (date, dateString, index) => {
    console.log(date, dateString, index);
    const newTimeline = [...timeline];
    newTimeline[index].startDate = dateString.toString();
    setTimeline(newTimeline);
  };
  const onChange2: CustomOnChange = (date, dateString, index) => {
    console.log(date, dateString, index);
    const newTimeline = [...timeline];
    newTimeline[index].finishDate = dateString.toString();
    setTimeline(newTimeline);
  };

  const handleFormSubmit = (e:any) => {
     //set all the inputs from input fields
     
     
  }

  return (
    <div>
      <form action={handleFormSubmit} className="flex flex-col gap-6">
        <Input
          className="bg-white"
          label="Name of the Event*"
          crossOrigin={undefined}
          name="title"
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

          <div className="mt-1 flex flex-col gap-1">
            <div className="w-1/3">
              <Select
                size="md"
                label="Select Location Type"
                className="bg-white"
                placeholder={undefined}
                value={locationOption}
                onChange={handleChange}
              >
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
                    <div className="flex flex-col gap-1 w-1/2">
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
                        className="bg-white"
                        onChange={(e) => setOnlineLink(e.target.value)}
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
                      <div className="relative flex w-full max-w-[24rem] bg-white">
                        <div className="flex flex-row gap-4">
                          <Menu placement="bottom-start">
                            <MenuHandler>
                              <Button
                                placeholder={""}
                                ripple={false}
                                variant="text"
                                color="blue-gray"
                                className="flex flex-row h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                              >
                                Populars
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 16 16"
                                  fill="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M13.78 10.47a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l.97.97V5.75a.75.75 0 0 1 1.5 0v5.69l.97-.97a.75.75 0 0 1 1.06 0ZM2.22 5.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V4.56l-.97.97a.75.75 0 0 1-1.06 0Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Button>
                            </MenuHandler>
                            <MenuList
                              placeholder={""}
                              className="max-h-[20rem] max-w-[18rem]"
                            >
                              {Locations.map(({ name }, index) => {
                                return (
                                  <MenuItem
                                    placeholder={""}
                                    key={name}
                                    value={name}
                                    className="flex items-center gap-2"
                                    onClick={() => {
                                      setLocation(name);
                                      console.log(name);
                                    }}
                                  >
                                    {name}
                                  </MenuItem>
                                );
                              })}
                            </MenuList>
                          </Menu>
                        </div>
                        <Input
                          value={location}
                          crossOrigin={""}
                          onChange={(e) => {
                            setLocation(e.target.value);
                            console.log(e.target.value);
                          }}
                          label="Location*"
                          className="rounded-l-none"
                        />
                      </div>
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
                          className="bg-white"
                          onChange={(e) => setOnlineLink(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1 mx-auto">
                        <Typography
                          placeholder={""}
                          variant="small"
                          className="text-blue-gray-600"
                        >
                          Offline venue
                        </Typography>
                        <div className="relative flex w-full max-w-[24rem] bg-white">
                          <div className="flex flex-row gap-4">
                            <Menu placement="bottom-start">
                              <MenuHandler>
                                <Button
                                  placeholder={""}
                                  ripple={false}
                                  variant="text"
                                  color="blue-gray"
                                  className="flex flex-row h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                                >
                                  Populars
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M13.78 10.47a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l.97.97V5.75a.75.75 0 0 1 1.5 0v5.69l.97-.97a.75.75 0 0 1 1.06 0ZM2.22 5.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V4.56l-.97.97a.75.75 0 0 1-1.06 0Z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </Button>
                              </MenuHandler>
                              <MenuList
                                placeholder={""}
                                className="max-h-[20rem] max-w-[18rem]"
                              >
                                {Locations.map(({ name }, index) => {
                                  return (
                                    <MenuItem
                                      placeholder={""}
                                      key={name}
                                      value={name}
                                      className="flex items-center gap-2"
                                      onClick={() => {
                                        setLocation(name);
                                        console.log(name);
                                      }}
                                    >
                                      {name}
                                    </MenuItem>
                                  );
                                })}
                              </MenuList>
                            </Menu>
                          </div>
                          <Input
                            value={location}
                            crossOrigin={""}
                            onChange={(e) => {
                              setLocation(e.target.value);
                              console.log(e.target.value);
                            }}
                            label="Location*"
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <h1 className="text-yellow-800">
                      No Location is Applicable!
                    </h1>
                  )}
                </div>
              )}
            </div>
          </div>
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

        {timelineIn && (
          <div className="bg-blue-gray-200 w-5/6 border-0 rounded-xl">
            <Typography variant="h5" className="px-4 pt-4" placeholder={""}>
              Add Timeline of Events
            </Typography>
            <div className="p-4">
              {inputs1.map((t, input) => (
                <div className="" key={input}>
                  <div className="w-11/12">
                    <Input
                      className="bg-white"
                      label="Timeline Title"
                      placeholder="TimeLine Title"
                      crossOrigin={""}
                      onChange={(e) => {
                        const newTimeline = [...timeline];
                        newTimeline[input].name = e.target.value;
                        setTimeline(newTimeline);
                      }}
                    ></Input>
                  </div>
                  <div className="mt-2 flex flex-row gap-2">
                    <div className="w-1/2">
                      <Textarea
                        rows={4}
                        className="bg-white"
                        label="Timeline short description"
                        onChange={(e) => {
                          const newTimeline = [...timeline];
                          newTimeline[input].description = e.target.value;
                          setTimeline(newTimeline);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                      <DatePicker
                        onChange={(date, dateString) =>
                          onChange1(date, dateString, input)
                        }
                        showTime
                        needConfirm={false}
                        placeholder="YYYY-MM-DD HH:mm:ss*"
                      />

                      <Typography
                        variant="small"
                        className="italic"
                        placeholder={""}
                      >
                        to
                      </Typography>

                      <DatePicker
                        onChange={(date, dateString) =>
                          onChange2(date, dateString, input)
                        }
                        showTime
                        needConfirm={false}
                        placeholder="YYYY-MM-DD HH:mm:ss*"
                      />
                    </div>

                    <IconButton
                      placeholder={""}
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleRemoveInputTimeLine(input)}
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
                  {/* <LocationSelector /> */}
                  <hr className="my-4 border-white " />
                </div>
              ))}
              <Button
                placeholder={""}
                className="bg-blue-500 text-white rounded mt-2 flex items-center gap-3"
                onClick={handleAddInputTimeLine}
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
        )}

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

        {resourcesIn && (
          <div className=" bg-blue-gray-300 w-5/6 border-0 rounded-xl">
            <Typography variant="h5" className="px-4 pt-4" placeholder={""}>
              Resources :
            </Typography>
            <div className="p-4">
              {inputs.map((r, input) => (
                <div className="" key={input}>
                  <div className="mt-2 flex flex-row gap-2">
                    <div className="w-3/4 flex flex-col gap-2">
                      <Textarea
                        rows={4}
                        className="bg-white"
                        label="Resources description"
                        onChange={(e) => {
                          setResources((prev) => {
                            const newResources = [...prev];
                            newResources[input].description = e.target.value;
                            return newResources;
                          });
                        }}
                      />

                      <Input
                        crossOrigin={""}
                        label="Resource Link"
                        placeholder="ADD URL"
                        className="bg-white text-blue-400 underline"
                        onChange={(e) => {
                          setResources((prev) => {
                            const newResources = [...prev];
                            newResources[input].link = e.target.value;
                            return newResources;
                          });
                        }}
                      />
                    </div>

                    <IconButton
                      placeholder={""}
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded mx-auto"
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
                  <hr className="my-4 border-white " />
                </div>
              ))}
              <Button
                placeholder={""}
                variant="outlined"
                className="bg-white text-blue-500 rounded mt-2 flex items-center gap-3 border-blue-500"
                onClick={handleAddInput}
              >
                Add More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="w-5 h-5"
                >
                  <path
                    fill="#222730"
                    d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z"
                  />
                </svg>
              </Button>
            </div>
          </div>
        )}

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
      </form>
    </div>
  );
}
