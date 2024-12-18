import {
  Button,
  IconButton,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import type { DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import React, { useState } from "react";



interface Resources {
  description: string;
  link: string;
}


interface ResourcesProps {
  index: number;
  resources: Resources;
  onResourcesChange: (index: number, resources: Resources) => void;
  onResourcesRemove: (index: number) => void;
}


const Resources: React.FC<ResourcesProps> = ({index, resources, onResourcesChange, onResourcesRemove}) => {
  const [inputCount, setInputCount] = useState<number>(0);
  const [inputs, setInputs] = useState<string[]>([]);

  const handleAddInput = () => {
    setInputCount(inputCount + 1);
    setInputs([...inputs, `input-${inputCount}`]);
    onResourcesChange(index, resources);
  };

  const handleRemoveInput = (input: string) => {
    setInputs(inputs.filter((item) => item !== input));
    onResourcesRemove(index);
  };



  const[description, setDescription] = useState<string>(resources.description);
  const[link, setLink] = useState<string>(resources.link);



  return (
    <div className=" bg-blue-gray-300 w-5/6 border-0 rounded-xl">
      <Typography variant="h5" className="px-4 pt-4" placeholder={""}>
        Resources :
      </Typography>
      <div className="p-4">
        {inputs.map((input) => (
          <div className="" key={input}>
            <div className="mt-2 flex flex-row gap-2">
              <div className="w-3/4 flex flex-col gap-2">
                <Textarea
                  rows={4}
                  className="bg-white"
                  label="Resources description"
                  onChange={(e) => {setDescription(e.target.value)}}
                />

                <Input
                  crossOrigin={""}
                  label="Resource Link"
                  placeholder="ADD URL"
                  className="bg-white text-blue-400 underline"
                  onChange={(e) => {setLink(e.target.value)}}
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
  );
};

export default Resources;
