import React from 'react'
import Creations from '@/components/admin/analysis/Creations'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GET from "@/server_actions/GET";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session == null) {
    return (
      <>
        <div>Not authorized</div>
      </>
    );
  }
  else {
    return <Creations/>;
  }

  //   console.log(posts);
  //   console.log(user);
};

export default Page;