"use client";
import React from "react";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    IconButton,
    Tooltip,
    Select,
    Option,
    Button,
    Input
} from "@material-tailwind/react";


import { useState } from 'react';
import createBatch from "@/server_actions/createBatch";
import AlertCustomCloseIcon from "@/components/alert";


export default function createBatchPage() {

    const [batch, setBatch] = useState(""); // [batchName]
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");

    const validateInput = (batch) => {
        if (batch === "") {
            setMessage("Batch name can't be empty");
            setShowAlert(true);
            return false;
        }
        return true
    }

    const createNewBatch = async () => {
        try {
            console.log(batch)
            const res = validateInput(batch);
            if (!res) {
                return;
            }
            const response = await createBatch({ batch: batch });
            setMessage(response.message);
            setShowAlert(true);
        } catch (error) {
            setMessage("Error occurred while creating batch");
            setShowAlert(true);
        } finally {
            setBatch("");
        }
    }

    const createButtonClick = (e) => {
        e.preventDefault();
        createNewBatch();
    }

    return (
        <>
            <div className="ml-40 mt-10">
                <form onSubmit={createButtonClick}>
                    <div className="flex w-72 flex-col gap-6">
                        <Input variant="outlined" color="teal" label="Batch Name" placeholder="" type="text" onChange={(e) => setBatch(e.target.value)} value={batch} required />

                    </div>

                    <div className="flex w-max gap-4 mt-10" >
                        <Button type="submit" color="black" >Create</Button>
                    </div>
                </form>
                {showAlert && <AlertCustomCloseIcon message={message} setMessage={setMessage} setShowAlert={setShowAlert} />}

            </div>
        </>
    );

}