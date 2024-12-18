
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GET from "@/server_actions/GET";
import AllNotices from "@/components/AllNotices";

export default async function Home() {
  const session = await getServerSession(authOptions); 
  if(!session){
      return <><div>Not authorized</div></>;
  }
  const res = await GET("event/notice/getAllNotices");
  if(res){
      const { notices } = res;
      
      return (
          <>
            {res?<AllNotices notices={notices} />:""}
          </>
      );
  }
  else{
      return <div>Notices not found</div>;
  }
}
