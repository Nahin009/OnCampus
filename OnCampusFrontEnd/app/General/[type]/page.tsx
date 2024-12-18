import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import POST from "@/server_actions/POST";
import AllPosts from "@/components/AllPosts";

const General = async ({ params }: { params: { type: string } }) => {
  const session = await getServerSession(authOptions);
  if (session == null) {
    return (
      <>
        <div>Not authorized</div>
      </>
    );
  }
  const res = await POST("post/getPosts/General/", {
    type: params.type,
  });
  if (res) {
    const { posts, user } = res;
    return (
      <>
        {res ? <AllPosts posts={posts} user={user} type={params.type} /> : ""}
      </>
    );
  } else {
    return <div>Post not found</div>;
  }

  //   console.log(posts);
  //   console.log(user);
};

export default General;
