import { getAccessToken } from "@/utils/sessionTokenAccessor";
import Landing from "@/components/Landing";
import GET from "@/server_actions/GET";
export default async function Home() {
  const token = await getAccessToken();
  return (
    <>
      {/* <Client e={token??''} GET={GET}/> */}
      <Landing />
    </>
  );
}
