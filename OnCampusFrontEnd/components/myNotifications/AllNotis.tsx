"use client";
import React from "react";
import { useState } from "react";
import { revalidatePath } from "next/cache";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import POST from "@/server_actions/POST";
import { useRouter } from "next/navigation";

const AllNotis = ({ notis }: { notis: any }) => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(notis);
  const [seen, setSeen] = useState("");
  return (
    <>
      <div className="flex flex-row my-6 border border-6">
        <div className="flex flex-col w-full">
          <Select
            className="my-6"
            variant="static"
            label="Select seen status:"
            value={seen}
            onChange={(e) => {
              const newSeen = e ?? "";
              setSeen(newSeen);
              setNotifications(
                notis.filter(
                  (n) => n.seen === (newSeen === "Seen" ? true : false)
                )
              );
            }}
          >
            <Option value="Seen">Seen</Option>
            <Option value="Unseen">Unseen</Option>
          </Select>
        </div>
      </div>
      <Card className="w-full">
        <List>
          {notifications
            ? notifications.map((n, i) => (
                <ListItem
                  className="bg-slate-800"
                  key={i}
                  onClick={async () => {
                    if (!n.seen) {
                      const res = await POST("post/getNotification/makeSeen/", {
                        nid: n.id,
                      });
                      if (res) {
                        console.log(res);
                      }
                    }

                    if (n.type == "POST") {
                      router.push(`/getPost/${n.postID}`);
                    }
                  }}
                >
                  <ListItemPrefix>
                    <Avatar
                      variant="circular"
                      alt="candice"
                      src={
                        n.author.profilePicture
                          ? n.author.profilePicture
                          : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      }
                    />
                  </ListItemPrefix>
                  <div>
                    {!n.seen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    )}

                    <Typography variant="h6" color="blue-gray">
                      By {n.author.name}
                    </Typography>
                    <Typography
                      className="flex items-center gap-1 text-sm font-medium text-blue-gray-500"
                      placeholder={undefined}
                    >
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.99998 14.9C9.69736 14.9 11.3252 14.2257 12.5255 13.0255C13.7257 11.8252 14.4 10.1974 14.4 8.49998C14.4 6.80259 13.7257 5.17472 12.5255 3.97449C11.3252 2.77426 9.69736 2.09998 7.99998 2.09998C6.30259 2.09998 4.67472 2.77426 3.47449 3.97449C2.27426 5.17472 1.59998 6.80259 1.59998 8.49998C1.59998 10.1974 2.27426 11.8252 3.47449 13.0255C4.67472 14.2257 6.30259 14.9 7.99998 14.9ZM8.79998 5.29998C8.79998 5.0878 8.71569 4.88432 8.56566 4.73429C8.41563 4.58426 8.21215 4.49998 7.99998 4.49998C7.7878 4.49998 7.58432 4.58426 7.43429 4.73429C7.28426 4.88432 7.19998 5.0878 7.19998 5.29998V8.49998C7.20002 8.71213 7.28434 8.91558 7.43438 9.06558L9.69678 11.3288C9.7711 11.4031 9.85934 11.4621 9.95646 11.5023C10.0536 11.5425 10.1577 11.5632 10.2628 11.5632C10.3679 11.5632 10.472 11.5425 10.5691 11.5023C10.6662 11.4621 10.7544 11.4031 10.8288 11.3288C10.9031 11.2544 10.9621 11.1662 11.0023 11.0691C11.0425 10.972 11.0632 10.8679 11.0632 10.7628C11.0632 10.6577 11.0425 10.5536 11.0023 10.4565C10.9621 10.3593 10.9031 10.2711 10.8288 10.1968L8.79998 8.16878V5.29998Z"
                          fill="#90A4AE"
                        />
                      </svg>
                      {new Date(n.createdAt).toLocaleString()}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      {n.content}
                    </Typography>
                  </div>
                </ListItem>
              ))
            : ""}
        </List>
      </Card>
    </>
  );
};

export default AllNotis;
