import {
  Button,
  IconButton,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react";
import LocationSelector from "./LocationSelector";




interface TimeLine {
  name: string;
  description: string;
  startDate: string;
  finishDate: string;
  meetingType: string;
  location: string;
  onlineLink: string;
}

interface TimeLineProps {
  index: number;
  timeLine: TimeLine;
  onTimeLineChange: (index: number, timeLine: TimeLine) => void;
  onTimeLineRemove: (index: number) => void;
}





function TimeLine() {
  const [inputCount, setInputCount] = useState<number>(0);
  const [inputs, setInputs] = useState<string[]>([]);

  const handleAddInputTimeLine = () => {
    setInputCount(inputCount + 1);
    setInputs([...inputs, `input-${inputCount}`]);
  };

  const handleRemoveInputTimeLine = (input: string) => {
    setInputs(inputs.filter((item) => item !== input));
  };

  const onChange: DatePickerProps<Dayjs[]>["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  dayjs.extend(customParseFormat);


  return (
    <div className="bg-blue-gray-200 w-5/6 border-0 rounded-xl">
      <Typography variant="h5" className="px-4 pt-4" placeholder={""}>
        Add Timeline of Events
      </Typography>
      <div className="p-4">
        {inputs.map((input) => (
          <div className="" key={input}>
            <div className="w-11/12">
              <Input
                className="bg-white"
                label="Timeline Title"
                placeholder="TimeLine Title"
                crossOrigin={""}
              ></Input>
            </div>
            <div className="mt-2 flex flex-row gap-2">
              <div className="w-1/2">
                <Textarea
                  rows={4}
                  className="bg-white"
                  label="Timeline short description"
                />
              </div>
              <div className="flex flex-col gap-1 items-center">
                <DatePicker
                  onChange={onChange}
                  showTime
                  needConfirm={false}
                  placeholder="YYYY-MM-DD HH:mm:ss*"
                />

                <Typography variant="small" className="italic" placeholder={""}>
                  to
                </Typography>

                <DatePicker
                  onChange={onChange}
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
            <LocationSelector />
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
  );
}

export default TimeLine;
