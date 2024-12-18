import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GET from "@/server_actions/GET";
import ReportedPosts from "@/components/ReportedPosts";
const Page = async() => {
    const session = await getServerSession(authOptions); 
    if(!session){
        return <><div>Not authorized</div></>;
    }
    const res = await GET("post/reportedPosts/");
    if(res){
        const { posts, user } = res;
        return (
            <>
              {res?<ReportedPosts posts={posts} />:""}
            </>
        );
    }
    else{
        return <div>Reported Posts not found</div>;
    }
}

export default Page