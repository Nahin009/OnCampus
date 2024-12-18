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
import { ContextProvider } from "./SingleNotice";
import POST from "@/server_actions/POST";
import GET from "@/server_actions/GET";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DialogueBox({
  author,
  nid,
}: {
  author: any;
  nid: string;
}) {
  const { user, changeDeleted } = useContext(ContextProvider);

  const router = useRouter();

  return (
    <Menu>
      <MenuHandler>
        <Bars4Icon className="w-8 h-8 cursor-pointer" />
      </MenuHandler>
      <MenuList>
        {user.email == author.email || user.role == "ADMIN" ? (
          <MenuItem
            onClick={async () => {
              const res = await GET(`event/notice/deleteNotice/${nid}`);
              if (res) {
                changeDeleted(true);
              }
            }}
          >
            Delete notice
          </MenuItem>
        ) : (
          ""
        )}
        {user.email == author.email ? (
          <MenuItem>
            <Link href={"/Notice/updateNotice/" + nid}>Update Notice</Link>
          </MenuItem>
        ) : (
          ""
        )}
      </MenuList>
    </Menu>
  );
}
