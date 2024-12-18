import { Avatar, Tooltip, Typography } from "@material-tailwind/react";

export default function AvatarStack({users}: {users: any[]}) {
  return (
    <div className="flex items-center -space-x-3">
      {users.map((user,index) => (
        <Tooltip
        key={index}
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
            alt="natali craig"
            src={user.profilePicture?user.profilePicture:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"}
            className="border-2 border-white hover:z-10"
          />
        </Tooltip>
      ))}
    </div>
  );
}
