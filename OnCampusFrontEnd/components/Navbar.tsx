"use client";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import {
  Button,
  IconButton,
  Input,
  Navbar,
  Typography,
} from "@material-tailwind/react";

import { ProfileMenu } from "./AvatarMenu";
import { NotificationsMenu } from "./NotiMenu";

import { NavbarProps } from "@material-tailwind/react";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import GET from "@/server_actions/GET";

export function NavbarDark({user, notifications}: {user: any, notifications:any}) {
  const { data: session, status } = useSession();
  const [allNotis,setAllNotis] = useState(notifications);
  
  useEffect(() => {
    if (
      status != "loading" &&
      session &&
      session?.error === "RefreshAccessTokenError"
    ) {
      signOut({ callbackUrl: "/" });
    }

  }, [session, status]);
  
  if (!session) {
    return (
      <Navbar
        variant="gradient"
        color="blue-gray"
        className="max-w-full from-blue-gray-400 to-blue-gray-900 px-4 py-3"
        placeholder={undefined}
      >
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          <Link href={"/"}>
            <Image
              src="/images/logo.png"
              width={50}
              height={40}
              alt="logo"
              className="m-0 p-0 rounded-full"
            />
          </Link>
          <div className="my-3">
            Not logged in.{" "}
            <Button placeholder={undefined} onClick={() => signIn("keycloak")}>
              Log in
            </Button>
          </div>
        </div>
      </Navbar>
    );
  }

  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="max-w-full from-blue-gray-400 to-blue-gray-900 px-4 py-3"
      placeholder={undefined}
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <Link href={"/"}>
          <Image
            src="/images/logo.png"
            width={50}
            height={40}
            alt="logo"
            className="m-0 p-0 rounded-full"
          />
        </Link>
        <div className="relative flex w-full gap-2 md:w-max ml-8">
          <Link href={"/writePost"}>
            <Button
              size="sm"
              color="white"
              className=" right-1 top-1 rounded"
              placeholder={undefined}
            >
              write a post
            </Button>
          </Link>
        </div>

        <div className="ml-auto flex gap-8 md:mr-4">
          <NotificationsMenu notifications={notifications?notifications:null}/>

          <ProfileMenu user={user}/>
        </div>
      </div>
    </Navbar>
  );
}
