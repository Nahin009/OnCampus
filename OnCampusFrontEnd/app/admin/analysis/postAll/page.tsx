import React from 'react'
import PostAll from '@/components/admin/analysis/PostAll'
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
    const res = await GET("user/analysis/postAll");
    if(!res){
      return <div>Failed to fetch data</div>;
    }
    else{
      return <PostAll mapper={res.mapper}/>;
    }
  }

  //   console.log(posts);
  //   console.log(user);
};

export default Page;