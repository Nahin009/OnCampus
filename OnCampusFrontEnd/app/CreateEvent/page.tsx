"use client";
import SingleEvent from "@/components/Events/CreateEvent/SingleEvent";
import SingleEv from "@/components/Events/CreateEvent/SingleEv";
import { eventTypes } from "@/components/Events/DummyTypes";
import {
  Option,
  Select,
  Typography as Typography1,
} from "@material-tailwind/react";
import { useState } from "react";
import SEV from "@/components/Events/CreateEvent/SEV";

interface TimeLine {
  name: string;
  description: string;
  startDate: string;
  finishDate: string;
  meetingType: string;
  location: string;
  onlineLink: string;
}

interface Resources {
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

function CreateEvent() {

  const [selectedOption, setSelectedOption] = useState<string | undefined>("");

  const handleEventTypeChange = (selected: string | undefined) => {
    setSelectedOption(selected);
    console.log(selected);
  };

  // Define an object that maps each option to its corresponding props
  const eventPropsMap: { [key: string]: any } = {
    Workshop: { hasRegistration: true, hasTimeline: true, hasResources: true },
    Seminar: { hasRegistration: true, hasTimeline: true, hasResources: true },
    Competitions: {
      hasRegistration: true,
      hasTimeline: true,
      hasPrize: true,
      hasRules: true,
    },
    Sports: {
      hasRegistration: true,
      hasTimeline: true,
      hasPrize: true,
      hasRules: true,
    },
    "Shapa-day": {},
    Cultural: { hasTimeline: true },
    Picnic: { hasRegistration: true, hasTimeline: true, hasRules: true },
    Tour: { hasRegistration: true, hasTimeline: true },
    Flashmobs: {},
    "Rag-Concert": { hasRegistration: true, hasTimeline: true, hasRules: true },
    "Normal Online Event": {},
  };


  return (
    <div className="flex flx-row">
      <div className="w-3/4">
        <div className="w-5/6 flex flex-row gap-0">
          <Typography1 placeholder={""} className="m-4">
            Type of Event
          </Typography1>
          <div className="w-1/4 m-4">
            <Select
              size="md"
              className=""
              label="Select Type"
              placeholder={undefined}
              value={selectedOption}
              onChange={handleEventTypeChange}
            >
              {eventTypes.map((type) => (
                <Option key={type.id} value={type.name}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="mt-4">
          {selectedOption && (
            <div className="w-5/6">
              <div className="p-4 my-8 border border-gray-300 rounded-md bg-blue-gray-50">
                {/* Use the key prop to force re-rendering based on selectedOption */}
                <SEV
                  key={selectedOption}
                  selectedType={selectedOption}
                  {...eventPropsMap[selectedOption]}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-1/4"></div>
    </div>
  );
}

export default CreateEvent;
