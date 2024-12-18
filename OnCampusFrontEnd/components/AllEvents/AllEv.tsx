"use client";

import { IconButton, Typography } from "@material-tailwind/react";
import { Task } from "gantt-task-react-pro";
import { useState } from "react";
import GanttPage from "./Gantt";
import ListView from "./ListView";

function AllEv({ pageTitle, events }: { pageTitle:string, events: any[] }) {
  const [viewState, setViewState] = useState<string>("listview");

  const handleViewChange = (view: string) => {
    if (view === viewState) {
    } else {
      setViewState(view);
    }
  };

  const tasks: Task[] = [];
  events.map((event: any) => {
    tasks.push({
      start: new Date(event.startDate),
      end: new Date(event.finishDate),
      name: event.title,
      id: event.id,
      type: "task",
      progress: 100,
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
    });
  });

  return (
    <div>
      <div className="mb-8 w-3/5 flex">
        <Typography className="mx-auto" variant="h2" color="blue">{pageTitle}</Typography>
      </div>
      <div className="flex flex-row gap-4 mb-8">
        <IconButton
          variant="text"
          onClick={() => {
            handleViewChange("listview");
          }}
          {...(viewState === "listview"
            ? { color: "blue" }
            : { color: "gray" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </IconButton>
        <IconButton
          variant="text"
          onClick={() => {
            handleViewChange("ganttview");
          }}
          {...(viewState === "ganttview"
            ? { color: "blue" }
            : { color: "gray" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
        </IconButton>
      </div>

      <div className="">
        {viewState === "listview" ? (
          <ListView events={events} />
        ) : (
          <GanttPage tasks={tasks} />
        )}
      </div>
    </div>
  );
}

export default AllEv;
