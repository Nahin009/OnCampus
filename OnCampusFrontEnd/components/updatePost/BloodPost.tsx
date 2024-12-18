import React from "react";
import {
  Button,
  IconButton,
  Card,
  Input,
  Checkbox,
  Typography,
  Select,
  Option,
  Radio,
} from "@material-tailwind/react";
type BloodInfo = {
  id: string;
  bloodGroup: string;
  units: number;
  hospital: string;
  contact: string;
  time: string;
};

import { ContextProvider } from "./SinglePost";
import { useContext } from "react";
const BloodPost = ({bloodInfo}:{bloodInfo:BloodInfo}) => {
  const {moreData, changeMoreData} = useContext(ContextProvider);
  const [bloodGroup, setBloodGroup] = React.useState(bloodInfo.bloodGroup);
  const [hospital, setHospital] = React.useState(bloodInfo.hospital);
  const [contact, setContact] = React.useState(bloodInfo.contact);
  const [time, setTime] = React.useState(bloodInfo.time);
  const [units, setUnits] = React.useState<number | undefined>(bloodInfo.units);

  const handleUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (inputValue <= 0) {
      setUnits(undefined);
      return;
    }

    if (!isNaN(inputValue)) {
      // If it's a valid number, set the state
      setUnits(inputValue);
      changeMoreData({...moreData, units: inputValue})
    } else {
      // If it's not a valid number, you can set it to a default value or leave it as is
      // For example, setting it to undefined
      setUnits(undefined);
    }
  };

  return (
    <div className="mb-1 flex flex-col gap-6">
      <Typography variant="h4" color="blue-gray">
        Blood post
      </Typography>

      <Select
        variant="static"
        label="Select Blood group:"
        value={bloodGroup}
        onChange={(e) => {
          setBloodGroup(e ?? "")
          changeMoreData({...moreData, bloodGroup: e ?? ""})
        }}
      >
        <Option value="A+">A+</Option>
        <Option value="A-">A-</Option>
        <Option value="B+">B+</Option>
        <Option value="B-">B-</Option>
        <Option value="AB+">AB+</Option>
        <Option value="AB-">AB-</Option>
        <Option value="O+">O+</Option>
        <Option value="O-">O-</Option>
      </Select>
      <Typography variant="small" color="blue-gray">
            Number of units:
      </Typography>
      <Input
        required
        type="number"
        size="lg"
        placeholder="Write number of units"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        value={units !== undefined ? units : ""}
        onChange={handleUnitsChange}
      />
      <Typography variant="small" color="blue-gray">
        Hospital:
      </Typography>
      <Input
        required
        type="text"
        placeholder="Write hospital name"
        value={hospital}
        onChange={(e) => {
            setHospital(e.target.value)
            changeMoreData({...moreData, hospital: e.target.value})
        }}
        size="lg"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <Typography variant="small" color="blue-gray">
      Contact number:
      </Typography>
      <Input
        type="text"
        placeholder="Write contact number"
        value={contact}
        onChange={(e) => {
            setContact(e.target.value)
            changeMoreData({...moreData, contact: e.target.value})
        }}
        size="lg"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <Typography variant="small" color="blue-gray">
        Time:
      </Typography>
      <Input
        type="datetime-local"
        placeholder="Time"
        value={time}
        onChange={(e) => {
            setTime(e.target.value)
            changeMoreData({...moreData, time: e.target.value})
        }}
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </div>
  );
};

export default BloodPost;
