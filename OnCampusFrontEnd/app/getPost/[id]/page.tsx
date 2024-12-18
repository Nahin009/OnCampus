import React, { use } from "react";
import { getAccessToken } from "@/utils/sessionTokenAccessor";
import POST from "@/server_actions/POST";
import SinglePosts from "@/components/getPost/SinglePost";

const GetPost = async ({ params }: { params: { id: string } }) => {
  const token = await getAccessToken();
  if (!token) {
    return <div>Not authorized</div>;
  }
  const post = await POST("post/getPost", { id: params.id });
  if (!post) {
    return <div>Post not found</div>;
  } else {
    console.log(post);
    return <SinglePosts post={post} />;
  }
};

export default GetPost;
