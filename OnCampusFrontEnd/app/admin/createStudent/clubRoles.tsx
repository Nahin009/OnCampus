import React from "react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import AlertCustomCloseIcon from "@/components/alert";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    IconButton,
    Tooltip,
    Select,
    Option,
    Button
} from "@material-tailwind/react";

import { useEffect } from "react";
import GET from "@/server_actions/GET";

export default function ClubRoleComponent({ state, setState, clubRoles, setClubRoles }:
    { state: number, setState: React.Dispatch<React.SetStateAction<number>>, clubRoles: [], setClubRoles: React.Dispatch<React.SetStateAction<any>> }) {

    const [selectedClub, setSelectedClub] = React.useState("");
    const [selectedRole, setSelectedRole] = React.useState("");

    const [availableClubRoles, setAvailableClubRoles] = React.useState([]);
    const [availableClubs, setAvailableClubs] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const [showAlert, setShowAlert] = React.useState(false);

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

        fetchData('user/admin/getClubRoles').then(res => {
            if (!res.success) {
                return;
            }

            setAvailableClubRoles(res.data);
        });

        fetchData('user/admin/getClubs').then(res => {
            if (!res.success) {
                return;
            }

            setAvailableClubs(res.data);
        })
    }, []);

    const addNewClubRole = () => {
        console.log(selectedClub, selectedRole);
        if (selectedClub === "" || selectedRole === "") {
            return;
        }
        setClubRoles([...clubRoles, { clubName: selectedClub, role: selectedRole }]);
        setSelectedClub("");
        setSelectedRole("");
    }

    const createNewStudent = async () => {
        setState(3);
    }

    const deleteClubRole = (index: number) => {
        console.log('deleting club role', index)
        const newClubRoles = clubRoles.filter((_, i) => i !== index);
        setClubRoles(newClubRoles);
    }

    const goBack = () => {
        setState(1);
    }

    const TABLE_HEAD = ["Club Name", "Role", ""];

    return (
        <Card className="" style={{ minHeight: "400px", minWidth: "600px" }}>
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Add Club Roles
                        </Typography>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {clubRoles.map(
                            ({ clubName, role }, index) => {
                                const isLast = index === clubRoles.length - 1;
                                const classes = "p-4";
                                return (
                                    <tr key={clubName}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {clubName}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {role}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div onClick={() => { deleteClubRole(index) }}>
                                                <Tooltip content="Edit User">
                                                    <IconButton variant="text">
                                                        <MinusCircleIcon className="h-5 w-5" color="red" />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            },
                        )}

                        <tr key={"addNewClubRole"}>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex flex-col">
                                    <Select variant="outlined" color="teal" label="Select Club" onChange={(e) => setSelectedClub(e)} >
                                        {availableClubs.map((club, index) => {
                                            return (<Option key={index} value={club.name}>{club.name}</Option>)
                                        })}

                                    </Select>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex flex-col">
                                    <Select variant="outlined" color="teal" label="Select Role" onChange={(e) => setSelectedRole(e)} >
                                        {availableClubRoles.map((role, index) => {
                                            return <Option key={index} value={role}>{role.replace(/_/g, ' ')}</Option>
                                        })}
                                    </Select>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <Tooltip content="Add User">
                                    <IconButton variant="text" onClick={addNewClubRole}>
                                        <PlusCircleIcon className="h-5 w-5" />
                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex w-full mt-10 justify-between pl-10 pr-10" >
                    <Button color="black" onClick={goBack}>Go Back</Button>
                    <Button color="black" onClick={createNewStudent}>Create</Button>
                </div>
            </CardBody>
            {showAlert && <AlertCustomCloseIcon message={message} setMessage={setMessage} setShowAlert={setShowAlert} />}

        </Card >
    );

}

// function CreateStudentPagePrev() {
//     const [state, setState] = useState(1);
//     const [clubRoles, setClubRoles] = useState([]); // [clubName, role]
//     const [studentInfo, setStudentInfo] = useState({ name: "", email: "", department: "", batch: "", session: "" });
  
//     const [showAlert, setShowAlert] = useState(false);
//     const [message, setMessage] = useState("");
  
  
//     useEffect(() => {
//       if (state === 3) {
//         async function ff() {
//           try {
//             // console.log(clubRoles)
//             const newStudentInfo = { ...studentInfo, clubRoles: clubRoles };
//             const response = await createStudent(newStudentInfo);
//             setMessage(response.message);
//             setShowAlert(true);
//           } catch (error) {
//             setMessage("Error occurred while creating student");
//             setShowAlert(true);
//           } finally {
//             setState(1);
//             setClubRoles([]);
//             setStudentInfo({ name: "", email: "", department: "", batch: "", session: "" });
//           }
//         }
//         ff();
//       }
//     }, [state]);
  
//     return (
//       <>
//         {showAlert && (
//           <AlertCustomCloseIcon message={message} setShowAlert={setShowAlert} setMessage={setMessage} />
//         )}
//         {state === 1 && (
//           // Render content when state is 1
//           <StudentInformationComponent
//             state={state}
//             setState={setState}
//             studentInfo={studentInfo}
//             setStudentInfo={setStudentInfo}
//           />
//         )}
//         {state === 2 && (
//           // Render content when state is 2
//           <ClubRoleComponent
//             state={state}
//             setState={setState}
//             clubRoles={clubRoles}
//             setClubRoles={setClubRoles}
//           />
//         )}
//         {state === 3 && (
//           // Render content when state is 3
//           <div></div>
//         )}
//       </>
//     )
//   }
  
  