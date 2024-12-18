import POST from "@/server_actions/POST";
import Link from "next/link";

async function AllReportedPosts() {
  const res = await POST("post/getReportedPosts", {});
  console.log(res);
  if (res) {
    console.log(res);
    return (
      // just print posts title with a link to the post
      <div>
        <ul>
          {res.reportedPosts.map((post: any) => (
            <li key={post.id}>
              <div className="my-6 shadow-xl rounded-xl bg-blue-gray-100 p-8 flex flex-col gap-4">
                <div className=" font-semibold text-2xl"> {post.title}</div>
                <Link href={`/getPost/${post.id}`}>
                  <p className="text-blue-500 underline">View Post...</p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default AllReportedPosts;
