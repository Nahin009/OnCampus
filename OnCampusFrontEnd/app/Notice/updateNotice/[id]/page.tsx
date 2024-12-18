import React, { use } from "react";
import { getAccessToken } from "@/utils/sessionTokenAccessor";
import POST from "@/server_actions/POST";
import SingleNotice from '@/components/updateNotice/SingleNotice'
import { Button } from "@material-tailwind/react";
import Link from "next/link";
const GetNotice = async ({ params }: { params: { id: string } }) => {
  const token = await getAccessToken();
  if (!token) {
    return <div>Not authorized</div>;
  }
  const notice = await POST("event/notice/getNotice", { id: params.id });
  if (!notice) {
    return <div>Notice not found</div>;
  } else {
    return (
      <>
        <Link href={`/Notice/getNotice/${params.id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to original notice page
          </button>
        </Link>

        <SingleNotice notice={notice.notice} />
      </>
    );
  }
};

export default GetNotice;
