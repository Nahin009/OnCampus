import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import POST from "@/server_actions/POST";
import AllPosts from "@/components/AllPosts";

const Batch_Dept = async ({ params }: { params: { type: string } }) => {
    const session = await getServerSession(authOptions); 
    if(!session){
        return <><div>Not authorized</div></>;
    }
    const res = await POST("post/getPosts/BatchDept/", {
        type: params.type,
    });
    if(res){
        const { posts, user } = res;
        return (
            <>
              {res?<AllPosts posts={posts} user={user} type={params.type}/>:""}
            </>
        );
    }
    else{
        return <div>Post not found</div>;
    }
}

export default Batch_Dept