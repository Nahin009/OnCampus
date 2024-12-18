import POST from "@/server_actions/POST";
import { ButtonGroup, IconButton } from "@material-tailwind/react";
import Link from "next/link";
import AllEv from "@/components/AllEvents/AllEv";

async function Allevents() {
  const res = await POST("event/getMySavedEvents", {});
  console.log(res);
  if (res) {
    console.log(res);
    return (
      <div>
        <AllEv pageTitle="My Saved Events" events={res.events} />
      </div>
    );
  } else {
    return <div>Events not found</div>;
  }
}

export default Allevents;
