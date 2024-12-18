"use client";
import {
  CongratsSuccessAnimation,
  ErrorAnimation,
  LoadingAnimation,
  LoadingMailAnimation,
  SuccessAnimation,
  WarningAnimation,
} from "@/components/Animation";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
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
import { Dayjs } from "dayjs";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import Locations from "../DummyLocations";
import Resources from "./Resources";

import POST from "@/server_actions/POST";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  description: string | null;
  startDate: String | null;
  finishDate: String | null;
  meetingType: string | null;
  location: string | null;
  onlineLink: string | null;
}

interface TimeLineState {
  inputCount1: number;
  inputs1: string[];
}

interface Resource {
  description: string;
  link: string;
}

interface ResourceState {
  inputCount: number;
  inputs: string[];
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

interface FormError {
  title: string;
  description: string;
  startDate: string;
  finishDate: string;
  startfinishDate: string;
  locationType: string;
  offlineLocation: string;
  onlineLink: string;
  bothLocation: string;
  organizers: string;
  sponsors: string;
  registration: string;
  rules: string;
  prizes: string;
  timelineTitleIndex: number[];
  timeLineTitle: string;
  resourcesIndex: number[];
  resource: string;
}

export default function SEV({
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
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [conflictEvent, setConflictEvent] = useState<any[]>([]);

  const handleOpen = () => setOpen(!open);

  const [registrationIn, setRegistrationIn] = useState<boolean>(
    hasRegistration || false
  );
  const [rulesIn, setRulesIn] = useState<boolean>(hasRules || false);
  const [timelineIn, setTimelineIn] = useState<boolean>(hasTimeline || false);
  const [resourcesIn, setResourcesIn] = useState<boolean>(
    hasResources || false
  );
  const [prizeIn, setPrizeIn] = useState<boolean>(hasPrize || false);

  const [description, setDescription] = useState<string>("");
  const [registration, setRegistration] = useState<string>("");
  const [prize, setPrize] = useState<string>("");
  const [rules, setRules] = useState<string>("");

  const titleField = useRef<HTMLInputElement>(null);
  const startDate = useRef<String | null>(null);
  const finishDate = useRef<String | null>(null);
  const organizers = useRef<HTMLInputElement>(null);
  const sponsors = useRef<HTMLInputElement>(null);
  const [locationType, setLocationType] = useState<string | undefined>("");
  const locationOffline = useRef<HTMLInputElement>(null);
  const [offlineLocation, setOfflineLocation] = useState<string>("");
  const onlineLink = useRef<HTMLInputElement>(null);

  // for timeline
  const timelineTitle = useRef<HTMLInputElement[]>([]);
  const timelineDescription = useRef<HTMLDivElement[]>([]);
  const timelineStartDate = useRef<String[] | null[]>([]);
  const timelineFinishDate = useRef<String[] | null[]>([]);

  // for resources
  const resourcesDescription = useRef<HTMLDivElement[]>([]);
  const resourcesLink = useRef<HTMLInputElement[]>([]);

  const [locationButtonState, setLocationButtonState] = useState(0); // 0 = "idle", 1 = "input required", 2 = "loading", 3 = "success", 4 = "not success", 5 = "internal server error"

  const [formState, setFormState] = useState(0);

  const initialTimeLineState: TimeLineState = {
    inputCount1: 0,
    inputs1: [],
  };

  const [TimeLineState, setTimeLineState] =
    useState<TimeLineState>(initialTimeLineState);

  const handleAddInputTimeLine = () => {
    setTimeLineState((prevState) => ({
      inputCount1: prevState.inputCount1 + 1,
      inputs1: [...prevState.inputs1, `input-${prevState.inputCount1}`],
    }));
  };

  const handleRemoveInputTimeLine = (input: number) => {
    setTimeLineState((prevState) => ({
      inputs1: prevState.inputs1.filter((item, i) => i !== input),
      inputCount1: prevState.inputCount1 - 1,
    }));

    timelineTitle.current.splice(input, 1);
    timelineDescription.current.splice(input, 1);
    timelineStartDate.current.splice(input, 1);
    timelineFinishDate.current.splice(input, 1);
  };

  const initialResourcesState: ResourceState = {
    inputCount: 0,
    inputs: [],
  };

  const [ResourcesState, setResourcesState] = useState<ResourceState>(
    initialResourcesState
  );

  const handleAddInputResources = () => {
    setResourcesState((prevState) => ({
      inputCount: prevState.inputCount + 1,
      inputs: [...prevState.inputs, `input-${prevState.inputCount}`],
    }));
  };

  const handleRemoveInputResources = (input: number) => {
    setResourcesState((prevState) => ({
      inputs: prevState.inputs.filter((item, i) => i !== input),
      inputCount: prevState.inputCount - 1,
    }));

    // remove the input numbered index from the array
    resourcesDescription.current.splice(input, 1);
    resourcesLink.current.splice(input, 1);
  };

  // const [allinput, setAllinput] = useState<Event>({
  //   title: "",
  //   description: "",
  //   startDate: "",
  //   finishDate: "",
  //   eventType: "",
  //   location: "",
  //   onlineLink: "",
  //   organizers: "",
  //   sponsors: "",
  //   registration: "",
  //   rules: "",
  //   prizes: "",
  //   eventTag: "",
  //   timeline: [],
  //   resources: [],
  // });

  const handleEventTypechange = (selected: string | undefined) => {
    if (selected) setLocationType(selected);
    console.log(selected);
  };

  const startdateChange: DatePickerProps<Dayjs[]>["onChange"] = (
    date,
    dateString
  ) => {
    startDate.current = Array.isArray(dateString)
      ? dateString[0].toString()
      : dateString;
    console.log(dateString.toString());
  };

  const finishdateChange: DatePickerProps<Dayjs[]>["onChange"] = (
    date,
    dateString
  ) => {
    finishDate.current = Array.isArray(dateString)
      ? dateString[0].toString()
      : dateString;
    console.log(dateString.toString());
  };

  type CustomDatePickerOnChange = (
    date: Dayjs[] | null,
    dateString: string | string[],
    index: number // Add the index parameter here
  ) => void;

  const startdateChangeTimeline: CustomDatePickerOnChange = (
    date,
    dateString,
    index
  ) => {
    timelineStartDate.current[index] = Array.isArray(dateString)
      ? dateString[0].toString()
      : dateString;
    console.log(dateString.toString());
  };

  const finishdateChangeTimeline: CustomDatePickerOnChange = (
    date,
    dateString,
    index
  ) => {
    timelineFinishDate.current[index] = Array.isArray(dateString)
      ? dateString[0].toString()
      : dateString;
    console.log(dateString.toString());
  };

  const [errors, setErrors] = useState<Partial<FormError>>({});

  var conflictingEvents: any[] = [];
  const handleLocationCheck = () => {
    if (
      !startDate.current ||
      !finishDate.current ||
      !locationOffline.current?.value
    ) {
      setLocationButtonState(1);
      return;
    }
    setLocationButtonState(2);

    const data = {
      startDate: startDate.current,
      finishDate: finishDate.current,
      location: locationOffline.current?.value,
    };

    console.log(data);

    POST("event/checkLocation", data)
      .then((res) => {
        console.log(res);
        console.log(res.status); //why undefined!!!!

        conflictingEvents = res.conflictingEvents;
        console.log(conflictingEvents);

        conflictingEvents.map((event: any) => {
          console.log(event.title);
        });

        if (conflictingEvents.length === 0) {
          setLocationButtonState(3);
        } else {
          setLocationButtonState(4);
          setConflictEvent(conflictingEvents);
        }
      })
      .catch((err) => {
        console.error("error" + err);
        setLocationButtonState(5);
      });
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    // Validation
    const newErrors: Partial<FormError> = {};

    if (!titleField.current?.value.trim()) {
      newErrors.title = "Title is required";
    }

    if (!description.trim() || description === "<p><br></p>") {
      newErrors.description = "Description is required";
    }

    if (!startDate.current) {
      newErrors.startDate = "Start Date is required";
    }

    if (!finishDate.current) {
      newErrors.finishDate = "Finish Date is required";
    }

    if (!organizers.current?.value.trim()) {
      newErrors.organizers = "Organizers is required";
    }

    if (!locationType) {
      newErrors.locationType = "Location is required";
    }

    if (locationType === "Offline" && !locationOffline.current?.value.trim()) {
      newErrors.offlineLocation =
        "Offline Location is not provided. Please provide or change the location type";
    }

    if (locationType === "Online" && !onlineLink.current?.value.trim()) {
      newErrors.onlineLink =
        "Online Link is not provided. Please provide or change the location type";
    }

    if (
      locationType === "Both" &&
      (!locationOffline.current?.value.trim() ||
        !onlineLink.current?.value.trim())
    ) {
      newErrors.bothLocation =
        "Both Location is not provided. Please provide or change the location type";
    }

    if (
      registrationIn &&
      (!registration.trim() || registration === "<p><br></p>")
    ) {
      newErrors.registration = "Registration is required";
    }

    if (rulesIn && (!rules.trim() || rules === "<p><br></p>")) {
      newErrors.rules = "Rules is required";
    }

    if (prizeIn && (!prize.trim() || prize === "<p><br></p>")) {
      newErrors.prizes = "Prizes is required";
    }

    let startdate;
    if (startDate.current) {
      startdate = new Date(startDate.current.toString());
    }

    let finishdate;
    if (finishDate.current) {
      finishdate = new Date(finishDate.current.toString());
    }

    // check if finish date is less than start date
    if (finishdate && startdate && startdate >= finishdate) {
      newErrors.startfinishDate =
        "Finish Date should be greater than Start Date";
    }

    // check which timeline titles are not present
    const timelineTitleIndex: number[] = [];
    for (let i = 0; i < TimeLineState.inputCount1; i++) {
      if (!timelineTitle.current[i].value.trim()) {
        timelineTitleIndex.push(i);
      }
    }

    if (timelineTitleIndex.length > 0) {
      newErrors.timelineTitleIndex = timelineTitleIndex;
    }

    //set the timeline title error
    if (timelineTitleIndex.length > 0) {
      newErrors.timeLineTitle =
        "Timeline Title is required, fill or remove the timeline";
    }

    // check which resources are not present(either description or link one should be present)
    const resourcesIndex: number[] = [];
    for (let i = 0; i < ResourcesState.inputCount; i++) {
      if (
        !(
          resourcesDescription.current[i].childNodes[0] as HTMLInputElement
        ).value.trim() &&
        !resourcesLink.current[i].value.trim()
      ) {
        resourcesIndex.push(i);
      }
    }

    if (resourcesIndex.length > 0) {
      newErrors.resourcesIndex = resourcesIndex;
    }

    //set the resources error
    if (resourcesIndex.length > 0) {
      newErrors.resource =
        "Resource Description or Link is required, fill or remove the resource";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // // scroll to the 1st error
      // const errorKeys = Object.keys(newErrors);
      // const firstError = errorKeys[0];
      // const errorElement = document.getElementsByName(firstError)[0];
      // if (errorElement) {
      //   errorElement.scrollIntoView({ behavior: "smooth" });
      // }
      // return;

      // scroll to top and behaviour smooth

      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // console.log(selectedType);
    // console.log(titleField.current?.value);
    // console.log(description);
    // console.log(startDate.current);
    // console.log(finishDate.current);
    // console.log(organizers.current?.value);
    // console.log(sponsors.current?.value);
    // console.log(locationType);
    // console.log(locationOffline.current?.value);
    // console.log(onlineLink.current?.value);

    // console.log(TimeLineState.inputCount1);
    // for (let i = 0; i < TimeLineState.inputCount1; i++) {
    //   console.log(timelineTitle.current[i].value); // timelineTitle.current[i].childNodes[0].value also works, but dont know why typescript mf throws error
    //   console.log(
    //     (timelineDescription.current[i].childNodes[0] as HTMLInputElement).value
    //   );
    //   console.log(timelineStartDate.current[i]);
    //   console.log(timelineFinishDate.current[i]);
    // }

    // for (let i = 0; i < ResourcesState.inputCount; i++) {
    //   console.log(
    //     (resourcesDescription.current[i].childNodes[0] as HTMLInputElement)
    //       .value
    //   ); // resourcesDescription.current[i].childNodes[0].value also works, but dont know why typescript mf throws error
    //   console.log(resourcesLink.current[i].value);
    // }

    // console.log(registration);
    // console.log(rules);
    // console.log(prize);

    const timeline: TimeLine[] = [];

    for (let i = 0; i < TimeLineState.inputCount1; i++) {
      // push all timelines to this array
      timeline.push({
        name: timelineTitle.current[i].value,
        description: (
          timelineDescription.current[i].childNodes[0] as HTMLInputElement
        ).value,
        startDate: timelineStartDate.current[i],
        finishDate: timelineFinishDate.current[i],
        meetingType: null,
        location: "",
        onlineLink: "",
      });
    }

    const resources: Resource[] = [];

    for (let i = 0; i < ResourcesState.inputCount; i++) {
      // push all resources to this array
      resources.push({
        description: (
          resourcesDescription.current[i].childNodes[0] as HTMLInputElement
        ).value,
        link: resourcesLink.current[i].value,
      });
    }

    const data = {
      title: titleField.current?.value,
      description: description,
      startDate: startDate.current,
      finishDate: finishDate.current,
      eventType: locationType,
      location: locationOffline.current?.value,
      onlineLink: onlineLink.current?.value,
      organizers: organizers.current?.value,
      sponsors: sponsors.current?.value,
      registration: registration,
      rules: rules,
      prizes: prize,
      eventTag: selectedType,
      timeline: timeline,
      resources: resources,
    };

    console.log(data);

    setFormState(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const res = await POST("event/createEvent", data);

    if (res) {
      setFormState(3);
      setTimeout(() => {
        router.push("/AllEvents");
      }, 5000);
    } else {
      setFormState(2);
    }
  };

  return (
    <div>
      {formState === 1 && (
        <div className="bg-white flex flex-col justify-center items-center">
          <LoadingMailAnimation />
          <div className=" mb-16 pb-16">
            <p className="text-gray-600 text-lg ml-4">
              Creating the event, wait for confirmation or navigate or create
              another one...
            </p>
          </div>
        </div>
      )}
      {formState === 3 && (
        <div className="bg-white flex flex-col justify-center items-center">
          <CongratsSuccessAnimation />
          <div className=" mb-16 pb-16">
            <p className="text-gray-600 text-lg ml-4">
              Event created successfully, will move you on the AllEvents page
              now
            </p>
          </div>
        </div>
      )}
      {(formState === 0 || formState === 2) && (
        <form className="flex flex-col gap-6">
          <div className="">
            <Input
              className="bg-white"
              label="Name of the Event*"
              crossOrigin={undefined}
              name="title"
              inputRef={titleField}
              error={!!errors.title}
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic">{errors.title}</p>
            )}
          </div>
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
            />
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                {errors.description}
              </p>
            )}
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
                name="startDate"
                showTime
                needConfirm={false}
                placeholder="YYYY-MM-DD HH:mm:ss"
                onChange={startdateChange}
                className={errors.startDate ? "border-red-500" : ""}
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs italic">
                  {errors.startDate}
                </p>
              )}
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
                name="finishDate"
                showTime
                needConfirm={false}
                placeholder="YYYY-MM-DD HH:mm:ss"
                onChange={finishdateChange}
                className={errors.finishDate ? "border-red-500" : ""}
              />
              {errors.finishDate && (
                <p className="text-red-500 text-xs italic">
                  {errors.finishDate}
                </p>
              )}
            </div>
          </div>
          {errors.startfinishDate && (
            <p className="text-red-500 text-xs italic">
              {errors.startfinishDate}
            </p>
          )}

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
              name="Organizers"
              inputRef={organizers}
              error={!!errors.organizers}
            />
            {errors.organizers && (
              <p className="text-red-500 text-xs italic">{errors.organizers}</p>
            )}
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
              name="Sponsors"
              inputRef={sponsors}
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
                  value={locationType}
                  onChange={handleEventTypechange}
                  error={!!errors.locationType}
                >
                  {locationTypes.map((type) => (
                    <Option key={type.id} value={type.name}>
                      {type.name}
                    </Option>
                  ))}
                </Select>
                {errors.locationType && (
                  <p className="text-red-500 text-xs italic">
                    {errors.locationType}
                  </p>
                )}
              </div>

              <div className="">
                {locationType && (
                  <div className="w-full p-4">
                    {locationType === "Online" ? (
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
                          name="onlineLink"
                          inputRef={onlineLink}
                          error={!!errors.onlineLink}
                        />
                        {errors.onlineLink && (
                          <p className="text-red-500 text-xs italic">
                            {errors.onlineLink}
                          </p>
                        )}
                      </div>
                    ) : locationType === "Offline" ? (
                      <div className="flex flex-col gap-1">
                        <Typography
                          placeholder={""}
                          variant="small"
                          className="text-blue-gray-600"
                        >
                          Offline venue
                        </Typography>
                        <div className="flex flex-row">
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
                                        onClick={(e) => {
                                          if (locationOffline.current) {
                                            locationOffline.current.value =
                                              name;
                                          }
                                          setOfflineLocation(name);
                                          locationOffline.current?.focus();
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
                              defaultValue={offlineLocation}
                              crossOrigin={""}
                              name="location"
                              label="Location*"
                              className="bg-white rounded-l-none"
                              inputRef={locationOffline}
                              error={!!errors.offlineLocation}
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          {/* <LocationCheck
                            startDate={startDate.current}
                            finishDate={finishDate.current}
                            offlinelocation={locationOffline.current?.value}
                          /> */}

                          <div className="flex flex-row gap-20">
                            <Button
                              className="w-1/3"
                              onClick={handleLocationCheck}
                            >
                              Check Location Availability
                            </Button>

                            {locationButtonState === 0 && (
                              <div className=""></div>
                            )}
                            {locationButtonState === 1 && (
                              <div className="flex flex-row gap-4">
                                <ErrorAnimation />
                                <p className="text-red-500 mt-3">
                                  Please Enter Location, StartDate, FinishDate
                                  first
                                </p>
                              </div>
                            )}
                            {locationButtonState === 2 && (
                              <div className="flex flex-row gap-4">
                                <LoadingAnimation />
                                <p className=" text-teal-700 mt-3">
                                  Checking Location Availability...
                                </p>
                              </div>
                            )}
                            {locationButtonState === 3 && (
                              <div className="flex flex-row gap-4">
                                <SuccessAnimation />
                                <p className="text-green-500 mt-3">
                                  No Conflict in Location Detected
                                </p>
                              </div>
                            )}
                            {locationButtonState === 4 && (
                              <div className="flex flex-row gap-4">
                                <WarningAnimation />
                                <p className=" text-orange-600 mt-3">
                                  Conflict in Location Detected
                                </p>
                                <Button onClick={handleOpen} variant="text" className=" text-blue-500 underline">
                                  Click to see
                                </Button>
                                <div className="flex flex-col gap-2">
                                  {conflictEvent.map((event: any) => {
                                    return (
                                      <div
                                        key={event.id}
                                        className="flex flex-row gap-2"
                                      >
                                        <Dialog
                                          open={open}
                                          handler={handleOpen}
                                        >
                                          <DialogHeader>
                                            Conflicting Event(s)
                                          </DialogHeader>
                                          <DialogBody>
                                            <Link href={`/SingleEvent/${event.id}`}>{event.title + "..."}<span className="text-blue-500">see details</span></Link>
                                          </DialogBody>
                                          <DialogFooter>
                                            <Button
                                              variant="text"
                                              color="red"
                                              onClick={handleOpen}
                                              className="mr-1"
                                            >
                                              <span>Close</span>
                                            </Button>
                                            
                                          </DialogFooter>
                                        </Dialog>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                            {locationButtonState === 5 && (
                              <div className="flex flex-row gap-4">
                                <ErrorAnimation />
                                <p className="text-red-500 mt-3">
                                  Internal Server Error
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        {errors.offlineLocation && (
                          <p className="text-red-500 text-xs italic">
                            {errors.offlineLocation}
                          </p>
                        )}
                      </div>
                    ) : locationType === "Both" ? (
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
                            name="onlineLink"
                            inputRef={onlineLink}
                            error={!!errors.bothLocation}
                          />
                          {errors.bothLocation && (
                            <p className="text-red-500 text-xs italic">
                              {errors.bothLocation}
                            </p>
                          )}
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
                                        name="location"
                                        onClick={(e) => {
                                          if (locationOffline.current) {
                                            locationOffline.current.value =
                                              name;
                                          }
                                          setOfflineLocation(name);
                                          locationOffline.current?.focus();
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
                              defaultValue={offlineLocation}
                              crossOrigin={""}
                              name="location"
                              label="Location*"
                              className="bg-white rounded-l-none"
                              inputRef={locationOffline}
                              error={!!errors.bothLocation}
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
                  onChange={(newContent) => {}}
                  onBlur={
                    (newContent) => setRegistration(newContent)
                    // preferred to use only this option to update the content for performance reasons
                  }
                />
                {errors.registration && (
                  <p className="text-red-500 text-xs italic">
                    {errors.registration}
                  </p>
                )}
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
                {TimeLineState.inputs1.map((t, input) => (
                  <div className="" key={input}>
                    <div className="w-11/12">
                      <Input
                        className="bg-white"
                        label="Timeline Title"
                        placeholder="TimeLine Title"
                        crossOrigin={""}
                        name={`timelineTitle-${input}`}
                        inputRef={(el) =>
                          el && (timelineTitle.current[input] = el)
                        }
                        error={errors.timelineTitleIndex?.includes(input)}
                      />
                      {errors.timelineTitleIndex?.includes(input) && (
                        <p className="text-red-500 text-xs italic">
                          {errors.timeLineTitle}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 flex flex-row gap-2">
                      <div className="w-1/2">
                        <Textarea
                          rows={4}
                          className="bg-white"
                          label="Timeline short description"
                          name={`timelineDescription-${input}`}
                          ref={(el) =>
                            el && (timelineDescription.current[input] = el)
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <DatePicker
                          showTime
                          needConfirm={false}
                          placeholder="YYYY-MM-DD HH:mm:ss*"
                          name={`startDate-${input}`}
                          onChange={(date: Dayjs[], dateString) =>
                            startdateChangeTimeline(date, dateString, input)
                          }
                        />

                        <Typography
                          variant="small"
                          className="italic"
                          placeholder={""}
                        >
                          to
                        </Typography>

                        <DatePicker
                          showTime
                          needConfirm={false}
                          placeholder="YYYY-MM-DD HH:mm:ss*"
                          name={`finishDate-${input}`}
                          onChange={(date: Dayjs[], dateString) =>
                            finishdateChangeTimeline(date, dateString, input)
                          }
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
                {ResourcesState.inputs.map((r, input) => (
                  <div className="" key={input}>
                    <div className="mt-2 flex flex-row gap-2">
                      <div className="w-3/4 flex flex-col gap-2">
                        <Textarea
                          rows={4}
                          className="bg-white"
                          label="Resources description"
                          name={`description-${input}`}
                          ref={(el) =>
                            el && (resourcesDescription.current[input] = el)
                          }
                          error={errors.resourcesIndex?.includes(input)}
                        />

                        <Input
                          crossOrigin={""}
                          label="Resource Link"
                          placeholder="ADD URL"
                          className="bg-white text-blue-400 underline"
                          name={`link-${input}`}
                          inputRef={(el) =>
                            el && (resourcesLink.current[input] = el)
                          }
                          error={errors.resourcesIndex?.includes(input)}
                        />

                        {errors.resourcesIndex?.includes(input) && (
                          <p className="text-red-500 text-xs italic">
                            {errors.resource}
                          </p>
                        )}
                      </div>

                      <IconButton
                        placeholder={""}
                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded mx-auto"
                        onClick={() => handleRemoveInputResources(input)}
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
                  onClick={handleAddInputResources}
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
                  value={prize}
                  config={{ ...configReg, toolbarButtonSize: "small" }}
                  onChange={(newContent) => {}}
                  onBlur={(newContent) => setPrize(newContent)}
                />
                {errors.prizes && (
                  <p className="text-red-500 text-xs italic">{errors.prizes}</p>
                )}
              </div>
            </div>
          )}

          <Switch
            defaultChecked={rulesIn}
            crossOrigin={""}
            onClick={(e) => setRulesIn(!rulesIn)}
            label={
              <div>
                <Typography
                  placeholder={""}
                  color="red"
                  className="font-medium"
                >
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
                  onChange={(newContent) => {}}
                  onBlur={(newContent) => setRules(newContent)}
                />
                {errors.rules && (
                  <p className="text-red-500 text-xs italic">{errors.rules}</p>
                )}
              </div>
            </div>
          )}

          {formState === 2 && (
            <p className="text-red-500 text-xs italic">
              internal server error, please try again
            </p>
          )}
          <Button onClick={handleFormSubmit} type="submit">
            Create Event
          </Button>
        </form>
      )}
    </div>
  );
}