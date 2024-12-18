"use client";
import React from "react";
import { Card, IconButton, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { LinkIcon } from "@heroicons/react/24/outline";
import { Replace } from "lucide-react";
import GET from "@/server_actions/GET";

const ReportAll = ({ posts }: { posts: any }) => {
  console.log(posts);
  // posts = posts.posts;
  const [allPosts, setAllPosts] = React.useState(posts);
  const TABLE_HEAD = [
    "Link",
    "Type",
    "Author",
    "useremail",
    "Anonymous",
    "IsPoll",
    "Tag",
    "Open",
    "ReportCount",
    "Delete",
  ];
  return (
    <>
      <Card className="w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPosts.map((post, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-8">
                  <Link href={`/getPost/${post.id}`}>
                    <LinkIcon className="h-5 w-5" />
                  </Link>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {post.type}
                  </Typography>
                </td>
                <td className="p-8">
                  <Link href={`/profile/${post.author.email}`}>
                    <LinkIcon className="h-5 w-5" />
                  </Link>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {post.author.email}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {post.anonymous ? "true" : "false"}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {post.isPoll ? "true" : "false"}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {post.tags[0]}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {post.open ? "true" : "false"}
                  </Typography>
                </td>
                <td className="p-12">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {post.reportedCount}
                  </Typography>
                </td>

                <td className="p-8">
                  <IconButton
                    key={index + 1}
                    color="red"
                    onClick={async () => {
                      const res = await GET(`post/deletePost/${post.id}`);
                      if (res) {
                        setAllPosts(allPosts.filter((p) => p.id !== post.id));
                      }
                    }}
                  >
                    <Replace key={index + 2} size={24} />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default ReportAll;
