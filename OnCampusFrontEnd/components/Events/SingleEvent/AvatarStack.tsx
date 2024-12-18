import { Avatar, Tooltip, Typography } from "@material-tailwind/react";

interface user {
  id : string;
  name : string;
  email : string;
  profilePicture : string;
}

export default function AvatarStack({ users }:{users:user[]}) {
  return (
    <div className="flex items-center -space-x-3">
      {users.map((user, index) => (
        <Tooltip key={index} placement="top"
        className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
        content={
          <div>
            <Typography color="red" placeholder={""} variant="small">
              {user.name}
            </Typography>
            <Typography
              placeholder={""}
              variant="small"
              color="gray"
              className="font-normal"
            >
              {user.email}
            </Typography>
          </div>
        }
      >
        <Avatar
          placeholder={""}
          size="sm"
          variant="circular"
          alt=""
          src={user.profilePicture || "/images/defaultProfilePic.webp"}
          className="border-2 border-white hover:z-10"
        />
      </Tooltip>
      ))}
    </div>
  );
}
