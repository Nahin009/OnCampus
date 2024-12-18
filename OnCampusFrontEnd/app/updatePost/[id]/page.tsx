import React, { use } from "react";
import { getAccessToken } from "@/utils/sessionTokenAccessor";
import POST from "@/server_actions/POST";
import SinglePosts from "@/components/updatePost/SinglePost";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
const GetPost = async ({ params }: { params: { id: string } }) => {
  const token = await getAccessToken();
  if (!token) {
    return <div>Not authorized</div>;
  }
  const post = await POST("post/getPost/update", { id: params.id });
  if (!post) {
    return <div>Post not found</div>;
  } else {
    return (
      <>
        <Link href={`/getPost/${params.id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to original post page
          </button>
        </Link>

        <SinglePosts post={post.post} />
      </>
    );
  }
};

export default GetPost;
