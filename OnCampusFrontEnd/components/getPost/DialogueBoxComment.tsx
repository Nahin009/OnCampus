import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  Bars4Icon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { ContextProvider } from "./SinglePost";
import {CommentProvider} from "./SingleComment";
import POST from "@/server_actions/POST";
import GET from "@/server_actions/GET";

export function DialogueBoxComment({comment}: {comment: any}) {
  const {
    user,
    changeComments
  } = useContext(ContextProvider);
  const {updateStatus, changeUpdateStatus} = useContext(CommentProvider);
  return (
    <Menu>
      <MenuHandler>
        <Bars4Icon className="w-8 h-8 cursor-pointer" />
      </MenuHandler>
      <MenuList>
      {user.email == comment.author.email || user.role == "ADMIN" ? (
          <MenuItem
            onClick={async () => {
              const res = await GET(`post/deleteComment/${comment.id}`);
              if (res) {
                changeComments(res.comments);
              }
            }}
          >
            Delete comment
          </MenuItem>
        ) : (
          ""
        )}
        {user.email == comment.author.email && !updateStatus? (
          <MenuItem
            onClick={async () => {
              changeUpdateStatus(true);
            }}
          >
            Update comment
          </MenuItem>
        ) : (
          ""
        )}
      </MenuList>
    </Menu>
  );
}
