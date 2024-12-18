import { Avatar, Typography } from "@material-tailwind/react";
import Link from "next/link";

export default function AvatarImageText({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-4">
      <Link href={"/profile/"+user.email}>
        <div className="flex items-center gap-4">
          <Avatar src={user?.profilePicture?user?.profilePicture:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"} alt="avatar" placeholder={""} />
          <div>
            <Typography placeholder={""} variant="h6">
              {user?.name ?? ""}
            </Typography>
            <Typography
              placeholder={""}
              variant="small"
              color="gray"
              className="font-normal"
            >
              {user?.email ?? ""}
            </Typography>
          </div>
        </div>
      </Link>
    </div>
  );
}
