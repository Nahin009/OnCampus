import React from 'react'
import EventAll from '@/components/admin/analysis/EventAll'
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
    const res = await GET("user/analysis/eventAll");
    if(!res){
      return <div>Failed to fetch data</div>;
    }
    else{
      return <EventAll mapper={res.mapper}/>;
    }
  }

  //   console.log(posts);
  //   console.log(user);
};

export default Page;