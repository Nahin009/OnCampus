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

type TuitionInfo = {
  genderPreference: string;
  location: string;
  class: string;
  member: number;
  subject: string;
  time: number;
  medium: string;
  salary: number;
  contact: string;
  studentInstitute: string;
  gender: string;
};

import { ContextProvider } from "./SinglePost"
import { useContext } from "react";
const TuitionPost = ({tutionInfo}:{tutionInfo:TuitionInfo}) => {

  const { moreData, changeMoreData } = useContext(ContextProvider);
  const [genderPreference, setGenderPreference] = React.useState(tutionInfo.genderPreference);
  const [location, setLocation] = React.useState(tutionInfo.location);
  const [classs, setClass] = React.useState(tutionInfo.class);
  const [member, setMember] = React.useState<number | undefined>(tutionInfo.member);
  const [subject, setSubject] = React.useState(tutionInfo.subject);
  const [time, setTime] = React.useState<number | undefined>(tutionInfo.time);
  const [medium, setMedium] = React.useState(tutionInfo.medium);
  const [salary, setSalary] = React.useState<number | undefined>(tutionInfo.salary);
  const [contact, setContact] = React.useState(tutionInfo.contact);
  const [studentInstitute, setStudentInstitute] = React.useState(tutionInfo.studentInstitute);
  const [gender, setGender] = React.useState(tutionInfo.gender);

  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (inputValue <= 0) {
      setMember(undefined);
      return;
    }
    if (!isNaN(inputValue)) {
      setMember(inputValue);
      changeMoreData({...moreData, member: inputValue})
    } else {
      setMember(undefined);
    }
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (inputValue <= 0) {
      setSalary(undefined);
      return;
    }
    if (!isNaN(inputValue)) {
      setSalary(inputValue);
      changeMoreData({...moreData, salary: inputValue})
    } else {
      setSalary(undefined);
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (inputValue <= 0) {
      setTime(undefined);
      return;
    }
    if (!isNaN(inputValue)) {
      setTime(inputValue);
      changeMoreData({...moreData, time: inputValue})
    } else {
      setTime(undefined);
    }
  }

  return (
    <div className="mb-1 flex flex-col gap-6">
        <Typography variant="h4" color="blue-gray">
            Tuition post
        </Typography>
        <Select
            variant="static"
            label="Select Gender preference:"
            value={genderPreference}
            onChange={(e) => {
            setGenderPreference(e ?? "");
            changeMoreData({ ...moreData, genderPreference: e ?? "" });
            }}
        >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
        </Select>
        <Typography variant="small" color="blue-gray">
            Location:
        </Typography>
        <Input
            required
            type="text"
            placeholder="Write location"
            value={location}
            onChange={(e) => {
            setLocation(e.target.value);
            changeMoreData({ ...moreData, location: e.target.value });
            }}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
                className: "before:content-none after:content-none",
            }}
        />

        <Typography variant="small" color="blue-gray">
            Class:
        </Typography>
        <Input
            required
            type="text"
            placeholder="Write class"
            value={classs}
            onChange={(e) => {
            setClass(e.target.value);
            changeMoreData({ ...moreData, class: e.target.value });
            }}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
                className: "before:content-none after:content-none",
            }}
        />

        <Typography variant="small" color="blue-gray">
            Number of students:
        </Typography>
        <Input
            required
            type="number"
            size="lg"
            placeholder="Write number of students"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
                className: "before:content-none after:content-none",
            }}
            value={member !== undefined ? member : ""}
            onChange={handleMemberChange}
        />

        <Typography variant="small" color="blue-gray">
            Subject:
        </Typography>
        <Input
            required
            type="text"
            placeholder="Write subject"
            value={subject}
            onChange={(e) => {
            setSubject(e.target.value);
            changeMoreData({ ...moreData, subject: e.target.value });
            }}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
                className: "before:content-none after:content-none",
            }}
        />

        <Typography variant="small" color="blue-gray">
            Number of classes per week:
        </Typography>
        <Input
            required
            type="number"
            size="lg"
            placeholder="Write number of classes per week"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
                className: "before:content-none after:content-none",
            }}
            value={time !== undefined ? time : ""}
            onChange={handleTimeChange}
        />

        <Select
            variant="static"
            label="Select Medium:"
            value={medium}
            onChange={(e) => {
            setMedium(e ?? "");
            changeMoreData({ ...moreData, medium: e ?? "" });
            }}
        >
            <Option value="Bangla">Bangla</Option>
            <Option value="English">English</Option>
        </Select>
        
        <Typography variant="small" color="blue-gray">
            Salary:
        </Typography>
        <Input
            required
            type="number"
            size="lg"
            placeholder="Write salary"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
                className: "before:content-none after:content-none",
            }}
            value={salary !== undefined ? salary : ""}
            onChange={handleSalaryChange}
        />

        <Typography variant="small" color="blue-gray">
            Contact number:
        </Typography>
        <Input
            required
            type="text"
            placeholder="Write contact number"
            value={contact}
            onChange={(e) => {
                setContact(e.target.value);
                changeMoreData({ ...moreData, contact: e.target.value });
            }}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
                className: "before:content-none after:content-none",
            }}
        />

        <Typography variant="small" color="blue-gray">
            Student institute:
        </Typography>
        <Input
            required
            type="text"
            placeholder="Write student institute"
            value={studentInstitute}
            onChange={(e) => {
                setStudentInstitute(e.target.value);
                changeMoreData({ ...moreData, studentInstitute: e.target.value });
            }}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
                className: "before:content-none after:content-none",
            }}
        />

        <Select
            variant="static"
            label="Select gender:"
            value={gender}
            onChange={(e) => {
                setGender(e ?? "");
                changeMoreData({ ...moreData, gender: e ?? "" });
            }}
        >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
        </Select>

    </div>
  );
};

export default TuitionPost;
