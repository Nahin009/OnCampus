import { Input, Select, Option, Button } from "@material-tailwind/react";
import React from "react";
import { useEffect } from "react";
import GET from "@/server_actions/GET";

import AlertCustomCloseIcon from "@/components/alert";

export default function StudentInformationComponent({ state, setState, studentInfo, setStudentInfo }: { state: number, setState: React.Dispatch<React.SetStateAction<number>>, studentInfo: any, setStudentInfo: any }) {

    const [message, setMessage] = React.useState("");
    const [showAlert, setShowAlert] = React.useState(false);
    const [currBatches, setCurrBatches] = React.useState([]);
    const [currDepartments, setCurrDepartments] = React.useState([]);

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
                setMessage("Error fetching data: " + error);
                setShowAlert(true);
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

            setCurrDepartments(res.data)
        })


    }, [])

    const validateStidentInfo = (studentInfo) => {

        if (studentInfo.department === "") {
            // <AlertCustomCloseIcon message="Department can't be empty" />
            setMessage("Department can't be empty");
            setShowAlert(true);
            return false;
        }
        if (studentInfo.batch === "") {
            setMessage("Batch can't be empty");
            setShowAlert(true);
            return false;
        }
        if (studentInfo.session === "") {
            setMessage("Session can't be empty");
            setShowAlert(true);
            return false;
        }
        return true
    }

    const nextButtonClick = (e) => {
        e.preventDefault()
        console.log(studentInfo);
        const res = validateStidentInfo(studentInfo);
        if (!res) {
            return;
        }
        setState(2);
    }


    return (
        <div className="ml-40 mt-10">

            <form onSubmit={nextButtonClick}>
                <div className="flex w-72 flex-col gap-6">
                    <Input variant="outlined" color="teal" label="Student's Name" placeholder="" type="text" onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })} required />
                    <Select variant="outlined" color="teal" label="Select Department" onChange={(e) => setStudentInfo({ ...studentInfo, department: e })} >
                        {currDepartments.map((dept, index) => {
                            return <Option key={index} value={dept}>{dept.replace(/_/g, " ")}</Option>
                        })}
                    </Select>

                    <Select variant="outlined" color="teal" label="Select Batch" onChange={(e) => setStudentInfo({ ...studentInfo, batch: e })}>
                        {currBatches.map((batch, index) => {
                            return <Option key={index} value={batch.batchName}>{batch.batchName}</Option>
                        })}
                    </Select>

                    <Select variant="outlined" color="teal" label="Select Session" onChange={(e) => setStudentInfo({ ...studentInfo, session: e })}>
                        <Option value="2024-2025">2024 - 2025</Option>
                        <Option value="2023-2024">2023 - 2024</Option>
                        <Option value="2022-2023">2022 - 2023</Option>
                        <Option value="2021-2022">2021 - 2022</Option>
                        <Option value="2020-2021">2020 - 2021</Option>
                    </Select>

                    <Input variant="outlined" color="teal" label="Student's Email" placeholder="" type="email" onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })} required />
                    <Input variant="outlined" color="teal" label="Student's merit position" placeholder="" type="number" onChange={(e) => setStudentInfo({ ...studentInfo, meritPosition: parseInt(e.target.value) })} required />

                </div>

                <div className="flex w-max gap-4 mt-10" >
                    <Button type="submit" color="black" >Next</Button>
                </div>
            </form>
            {showAlert && <AlertCustomCloseIcon message={message} setMessage={setMessage} setShowAlert={setShowAlert} />}

        </div>
    )
}