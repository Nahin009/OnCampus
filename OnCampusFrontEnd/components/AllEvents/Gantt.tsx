"use client";

import { Button, ButtonGroup, Switch } from "@material-tailwind/react";
import { Gantt, Task, ViewMode } from "gantt-task-react-pro";
import "gantt-task-react-pro/dist/index.css";
import { useState } from "react";

// viewMode 	enum 	Specifies the time scale. Hour, Quarter Day, Half Day, Day, Week(ISO-8601, 1st day is Monday), Month, Year.

export default function GanttPage({ tasks }: { tasks: Task[] }) {
  const [view, setView] = useState(ViewMode.Day);
  const [list, setList] = useState<boolean>(true);

  // Function to handle changing the view mode
  const handleViewChange = (newView: ViewMode) => {
    setView(newView);
  };

  return (
    <div className="container">
      <div className="flex flex-row">
        <ButtonGroup size="sm">
          {view === ViewMode.Hour ? (
            <Button
              variant="gradient"
              onClick={() => handleViewChange(ViewMode.Hour)}
            >
              Hour
            </Button>
          ) : (
            <Button
              variant="text"
              onClick={() => handleViewChange(ViewMode.Hour)}
            >
              Hour
            </Button>
          )}
          {view === ViewMode.QuarterDay ? (
            <Button
              variant="gradient"
              onClick={() => handleViewChange(ViewMode.QuarterDay)}
            >
              Quarter Day
            </Button>
          ) : (
            <Button
              variant="text"
              onClick={() => handleViewChange(ViewMode.QuarterDay)}
            >
              Quarter Day
            </Button>
          )}
          {view === ViewMode.HalfDay ? (
            <Button
              variant="gradient"
              onClick={() => handleViewChange(ViewMode.HalfDay)}
            >
              Half Day
            </Button>
          ) : (
            <Button
              variant="text"
              onClick={() => handleViewChange(ViewMode.HalfDay)}
            >
              Half Day
            </Button>
          )}
          {view === ViewMode.Day ? (
            <Button
              variant="gradient"
              onClick={() => handleViewChange(ViewMode.Day)}
            >
              Day
            </Button>
          ) : (
            <Button
              variant="text"
              onClick={() => handleViewChange(ViewMode.Day)}
            >
              Day
            </Button>
          )}
          {view === ViewMode.Week ? (
            <Button
              variant="gradient"
              onClick={() => handleViewChange(ViewMode.Week)}
            >
              Week
            </Button>
          ) : (
            <Button
              variant="text"
              onClick={() => handleViewChange(ViewMode.Week)}
            >
              Week
            </Button>
          )}
          {view === ViewMode.Month ? (
            <Button
              variant="gradient"
              onClick={() => handleViewChange(ViewMode.Month)}
            >
              Month
            </Button>
          ) : (
            <Button
              variant="text"
              onClick={() => handleViewChange(ViewMode.Month)}
            >
              Month
            </Button>
          )}
          {view === ViewMode.Year ? (
            <Button
              variant="gradient"
              onClick={() => handleViewChange(ViewMode.Year)}
            >
              Year
            </Button>
          ) : (
            <Button
              variant="text"
              onClick={() => handleViewChange(ViewMode.Year)}
            >
              Year
            </Button>
          )}
        </ButtonGroup>
        <div className="ml-auto">
          <Switch 
          label="show event list"
          {...(list ? { defaultChecked:true } : {defaultChecked:false})}
          onClick={() => setList(!list)}
          />
        </div>
      </div>
      <Gantt
        tasks={tasks}
        viewMode={view}
        viewDate={new Date()}
        ganttHeight={600}
        {...(list ? {} : {listCellWidth:""})}
      />
    </div>
  );
}
