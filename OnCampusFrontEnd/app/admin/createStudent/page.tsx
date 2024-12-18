"use client";
import React, { useEffect } from "react";

import { useState } from 'react';
import createStudent from "@/server_actions/createStudent";

import GET from "@/server_actions/GET";

import { Input, Select, Option, Button, Alert } from "@material-tailwind/react";

import Papa from 'papaparse';
import { set } from "zod";


export default function CreateStudentPage() {

  const [currBatches, setCurrBatches] = React.useState([]);
  const [currDepartments, setCurrDepartments] = React.useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const [studentInfo, setStudentInfo] = useState({ batch: "", department: "", startId: "", endId: "" });

  const [allCreatedUsers, setAllCreatedUsers] = useState([]);
  const [showDownload, setShowDownload] = useState(false);
  const [loading, setLoading] = useState(false);

  const downloadCSV = (allCreatedUsers) => {
    // Step 1: Generate CSV Data
    const headers = ['email', 'password'];

    const csvData = Papa.unparse({
      fields: headers,
      data: allCreatedUsers,
    });

    const blob = new Blob([csvData], { type: 'text/csv' });

    // Step 3: Create and Trigger Download Link using data URL
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    let si = studentInfo.startId;
    let ei = studentInfo.endId;

    if (studentInfo.startId.length !== 3) {
      si = "0".repeat(3 - studentInfo.startId.length) + studentInfo.startId;
    }
    if (studentInfo.endId.length !== 3) {
      ei = "0".repeat(3 - studentInfo.endId.length) + studentInfo.endId;
    }

    const startId = studentInfo.batch + studentInfo.department + si;
    const endId = studentInfo.batch + studentInfo.department + ei;

    a.download = startId + "-" + endId + ".csv";

    // Set target to "_blank" to initiate the download without prompt
    a.target = '_blank';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Release the object URL
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchData = async (path: string) => {
      try {
        // Your asynchronous code here
        const result = await GET(path);
        if (result === null) {
          throw new Error("Error fetching data");
        }
        return {
          data: result,
          success: true
        };
      } catch (error) {
        console.error('Error fetching data:', error);
        setAlertMsg("Error fetching data");
        setAlertOpen(true);
        return {
          data: [],
          success: false
        };
      }
    };

    fetchData('user/admin/getBatch').then(res => {
      if (!res.success) {
        return;
      }

      setCurrBatches(res.data);
    });

    fetchData('user/admin/getDept').then(res => {
      if (!res.success) {
        return;
      }
      // console.log(res.data);
      setCurrDepartments(res.data)
    })
  }, []);

  async function CreateButtonClick(e) {
    e.preventDefault();
    console.log("Create button clicked");
    setShowDownload(false);
    setAllCreatedUsers([]);

    if (studentInfo.batch === "" || studentInfo.department === "" || studentInfo.startId === "" || studentInfo.endId === "") {
      setAlertMsg("All fields are required");
      setAlertOpen(true);
      return;
    }

    if (isNaN(parseInt(studentInfo.startId)) || isNaN(parseInt(studentInfo.endId))) {
      setAlertMsg("Start ID and End ID should be numbers");
      setAlertOpen(true);
      return;
    }

    if (parseInt(studentInfo.startId) > parseInt(studentInfo.endId)) {
      setAlertMsg("Start ID should be less than or equal to End ID");
      setAlertOpen(true);
      return;
    }

    if (studentInfo.startId.length > 3 || studentInfo.endId.length > 3) {
      setAlertMsg("ID should be of 3 digits");
      setAlertOpen(true);
      return;
    }

    let si = studentInfo.startId;
    let ei = studentInfo.endId;

    if (studentInfo.startId.length !== 3) {
      si = "0".repeat(3 - studentInfo.startId.length) + studentInfo.startId;
    }

    if (studentInfo.endId.length !== 3) {
      ei = "0".repeat(3 - studentInfo.endId.length) + studentInfo.endId;
    }

    const startId = studentInfo.batch.slice(2,4) + studentInfo.department + si;
    const endId = studentInfo.batch.slice(2,4) + studentInfo.department + ei;

    console.log(startId, endId);
    try {
      setLoading(true);
      const res = await createStudent({ startId, endId });
      setLoading(false);
      if (res === null) {
        setAlertMsg("Error occurred while creating student");
        setAlertOpen(true);
        return;
      }

      setAlertMsg("Student(s) created successfully");
      setAlertOpen(true);
      setShowDownload(true);
      setAllCreatedUsers(res);

      downloadCSV(res);


    } catch (error) {
      console.error('Error creating student:', error);
      setAlertMsg("Error creating student");
      setAlertOpen(true);
    }

  }

  return (
    <>
      <Alert open={alertOpen} onClose={() => setAlertOpen(false)}>
        {alertMsg}
      </Alert>
      <div className="ml-40 mt-10">

        <form onSubmit={CreateButtonClick}>
          <div className="flex w-1/2 flex-col gap-6">

            <Select variant="outlined" color="teal" label="Select Batch" onChange={(e) => setStudentInfo({ ...studentInfo, batch: e })} >
              {currBatches.map((batch, index) => {
                return <Option key={index} value={batch.batchName}>{batch.batchName}</Option>
              })}
            </Select>

            <Select variant="outlined" color="teal" label="Select Department" onChange={(e) => setStudentInfo({ ...studentInfo, department: e })} >
              {currDepartments.map((dept, index) => {
                return <Option key={index} value={dept.key}>{dept.value.replace(/_/g, " ")}</Option>
              })}
            </Select>


            <Input variant="outlined" color="teal" label="Start ID" placeholder="" type="number" onChange={(e) => setStudentInfo({ ...studentInfo, startId: e.target.value })} required />



            <Input variant="outlined" color="teal" label="End ID" placeholder="" type="number" onChange={(e) => setStudentInfo({ ...studentInfo, endId: e.target.value })} required />

          </div>

          <div className="flex w-max gap-4 mt-10" >
            <Button type="submit" color="black" >Create</Button>
          </div>
          <div className="flex w-1/2 gap-4 mt-4 items-center justify-center" >
            {loading && <div className="flex items-center justify-center h-full">
              <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>}
            {showDownload && <Button color="green" onClick={() => downloadCSV(allCreatedUsers)}>Download CSV file</Button>}
          </div>
        </form>
      </div>
    </>
  )
}




