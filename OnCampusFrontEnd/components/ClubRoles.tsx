"use client"

import { Card, CardHeader, CardBody, Typography, IconButton, Tooltip } from "@material-tailwind/react";

export default function ClubRoles({ clubRoles }: { clubRoles: any }) {

    const TABLE_HEAD = ["Club Name", "Role"];
    return (
        <>
            <Card className="" style={{ minHeight: "400px", minWidth: "600px" }}>
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Club Roles
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
                                ({ club, role }, index) => {
                                    const isLast = index === clubRoles.length - 1;
                                    const classes = "p-4";
                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {club.name}
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
                                            {/* <td className={classes}>
                                                <div onClick={() => { deleteClubRole(index) }}>
                                                    <Tooltip content="Edit User">
                                                        <IconButton variant="text">
                                                            <MinusCircleIcon className="h-5 w-5" color="red" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </td> */}
                                        </tr>
                                    );
                                },
                            )}

                        </tbody>
                    </table>
                </CardBody>
            </Card >
        </>
    )
}