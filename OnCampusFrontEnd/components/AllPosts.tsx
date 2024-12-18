"use client";
import AvatarImageText from "./getPost/AvatarImageText";
import DateTime from "./getPost/DateTime";
import PosText from "./getPost/Posttext";
import {
  Slider,
  Typography,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";

import { LockClosedIcon } from "@heroicons/react/24/outline";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useEffect, useState } from "react";
import { set } from "zod";
import BloodPost from "./getPost/BloodPost";
import TuitionPost from "./getPost/TuitionPost";
import ProductInfo from "./getPost/ProductInfo";
export default function AllPosts({
  posts,
  user,
  type,
}: {
  posts: any[];
  user: any;
  type: string;
}) {

  const [lowPrice, setLowPrice] = useState(1);
  const [highPrice, setHighPrice] = useState(100);
  const [ptype, setPType] = useState("");

  const [bloodGroup, setBloodGroup] = useState("");
  const [hospital, setHospital] = useState("");
  const [time, setTime] = useState("");

  const [genderPreference, setGenderPreference] = useState("");
  const [location, setLocation] = useState("");
  const [classs, setClass] = useState("");
  const [subject, setSubject] = useState("");
  const [medium, setMedium] = useState("");
  const [lowSalary, setLowSalary] = useState(1);
  const [highSalary, setHighSalary] = useState(100);
  const [gender, setGender] = useState("");

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const filteredHospitals: string[] = [];
  const filteredLocation: string[] = [];
  const filteredClass: string[] = [];
  const filteredSubject: string[] = [];
  const filteredTitle: string[] = [];
  if (type === "BLOOD") {
    posts.forEach((post) => {
      filteredHospitals.push(post.bloodInfo.hospital);
    });
  } else if (type === "TUITION") {
    posts.forEach((post) => {
      filteredLocation.push(post.tuitionInfo.location);
      filteredClass.push(post.tuitionInfo.class);
      filteredSubject.push(post.tuitionInfo.subject);
    });
  }
  posts.forEach((post) => {
    filteredTitle.push(post.title);
  });

  const handleOnSelect = (item) => {
    const newHospital = item.name;
    setHospital((prev) => newHospital);
    setAllPosts((prev) =>
      posts.filter(
        (post) =>
          post.title === (title === "" ? post.title : title) &&
          post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
          post.bloodInfo.bloodGroup ===
            (bloodGroup === "" ? post.bloodInfo.bloodGroup : bloodGroup) &&
          post.bloodInfo.hospital ===
            (newHospital === "" ? post.bloodInfo.hospital : newHospital) &&
          new Date(post.bloodInfo.time).getTime() >=
            new Date(time === "" ? post.bloodInfo.time : time).getTime()
      )
    );
  };

  const handleOnSearch = (value) => {
    setHospital((prev) => value);
    setAllPosts((prev) =>
      posts.filter(
        (post) =>
          post.title === (title === "" ? post.title : title) &&
          post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
          post.bloodInfo.bloodGroup ===
            (bloodGroup === "" ? post.bloodInfo.bloodGroup : bloodGroup) &&
          post.bloodInfo.hospital ===
            (value === "" ? post.bloodInfo.hospital : value) &&
          new Date(post.bloodInfo.time).getTime() >=
            new Date(time === "" ? post.bloodInfo.time : time).getTime()
      )
    );
  };

  const handleOnSelectTitle = (item) => {
    const newTitle = item.name;
    setTitle((prev) => newTitle);
    setAllPosts((prev) =>
      posts.filter(
        (post) =>
          post.title === (newTitle === "" ? post.title : newTitle) &&
          post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
          ((post.tags[0] == "BLOOD" &&
            post.bloodInfo.bloodGroup ===
              (bloodGroup === "" ? post.bloodInfo.bloodGroup : bloodGroup) &&
            post.bloodInfo.hospital ===
              (hospital === "" ? post.bloodInfo.hospital : hospital) &&
            new Date(post.bloodInfo.time).getTime() >=
              new Date(time === "" ? post.bloodInfo.time : time).getTime()) ||
            (post.tags[0] == "TUITION" &&
              post.tuitionInfo.genderPreference ===
                (genderPreference === ""
                  ? post.tuitionInfo.genderPreference
                  : genderPreference) &&
              post.tuitionInfo.location ===
                (location === "" ? post.tuitionInfo.location : location) &&
              post.tuitionInfo.class ===
                (classs === "" ? post.tuitionInfo.class : classs) &&
              post.tuitionInfo.subject ===
                (subject === "" ? post.tuitionInfo.subject : subject) &&
              post.tuitionInfo.medium ===
                (medium === "" ? post.tuitionInfo.medium : medium) &&
              post.tuitionInfo.gender ===
                (gender === "" ? post.tuitionInfo.gender : gender) &&
              post.tuitionInfo.salary >= Math.round(lowSalary) * 500 &&
              post.tuitionInfo.salary <= Math.round(highSalary) * 500) ||
            (post.tags[0] == "PRODUCT" &&
              post.productInfo.price >= Math.round(lowPrice) * 1000 &&
              post.productInfo.price <= Math.round(highPrice) * 1000 &&
              post.productInfo.type ===
                (ptype === "" ? post.productInfo.type : ptype)) ||
            post.tags[0] == "DISCUSSION")
      )
    );
  };

  const handleOnSearchTitle = (value) => {
    setTitle((prev) => value);
    setAllPosts((prev) =>
      posts.filter(
        (post) =>
          post.title === (value === "" ? post.title : value) &&
          post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
          ((post.tags[0] == "BLOOD" &&
            post.bloodInfo.bloodGroup ===
              (bloodGroup === "" ? post.bloodInfo.bloodGroup : bloodGroup) &&
            post.bloodInfo.hospital ===
              (hospital === "" ? post.bloodInfo.hospital : hospital) &&
            new Date(post.bloodInfo.time).getTime() >=
              new Date(time === "" ? post.bloodInfo.time : time).getTime()) ||
            (post.tags[0] == "TUITION" &&
              post.tuitionInfo.genderPreference ===
                (genderPreference === ""
                  ? post.tuitionInfo.genderPreference
                  : genderPreference) &&
              post.tuitionInfo.location ===
                (location === "" ? post.tuitionInfo.location : location) &&
              post.tuitionInfo.class ===
                (classs === "" ? post.tuitionInfo.class : classs) &&
              post.tuitionInfo.subject ===
                (subject === "" ? post.tuitionInfo.subject : subject) &&
              post.tuitionInfo.medium ===
                (medium === "" ? post.tuitionInfo.medium : medium) &&
              post.tuitionInfo.gender ===
                (gender === "" ? post.tuitionInfo.gender : gender) &&
              post.tuitionInfo.salary >= Math.round(lowSalary) * 500 &&
              post.tuitionInfo.salary <= Math.round(highSalary) * 500) ||
            (post.tags[0] == "PRODUCT" &&
              post.productInfo.price >= Math.round(lowPrice) * 1000 &&
              post.productInfo.price <= Math.round(highPrice) * 1000 &&
              post.productInfo.type ===
                (ptype === "" ? post.productInfo.type : ptype)) ||
            post.tags[0] == "DISCUSSION")
      )
    );
  };

  const handleOnSelectLocation = (item) => {
    const newLocation = item.name;
    setLocation((prev) => newLocation);
    setAllPosts((prev) =>
      posts.filter(
        (post) =>
          post.title === (title === "" ? post.title : title) &&
          post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
          post.tuitionInfo.genderPreference ===
            (genderPreference === ""
              ? post.tuitionInfo.genderPreference
              : genderPreference) &&
          post.tuitionInfo.location ===
            (newLocation === "" ? post.tuitionInfo.location : newLocation) &&
          post.tuitionInfo.class ===
            (classs === "" ? post.tuitionInfo.class : classs) &&
          post.tuitionInfo.subject ===
            (subject === "" ? post.tuitionInfo.subject : subject) &&
          post.tuitionInfo.medium ===
            (medium === "" ? post.tuitionInfo.medium : medium) &&
          post.tuitionInfo.gender ===
            (gender === "" ? post.tuitionInfo.gender : gender) &&
          post.tuitionInfo.salary >= Math.round(lowSalary) * 500 &&
          post.tuitionInfo.salary <= Math.round(highSalary) * 500
      )
    );
  };

  const handleOnSearchLocation = (value) => {
    setLocation((prev) => value);
    setAllPosts((prev) =>
      posts.filter(
        (post) =>
          post.title === (title === "" ? post.title : title) &&
          post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
          post.tuitionInfo.genderPreference ===
            (genderPreference === ""
              ? post.tuitionInfo.genderPreference
              : genderPreference) &&
          post.tuitionInfo.location ===
            (value === "" ? post.tuitionInfo.location : value) &&
          post.tuitionInfo.class ===
            (classs === "" ? post.tuitionInfo.class : classs) &&
          post.tuitionInfo.subject ===
            (subject === "" ? post.tuitionInfo.subject : subject) &&
          post.tuitionInfo.medium ===
            (medium === "" ? post.tuitionInfo.medium : medium) &&
          post.tuitionInfo.gender ===
            (gender === "" ? post.tuitionInfo.gender : gender) &&
          post.tuitionInfo.salary >= Math.round(lowSalary) * 500 &&
          post.tuitionInfo.salary <= Math.round(highSalary) * 500
      )
    );
  };

  const handleOnSelectClass = (item) => {
    setClass((prev) => item.name);
    const newClass = item.name;
    setAllPosts((prev) =>
      posts.filter(
        (post) =>
          post.title === (title === "" ? post.title : title) &&
          post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
          post.tuitionInfo.genderPreference ===
            (genderPreference === ""
              ? post.tuitionInfo.genderPreference
              : genderPreference) &&
          post.tuitionInfo.location ===
            (location === "" ? post.tuitionInfo.location : location) &&
          post.tuitionInfo.class ===
            (newClass === "" ? post.tuitionInfo.class : newClass) &&
          post.tuitionInfo.subject ===
            (subject === "" ? post.tuitionInfo.subject : subject) &&
          post.tuitionInfo.medium ===
            (medium === "" ? post.tuitionInfo.medium : medium) &&
          post.tuitionInfo.gender ===
            (gender === "" ? post.tuitionInfo.gender : gender) &&
          post.tuitionInfo.salary >= Math.round(lowSalary) * 500 &&
          post.tuitionInfo.salary <= Math.round(highSalary) * 500
      )
    );
  };

  const handleOnSearchClass = (value) => {
    setClass((prev) => value);
    setAllPosts((prev) =>
      posts.filter(
        (post) =>
          post.title === (title === "" ? post.title : title) &&
          post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
          post.tuitionInfo.genderPreference ===
            (genderPreference === ""
              ? post.tuitionInfo.genderPreference
              : genderPreference) &&
          post.tuitionInfo.location ===
            (location === "" ? post.tuitionInfo.location : location) &&
          post.tuitionInfo.class ===
            (value === "" ? post.tuitionInfo.class : value) &&
          post.tuitionInfo.subject ===
            (subject === "" ? post.tuitionInfo.subject : subject) &&
          post.tuitionInfo.medium ===
            (medium === "" ? post.tuitionInfo.medium : medium) &&
          post.tuitionInfo.gender ===
            (gender === "" ? post.tuitionInfo.gender : gender) &&
          post.tuitionInfo.salary >= Math.round(lowSalary) * 500 &&
          post.tuitionInfo.salary <= Math.round(highSalary) * 500
      )
    );
  };

  const handleOnSelectSubject = (item) => {
    setSubject((prev) => item.name);
    const newSubject = item.name;
    setAllPosts((prev) =>
      posts.filter(
        (post) =>
          post.title === (title === "" ? post.title : title) &&
          post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
          post.tuitionInfo.genderPreference ===
            (genderPreference === ""
              ? post.tuitionInfo.genderPreference
              : genderPreference) &&
          post.tuitionInfo.location ===
            (location === "" ? post.tuitionInfo.location : location) &&
          post.tuitionInfo.class ===
            (classs === "" ? post.tuitionInfo.class : classs) &&
          post.tuitionInfo.subject ===
            (newSubject === "" ? post.tuitionInfo.subject : newSubject) &&
          post.tuitionInfo.medium ===
            (medium === "" ? post.tuitionInfo.medium : medium) &&
          post.tuitionInfo.gender ===
            (gender === "" ? post.tuitionInfo.gender : gender) &&
          post.tuitionInfo.salary >= Math.round(lowSalary) * 500 &&
          post.tuitionInfo.salary <= Math.round(highSalary) * 500
      )
    );
  };

  const handleOnSearchSubject = (value) => {
    setSubject((prev) => value);
    setAllPosts((prev) =>
      posts.filter(
        (post) =>
          post.title === (title === "" ? post.title : title) &&
          post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
          post.tuitionInfo.genderPreference ===
            (genderPreference === ""
              ? post.tuitionInfo.genderPreference
              : genderPreference) &&
          post.tuitionInfo.location ===
            (location === "" ? post.tuitionInfo.location : location) &&
          post.tuitionInfo.class ===
            (classs === "" ? post.tuitionInfo.class : classs) &&
          post.tuitionInfo.subject ===
            (value === "" ? post.tuitionInfo.subject : value) &&
          post.tuitionInfo.medium ===
            (medium === "" ? post.tuitionInfo.medium : medium) &&
          post.tuitionInfo.gender ===
            (gender === "" ? post.tuitionInfo.gender : gender) &&
          post.tuitionInfo.salary >= Math.round(lowSalary) * 500 &&
          post.tuitionInfo.salary <= Math.round(highSalary) * 500
      )
    );
  };

  const [allPosts, setAllPosts] = useState(posts);
  // console.log(allPosts);

  const anonymous = {
    profilePicture:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    name: "Anonymous",
    id: "546254226564",
    email: "Anonymous@buet.ac.bd",
  };
  return (
    <div className="flex flex-col gap-8 my-3">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col w-1/2 my-1">
          <Typography variant="small" color="blue-gray">
            Title:
          </Typography>
          <ReactSearchAutocomplete
            items={filteredTitle.map((h, i) => ({
              id: i,
              name: h,
            }))}
            resultStringKeyName="name"
            onSelect={handleOnSelectTitle}
            onSearch={(value, results) => {
              handleOnSearchTitle(value);
            }}
            maxResults={5}
            autoFocus
          />
        </div>
        <div className="flex flex-col w-1/2 my-3">
          <Select
            variant="static"
            label="Select status:"
            value={status}
            onChange={(e) => {
              const newStatus = e ?? "";
              setStatus(newStatus);
              setAllPosts((prev) =>
                posts.filter(
                  (post) =>
                    post.title === (title === "" ? post.title : title) &&
                    post.open === (newStatus === "" ? post.open : (newStatus=="Open"?true:false)) &&
                    ((post.tags[0] == "BLOOD" &&
                      post.bloodInfo.bloodGroup ===
                        (bloodGroup === "" ? post.bloodInfo.bloodGroup : bloodGroup) &&
                      post.bloodInfo.hospital ===
                        (hospital === "" ? post.bloodInfo.hospital : hospital) &&
                      new Date(post.bloodInfo.time).getTime() >=
                        new Date(time === "" ? post.bloodInfo.time : time).getTime()) ||
                      (post.tags[0] == "TUITION" &&
                        post.tuitionInfo.genderPreference ===
                          (genderPreference === ""
                            ? post.tuitionInfo.genderPreference
                            : genderPreference) &&
                        post.tuitionInfo.location ===
                          (location === "" ? post.tuitionInfo.location : location) &&
                        post.tuitionInfo.class ===
                          (classs === "" ? post.tuitionInfo.class : classs) &&
                        post.tuitionInfo.subject ===
                          (subject === "" ? post.tuitionInfo.subject : subject) &&
                        post.tuitionInfo.medium ===
                          (medium === "" ? post.tuitionInfo.medium : medium) &&
                        post.tuitionInfo.gender ===
                          (gender === "" ? post.tuitionInfo.gender : gender) &&
                        post.tuitionInfo.salary >= Math.round(lowSalary) * 500 &&
                        post.tuitionInfo.salary <= Math.round(highSalary) * 500) ||
                      (post.tags[0] == "PRODUCT" &&
                        post.productInfo.price >= Math.round(lowPrice) * 1000 &&
                        post.productInfo.price <= Math.round(highPrice) * 1000 &&
                        post.productInfo.type ===
                          (ptype === "" ? post.productInfo.type : ptype)) ||
                      post.tags[0] == "DISCUSSION")
                )
              );
            }}
          >
            <Option value="Open">Open</Option>
            <Option value="Close">Close</Option>
          </Select>
        </div>
      </div>
      {type === "PRODUCT" && (
        <>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-1/4">
              <Typography color="blue">
                Price low Range {Math.round(lowPrice) * 1000}
              </Typography>
              <Slider
                size="md"
                value={lowPrice}
                onChange={(e) => {
                  const newLowPrice = Number(e.target.value);
                  setLowPrice(newLowPrice);
                  setAllPosts(
                    posts.filter(
                      (post) =>
                        post.title === (title === "" ? post.title : title) &&
                        post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
                        post.productInfo.price >=
                          Math.round(newLowPrice) * 1000 &&
                        post.productInfo.price <=
                          Math.round(highPrice) * 1000 &&
                        post.productInfo.type ===
                          (ptype === "" ? post.productInfo.type : ptype)
                    )
                  );
                }}
              />
            </div>
            <div className="flex flex-col w-1/4">
              <Typography color="blue">
                Price high Range {Math.round(highPrice) * 1000}
              </Typography>
              <Slider
                size="md"
                value={highPrice}
                onChange={(e) => {
                  const newHighPrice = Number(e.target.value);
                  setHighPrice(newHighPrice);
                  setAllPosts(
                    posts.filter(
                      (post) =>
                        post.title === (title === "" ? post.title : title) &&
                        post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
                        post.productInfo.price >= Math.round(lowPrice) * 1000 &&
                        post.productInfo.price <=
                          Math.round(newHighPrice) * 1000 &&
                        post.productInfo.type ===
                          (ptype === "" ? post.productInfo.type : ptype)
                    )
                  );
                }}
              />
            </div>
            <div className="flex flex-col w-1/4">
              <Select
                variant="static"
                label="Select type:"
                value={ptype}
                onChange={(e) => {
                  const newPType = e ?? "";
                  setPType(newPType);
                  setAllPosts(
                    posts.filter(
                      (post) =>
                        post.title === (title === "" ? post.title : title) &&
                        post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
                        post.productInfo.price >= Math.round(lowPrice) * 1000 &&
                        post.productInfo.price <=
                          Math.round(highPrice) * 1000 &&
                        post.productInfo.type === newPType
                    )
                  );
                }}
              >
                <Option value="Normal">Normal</Option>
                <Option value="Second hand">Second hand</Option>
              </Select>
            </div>
          </div>
        </>
      )}

      {type === "BLOOD" && (
        <>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col my-5">
              <Select
                variant="static"
                label="Select Blood group:"
                value={bloodGroup}
                onChange={(e) => {
                  setBloodGroup(e ?? "");
                  const newBloodGroup = e ?? "";
                  setAllPosts(
                    posts.filter(
                      (post) =>
                        post.title === (title === "" ? post.title : title) &&
                        post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
                        post.bloodInfo.bloodGroup ===
                          (newBloodGroup === ""
                            ? post.bloodInfo.bloodGroup
                            : newBloodGroup) &&
                        post.bloodInfo.hospital ===
                          (hospital === ""
                            ? post.bloodInfo.hospital
                            : hospital) &&
                        new Date(post.bloodInfo.time).getTime() >=
                          new Date(
                            time === "" ? post.bloodInfo.time : time
                          ).getTime()
                    )
                  );
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
            </div>
            <div className="flex flex-col w-1/4 my-1">
              <Typography variant="small" color="blue-gray">
                Hospital:
              </Typography>
              <ReactSearchAutocomplete
                items={filteredHospitals.map((h, i) => ({
                  id: i,
                  name: h,
                }))}
                resultStringKeyName="name"
                onSelect={handleOnSelect}
                onSearch={(value, results) => {
                  //results = results.filter((result) => result.name.toLowerCase().includes(value.toLowerCase()));
                  // console.log(results);
                  handleOnSearch(value);
                }}
                maxResults={5}
                autoFocus
              />
            </div>
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray">
                Time:
              </Typography>
              <Input
                type="datetime-local"
                placeholder="Time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  const newTime = e.target.value;
                  setAllPosts(
                    posts.filter(
                      (post) =>
                        post.title === (title === "" ? post.title : title) &&
                        post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
                        post.bloodInfo.bloodGroup ===
                          (bloodGroup === ""
                            ? post.bloodInfo.bloodGroup
                            : bloodGroup) &&
                        post.bloodInfo.hospital ===
                          (hospital === ""
                            ? post.bloodInfo.hospital
                            : hospital) &&
                        new Date(post.bloodInfo.time).getTime() >=
                          new Date(
                            newTime === "" ? post.bloodInfo.time : newTime
                          ).getTime()
                    )
                  );
                }}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>
        </>
      )}

      {type === "TUITION" && (
        <>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-1/4 my-1">
              <Select
                variant="static"
                label="Select Gender preference:"
                value={genderPreference}
                onChange={(e) => {
                  setGenderPreference(e ?? "");
                  const newGenderPreference = e ?? "";
                  setAllPosts(
                    posts.filter(
                      (post) =>
                        post.title === (title === "" ? post.title : title) &&
                        post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
                        post.tuitionInfo.genderPreference ===
                          newGenderPreference &&
                        post.tuitionInfo.location ===
                          (location === ""
                            ? post.tuitionInfo.location
                            : location) &&
                        post.tuitionInfo.class ===
                          (classs === "" ? post.tuitionInfo.class : classs) &&
                        post.tuitionInfo.subject ===
                          (subject === ""
                            ? post.tuitionInfo.subject
                            : subject) &&
                        post.tuitionInfo.medium ===
                          (medium === "" ? post.tuitionInfo.medium : medium) &&
                        post.tuitionInfo.gender ===
                          (gender === "" ? post.tuitionInfo.gender : gender) &&
                        post.tuitionInfo.salary >=
                          Math.round(lowSalary) * 500 &&
                        post.tuitionInfo.salary <= Math.round(highSalary) * 500
                    )
                  );
                }}
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </div>
            <div className="flex flex-col w-1/4 my-1">
              <Typography variant="small" color="blue-gray">
                Location:
              </Typography>
              <ReactSearchAutocomplete
                items={filteredLocation.map((h, i) => ({
                  id: i,
                  name: h,
                }))}
                resultStringKeyName="name"
                onSelect={handleOnSelectLocation}
                onSearch={(value, results) => {
                  handleOnSearchLocation(value);
                }}
                maxResults={5}
                autoFocus
              />
            </div>
            <div className="flex flex-col w-1/4 my-1">
              <Typography variant="small" color="blue-gray">
                Class:
              </Typography>
              <ReactSearchAutocomplete
                items={filteredClass.map((h, i) => ({
                  id: i,
                  name: h,
                }))}
                resultStringKeyName="name"
                onSelect={handleOnSelectClass}
                onSearch={(value, results) => {
                  handleOnSearchClass(value);
                }}
                maxResults={5}
                autoFocus
              />
            </div>
            <div className="flex flex-col w-1/4 my-1">
              <Typography variant="small" color="blue-gray">
                Subject:
              </Typography>
              <ReactSearchAutocomplete
                items={filteredSubject.map((h, i) => ({
                  id: i,
                  name: h,
                }))}
                resultStringKeyName="name"
                onSelect={handleOnSelectSubject}
                onSearch={(value, results) => {
                  handleOnSearchSubject(value);
                }}
                maxResults={5}
                autoFocus
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <Select
                variant="static"
                label="Select Medium:"
                value={medium}
                onChange={(e) => {
                  const newMedium = e ?? "";
                  setMedium(newMedium);
                  setAllPosts(
                    posts.filter(
                      (post) =>
                        post.title === (title === "" ? post.title : title) &&
                        post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
                        post.tuitionInfo.genderPreference ===
                          (genderPreference === ""
                            ? post.tuitionInfo.genderPreference
                            : genderPreference) &&
                        post.tuitionInfo.location ===
                          (location === ""
                            ? post.tuitionInfo.location
                            : location) &&
                        post.tuitionInfo.class ===
                          (classs === "" ? post.tuitionInfo.class : classs) &&
                        post.tuitionInfo.subject ===
                          (subject === ""
                            ? post.tuitionInfo.subject
                            : subject) &&
                        post.tuitionInfo.medium ===
                          (newMedium === ""
                            ? post.tuitionInfo.medium
                            : newMedium) &&
                        post.tuitionInfo.gender ===
                          (gender === "" ? post.tuitionInfo.gender : gender) &&
                        post.tuitionInfo.salary >=
                          Math.round(lowSalary) * 500 &&
                        post.tuitionInfo.salary <= Math.round(highSalary) * 500
                    )
                  );
                }}
              >
                <Option value="Bangla">Bangla</Option>
                <Option value="English">English</Option>
              </Select>
            </div>
            <div className="flex flex-col">
              <Select
                variant="static"
                label="Select Gender:"
                value={gender}
                onChange={(e) => {
                  const newGender = e ?? "";
                  setGender(newGender);
                  setAllPosts(
                    posts.filter(
                      (post) =>
                        post.title === (title === "" ? post.title : title) &&
                        post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
                        post.tuitionInfo.genderPreference ===
                          (genderPreference === ""
                            ? post.tuitionInfo.genderPreference
                            : genderPreference) &&
                        post.tuitionInfo.location ===
                          (location === ""
                            ? post.tuitionInfo.location
                            : location) &&
                        post.tuitionInfo.class ===
                          (classs === "" ? post.tuitionInfo.class : classs) &&
                        post.tuitionInfo.subject ===
                          (subject === ""
                            ? post.tuitionInfo.subject
                            : subject) &&
                        post.tuitionInfo.medium ===
                          (medium === "" ? post.tuitionInfo.medium : medium) &&
                        post.tuitionInfo.gender ===
                          (newGender === ""
                            ? post.tuitionInfo.gender
                            : newGender) &&
                        post.tuitionInfo.salary >=
                          Math.round(lowSalary) * 500 &&
                        post.tuitionInfo.salary <= Math.round(highSalary) * 500
                    )
                  );
                }}
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </div>
            <div className="flex flex-col">
              <Typography color="blue">
                Salary low Range {Math.round(lowSalary) * 500}
              </Typography>
              <Slider
                size="md"
                value={lowSalary}
                onChange={(e) => {
                  const newLowSalary = Number(e.target.value);
                  setLowSalary(newLowSalary);
                  setAllPosts(
                    posts.filter(
                      (post) =>
                        post.title === (title === "" ? post.title : title) &&
                        post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
                        post.tuitionInfo.genderPreference ===
                          (genderPreference === ""
                            ? post.tuitionInfo.genderPreference
                            : genderPreference) &&
                        post.tuitionInfo.location ===
                          (location === ""
                            ? post.tuitionInfo.location
                            : location) &&
                        post.tuitionInfo.class ===
                          (classs === "" ? post.tuitionInfo.class : classs) &&
                        post.tuitionInfo.subject ===
                          (subject === ""
                            ? post.tuitionInfo.subject
                            : subject) &&
                        post.tuitionInfo.medium ===
                          (medium === "" ? post.tuitionInfo.medium : medium) &&
                        post.tuitionInfo.gender ===
                          (gender === "" ? post.tuitionInfo.gender : gender) &&
                        post.tuitionInfo.salary >=
                          Math.round(newLowSalary) * 500 &&
                        post.tuitionInfo.salary <= Math.round(highSalary) * 500
                    )
                  );
                }}
              />
            </div>
            <div className="flex flex-col">
              <Typography color="blue">
                Salary high Range {Math.round(highSalary) * 500}
              </Typography>
              <Slider
                size="md"
                value={highSalary}
                onChange={(e) => {
                  const newHighSalary = Number(e.target.value);
                  setHighSalary(newHighSalary);
                  setAllPosts(
                    posts.filter(
                      (post) =>
                        post.title === (title === "" ? post.title : title) &&
                        post.open === (status === "" ? post.open : (status=="Open"?true:false)) &&
                        post.tuitionInfo.genderPreference ===
                          (genderPreference === ""
                            ? post.tuitionInfo.genderPreference
                            : genderPreference) &&
                        post.tuitionInfo.location ===
                          (location === ""
                            ? post.tuitionInfo.location
                            : location) &&
                        post.tuitionInfo.class ===
                          (classs === "" ? post.tuitionInfo.class : classs) &&
                        post.tuitionInfo.subject ===
                          (subject === ""
                            ? post.tuitionInfo.subject
                            : subject) &&
                        post.tuitionInfo.medium ===
                          (medium === "" ? post.tuitionInfo.medium : medium) &&
                        post.tuitionInfo.gender ===
                          (gender === "" ? post.tuitionInfo.gender : gender) &&
                        post.tuitionInfo.salary >=
                          Math.round(lowSalary) * 500 &&
                        post.tuitionInfo.salary <=
                          Math.round(newHighSalary) * 500
                    )
                  );
                }}
              />
            </div>
          </div>
        </>
      )}

      {allPosts.map((post, index) => (
        <div key={post.id} className="flex flex-col gap-4 w-11/12">
          {!post.anonymous ? (
            <AvatarImageText user={post?.author} />
          ) : (
            <AvatarImageText user={anonymous} />
          )}
          <div className="flex flex-row gap-2">
            <div className="text-red-700 ml-16 text-sm">
              {post.tags.map((tag: any, i: number) => (
                <div key={i}>
                  <a href={`/${post.type}/${tag}`}>{tag}</a>
                  <hr className="border-1 border-gray-400" />
                </div>
              ))}
            </div>
            <DateTime date={new Date(post.createdAt).toLocaleString()} />
            {post.open ? "" : <LockClosedIcon className="w-7 h-7" />}
          </div>

          {post.bloodInfo ?<div className="scale-70"> <BloodPost blood={post.bloodInfo} /> </div>: ""}
          {post.tuitionInfo ?<div className="scale-70"> <TuitionPost tuition={post.tuitionInfo} /> </div>: ""}
          {post.productInfo ?<div className="scale-70"> <ProductInfo product={post.productInfo} /> </div>: ""}

          <PosText title={post.title} content={post.content} />

          <a href={`/getPost/${post.id}`} className="underline text-blue-700">
            See More...
          </a>

          <hr className="border-1 border-gray-400" />
        </div>
      ))}
      {posts.length === 0 && (
        <div className="flex items-center">
          <h1 className="text-xl">No Posts Found</h1>
        </div>
      )}
    </div>
  );
}
