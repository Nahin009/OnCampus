import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GET from "@/server_actions/GET";
import AllNotis from "@/components/myNotifications/AllNotis";

const MyNotifications = async () => {
    const session = await getServerSession(authOptions);
    if (session==null) {
      return <><div>Not authorized</div></>;
    }
    const res = await GET("post/getNotification/all");
    if(res){
      const { notis } = res;
      return (
        <>
          {res?<AllNotis notis={notis}/>:""}
        </>
      );
    }
}

export default MyNotifications